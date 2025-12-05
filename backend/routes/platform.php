<?php

declare(strict_types=1);

// Removed example screen imports
use App\Orchid\Screens\PlatformScreen;
use App\Orchid\Screens\Role\RoleEditScreen;
use App\Orchid\Screens\Role\RoleListScreen;
use App\Orchid\Screens\Product\ProductEditScreen;
use App\Orchid\Screens\Product\ProductListScreen;
use App\Orchid\Screens\Category\CategoryEditScreen;
use App\Orchid\Screens\Category\CategoryListScreen;
use App\Orchid\Screens\User\UserEditScreen;
use App\Orchid\Screens\User\UserListScreen;
use App\Orchid\Screens\User\UserProfileScreen;
use App\Orchid\Screens\SiteSettings\HeaderSettingsScreen;
use App\Orchid\Screens\SiteSettings\FooterSettingsScreen;
use App\Orchid\Screens\Stone\StoneEditScreen;
use App\Orchid\Screens\Stone\StoneListScreen;
use Illuminate\Support\Facades\Route;
use Tabuna\Breadcrumbs\Trail;

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the need "dashboard" middleware group. Now create something great!
|
*/

// Main
Route::screen('/main', PlatformScreen::class)
    ->name('platform.main');

// Platform > Profile
Route::screen('profile', UserProfileScreen::class)
    ->name('platform.profile')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Profile'), route('platform.profile')));

// Platform > System > Users > User
Route::screen('users/{user}/edit', UserEditScreen::class)
    ->name('platform.systems.users.edit')
    ->breadcrumbs(fn (Trail $trail, $user) => $trail
        ->parent('platform.systems.users')
        ->push($user->name, route('platform.systems.users.edit', $user)));

// Platform > System > Users > Create
Route::screen('users/create', UserEditScreen::class)
    ->name('platform.systems.users.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.systems.users')
        ->push(__('Create'), route('platform.systems.users.create')));

// Platform > System > Users
Route::screen('users', UserListScreen::class)
    ->name('platform.systems.users')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Users'), route('platform.systems.users')));

// Platform > System > Roles > Role
Route::screen('roles/{role}/edit', RoleEditScreen::class)
    ->name('platform.systems.roles.edit')
    ->breadcrumbs(fn (Trail $trail, $role) => $trail
        ->parent('platform.systems.roles')
        ->push($role->name, route('platform.systems.roles.edit', $role)));

// Platform > System > Roles > Create
Route::screen('roles/create', RoleEditScreen::class)
    ->name('platform.systems.roles.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.systems.roles')
        ->push(__('Create'), route('platform.systems.roles.create')));

// Platform > System > Roles
Route::screen('roles', RoleListScreen::class)
    ->name('platform.systems.roles')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push(__('Roles'), route('platform.systems.roles')));

// Example routes removed

// Products
Route::screen('products', ProductListScreen::class)
    ->name('platform.products');

Route::screen('products/create', ProductEditScreen::class)
    ->name('platform.products.create');

Route::screen('products/{product}/edit', ProductEditScreen::class)
    ->name('platform.products.edit');

// Categories
Route::screen('categories', CategoryListScreen::class)
    ->name('platform.categories')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Categories', route('platform.categories')));

Route::screen('categories/create', CategoryEditScreen::class)
    ->name('platform.categories.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.categories')
        ->push('Create', route('platform.categories.create')));

Route::screen('categories/{category}/edit', CategoryEditScreen::class)
    ->name('platform.categories.edit')
    ->breadcrumbs(fn (Trail $trail, $category) => $trail
        ->parent('platform.categories')
        ->push($category->name, route('platform.categories.edit', $category)));

// Stones
Route::screen('stones', StoneListScreen::class)
    ->name('platform.stones')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Stones', route('platform.stones')));

Route::screen('stones/create', StoneEditScreen::class)
    ->name('platform.stones.create')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.stones')
        ->push('Create', route('platform.stones.create')));

Route::screen('stones/{stone}/edit', StoneEditScreen::class)
    ->name('platform.stones.edit')
    ->breadcrumbs(fn (Trail $trail, $stone) => $trail
        ->parent('platform.stones')
        ->push($stone->name, route('platform.stones.edit', $stone)));

// Site Settings
Route::screen('settings/header', HeaderSettingsScreen::class)
    ->name('platform.settings.header')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Header Settings', route('platform.settings.header')));

Route::screen('settings/footer', FooterSettingsScreen::class)
    ->name('platform.settings.footer')
    ->breadcrumbs(fn (Trail $trail) => $trail
        ->parent('platform.index')
        ->push('Footer Settings', route('platform.settings.footer')));

// Route::screen('idea', Idea::class, 'platform.screens.idea');
