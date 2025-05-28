<?php

namespace App\Http\Controllers;

use App\Models\HomepageContent;

class HomepageContentController extends Controller
{
    public function index()
    {
        return response()->json(HomepageContent::first());
    }
}

