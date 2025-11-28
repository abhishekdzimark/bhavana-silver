<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Header Settings
        SiteSetting::updateOrCreate(
            ['key' => 'header_config'],
            [
                'value' => [
                    'logo' => '/storage/logo.png',
                    'menu_items' => [
                        [
                            'id' => 1,
                            'label' => 'Home',
                            'url' => '/',
                            'subcategories' => []
                        ],
                        [
                            'id' => 2,
                            'label' => 'Gold Jewelry',
                            'url' => '/category/gold-jewelry',
                            'subcategories' => [
                                ['label' => 'Gold Necklaces', 'url' => '/category/gold-necklaces'],
                                ['label' => 'Gold Rings', 'url' => '/category/gold-rings'],
                                ['label' => 'Gold Bracelets', 'url' => '/category/gold-bracelets'],
                                ['label' => 'Gold Earrings', 'url' => '/category/gold-earrings'],
                            ]
                        ],
                        [
                            'id' => 3,
                            'label' => 'Silver Jewelry',
                            'url' => '/category/silver-jewelry',
                            'subcategories' => [
                                ['label' => 'Silver Necklaces', 'url' => '/category/silver-necklaces'],
                                ['label' => 'Silver Rings', 'url' => '/category/silver-rings'],
                                ['label' => 'Silver Bracelets', 'url' => '/category/silver-bracelets'],
                                ['label' => 'Silver Earrings', 'url' => '/category/silver-earrings'],
                            ]
                        ],
                        [
                            'id' => 4,
                            'label' => 'Diamond Jewelry',
                            'url' => '/category/diamond-jewelry',
                            'subcategories' => [
                                ['label' => 'Diamond Rings', 'url' => '/category/diamond-rings'],
                                ['label' => 'Diamond Pendants', 'url' => '/category/diamond-pendants'],
                            ]
                        ],
                        [
                            'id' => 5,
                            'label' => 'Collections',
                            'url' => '/collections',
                            'subcategories' => [
                                ['label' => 'Bridal Collection', 'url' => '/collections/bridal'],
                                ['label' => 'Traditional Collection', 'url' => '/collections/traditional'],
                                ['label' => 'Contemporary Collection', 'url' => '/collections/contemporary'],
                            ]
                        ],
                        [
                            'id' => 6,
                            'label' => 'About Us',
                            'url' => '/about',
                            'subcategories' => []
                        ],
                        [
                            'id' => 7,
                            'label' => 'Contact',
                            'url' => '/contact',
                            'subcategories' => []
                        ],
                    ]
                ],
                'group' => 'header',
                'type' => 'json',
                'description' => 'Header configuration including logo and menu items'
            ]
        );

        // Footer Settings
        SiteSetting::updateOrCreate(
            ['key' => 'footer_config'],
            [
                'value' => [
                    'columns' => [
                        [
                            'title' => 'About Bhavana Silver',
                            'links' => [
                                ['label' => 'Our Story', 'url' => '/about'],
                                ['label' => 'Craftsmanship', 'url' => '/craftsmanship'],
                                ['label' => 'Quality Assurance', 'url' => '/quality'],
                                ['label' => 'Testimonials', 'url' => '/testimonials'],
                            ]
                        ],
                        [
                            'title' => 'Customer Service',
                            'links' => [
                                ['label' => 'Contact Us', 'url' => '/contact'],
                                ['label' => 'Shipping & Delivery', 'url' => '/shipping'],
                                ['label' => 'Returns & Exchange', 'url' => '/returns'],
                                ['label' => 'Size Guide', 'url' => '/size-guide'],
                                ['label' => 'FAQ', 'url' => '/faq'],
                            ]
                        ],
                        [
                            'title' => 'Shop',
                            'links' => [
                                ['label' => 'Gold Jewelry', 'url' => '/category/gold-jewelry'],
                                ['label' => 'Silver Jewelry', 'url' => '/category/silver-jewelry'],
                                ['label' => 'Diamond Jewelry', 'url' => '/category/diamond-jewelry'],
                                ['label' => 'New Arrivals', 'url' => '/new-arrivals'],
                                ['label' => 'Best Sellers', 'url' => '/best-sellers'],
                            ]
                        ],
                        [
                            'title' => 'Connect With Us',
                            'links' => [
                                ['label' => 'Store Locator', 'url' => '/stores'],
                                ['label' => 'Book Appointment', 'url' => '/appointment'],
                                ['label' => 'Careers', 'url' => '/careers'],
                                ['label' => 'Blog', 'url' => '/blog'],
                            ]
                        ],
                    ],
                    'social_links' => [
                        'facebook' => 'https://facebook.com/bhavanasilver',
                        'instagram' => 'https://instagram.com/bhavanasilver',
                        'twitter' => 'https://twitter.com/bhavanasilver',
                        'pinterest' => 'https://pinterest.com/bhavanasilver',
                        'youtube' => 'https://youtube.com/bhavanasilver',
                    ],
                    'contact_info' => [
                        'phone' => '+91 1234567890',
                        'email' => 'info@bhavanasilver.com',
                        'address' => 'Bhavana Silver Jewellers, Main Street, City, State - 123456',
                    ],
                    'copyright' => '© 2025 Bhavana Silver Jewellers. All rights reserved.',
                    'payment_methods' => ['Visa', 'Mastercard', 'UPI', 'Net Banking', 'COD'],
                ],
                'group' => 'footer',
                'type' => 'json',
                'description' => 'Footer configuration including columns, social links, and contact info'
            ]
        );

        // General Site Settings
        SiteSetting::updateOrCreate(
            ['key' => 'site_info'],
            [
                'value' => [
                    'site_name' => 'Bhavana Silver Jewellers',
                    'tagline' => 'Crafting Elegance Since 1990',
                    'description' => 'Premium handcrafted jewelry in gold, silver, and diamonds',
                ],
                'group' => 'general',
                'type' => 'json',
                'description' => 'General site information'
            ]
        );
    }
}
