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
            'BMW' => ['1 Series','2 Series','3 Series','4 Series','5 Series','7 Series','X1','X2','X3','X4','X5','X6'],
            'Mercedes-Benz' => ['A-Class','B-Class','C-Class','E-Class','S-Class','GLA','GLB','GLC','GLE','GLS'],
            'Audi' => ['A1','A3','A4','A5','A6','A7','A8','Q2','Q3','Q5','Q7','Q8'],
            'Volkswagen' => ['Golf','Passat','Polo','Tiguan','Touareg','T-Roc','Arteon'],
            'Toyota' => ['Corolla','Yaris','Camry','Prius','RAV4','C-HR','Highlander','Land Cruiser'],
            'Ford' => ['Fiesta','Focus','Mondeo','Kuga','Puma','Explorer','Mustang'],
            'Honda' => ['Civic','Accord','CR-V','HR-V'],
            'Porsche' => ['911','Cayenne','Macan','Panamera','Taycan'],

            'Hyundai' => ['i10','i20','i30','Elantra','Tucson','Santa Fe','Kona'],
            'Kia' => ['Picanto','Rio','Ceed','Sportage','Sorento','Stonic'],
            'Nissan' => ['Micra','Juke','Qashqai','X-Trail','Leaf'],
            'Mazda' => ['Mazda2','Mazda3','Mazda6','CX-3','CX-5','CX-60'],
            'Subaru' => ['Impreza','Legacy','Forester','Outback','XV'],
            'Mitsubishi' => ['ASX','Outlander','Eclipse Cross','L200'],

            'Renault' => ['Clio','Megane','Captur','Kadjar','Austral'],
            'Peugeot' => ['208','308','508','2008','3008','5008'],
            'Citroën' => ['C3','C4','C5 Aircross','Berlingo'],
            'Opel' => ['Corsa','Astra','Insignia','Mokka','Grandland'],
            'Skoda' => ['Fabia','Octavia','Superb','Kamiq','Karoq','Kodiaq'],
            'SEAT' => ['Ibiza','Leon','Arona','Ateca','Tarraco'],
            'Dacia' => ['Sandero','Duster','Jogger','Logan'],
            'Fiat' => ['500','Panda','Tipo','500X'],
            'Alfa Romeo' => ['Giulia','Stelvio','Tonale'],

            'Volvo' => ['S60','S90','V60','V90','XC40','XC60','XC90'],
            'Jaguar' => ['XE','XF','F-Pace','E-Pace','I-Pace'],
            'Land Rover' => ['Range Rover Evoque','Range Rover Sport','Discovery','Defender'],
            'Mini' => ['Cooper','Countryman','Clubman'],
            'Tesla' => ['Model 3','Model S','Model X','Model Y'],

            'Chevrolet' => ['Spark','Cruze','Malibu','Equinox','Tahoe'],
            'Jeep' => ['Renegade','Compass','Cherokee','Grand Cherokee','Wrangler'],
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
