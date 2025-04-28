<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        return response()->json(Car::all());
    }

    public function store(Request $request)
    {
        $car = new Car();
        $car->name = $request->name;
        $car->brand = $request->brand;
        $car->type = $request->type;
        $car->price_per_day = $request->price_per_day;
        $car->available = $request->available ?? true;
        $car->image_url = $request->image_url; 
        $car->save();

        return response()->json(['message' => 'Car added successfully', 'car' => $car]);
    }

    public function show(Car $car)
    {
        return response()->json($car);
    }

    public function update(Request $request, Car $car)
    {
        $car->name= $request->name ?? $car->name;
        $car->brand = $request->brand ?? $car->brand;
        $car->type = $request->type ?? $car->type;
        $car->price_per_day = $request->price_per_day ?? $car->price_per_day;
        $car->available=$request->available ?? $car->available;
        $car->image_url = $request->image_url ?? $car->image_url;

        $car->save();

        return response()->json(['message'=>'Car updated successfully','car'=>$car]);
    }

    public function destroy(Car $car)
    {
        $car->delete();

        return response()->json(['message'=> 'Car deleted successfully']);
    }
}
