<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutUsSeeder extends Seeder
{
    public function run()
    {
        DB::table('about_us_contents')->insert([
            'title' => 'Welcome to Our Company',
            'description' => 'We provide reliable car rentals to make your journeys memorable.',
            'image_url' => 'https://example.com/welcome-image.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
