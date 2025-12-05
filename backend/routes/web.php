<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

Route::get('/', function () {
    return view('welcome');
});

// API Routes for Site Settings
Route::prefix('api/v1')->group(function () {
    Route::get('/site-settings/header', [SiteSettingsController::class, 'getHeader']);
    Route::get('/site-settings/footer', [SiteSettingsController::class, 'getFooter']);
    Route::get('/site-settings/all', [SiteSettingsController::class, 'getAll']);
    Route::get('/site-settings/info', [SiteSettingsController::class, 'getSiteInfo']);
    
    // Product API Routes
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/slug/{slug}', [ProductController::class, 'showBySlug']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    
    // Category API Routes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
});
