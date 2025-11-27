<?php

namespace App\Orchid\Screens\Product;

use App\Models\Product;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Screen;
use Orchid\Screen\TD;
use Orchid\Support\Facades\Layout;
use Illuminate\Support\Facades\Storage;
use Orchid\Support\Facades\Toast;
use Illuminate\Http\Request;

class ProductListScreen extends Screen
{
    public function query(): iterable
    {
        return [
            'products' => Product::with(['stone', 'category'])
                ->filters()
                ->defaultSort('created_at','desc')
                ->paginate(20),
        ];
    }

    public function name(): ?string
    {
        return 'Products';
    }

    public function description(): ?string
    {
        return 'Manage products';
    }

    public function commandBar(): iterable
    {
        return [
            Link::make('Create')
                ->icon('bs.plus')
                ->route('platform.products.create'),
        ];
    }

    public function layout(): iterable
    {
        return [
            Layout::table('products', [
                TD::make('image', 'Image')
                    ->width('80px')
                    ->render(function (Product $p) {
                        if ($p->image) {
                            $imageUrl = Storage::disk('public')->url($p->image);
                            return "<img src='{$imageUrl}' alt='{$p->name}' style='width: 60px; height: 60px; object-fit: cover; border-radius: 4px;'>";
                        }
                        return '<span style="color: #999;">No image</span>';
                    }),
                TD::make('code','Code')->sort()->filter(TD::FILTER_TEXT),
                TD::make('name','Name')->sort()->filter(TD::FILTER_TEXT),
                TD::make('price','Price')->sort()->render(fn(Product $p) => $p->price ? '₹' . number_format($p->price, 2) : '-'),
                TD::make('category.name','Category')
                    ->sort()
                    ->filter(TD::FILTER_TEXT)
                    ->render(fn(Product $p) => $p->category ? 
                        "<span style='background: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 4px; font-size: 12px;'>" . e($p->category->full_path) . "</span>" : 
                        '<span style="color: #999;">—</span>'),
                TD::make('stone.name','Stone')
                    ->sort()
                    ->filter(TD::FILTER_TEXT)
                    ->render(function(Product $p) {
                        if (!$p->stone) {
                            return '<span style="color: #999;">-</span>';
                        }
                        
                        $stoneName = e($p->stone->name);
                        $properties = $p->stone->properties;
                        
                        $html = "<div style='display: flex; flex-direction: column; gap: 4px;'>";
                        $html .= "<span style='background: #f3e5f5; color: #7b1fa2; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;'>{$stoneName}</span>";
                        
                        // Display stone properties below the name
                        if ($properties && is_array($properties) && count($properties) > 0) {
                            $html .= "<div style='font-size: 11px; color: #666; padding-left: 4px;'>";
                            foreach ($properties as $key => $value) {
                                $html .= "<div style='margin: 2px 0;'><strong>" . e(ucfirst($key)) . ":</strong> " . e($value) . "</div>";
                            }
                            $html .= "</div>";
                        }
                        
                        $html .= "</div>";
                        return $html;
                    }),
                TD::make('created_at','Created')->render(fn(Product $p) => $p->created_at?->format('Y-m-d H:i'))->sort(),
                TD::make('updated_at','Updated')->render(fn(Product $p) => $p->updated_at?->format('Y-m-d H:i'))->sort(),
                TD::make(__('Actions'))
                    ->alignRight()
                    ->render(function (Product $p) {
                        return Link::make('Edit')
                            ->icon('bs.pencil')
                            ->route('platform.products.edit', $p)
                            . ' ' .
                            Button::make('Delete')
                            ->icon('bs.trash')
                            ->confirm('Are you sure you want to delete this product?')
                            ->method('remove')
                            ->parameters(['id' => $p->id]);
                    }),
            ]),
        ];
    }

    public function remove(Request $request)
    {
        $product = Product::findOrFail($request->get('id'));
        $product->delete();
        
        Toast::info('Product deleted successfully.');
    }
}
