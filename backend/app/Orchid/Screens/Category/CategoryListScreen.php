<?php

namespace App\Orchid\Screens\Category;

use App\Models\Category;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;
use Illuminate\Http\Request;
use Orchid\Support\Facades\Toast;

class CategoryListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'categories' => Category::with(['parent', 'children'])
                ->filters()
                ->defaultSort('order', 'asc')
                ->defaultSort('created_at', 'desc')
                ->paginate(50),
        ];
    }

    public function name(): ?string
    {
        return 'Categories';
    }

    public function description(): ?string
    {
        return 'Manage product categories with hierarchical structure';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Create Category')
                ->icon('bs.plus')
                ->route('platform.categories.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('categories', [
                TD::make('name', 'Name')
                    ->sort()
                    ->filter(TD::FILTER_TEXT)
                    ->render(function (Category $category) {
                        // Add indentation based on level
                        $indent = str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;', $category->level);
                        $icon = match($category->level) {
                            0 => '📁',
                            1 => '📂',
                            2 => '📄',
                            default => '•',
                        };
                        
                        return $indent . $icon . ' ' . e($category->name);
                    }),

                TD::make('slug', 'Slug')
                    ->render(fn(Category $c) => '<code>' . e($c->slug) . '</code>'),

                TD::make('level', 'Level')
                    ->sort()
                    ->render(function(Category $c) {
                        $colors = [
                            0 => '#1976d2',  // Blue for parent
                            1 => '#388e3c',  // Green for sub
                            2 => '#f57c00',  // Orange for child
                        ];
                        $color = $colors[$c->level] ?? '#666';
                        return "<span style='background: {$color}20; color: {$color}; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;'>{$c->level_name}</span>";
                    }),

                TD::make('parent.name', 'Parent Category')
                    ->render(fn(Category $c) => $c->parent ? e($c->parent->name) : '<span style="color: #999;">—</span>'),

                TD::make('products_count', 'Products')
                    ->render(fn(Category $c) => $c->products()->count()),

                TD::make('is_active', 'Status')
                    ->sort()
                    ->render(function(Category $c) {
                        if ($c->is_active) {
                            return "<span style='background: #4caf5020; color: #4caf50; padding: 4px 8px; border-radius: 4px; font-size: 12px;'>Active</span>";
                        }
                        return "<span style='background: #f4433620; color: #f44336; padding: 4px 8px; border-radius: 4px; font-size: 12px;'>Inactive</span>";
                    }),

                TD::make('created_at', 'Created')
                    ->render(fn(Category $c) => $c->created_at?->format('Y-m-d H:i'))
                    ->sort(),

                TD::make(__('Actions'))
                    ->alignRight()
                    ->render(function (Category $c) {
                        return Link::make('Edit')
                            ->icon('bs.pencil')
                            ->route('platform.categories.edit', $c)
                            . ' ' .
                            Button::make('Delete')
                            ->icon('bs.trash')
                            ->confirm('Are you sure you want to delete this category?')
                            ->method('remove')
                            ->parameters(['id' => $c->id]);
                    }),
            ]),
        ];
    }

    public function remove(Request $request): void
    {
        $category = Category::findOrFail($request->get('id'));
        
        // Check if category has children
        if ($category->children()->count() > 0) {
            Toast::error('Cannot delete category with sub-categories. Delete children first.');
            return;
        }
        
        // Check if category has products
        if ($category->products()->count() > 0) {
            Toast::warning('Category has ' . $category->products()->count() . ' products. Their category will be set to null.');
        }
        
        $category->delete();
        Toast::info('Category deleted successfully.');
    }
}
