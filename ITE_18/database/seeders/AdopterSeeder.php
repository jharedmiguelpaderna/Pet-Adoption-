<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdopterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adopters = [];
        
        // Test adopter accounts (for development/testing)
        $adopters[] = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'address' => '123 Main Street, San Francisco, CA 94102',
            'phone' => '+14155551234',
            'email' => 'adopter@test.com',
            'password' => Hash::make('adopter123'),
            'birth_date' => '1990-01-15',
            'occupation' => 'Software Engineer',
            'company_name' => 'Tech Corp',
            'social_media_profile' => 'https://linkedin.com/in/johndoe',
            'status' => 'Active',
            'pronouns' => 'He/Him',
            'alternate_contact_name' => 'Jane Doe',
            'alternate_contact_relationship' => 'Spouse',
            'alternate_contact_phone' => '+14155555678',
            'alternate_contact_email' => 'jane.doe@example.com',
            'valid_id' => null,
            'home_photos' => null,
        ];
        
        $adopters[] = [
            'first_name' => 'Emily',
            'last_name' => 'Smith',
            'address' => '456 Oak Avenue, Los Angeles, CA 90012',
            'phone' => '+12135559876',
            'email' => 'emily.adopter@test.com',
            'password' => Hash::make('adopter123'),
            'birth_date' => '1988-05-20',
            'occupation' => 'Teacher',
            'company_name' => 'City Elementary School',
            'social_media_profile' => 'https://facebook.com/emily.smith',
            'status' => 'Active',
            'pronouns' => 'She/Her',
            'alternate_contact_name' => 'Michael Smith',
            'alternate_contact_relationship' => 'Partner',
            'alternate_contact_phone' => '+12135554321',
            'alternate_contact_email' => 'michael.smith@example.com',
            'valid_id' => null,
            'home_photos' => null,
        ];
        
        // Number of additional adopter records to generate
        $count = 6;
        
        $pronouns = ['He/Him', 'She/Her', 'They/Them'];
        $relationships = ['Spouse', 'Partner', 'Brother', 'Sister', 'Father', 'Mother', 'Friend'];
        $socialMediaPlatforms = ['facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com'];
        
        for ($i = 0; $i < $count; $i++) {
            $firstName = fake()->firstName();
            $lastName = fake()->lastName();
            $pronoun = fake()->randomElement($pronouns);
            
            $adopters[] = [
                'first_name' => $firstName,
                'last_name' => $lastName,
                'address' => fake()->address(),
                'phone' => fake()->phoneNumber(),
                'email' => fake()->unique()->safeEmail(),
                'password' => Hash::make('password123'), // Default password for seeded adopters
                'birth_date' => fake()->date('Y-m-d', '-18 years'),
                'occupation' => fake()->jobTitle(),
                'company_name' => fake()->optional()->company(),
                'social_media_profile' => fake()->boolean(70) ? 'https://' . fake()->randomElement($socialMediaPlatforms) . '/' . strtolower($firstName . '.' . $lastName) : null,
                'status' => fake()->randomElement(['Active', 'Inactive', 'Pending']),
                'pronouns' => $pronoun,
                'alternate_contact_name' => fake()->optional()->name(),
                'alternate_contact_relationship' => fake()->optional()->randomElement($relationships),
                'alternate_contact_phone' => fake()->optional()->phoneNumber(),
                'alternate_contact_email' => fake()->optional()->safeEmail(),
                'valid_id' => fake()->optional()->url(),
                'home_photos' => fake()->optional()->url(),
            ];
        }
        
        DB::table('adopters')->insert($adopters);
    }
}
