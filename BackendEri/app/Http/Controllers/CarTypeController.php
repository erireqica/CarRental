<?php

namespace App\Http\Controllers;

use App\Models\CarType;

class CarTypeController extends Controller
{
    public function index()
    {
        return response()->json(CarType::orderBy('name')->get());
    }
}
