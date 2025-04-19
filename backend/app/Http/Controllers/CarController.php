<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(\App\Models\Car::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $car = new \App\Models\Car();
        $car->name=$request->name;
        $car->brand=$request->brand;
        $car->type=$request->type;
        $car->price_per_day = $request->price_per_day;
        $car->available=$request->available ?? true;
        $car->save();

        return response()->json(['message' => 'Car added successfully', 'car' => $car]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        return response()->json($car);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        $car->name= $request->name ?? $car->name;
        $car->brand = $request->brand ?? $car->brand;
        $car->type = $request->type ?? $car->type;
        $car->price_per_day = $request->price_per_day ?? $car->price_per_day;
        $car->available=$request->available ?? $car->available;

        $car->save();

        return response()->json(['message'=>'Car updated successfully','car'=>$car]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        $car->delete();

        return response()->json(['message'=> 'Car deleted successfully']);
    }
}
