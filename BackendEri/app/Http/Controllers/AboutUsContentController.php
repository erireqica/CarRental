<?php

namespace App\Http\Controllers;

use App\Models\AboutUsContent;
use Illuminate\Http\Request;

class AboutUsContentController extends Controller
{
    public function index()
    {
        // Return the first About Us record
        return AboutUsContent::first();
    }

    public function update(Request $request)
    {
        // Validate all the fields individually
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image_url' => 'nullable|string',

            'journey_1_year' => 'nullable|string',
            'journey_1_event' => 'nullable|string',
            'journey_2_year' => 'nullable|string',
            'journey_2_event' => 'nullable|string',
            'journey_3_year' => 'nullable|string',
            'journey_3_event' => 'nullable|string',

            'team_1_name' => 'nullable|string',
            'team_1_role' => 'nullable|string',
            'team_1_image' => 'nullable|string',
            'team_2_name' => 'nullable|string',
            'team_2_role' => 'nullable|string',
            'team_2_image' => 'nullable|string',
            'team_3_name' => 'nullable|string',
            'team_3_role' => 'nullable|string',
            'team_3_image' => 'nullable|string',
        ]);

        $content = AboutUsContent::first();

        if ($content) {
            $content->update($data);
        } else {
            $content = AboutUsContent::create($data);
        }

        return response()->json(['message' => 'About Us content updated successfully']);
    }
}
