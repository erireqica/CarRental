<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json(Brand::orderBy('name')->get());
    }

    public function models(Brand $brand)
    {
        return response()->json($brand->vehicleModels()->orderBy('name')->get());
    }
}
