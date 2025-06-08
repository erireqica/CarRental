<?php

namespace App\Http\Controllers;

use App\Models\AboutUsContent;
use Illuminate\Http\Request;

class AboutUsContentController extends Controller
{
    public function index()
    {
        return AboutUsContent::first();
    }

    public function update(Request $request)
    {
        $content = AboutUsContent::first();

        if ($content) {
            $content->update($request->all());
        } else {
            $content = AboutUsContent::create($request->all());
        }

        return response()->json(['message' => 'About Us content updated successfully']);
    }
}
