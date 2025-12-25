<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VetVisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get available pet IDs
        $petIds = DB::table('pets')->pluck('pet_id')->toArray();
        
        if (empty($petIds)) {
            $this->command->error('No pets found. Please run PetSeeder first.');
            return;
        }
        
        $vetVisits = [];
        
        // Number of vet visit records to generate (more than pets for some pets to have multiple visits)
        $count = 20;
        
        $vetFirstNames = ['Dr. Adams', 'Dr. Baker', 'Dr. Clark', 'Dr. Diaz', 'Dr. Evans', 'Dr. Ford', 'Dr. Green', 'Dr. Hall', 'Dr. Ivy', 'Dr. Jones', 'Dr. Kim', 'Dr. Lee', 'Dr. Martinez', 'Dr. Nguyen', 'Dr. Patel'];
        $purposes = ['Annual checkup', 'Vaccination', 'Dental', 'Surgery', 'Injury', 'Illness', 'Routine', 'Follow-up', 'Senior screening', 'Behavioral', 'Pre-adoption check', 'Wellness', 'Emergency'];
        $diagnoses = ['Healthy', 'Dental issues', 'Tooth decay', 'Arthritis', 'Dermatitis', 'Allergies', 'Injury recovery', 'Sprain', 'Anxiety', 'Underweight', 'Overweight', 'Infection'];
        $treatments = [
            'DHPP vaccine, rabies vaccine',
            'Spay procedure',
            'Neuter procedure',
            'Cleaning and extraction',
            'Antibiotic ointment',
            'Blood work and meds',
            'X-rays and anti-inflammatories',
            'Training plan',
            'Vaccines and microchip',
            'Vaccinations and deworming',
            'General check',
            'Assessment and vaccines',
            'Pain meds prescribed',
            'Antibiotics',
            'Physical therapy'
        ];
        $remarks = [
            'No issues found',
            'Recovered well',
            'Improving; monitor diet',
            'Pain meds prescribed',
            'Maintain diet',
            'Puppy plan started',
            'Monitor mobility',
            'Leash-walk only for 2 weeks',
            'Ready for adoption',
            'Follow-up in 1 month',
            'Growing well',
            'Continue current treatment',
            'Needs rest',
            'Progressing as expected'
        ];
        
        for ($i = 0; $i < $count; $i++) {
            $visitDate = fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d');
            $nextVisitDue = fake()->dateTimeBetween('now', '+6 months')->format('Y-m-d');
            
            $vetVisits[] = [
                'pet_id' => fake()->randomElement($petIds),
                'vet_name' => fake()->randomElement($vetFirstNames),
                'visit_date' => $visitDate,
                'purpose' => fake()->randomElement($purposes),
                'diagnosis' => fake()->randomElement($diagnoses),
                'treatment' => fake()->randomElement($treatments),
                'remarks' => fake()->randomElement($remarks),
                'next_visit_due' => $nextVisitDue,
            ];
        }
        
        DB::table('vet_visits')->insert($vetVisits);
    }
}
