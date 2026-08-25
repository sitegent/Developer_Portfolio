<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            // Branding
            'site_title'          => 'Partho | Full Stack Developer',
            'site_tagline'        => 'Building Digital Experiences',
            'favicon_url'         => '',
            'header_logo_text'    => 'Partho',

            // SEO
            'seo_title'           => 'Partho - Full Stack Developer Portfolio',
            'seo_description'     => 'Full Stack Developer specializing in Laravel, React, and modern web technologies. Available for freelance work.',
            'seo_keywords'        => 'full stack developer, laravel developer, react developer, freelance, web development',
            'og_image_url'        => '',

            // Contact
            'contact_email'       => 'hello@partho.dev',
            'contact_phone'       => '+880 1XXX-XXXXXX',
            'contact_whatsapp'    => '+880 1XXX-XXXXXX',
            'contact_address'     => 'Dhaka, Bangladesh',

            // Social
            'github_url'          => 'https://github.com/',
            'linkedin_url'        => 'https://linkedin.com/in/',
            'twitter_url'         => 'https://twitter.com/',
            'facebook_url'        => 'https://facebook.com/',
            'instagram_url'       => 'https://instagram.com/',
        ];

        foreach ($defaults as $key => $value) {
            Setting::firstOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
