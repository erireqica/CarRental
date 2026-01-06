<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->foreignId('brand_id')->nullable()->after('brand')->constrained('brands')->nullOnDelete();
            $table->foreignId('vehicle_model_id')->nullable()->after('brand_id')->constrained('vehicle_models')->nullOnDelete();
            $table->foreignId('car_type_id')->nullable()->after('type')->constrained('car_types')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropConstrainedForeignId('brand_id');
            $table->dropConstrainedForeignId('vehicle_model_id');
            $table->dropConstrainedForeignId('car_type_id');
        });
    }
};
