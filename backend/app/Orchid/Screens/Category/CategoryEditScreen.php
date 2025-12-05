<?php

namespace App\Orchid\Screens\Category;

use App\Models\Category;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\Fields\CheckBox;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategoryEditScreen extends Screen
{
    public ?Category $category = null;
       
    public function query(Category $category): iterable
    {
        $this->category = $category;
        $category->load(['parent']);

        return [
            'category' => $category,
        ];
    }

    public function name(): ?string
    {
        return ($this->category?->exists) ? 'Edit Category' : 'Create Category';
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
                ->canSee($this->category?->exists)
                ->confirm('Are you sure you want to delete this category?'),
        ];
    }

    public function layout(): iterable
    {
        // Get available parent categories (only level 0 and 1, excluding current and descendants)
        $parentOptions = $this->getAvailableParents();

        return [
            Layout::rows([
                Input::make('category.name')
                    ->title('Category Name')
                    ->required()
                    ->placeholder('Enter category name'),

                Input::make('category.slug')
                    ->title('Slug')
                    ->placeholder('Auto-generated from name')
                    ->help('URL-friendly version of the category name (auto-generated if left empty)'),

                Select::make('category.parent_id')
                    ->title('Parent Category')
                    ->options($parentOptions)
                    ->empty('None (Top Level Category)', 0)
                    ->help('Select a parent category. Maximum depth is 3 levels (Parent > Sub > Child).'),

                TextArea::make('category.description')
                    ->rows(4)
                    ->title('Description')
                    ->placeholder('Optional category description'),

                CheckBox::make('category.is_active')
                    ->title('Active')
                    ->placeholder('Category is active and visible')
                    ->value(1)
                    ->checked($this->category?->is_active ?? true),

                Input::make('category.order')
                    ->type('number')
                    ->title('Display Order')
                    ->value($this->category?->order ?? 0)
                    ->help('Lower numbers appear first within the same parent category'),
            ])
        ];
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'category.name' => 'required|string|max:255',
            'category.slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories', 'slug')->ignore($this->category?->id),
            ],
            'category.parent_id' => 'nullable|exists:categories,id',
            'category.description' => 'nullable|string',
            'category.is_active' => 'boolean',
            'category.order' => 'integer|min:0',
        ]);

        $categoryData = $data['category'];

        // Generate slug if not provided
        if (empty($categoryData['slug'])) {
            $categoryData['slug'] = Str::slug($categoryData['name']);
        } else {
            $categoryData['slug'] = Str::slug($categoryData['slug']);
        }

        // Calculate level based on parent
        if (empty($categoryData['parent_id'])) {
            $categoryData['level'] = 0;
            $categoryData['parent_id'] = null;
        } else {
            $parent = Category::find($categoryData['parent_id']);
            
            if ($parent) {
                // Prevent creating categories deeper than level 2
                if ($parent->level >= 2) {
                    Alert::error('Cannot create category. Maximum depth of 3 levels reached.');
                    return;
                }
                
                // Prevent circular reference
                if ($this->category?->exists && $this->wouldCreateCircularReference($parent)) {
                    Alert::error('Cannot set parent. This would create a circular reference.');
                    return;
                }
                
                $categoryData['level'] = $parent->level + 1;
            }
        }

        // Handle checkbox
        $categoryData['is_active'] = $request->input('category.is_active', false);

        $this->category->fill($categoryData)->save();

        Alert::success('Category saved successfully!');
        
        // Refresh the category to ensure we have the latest data including ID
        $this->category->refresh();
        
        return redirect()->route('platform.categories.edit', $this->category->id);
    }

    public function remove()
    {
        // Check if category has children
        if ($this->category->children()->count() > 0) {
            Alert::error('Cannot delete category with sub-categories. Delete children first.');
            return;
        }

        // Check if category has products
        $productCount = $this->category->products()->count();
        if ($productCount > 0) {
            Alert::warning("Category has {$productCount} products. Their category will be set to null.");
        }

        $this->category->delete();
        Alert::info('Category deleted successfully.');
        
        return redirect()->route('platform.categories');
    }

    /**
     * Get available parent categories (excluding current category and its descendants)
     */
    private function getAvailableParents(): array
    {
        $query = Category::query()
            ->where('level', '<', 2) // Only level 0 and 1 can be parents
            ->orderBy('level')
            ->orderBy('order')
            ->orderBy('name');

        // Exclude current category and its descendants
        if ($this->category?->exists) {
            $excludeIds = [$this->category->id];
            $descendants = $this->category->descendants();
            $excludeIds = array_merge($excludeIds, $descendants->pluck('id')->toArray());
            
            $query->whereNotIn('id', $excludeIds);
        }

        $categories = $query->get();

        // Format with indentation to show hierarchy
        $options = [];
        foreach ($categories as $cat) {
            $indent = str_repeat('— ', $cat->level);
            $options[$cat->id] = $indent . $cat->name . ' (' . $cat->level_name . ')';
        }

        return $options;
    }

    /**
     * Check if setting this parent would create a circular reference
     */
    private function wouldCreateCircularReference(Category $newParent): bool
    {
        $current = $newParent;
        
        while ($current) {
            if ($current->id === $this->category->id) {
                return true;
            }
            $current = $current->parent;
        }
        
        return false;
    }
}
