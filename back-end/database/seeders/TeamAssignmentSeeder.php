<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employee_team_assignments')->insert([
            ['employee_id' => 1, 'team_id' => 1, 'shift_start' => '2025-04-01 08:00:00', 'shift_end' => '2025-04-01 16:00:00'],
            ['employee_id' => 2, 'team_id' => 2, 'shift_start' => '2025-04-01 09:00:00', 'shift_end' => '2025-04-01 17:00:00'],
            ['employee_id' => 3, 'team_id' => 3, 'shift_start' => '2025-04-01 07:00:00', 'shift_end' => '2025-04-01 15:00:00'],
            ['employee_id' => 4, 'team_id' => 4, 'shift_start' => '2025-04-01 10:00:00', 'shift_end' => '2025-04-01 18:00:00'],
            ['employee_id' => 5, 'team_id' => 5, 'shift_start' => '2025-04-01 08:00:00', 'shift_end' => '2025-04-01 16:00:00'],
        ]);
    }
}
