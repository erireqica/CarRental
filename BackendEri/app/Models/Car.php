<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'type',
        'year',
        'price_per_day',
        'available',
        'image_url',

        'brand_id',
        'vehicle_model_id',
        'car_type_id',
    ];

    

    public function brandRef()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function vehicleModel()
    {
        return $this->belongsTo(VehicleModel::class, 'vehicle_model_id');
    }

    public function carType()
    {
        return $this->belongsTo(CarType::class, 'car_type_id');
    }
}
