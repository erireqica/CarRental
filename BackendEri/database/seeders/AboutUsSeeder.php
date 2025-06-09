<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutUsSeeder extends Seeder
{
    public function run()
    {
        DB::table('about_us_contents')->insert([
            'title' => 'Our Story',
            'description' => 'AutoRent was founded in 2010 with a vision to make car rentals accessible and hassle-free. Over the years, we have expanded our fleet, launched an online booking platform, and embraced sustainability with electric vehicles.',
            'image_url' => 'https://example.com/banner.jpg',

            'journey_1_year' => '2010',
            'journey_1_event' => 'Founded with 20 cars',
            'journey_2_year' => '2016',
            'journey_2_event' => 'Launched online booking platform',
            'journey_3_year' => '2024',
            'journey_3_event' => 'Introduced electric and hybrid vehicles',

            'team_1_name' => 'Alice Johnson',
            'team_1_role' => 'CEO',
            'team_1_image' => 'https://randomuser.me/api/portraits/women/44.jpg',
            'team_2_name' => 'Mark Davis',
            'team_2_role' => 'CTO',
            'team_2_image' => 'https://randomuser.me/api/portraits/men/34.jpg',
            'team_3_name' => 'Sara Lee',
            'team_3_role' => 'Customer Support',
            'team_3_image' => 'https://randomuser.me/api/portraits/women/65.jpg',

            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
