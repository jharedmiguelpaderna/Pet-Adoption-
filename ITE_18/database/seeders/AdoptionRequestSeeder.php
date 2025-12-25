<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdoptionRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get available adopter and pet IDs
        $adopterIds = DB::table('adopters')->pluck('adopter_id')->toArray();
        $petIds = DB::table('pets')->pluck('pet_id')->toArray();
        
        if (empty($adopterIds) || empty($petIds)) {
            $this->command->error('No adopters or pets found. Please run AdopterSeeder and PetSeeder first.');
            return;
        }
        
        $adoptionRequests = [];
        
        // Number of adoption request records to generate
        $count = 12;
        
        $adoptionStatuses = ['Pending', 'Approved', 'Rejected'];
        $meetGreetOptions = ['Yes', 'No'];
        $reasons = [
            'Looking for a family-friendly pet.',
            'Companion animal for apartment living.',
            'Experienced owner seeking a calm pet.',
            'Wants a playful and energetic pet.',
            'Looking for a senior pet to provide a loving home.',
            'Want to rescue and give a pet a second chance.',
            'Seeking a pet to help with anxiety and loneliness.',
            'Looking for a pet to be a playmate for existing pet.',
            'Want to teach children responsibility.',
            'Companionship for elderly family member.'
        ];
        $notes = [
            'Interview scheduled, waiting for home check.',
            'Approved pending pickup.',
            'Home check failed due to fence issue.',
            'Awaiting meet & greet outcome.',
            'Background check in progress.',
            'References verified, proceeding with approval.',
            'Applicant did not meet minimum requirements.',
            'Home visit completed successfully.',
            'Follow-up scheduled for next week.',
            'Application under review by committee.'
        ];
        
        for ($i = 0; $i < $count; $i++) {
            $applicationDate = fake()->dateTimeBetween('-2 months', 'now')->format('Y-m-d');
            $status = fake()->randomElement($adoptionStatuses);
            
            // If pending or approved, might have interview scheduled
            $hasInterview = in_array($status, ['Pending', 'Approved']) && fake()->boolean(70);
            
            $adoptionRequests[] = [
                'adopter_id' => fake()->randomElement($adopterIds),
                'pet_id' => fake()->randomElement($petIds),
                'application_date' => $applicationDate,
                'online_interview_date' => $hasInterview ? fake()->dateTimeBetween($applicationDate, '+1 week')->format('Y-m-d') : null,
                'online_interview_time' => $hasInterview ? fake()->time('H:i:s') : null,
                'meet_greet' => fake()->randomElement($meetGreetOptions),
                'reason_for_adoption' => fake()->randomElement($reasons),
                'adoption_status' => $status,
                'notes' => fake()->randomElement($notes),
            ];
        }
        
        DB::table('adoption_requests')->insert($adoptionRequests);
    }
}
