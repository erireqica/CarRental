<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('homepage_contents', function (Blueprint $table) {
            // Drop unused description columns
            $table->dropColumn(['card1_description', 'card2_description', 'card3_description']);

            // Add full dynamic support for "Why Choose Us" section
            $table->string('card5_title')->nullable();
            $table->string('card5_image')->nullable();
            $table->string('card5_description')->nullable();

            $table->string('card6_title')->nullable();
            $table->string('card6_image')->nullable();
            $table->string('card6_description')->nullable();

            $table->string('card7_title')->nullable();
            $table->string('card7_image')->nullable();
            $table->string('card7_description')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('homepage_contents', function (Blueprint $table) {
            // Restore the removed columns
            $table->string('card1_description')->nullable();
            $table->string('card2_description')->nullable();
            $table->string('card3_description')->nullable();

            // Remove the new ones if rolled back
            $table->dropColumn([
                'card5_title', 'card5_image', 'card5_description',
                'card6_title', 'card6_image', 'card6_description',
                'card7_title', 'card7_image', 'card7_description',
            ]);
        });
    }
};
