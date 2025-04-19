<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(15)->create();

        // User::factory()->create([
        //     'name' => 'mounjib mouad',
        //     'email' => 'mouad@example.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('password123'),
        //     'remember_token' => Str::random(10),
        //     'ssiap_level' => 3,
        //     'phone_number' => '0728272625',
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
    }
}
