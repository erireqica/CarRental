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
        return response()->json(
        Car::with(['brandRef', 'vehicleModel', 'carType',])->get()
    );
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
        'year' => $data['year'] ?? null,  
        'price_per_day' => $data['price_per_day'],
        'available' => $data['available'] ?? true,
        'image_url' => $data['image_url'] ?? null,

        'brand_id' => $data['brand_id'],
        'vehicle_model_id' => $data['vehicle_model_id'],
        'car_type_id' => $data['car_type_id'],
    ]);

    return response()->json([
        'message' => 'Car added successfully',
        'car' => $car->load(['brandRef', 'vehicleModel', 'carType'])
    ], 201);
}

    public function show(Car $car)
    {
        return response()->json(
            $car->load(['brandRef', 'vehicleModel', 'carType'])
        );
    }

    public function update(Request $request, Car $car)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'year' => ['sometimes', 'nullable', 'integer', 'min:1980', 'max:' . (date('Y') + 1)],
            'price_per_day' => ['sometimes', 'numeric', 'min:0'],
            'available' => ['sometimes', 'boolean'],
            'image_url' => ['sometimes', 'nullable', 'string', 'max:2048'],

            'brand_id' => ['sometimes', 'nullable', 'exists:brands,id'],
            'vehicle_model_id' => ['sometimes', 'nullable', 'exists:vehicle_models,id'],
            'car_type_id' => ['sometimes', 'nullable', 'exists:car_types,id'],

            'brand' => ['sometimes', 'nullable', 'string', 'max:255'],
            'type'  => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);

        $finalBrandId = array_key_exists('brand_id', $data) ? $data['brand_id'] : $car->brand_id;
        $finalModelId = array_key_exists('vehicle_model_id', $data) ? $data['vehicle_model_id'] : $car->vehicle_model_id;

        if ($finalBrandId && $finalModelId) {
            $ok = VehicleModel::where('id', $finalModelId)
                ->where('brand_id', $finalBrandId)
                ->exists();

            if (!$ok) {
                return response()->json(['message' => 'Selected model does not belong to selected brand'], 422);
            }
        }

        $car->fill($data);

        if (array_key_exists('brand_id', $data)) {
            $car->brand = $data['brand_id']
                ? Brand::find($data['brand_id'])?->name
                : null;
        }

        if (array_key_exists('car_type_id', $data)) {
            $car->type = $data['car_type_id']
                ? CarType::find($data['car_type_id'])?->name
                : null;
        }

        $car->save();

        return response()->json([
            'message' => 'Car updated successfully',
            'car' => $car->load(['brandRef', 'vehicleModel', 'carType'])
        ]);
    }

    public function destroy(Car $car) { 
        $car->delete(); 
        return response()->json(['message'=> 'Car deleted successfully']); 
    }
}
