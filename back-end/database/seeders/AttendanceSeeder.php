<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('attendances')->insert([
            ['employee_id' => 1, 'shift_id' => 1, 'date' => '2025-04-01', 'status' => 'Present'],
            ['employee_id' => 2, 'shift_id' => 2, 'date' => '2025-04-01', 'status' => 'Absent'],
            ['employee_id' => 3, 'shift_id' => 3, 'date' => '2025-04-01', 'status' => 'Sick Leave'],
            ['employee_id' => 4, 'shift_id' => 4, 'date' => '2025-04-01', 'status' => 'Present'],
            ['employee_id' => 5, 'shift_id' => 5, 'date' => '2025-04-01', 'status' => 'Vacation'],
        ]);
    }
}
