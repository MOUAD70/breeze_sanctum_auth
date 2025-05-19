<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $today = Carbon::today();

        // Yesterday's date
        $yesterday = Carbon::yesterday();

        // Two days ago
        $twoDaysAgo = Carbon::today()->subDays(2);

        DB::table('attendances')->insert([
            // Roslyn's attendance
            ['employee_id' => 3, 'shift_id' => 1, 'date' => $today->format('Y-m-d'), 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
            ['employee_id' => 3, 'shift_id' => 1, 'date' => $yesterday->format('Y-m-d'), 'status' => 'Present', 'created_at' => $yesterday, 'updated_at' => $yesterday],
            ['employee_id' => 3, 'shift_id' => 1, 'date' => $twoDaysAgo->format('Y-m-d'), 'status' => 'Sick Leave', 'created_at' => $twoDaysAgo, 'updated_at' => $twoDaysAgo],

            // Lera's attendance
            ['employee_id' => 2, 'shift_id' => 2, 'date' => $today->format('Y-m-d'), 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
            ['employee_id' => 2, 'shift_id' => 2, 'date' => $yesterday->format('Y-m-d'), 'status' => 'Present', 'created_at' => $yesterday, 'updated_at' => $yesterday],
            ['employee_id' => 2, 'shift_id' => 2, 'date' => $twoDaysAgo->format('Y-m-d'), 'status' => 'Present', 'created_at' => $twoDaysAgo, 'updated_at' => $twoDaysAgo],

            // Other employees
            ['employee_id' => 4, 'shift_id' => 3, 'date' => $today->format('Y-m-d'), 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
            ['employee_id' => 5, 'shift_id' => 4, 'date' => $today->format('Y-m-d'), 'status' => 'Absent', 'created_at' => now(), 'updated_at' => now()],
            ['employee_id' => 6, 'shift_id' => 5, 'date' => $today->format('Y-m-d'), 'status' => 'Vacation', 'created_at' => now(), 'updated_at' => now()],
            ['employee_id' => 7, 'shift_id' => 1, 'date' => $today->format('Y-m-d'), 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
            ['employee_id' => 8, 'shift_id' => 2, 'date' => $today->format('Y-m-d'), 'status' => 'Present', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
