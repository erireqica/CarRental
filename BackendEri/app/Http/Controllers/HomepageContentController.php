<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HomepageContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomepageContentController extends Controller
{

    public function update(Request $request): JsonResponse
    {
        $content = HomepageContent::first();

        if (!$content) {
            return response()->json(['error' => 'Content not found'], 404);
        }

        $content->update($request->all());

        return response()->json(['message' => 'Homepage content updated successfully']);
    }

    public function index(): JsonResponse
    {
        return response()->json(HomepageContent::first());
    }

    public function seed(): JsonResponse
    {
        if (HomepageContent::exists()) {
            return response()->json(['message' => 'Homepage content already exists.'], 400);
        }

        HomepageContent::create([
            'hero_title' => 'Find Your Perfect Ride with AutoRent',
            'hero_subtitle' => 'Affordable, reliable, and ready when you are.',
            'hero_button_text' => 'Browse Cars',
            'hero_background_url' => 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',

            'section1_title' => 'Something for Everyone',

            'card1_title' => 'SUVs for Family Adventures',
            'card1_image' => 'https://www.kbb.com/wp-content/uploads/2024/01/2024-chevrolet-traverse-rs-red-front-left-3qtr.jpg?w=757',

            'card2_title' => 'Sedans for City Cruising',
            'card2_image' => 'https://www.usnews.com/object/image/00000190-bd16-dc6b-a395-fd9782870000/2025-honda-civic-sedan-sport-hybrid.jpg?update-time=1721159286933&size=responsive640',

            'card3_title' => 'Hatchbacks for Everyday Drives',
            'card3_image' => 'https://www.vw.com/content/dam/onehub_pkw/importers/us/en/showrooms/golf-gti/2024/golf-gti-380-mood-gallery/VW_NGW6_Showroom_GTI_380_MoodGallery-3.jpg',

            'card1_type' => 'SUV',
            'card2_type' => 'Sedan',
            'card3_type' => 'Hatchback',
            
            'card4_title' => 'Reliable Vehicles',
            'card4_image' => 'https://img.icons8.com/ios-filled/100/4a90e2/car--v1.png',
            'card4_description' => 'We offer top-notch, well-maintained cars for all your needs.',

            'card5_title' => 'Affordable Rates',
            'card5_image' => 'https://img.icons8.com/ios-filled/100/4a90e2/discount--v1.png',
            'card5_description' => 'Enjoy great deals and competitive pricing on all rentals.',

            'card6_title' => '24/7 Availability',
            'card6_image' => 'https://img.icons8.com/ios-filled/100/4a90e2/clock.png',
            'card6_description' => 'We are available on your time. Rent whenever it suits you!',

            'card7_title' => 'Easy Booking',
            'card7_image' => 'https://img.icons8.com/ios-filled/100/4a90e2/thumb-up.png',
            'card7_description' => 'Simple and fast booking process at your fingertips.',
        ]);

        return response()->json(['message' => 'Homepage content seeded successfully.']);
    }
}
