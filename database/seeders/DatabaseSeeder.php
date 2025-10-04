<?php

namespace Database\Seeders;

use App\Models\Prodi;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
        ]);

        Prodi::create([
            'nama_prodi' => "Sistem Informasi",
            'nama_ketua' => "Ketua",
            'foto_ketua' => 'surya.jpg',
            'foto_prodi' => 'si.jpg',
            'visi' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt soluta ipsam eveniet tempore quae veniam quasi eligendi suscipit reprehenderit saepe! Nulla at praesentium officiis molestias impedit exercitationem deserunt similique fuga.',
            'misi' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt soluta ipsam eveniet tempore quae veniam quasi eligendi suscipit reprehenderit saepe! Nulla at praesentium officiis molestias impedit exercitationem deserunt similique fuga.',
        ]);

        $this->call([
            AccountProdiSeeder::class
        ]);
    }
}
