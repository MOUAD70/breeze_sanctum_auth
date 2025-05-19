<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('incidents')->insert([
            [
                'site_id' => 1, 
                'reported_by' => 3, // Roslyn reported
                'incident_type' => 'Fire', 
                'severity' => 'High', 
                'description' => 'Small fire detected in the east wing kitchen area. Fire extinguishers were used to contain it before fire department arrival.',
                'status' => 'Resolved',
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(4)
            ],
            [
                'site_id' => 2, 
                'reported_by' => 2, // Lera reported
                'incident_type' => 'Gas Leak', 
                'severity' => 'Medium', 
                'description' => 'Gas leak detected in the food court kitchen area. Area evacuated and maintenance team notified.',
                'status' => 'In Progress',
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(1)
            ],
            [
                'site_id' => 3, 
                'reported_by' => 3, // Roslyn reported
                'incident_type' => 'Injury', 
                'severity' => 'Low', 
                'description' => 'Visitor slipped on wet floor in lobby. Minor ankle sprain, first aid administered.',
                'status' => 'Resolved',
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(9)
            ],
            [
                'site_id' => 4, 
                'reported_by' => 4, 
                'incident_type' => 'Fire', 
                'severity' => 'Medium', 
                'description' => 'Electrical fire in server room. IT staff used appropriate extinguisher to put it out.',
                'status' => 'Pending',
                'created_at' => Carbon::now()->subHours(12),
                'updated_at' => Carbon::now()->subHours(10)
            ],
            [
                'site_id' => 5, 
                'reported_by' => 5, 
                'incident_type' => 'Suspicious Package', 
                'severity' => 'Medium', 
                'description' => 'Unattended package found near main entrance. Security protocol activated, authorities notified.',
                'status' => 'Resolved',
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subHours(20)
            ],
        ]);
    }
}
