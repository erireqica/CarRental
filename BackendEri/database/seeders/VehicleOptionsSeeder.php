<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleOptionsSeeder extends Seeder
{
    public function run(): void
    {
        // Car types
        $types = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Wagon', 'Convertible', 'Van', 'Sports'];
        foreach ($types as $t) {
            DB::table('car_types')->updateOrInsert(['name' => $t], ['name' => $t]);
        }

        // Brands + Models
        $data = [
            'BMW' => ['1 Series', '3 Series', '5 Series', 'X1', 'X3', 'X5'],
            'Mercedes-Benz' => ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC', 'GLE'],
            'Audi' => ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
            'Volkswagen' => ['Golf', 'Passat', 'Polo', 'Tiguan', 'Touareg'],
            'Toyota' => ['Corolla', 'Yaris', 'Camry', 'RAV4', 'Land Cruiser'],
            'Ford' => ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Explorer', 'Mustang'],
            'Honda' => ['Civic', 'CR-V'],
            'Porsche' => ['911', 'Cayenne', 'Macan'],
        ];

        foreach ($data as $brandName => $models) {
            DB::table('brands')->updateOrInsert(['name' => $brandName], ['name' => $brandName]);

            $brandId = DB::table('brands')->where('name', $brandName)->value('id');

            foreach ($models as $m) {
                DB::table('vehicle_models')->updateOrInsert(
                    ['brand_id' => $brandId, 'name' => $m],
                    ['brand_id' => $brandId, 'name' => $m]
                );
            }
        }
    }
}
