<?php

namespace App\Http\Controllers;

use App\Models\HomepageContent;
use Illuminate\Http\Request;

class HomepageContentController extends Controller
{
    public function index()
    {
        return response()->json(HomepageContent::all());
    }
}
