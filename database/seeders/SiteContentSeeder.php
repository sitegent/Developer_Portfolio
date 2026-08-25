<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteContent;

class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            // Profile Sidebar
            'profile_name'          => 'Partho',
            'profile_tagline'       => 'Full Stack Developer',
            'profile_email'         => 'hello@partho.dev',
            'profile_location'      => 'Based in Dhaka, BD',
            'profile_image_url'     => 'https://isak.botble.com/storage/general/avatar.png',
            'profile_available'     => 'true',
            'cv_url'                => '#',

            // Home Page
            'home_greeting'         => "Hey, I'm a",
            'home_role'             => 'Web Developer',
            'home_bio'              => 'I design and build dynamic, high-performance web applications that provide a great user experience. Focused on clean architecture, modern aesthetics, and scalable solutions.',
            'home_years_exp'        => '+3',
            'home_projects'         => '+40',
            'home_clients'          => '+20',
            'home_years_label'      => 'Years of Experience',
            'home_projects_label'   => 'Projects Completed',
            'home_clients_label'    => 'Happy Clients',

            // About Page
            'about_heading'         => 'Every great design begins with an even better story.',
            'about_text'            => 'Hello! I\'m Partho, a passionate full stack developer based in Dhaka, BD. I specialize in backend architecture and frontend aesthetics — building products that are both powerful and beautiful.',
            'about_skills'          => 'PHP, Laravel, MySQL, PostgreSQL, JavaScript, React, Next.js, Inertia.js, Tailwind CSS, Bootstrap, Git, Docker',

            // Works Page
            'works_heading'         => 'Selected Works',
            'works_heading_accent'  => '& Case Studies.',
            'works_subheading'      => 'A showcase of digital experiences, web apps, and platforms built with precision, passion, and purpose.',

            // Contact Page
            'contact_heading'       => "Let's start a project together",
            'contact_subheading'    => 'Open to new projects, collaborations, and exciting ideas. Send me a message!',
        ];

        foreach ($defaults as $key => $value) {
            SiteContent::firstOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
