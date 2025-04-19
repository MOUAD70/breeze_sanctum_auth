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
            ['site_name' => 'Hospital A', 'site_type' => 'Hospital', 'address' => '123 Health St'],
            ['site_name' => 'Mall B', 'site_type' => 'Mall', 'address' => '456 Mall Ave'],
            ['site_name' => 'Office C', 'site_type' => 'Office', 'address' => '789 Corporate Rd'],
            ['site_name' => 'Hospital D', 'site_type' => 'Hospital', 'address' => '101 Health Plaza'],
            ['site_name' => 'Mall E', 'site_type' => 'Mall', 'address' => '202 Shopping Blvd'],
        ]);
    }
}
