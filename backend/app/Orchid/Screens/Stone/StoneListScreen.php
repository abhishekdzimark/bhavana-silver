<?php

namespace App\Orchid\Screens\Stone;

use App\Models\Stone;
use Orchid\Screen\Actions\Link;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\TD;

class StoneListScreen extends Screen
{
    /**
     * Query data.
     */
    public function query(): iterable
    {
        return [
            'stones' => Stone::filters()
                ->defaultSort('created_at', 'desc')
                ->paginate(15),
        ];
    }

    /**
     * Display header name.
     */
    public function name(): ?string
    {
        return 'Stones';
    }

    /**
     * Display header description.
     */
    public function description(): ?string
    {
        return 'Manage gemstones and materials used in products';
    }

    /**
     * Button commands.
     */
    public function commandBar(): iterable
    {
        return [
            Link::make('Create Stone')
                ->icon('bs.plus-circle')
                ->route('platform.stones.create'),
        ];
    }

    /**
     * Views.
     */
    public function layout(): iterable
    {
        return [
            Layout::table('stones', [
                TD::make('image', 'Image')
                    ->render(function (Stone $stone) {
                        if ($stone->image) {
                            return "<img src='" . asset('storage/' . $stone->image) . "' style='width: 50px; height: 50px; object-fit: cover; border-radius: 4px;' />";
                        }
                        return '<span class="text-muted">No image</span>';
                    }),

                TD::make('name', 'Name')
                    ->sort()
                    ->filter(TD::FILTER_TEXT)
                    ->render(function (Stone $stone) {
                        return Link::make($stone->name)
                            ->route('platform.stones.edit', $stone);
                    }),

                TD::make('slug', 'Slug')
                    ->render(function (Stone $stone) {
                        return '<code>' . $stone->slug . '</code>';
                    }),

                TD::make('description', 'Description')
                    ->render(function (Stone $stone) {
                        return $stone->description 
                            ? \Illuminate\Support\Str::limit($stone->description, 50)
                            : '<span class="text-muted">No description</span>';
                    }),

                TD::make('products_count', 'Products')
                    ->render(function (Stone $stone) {
                        $count = $stone->products()->count();
                        return $count > 0 
                            ? "<span class='badge bg-primary'>{$count}</span>"
                            : "<span class='text-muted'>0</span>";
                    }),

                TD::make('created_at', 'Created')
                    ->sort()
                    ->render(function (Stone $stone) {
                        return $stone->created_at?->format('M d, Y');
                    }),

                TD::make('actions', 'Actions')
                    ->align(TD::ALIGN_RIGHT)
                    ->render(function (Stone $stone) {
                        return Link::make('Edit')
                            ->icon('bs.pencil')
                            ->route('platform.stones.edit', $stone);
                    }),
            ]),
        ];
    }
}
