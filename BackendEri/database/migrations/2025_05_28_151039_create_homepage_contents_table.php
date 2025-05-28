<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('homepage_contents', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title');
            $table->string('hero_subtitle');
            $table->string('hero_button_text');
            $table->string('hero_background_url');

            $table->string('section1_title');

            $table->string('card1_title');
            $table->string('card1_image');
            $table->string('card1_description');

            $table->string('card2_title');
            $table->string('card2_image');
            $table->string('card2_description');

            $table->string('card3_title');
            $table->string('card3_image');
            $table->string('card3_description');

            $table->string('card4_title');
            $table->string('card4_image');
            $table->string('card4_description');

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('homepage_contents');
    }
};
