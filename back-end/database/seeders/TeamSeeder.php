<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams')->insert([
            ['team_name' => 'Fire Response', 'supervisor_id' => 1],
            ['team_name' => 'Safety Inspectors', 'supervisor_id' => 2],
            ['team_name' => 'Emergency Evacuation', 'supervisor_id' => 3],
            ['team_name' => 'Security', 'supervisor_id' => 4],
            ['team_name' => 'First Aid', 'supervisor_id' => 5],
        ]);
    }
}
