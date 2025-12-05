<?php

namespace App\Orchid\Screens\Product;

use App\Models\Product;
use App\Models\Stone;
use App\Models\Category;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\Relation;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Illuminate\Support\Str;

class ProductEditScreen extends Screen
{
    public ?Product $product = null;

    public function query(Product $product): iterable
    {
        $this->product = $product;
        $product->load(['stone', 'category']);

        return [
            'product' => $product,
            'stone' => $product->stone?->name ?? '',
        ];
    }

    public function name(): ?string
    {
        return ($this->product?->exists) ? 'Edit Product' : 'Create Product';
    }

    public function commandBar(): iterable
    {
        return [
            Button::make('Save')
                ->icon('bs.save')
                ->method('save'),

            Button::make('Remove')
                ->icon('bs.trash')
                ->method('remove')
                ->canSee($this->product?->exists),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('product.code')
                    ->title('SKU no.')
                    ->required()
                    ->placeholder('Enter SKU Number'),

                Input::make('product.name')
                    ->title('Name')
                    ->required(),

                Input::make('product.slug')
                    ->title('Slug')
                    ->placeholder('Auto-generated from name')
                    ->help('URL-friendly version of the product name (auto-generated if left empty)'),

                Input::make('product.price')
                    ->type('number')
                    ->step('0.01')
                    ->title('Price'),

                Input::make('product.stone_size')
                    ->title('Stone Size')
                    ->placeholder('e.g., 5x7 mm'),

                Input::make('product.dimensions')
                    ->title('Dimensions')
                    ->placeholder('e.g., 10x12 mm'),

                Input::make('product.plating')
                    ->title('Plating')
                    ->placeholder('e.g., Gold Plated'),

                Input::make('product.weight')
                    ->type('number')
                    ->step('0.01')
                    ->title('Weight (g)'),

                Select::make('product.category_id')
                    ->title('Category')
                    ->options($this->getCategoryOptions())
                    ->empty('No Category', 0)
                    ->help('Select a category from the hierarchical list'),

                Relation::make('product.stone_id')
                    ->fromModel(Stone::class, 'name')
                    ->title('Stone')
                    ->empty('No Stone Selected')
                    ->help('Select a stone from the list'),

                TextArea::make('product.short_description')
                    ->rows(3)
                    ->title('Short Description'),

                TextArea::make('product.description')
                    ->rows(6)
                    ->title('Description'),

                TextArea::make('product.details')
                    ->rows(4)
                    ->title('Product Details ')
                    ->help('Optional structured JSON for specs/attributes (used for filters).'),

                Upload::make('product.images')
                    ->title('Product Images')
                    ->acceptedFiles('.png,.jpg,.jpeg,.webp,.svg')
                    ->maxFileSize(2)
                    ->multiple()
                    ->help('Upload multiple product images (Max 2MB each, formats: PNG, JPG, WEBP, SVG)'),
            ])
        ];
    }

    public function save(Request $request)
    {
        $request->validate([
            'product.code' => 'required|string|max:255',
            'product.name' => 'required|string|max:255',
            'product.stone_size' => 'nullable|string|max:255',
            'product.dimensions' => 'nullable|string|max:255',
            'product.plating' => 'nullable|string|max:255',
            'product.weight' => 'nullable|numeric',
        ]);
        
        $data = $request->get('product');

        // Normalize details if JSON text provided
        if (isset($data['details']) && is_string($data['details'])) {
            $decoded = json_decode($data['details'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $data['details'] = $decoded;
            }
        }

        // Handle product images via Orchid attachment system
        if (isset($data['images']) && is_array($data['images']) && count($data['images']) > 0) {
            // Filter out invalid attachment IDs
            $validAttachmentIds = array_filter($data['images'], function($id) {
                return is_numeric($id) && $id > 0;
            });
            
            if (!empty($validAttachmentIds)) {
                // Get the first valid attachment as the main product image
                $attachmentId = reset($validAttachmentIds);
                $attachment = \Orchid\Attachment\Models\Attachment::find($attachmentId);
                if ($attachment) {
                    // Store only the relative path with extension (e.g., 2025/11/11/filename.png)
                    // Remove leading slash if present
                    $relativePath = ltrim($attachment->path . $attachment->name . '.' . $attachment->extension, '/');
                    $data['image'] = $relativePath;
                }
            }
        }

        // Handle Category Selection
        // Convert empty string to null and validate category exists
        if (isset($data['category_id'])) {
            // Convert empty string or "0" to null
            if ($data['category_id'] === '' || $data['category_id'] === '0' || $data['category_id'] === 0) {
                $data['category_id'] = null;
            } elseif (!empty($data['category_id'])) {
                // Validate that the category exists
                if (!Category::where('id', $data['category_id'])->exists()) {
                    Alert::warning("Selected category does not exist. Product saved without category.");
                    $data['category_id'] = null;
                }
            } else {
                $data['category_id'] = null;
            }
        } else {
            // No category field in request, set to null
            $data['category_id'] = null;
        }

        // Generate product slug from name if not provided
        if (empty($data['slug']) && isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        } elseif (isset($data['slug'])) {
            // Ensure slug is properly formatted
            $data['slug'] = Str::slug($data['slug']);
        }

        // Handle Stone Selection
        if (isset($data['stone_id']) && !empty($data['stone_id'])) {
            if (!Stone::where('id', $data['stone_id'])->exists()) {
                 $data['stone_id'] = null;
            }
        } else {
            $data['stone_id'] = null;
        }

        $this->product->fill($data)->save();

        // Attach uploaded images via Orchid attachments
        $attachmentIds = $request->input('product.images', []);
        // Filter out invalid IDs (undefined, null, non-numeric)
        $validIds = array_filter($attachmentIds, function($id) {
            return is_numeric($id) && $id > 0;
        });
        
        if (!empty($validIds)) {
            $this->product->attachment()->syncWithoutDetaching($validIds);
        }

        Alert::success('Product saved successfully!');
        
        // Refresh the product to ensure we have the latest data including ID
        $this->product->refresh();
        
        return redirect()->route('platform.products.edit', $this->product->id);
    }

    public function remove()
    {
        $this->product->delete();
        Alert::info('Product deleted successfully.');
        
        return redirect()->route('platform.products');
    }

    /**
     * Get category options formatted hierarchically
     */
    private function getCategoryOptions(): array
    {
        $categories = Category::query()
            ->active()
            ->orderBy('level')
            ->orderBy('order')
            ->orderBy('name')
            ->get();

        $options = [];
        foreach ($categories as $category) {
            $indent = str_repeat('— ', $category->level);
            $options[$category->id] = $indent . $category->full_path;
        }

        return $options;
    }
}
