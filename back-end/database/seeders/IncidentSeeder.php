<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IncidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('incidents')->insert([
            ['site_id' => 1, 'reported_by' => 1, 'incident_type' => 'Fire', 'severity' => 'High', 'description' => 'Major fire on the third floor.', 'status' => 'Pending'],
            ['site_id' => 2, 'reported_by' => 2, 'incident_type' => 'Gas Leak', 'severity' => 'Medium', 'description' => 'Gas leak detected in the kitchen area.', 'status' => 'In Progress'],
            ['site_id' => 3, 'reported_by' => 3, 'incident_type' => 'Injury', 'severity' => 'Low', 'description' => 'Minor injury from a fall on the premises.', 'status' => 'Resolved'],
            ['site_id' => 4, 'reported_by' => 4, 'incident_type' => 'Fire', 'severity' => 'Medium', 'description' => 'Small fire in the parking lot.', 'status' => 'Pending'],
            ['site_id' => 5, 'reported_by' => 5, 'incident_type' => 'Other', 'severity' => 'Low', 'description' => 'Suspicious package found near the entrance.', 'status' => 'Resolved'],
        ]);
    }
}
