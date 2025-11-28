<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SiteSettingsController;

Route::get('/', function () {
    return view('welcome');
});

// API Routes for Site Settings
Route::prefix('api/v1')->group(function () {
    Route::get('/site-settings/header', [SiteSettingsController::class, 'getHeader']);
    Route::get('/site-settings/footer', [SiteSettingsController::class, 'getFooter']);
    Route::get('/site-settings/all', [SiteSettingsController::class, 'getAll']);
    Route::get('/site-settings/info', [SiteSettingsController::class, 'getSiteInfo']);
});
