<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            "name" => 'Admin',
            "email" => 'admin@admin.ac.id',
        ]);

        User::factory()->create([
            "name" => 'Dr. Khaidir Rahman',
            "email" => 'sisteminformasi@kaprodi.ac.id',
        ]);
    }
}
