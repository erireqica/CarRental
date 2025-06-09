<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('about_us_contents', function (Blueprint $table) {
            $table->id();

            // Basic fields
            $table->string('title');
            $table->text('description');
            $table->string('image_url')->nullable();

            // Journey milestones — fixed number of items
            $table->string('journey_1_year')->nullable();
            $table->string('journey_1_event')->nullable();

            $table->string('journey_2_year')->nullable();
            $table->string('journey_2_event')->nullable();

            $table->string('journey_3_year')->nullable();
            $table->string('journey_3_event')->nullable();

            // Team members — fixed number of items
            $table->string('team_1_name')->nullable();
            $table->string('team_1_role')->nullable();
            $table->string('team_1_image')->nullable();

            $table->string('team_2_name')->nullable();
            $table->string('team_2_role')->nullable();
            $table->string('team_2_image')->nullable();

            $table->string('team_3_name')->nullable();
            $table->string('team_3_role')->nullable();
            $table->string('team_3_image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_us_contents');
    }
};
