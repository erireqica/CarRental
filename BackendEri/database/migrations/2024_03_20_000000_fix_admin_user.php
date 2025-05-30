<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    public function up()
    {
        // Update the admin user's password to be properly hashed
        DB::table('users')
            ->where('email', 'admin@admin.com')
            ->update([
                'password' => Hash::make('admin123'),
                'updated_at' => now()
            ]);
    }

    public function down()
    {
        // Revert to plain text password (not recommended but needed for rollback)
        DB::table('users')
            ->where('email', 'admin@admin.com')
            ->update([
                'password' => 'admin123',
                'updated_at' => now()
            ]);
    }
}; 