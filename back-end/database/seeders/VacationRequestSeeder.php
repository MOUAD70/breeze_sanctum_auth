<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VacationRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vacation_requests')->insert([
            [
                'employee_id' => 3, // Roslyn's request
                'start_date' => Carbon::now()->addDays(10),
                'end_date' => Carbon::now()->addDays(15),
                'status' => 'Pending',
                'assigned_to' => 2, // Assigned to Lera
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2)
            ],
            [
                'employee_id' => 4,
                'start_date' => Carbon::now()->addDays(5),
                'end_date' => Carbon::now()->addDays(10),
                'status' => 'Approved',
                'assigned_to' => 2, // Assigned to Lera
                'created_at' => Carbon::now()->subDays(7),
                'updated_at' => Carbon::now()->subDays(5)
            ],
            [
                'employee_id' => 5,
                'start_date' => Carbon::now()->addDays(20),
                'end_date' => Carbon::now()->addDays(25),
                'status' => 'Denied',
                'assigned_to' => 1, // Assigned to Mouad
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(8)
            ],
            [
                'employee_id' => 6,
                'start_date' => Carbon::now()->addDays(12),
                'end_date' => Carbon::now()->addDays(16),
                'status' => 'Pending',
                'assigned_to' => 1, // Assigned to Mouad
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1)
            ],
            [
                'employee_id' => 7,
                'start_date' => Carbon::now()->addDays(25),
                'end_date' => Carbon::now()->addDays(30),
                'status' => 'Approved',
                'assigned_to' => 2, // Assigned to Lera
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(13)
            ],
        ]);
    }
}
