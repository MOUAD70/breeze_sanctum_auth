<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sites')->insert([
            ['site_name' => 'Hospital Saint-Louis', 'site_type' => 'Hospital', 'address' => '1 Avenue Claude Vellefaux, 75010 Paris'],
            ['site_name' => 'Centre Commercial Beaugrenelle', 'site_type' => 'Mall', 'address' => '12 Rue Linois, 75015 Paris'],
            ['site_name' => 'Tour Montparnasse', 'site_type' => 'Office', 'address' => '33 Avenue du Maine, 75015 Paris'],
            ['site_name' => 'Hôpital Necker', 'site_type' => 'Hospital', 'address' => '149 Rue de Sèvres, 75015 Paris'],
            ['site_name' => 'Les Quatre Temps', 'site_type' => 'Mall', 'address' => '15 Parvis de la Défense, 92092 Paris'],
        ]);
    }
}
