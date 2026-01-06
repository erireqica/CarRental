<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\VehicleModel;
use App\Models\Brand;
use App\Models\CarType;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        return response()->json(Car::all());
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'name' => ['nullable', 'string', 'max:255'],
        'year' => ['required', 'integer', 'min:1980', 'max:' . (date('Y') + 1)],
        'price_per_day' => ['required', 'numeric', 'min:0'],
        'available' => ['nullable', 'boolean'],
        'image_url' => ['nullable', 'string', 'max:2048'],

        'brand_id' => ['required', 'exists:brands,id'],
        'vehicle_model_id' => ['required', 'exists:vehicle_models,id'],
        'car_type_id' => ['required', 'exists:car_types,id'],
    ]);

    $ok = VehicleModel::where('id', $data['vehicle_model_id'])
        ->where('brand_id', $data['brand_id'])
        ->exists();

    if (!$ok) {
        return response()->json(['message' => 'Selected model does not belong to selected brand'], 422);
    }

    $brandName = Brand::find($data['brand_id'])->name;
    $typeName  = CarType::find($data['car_type_id'])->name;

    $car = Car::create([
        'name' => $data['name'],
        'brand' => $brandName,    
        'type' => $typeName,      
        'price_per_day' => $data['price_per_day'],
        'available' => $data['available'] ?? true,
        'image_url' => $data['image_url'] ?? null,

        'brand_id' => $data['brand_id'],
        'vehicle_model_id' => $data['vehicle_model_id'],
        'car_type_id' => $data['car_type_id'],
    ]);

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
