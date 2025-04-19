<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VacationRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vacation_requests')->insert([
            ['employee_id' => 1, 'start_date' => '2025-04-10', 'end_date' => '2025-04-15', 'status' => 'Pending', 'assigned_to' => 3],
            ['employee_id' => 2, 'start_date' => '2025-04-05', 'end_date' => '2025-04-10', 'status' => 'Approved', 'assigned_to' => 4],
            ['employee_id' => 3, 'start_date' => '2025-04-20', 'end_date' => '2025-04-25', 'status' => 'Denied', 'assigned_to' => 5],
            ['employee_id' => 4, 'start_date' => '2025-04-12', 'end_date' => '2025-04-16', 'status' => 'Pending', 'assigned_to' => 1],
            ['employee_id' => 5, 'start_date' => '2025-04-25', 'end_date' => '2025-04-30', 'status' => 'Approved', 'assigned_to' => 2],
        ]);
    }
}
