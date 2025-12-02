<?php

namespace App\Orchid\Screens\SiteSettings;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Fields\Switcher;
use Orchid\Screen\Fields\Cropper;
use Orchid\Screen\Fields\Matrix;
use Orchid\Support\Facades\Layout;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Alert;

class HeaderSettingsScreen extends Screen
{
    /**
     * Query data for the screen
     */
    public function query(): iterable
    {
        $headerConfig = SiteSetting::get('header_config', [
            'logo' => '/storage/logo.png',
            'site_name' => 'Bhavana Silver Jewellers',
            'contact' => [
                'phone' => '',
                'email' => '',
            ],
            'menu_items' => [],
            'cta_button' => [
                'text' => 'Shop Now',
                'url' => '/products',
                'visible' => true,
            ],
            'social_links' => [
                'facebook' => '',
                'instagram' => '',
                'twitter' => '',
                'pinterest' => '',
            ],
        ]);

        return [
            'header' => $headerConfig,
        ];
    }

    /**
     * Screen name
     */
    public function name(): ?string
    {
        return 'Header Settings';
    }

    /**
     * Screen description
     */
    public function description(): ?string
    {
        return 'Manage website header, logo, navigation menu, and contact information';
    }

    /**
     * Command bar buttons
     */
    public function commandBar(): iterable
    {
        return [
            Button::make('Save Settings')
                ->icon('bs.save')
                ->method('save')
                ->type(\Orchid\Support\Color::SUCCESS),
        ];
    }

    /**
     * Screen layout
     */
    public function layout(): iterable
    {
        return [
            Layout::tabs([
                'General' => [
                    Layout::rows([
                        Input::make('header.site_name')
                            ->title('Site Name')
                            ->placeholder('Bhavana Silver Jewellers')
                            ->help('The name of your website displayed in the header'),

                        Cropper::make('header.logo')
                            ->title('Header Logo')
                            ->width(300)
                            ->height(100)
                            ->targetRelativeUrl()
                            ->help('Upload your logo (recommended size: 300x100px)'),
                    ]),
                ],

                'Contact Information' => [
                    Layout::rows([
                        Input::make('header.contact.phone')
                            ->title('Phone Number')
                            ->placeholder('+1 (234) 567-8900')
                            ->help('Phone number displayed in header'),

                        Input::make('header.contact.email')
                            ->title('Email Address')
                            ->type('email')
                            ->placeholder('info@bhavanasilver.com')
                            ->help('Email address displayed in header'),
                    ]),
                ],

                'Navigation Menu' => [
                    Layout::rows([
                        Matrix::make('header.menu_items')
                            ->title('Menu Items')
                            ->columns([
                                'Label' => 'label',
                                'URL' => 'url',
                                'Order' => 'order',
                            ])
                            ->fields([
                                'label' => Input::make()
                                    ->placeholder('Home'),
                                'url' => Input::make()
                                    ->placeholder('/'),
                                'order' => Input::make()
                                    ->type('number')
                                    ->value(0),
                            ])
                            ->help('Add navigation menu items. Items will be sorted by order number.'),
                    ]),
                ],

                'Call-to-Action Button' => [
                    Layout::rows([
                        Switcher::make('header.cta_button.visible')
                            ->title('Show CTA Button')
                            ->sendTrueOrFalse()
                            ->help('Toggle visibility of the call-to-action button'),

                        Input::make('header.cta_button.text')
                            ->title('Button Text')
                            ->placeholder('Shop Now')
                            ->help('Text displayed on the CTA button'),

                        Input::make('header.cta_button.url')
                            ->title('Button URL')
                            ->placeholder('/products')
                            ->help('Link destination when button is clicked'),
                    ]),
                ],

                'Social Media' => [
                    Layout::rows([
                        Input::make('header.social_links.facebook')
                            ->title('Facebook URL')
                            ->placeholder('https://facebook.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('header.social_links.instagram')
                            ->title('Instagram URL')
                            ->placeholder('https://instagram.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('header.social_links.twitter')
                            ->title('Twitter URL')
                            ->placeholder('https://twitter.com/bhavanasilver')
                            ->help('Leave empty to hide'),

                        Input::make('header.social_links.pinterest')
                            ->title('Pinterest URL')
                            ->placeholder('https://pinterest.com/bhavanasilver')
                            ->help('Leave empty to hide'),
                    ]),
                ],
            ]),
        ];
    }

    /**
     * Save header settings
     */
    public function save(Request $request): void
    {
        $headerData = $request->input('header');

        // Ensure menu items are properly formatted
        if (isset($headerData['menu_items']) && is_array($headerData['menu_items'])) {
            // Filter out empty rows
            $headerData['menu_items'] = array_filter($headerData['menu_items'], function ($item) {
                return !empty($item['label']) && !empty($item['url']);
            });

            // Sort by order
            usort($headerData['menu_items'], function ($a, $b) {
                $orderA = isset($a['order']) ? (int)$a['order'] : 0;
                $orderB = isset($b['order']) ? (int)$b['order'] : 0;
                return $orderA - $orderB;
            });

            // Re-index array
            $headerData['menu_items'] = array_values($headerData['menu_items']);
        }

        // Save to database
        SiteSetting::set('header_config', $headerData, 'header', 'json');

        Alert::success('Header settings saved successfully!');
    }
}
