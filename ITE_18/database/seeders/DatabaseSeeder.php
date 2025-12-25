<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed pet adoption data in correct order per new schema
        $this->call([
            AdminSeeder::class,
            ShelterSeeder::class,
            PetSeeder::class,
            AdopterSeeder::class,
            AdoptionRequestSeeder::class,
            VetVisitSeeder::class,
        ]);
    }
}
