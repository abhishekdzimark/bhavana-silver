<?php

declare(strict_types=1);

namespace App\Orchid;

use Orchid\Platform\Dashboard;
use Orchid\Platform\ItemPermission;
use Orchid\Platform\OrchidServiceProvider;
use Orchid\Screen\Actions\Menu;
use Orchid\Support\Color;

class PlatformProvider extends OrchidServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @param Dashboard $dashboard
     *
     * @return void
     */
    public function boot(Dashboard $dashboard): void
    {
        parent::boot($dashboard);

        // ...
    }

    /**
     * Register the application menu.
     *
     * @return Menu[]
     */
    public function menu(): array
    {
        return [
            Menu::make('Products')
                ->icon('bs.bag')
                ->route('platform.products')
                ->title('Catalog')
                ->badge(fn () => '▼', Color::WARNING)
                ->list([
                    Menu::make('All Products')
                        ->icon('bs.list')
                        ->route('platform.products'),
                    
                    Menu::make('Categories')
                        ->icon('bs.folder')
                        ->route('platform.categories'),

                    Menu::make('Stones')
                        ->icon('bs.gem')
                        ->route('platform.stones'),
                ]),

            Menu::make(__('Users'))
                ->icon('bs.people')
                ->route('platform.systems.users')
                ->permission('platform.systems.users')
                ->title(__('Access Controls')),

            Menu::make(__('Roles'))
                ->icon('bs.shield')
                ->route('platform.systems.roles')
                ->permission('platform.systems.roles')
                ->divider(),

            Menu::make('Site Settings')
                ->icon('bs.gear')
                ->title('Configuration')
                ->list([
                    Menu::make('Header Settings')
                        ->icon('bs.menu-up')
                        ->route('platform.settings.header'),
                    
                    Menu::make('Footer Settings')
                        ->icon('bs.menu-down')
                        ->route('platform.settings.footer'),
                ]),

            
        ];
    }

    /**
     * Register permissions for the application.
     *
     * @return ItemPermission[]
     */
    public function permissions(): array
    {
        return [
            ItemPermission::group(__('System'))
                ->addPermission('platform.systems.roles', __('Roles'))
                ->addPermission('platform.systems.users', __('Users')),
        ];
    }
}
