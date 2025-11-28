<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingsController extends Controller
{
    /**
     * Get header configuration
     */
    public function getHeader(): JsonResponse
    {
        $headerConfig = SiteSetting::get('header_config', [
            'logo' => '/storage/logo.png',
            'menu_items' => []
        ]);

        return response()->json([
            'success' => true,
            'data' => $headerConfig
        ]);
    }

    /**
     * Get footer configuration
     */
    public function getFooter(): JsonResponse
    {
        $footerConfig = SiteSetting::get('footer_config', [
            'columns' => [],
            'social_links' => [],
            'contact_info' => [],
            'copyright' => '',
            'payment_methods' => []
        ]);

        return response()->json([
            'success' => true,
            'data' => $footerConfig
        ]);
    }

    /**
     * Get all site settings
     */
    public function getAll(): JsonResponse
    {
        $settings = SiteSetting::all()->groupBy('group')->map(function ($group) {
            return $group->pluck('value', 'key');
        });

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Get site info (name, tagline, etc.)
     */
    public function getSiteInfo(): JsonResponse
    {
        $siteInfo = SiteSetting::get('site_info', [
            'site_name' => 'Bhavana Silver Jewellers',
            'tagline' => '',
            'description' => ''
        ]);

        return response()->json([
            'success' => true,
            'data' => $siteInfo
        ]);
    }
}
