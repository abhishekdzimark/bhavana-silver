<?php

namespace App\Orchid\Screens\Stone;

use App\Models\Stone;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\TextArea;
use Orchid\Screen\Fields\Upload;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;
use Illuminate\Support\Str;

class StoneEditScreen extends Screen
{
    public ?Stone $stone = null;

    public function query(Stone $stone): iterable
    {
        $this->stone = $stone;

        return [
            'stone' => $stone,
        ];
    }

    public function name(): ?string
    {
        return ($this->stone?->exists) ? 'Edit Stone' : 'Create Stone';
    }

    public function description(): ?string
    {
        return 'Manage gemstone or material information';
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
                ->canSee($this->stone?->exists)
                ->confirm('Are you sure you want to delete this stone? Products using this stone will have their stone reference removed.'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::rows([
                Input::make('stone.name')
                    ->title('Stone Name')
                    ->required()
                    ->placeholder('e.g., Ethiopian Opal, Blue Sapphire')
                    ->help('Name of the gemstone or material'),

                Input::make('stone.size')
                    ->title('Size')
                    ->placeholder('e.g., 5x7 mm, 1 carat')
                    ->help('Size or dimensions of the stone'),

                Input::make('stone.slug')
                    ->title('Slug')
                    ->placeholder('Auto-generated from name')
                    ->help('URL-friendly version (auto-generated if left empty)'),

                Upload::make('stone.image')
                    ->title('Stone Image')
                    ->acceptedFiles('.png,.jpg,.jpeg,.webp,.svg')
                    ->maxFileSize(2)
                    ->help('Upload an image of the stone (Max 2MB, formats: PNG, JPG, WEBP, SVG)'),

                TextArea::make('stone.description')
                    ->title('Description')
                    ->rows(5)
                    ->placeholder('Describe the stone, its properties, origin, etc.')
                    ->help('Detailed description of the stone'),
            ]),
        ];
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'stone.name' => 'required|string|max:255',
            'stone.slug' => 'nullable|string|max:255|unique:stones,slug,' . ($this->stone?->id ?? 'NULL'),
            'stone.size' => 'nullable|string|max:255',
            'stone.description' => 'nullable|string',
            'stone.image' => 'nullable',
        ]);

        $stoneData = $data['stone'];

        // Generate slug if not provided
        if (empty($stoneData['slug'])) {
            $stoneData['slug'] = Str::slug($stoneData['name']);
        } else {
            $stoneData['slug'] = Str::slug($stoneData['slug']);
        }

        // Ensure slug is unique
        $baseSlug = $stoneData['slug'];
        $counter = 1;
        while (Stone::where('slug', $stoneData['slug'])
            ->where('id', '!=', $this->stone?->id)
            ->exists()) {
            $stoneData['slug'] = $baseSlug . '-' . $counter;
            $counter++;
        }

        // Handle image upload via Orchid attachment system
        if (isset($stoneData['image']) && is_numeric($stoneData['image']) && $stoneData['image'] > 0) {
            $attachment = \Orchid\Attachment\Models\Attachment::find($stoneData['image']);
            if ($attachment) {
                // Store only the relative path with extension
                $relativePath = ltrim($attachment->path . $attachment->name . '.' . $attachment->extension, '/');
                $stoneData['image'] = $relativePath;
            }
        } else {
            // If no new image, keep the existing one
            if ($this->stone?->exists) {
                unset($stoneData['image']);
            } else {
                $stoneData['image'] = null;
            }
        }

        $this->stone->fill($stoneData)->save();

        // Attach uploaded image via Orchid attachments
        if ($request->input('stone.image') && is_numeric($request->input('stone.image'))) {
            $this->stone->attachment()->syncWithoutDetaching([$request->input('stone.image')]);
        }

        Alert::success('Stone saved successfully!');
        
        // Refresh the stone to ensure we have the latest data including ID
        $this->stone->refresh();
        
        return redirect()->route('platform.stones.edit', $this->stone->id);
    }

    public function remove()
    {
        // Check if stone is used in any products
        $productCount = $this->stone->products()->count();
        
        if ($productCount > 0) {
            Alert::warning("This stone is used in {$productCount} product(s). Their stone reference will be removed.");
        }

        $this->stone->delete();
        Alert::info('Stone deleted successfully.');
        
        return redirect()->route('platform.stones');
    }
}
