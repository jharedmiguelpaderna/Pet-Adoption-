<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get available shelter IDs
        $shelterIds = DB::table('shelters')->pluck('shelter_id')->toArray();
        
        if (empty($shelterIds)) {
            $this->command->error('No shelters found. Please run ShelterSeeder first.');
            return;
        }
        
        $pets = [];

        // High-quality pet data with photos and rich descriptions (from mock data)
        $featuredPets = [
            [
                'name' => 'Max',
                'species' => 'Dog',
                'breed' => 'Golden Retriever',
                'age' => 2,
                'gender' => 'Male',
                'weight' => 32.5,
                'health_status' => 'Excellent',
                'food_preferences' => 'Grain-free dry food, loves chicken treats',
                'last_vet_visit' => '2024-10-15',
                'next_vet_visit_due' => '2025-04-15',
                'adoption_status' => 'available',
                'date_admitted' => '2024-08-20',
                'description' => 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He\'s great with children and other dogs, making him the perfect family companion. Max is house-trained, knows basic commands, and is eager to learn more. He would thrive in an active household with a yard where he can run and play.',
                'photo_url' => 'https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzYzNzA1NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            ],
            [
                'name' => 'Luna',
                'species' => 'Cat',
                'breed' => 'Orange Tabby',
                'age' => 1,
                'gender' => 'Female',
                'weight' => 4.2,
                'health_status' => 'Good',
                'food_preferences' => 'Wet food, chicken and fish flavors',
                'last_vet_visit' => '2024-11-01',
                'next_vet_visit_due' => '2025-05-01',
                'adoption_status' => 'reserved',
                'date_admitted' => '2024-09-10',
                'description' => 'Luna is a playful and affectionate orange tabby cat with a beautiful coat and striking green eyes. She loves to chase toy mice and enjoys lounging in sunny spots. Luna is litter-trained and gets along well with other cats. She would make a wonderful companion for someone looking for a loving and entertaining feline friend.',
                'photo_url' => 'https://images.unsplash.com/photo-1667518158890-0a6cf60de601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdHxlbnwxfHx8fDE3NjM3NDA1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            ],
            [
                'name' => 'Fluffy',
                'species' => 'Rabbit',
                'breed' => 'Holland Lop',
                'age' => 0,
                'gender' => 'Male',
                'weight' => 1.8,
                'health_status' => 'Excellent',
                'food_preferences' => 'Timothy hay, fresh vegetables, pellets',
                'last_vet_visit' => '2024-10-20',
                'next_vet_visit_due' => '2025-04-20',
                'adoption_status' => 'available',
                'date_admitted' => '2024-09-05',
                'description' => 'Fluffy is an adorable Holland Lop rabbit with soft, fluffy fur and floppy ears. He\'s gentle, curious, and loves to explore. Fluffy enjoys being petted and will happily hop around your home. He\'s litter-trained and would do best in a quiet household where he can have supervised playtime outside his enclosure.',
                'photo_url' => 'https://images.unsplash.com/photo-1688472977827-c7e446e49efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcmFiYml0JTIwYnVubnl8ZW58MXx8fHwxNzYzNzY0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            ],
            [
                'name' => 'Bella',
                'species' => 'Dog',
                'breed' => 'Beagle',
                'age' => 3,
                'gender' => 'Female',
                'weight' => 12.5,
                'health_status' => 'Good',
                'food_preferences' => 'High-quality kibble, loves treats',
                'last_vet_visit' => '2024-09-25',
                'next_vet_visit_due' => '2025-03-25',
                'adoption_status' => 'available',
                'date_admitted' => '2024-07-10',
                'description' => 'Bella is a sweet Beagle with a gentle disposition who enjoys neighborhood walks and puzzle toys. She\'s great with families and loves to be part of the action. Bella is house-trained and responds well to positive reinforcement training.',
                'photo_url' => 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Milo',
                'species' => 'Cat',
                'breed' => 'Siamese',
                'age' => 2,
                'gender' => 'Male',
                'weight' => 5.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'Wet and dry food mix',
                'last_vet_visit' => '2024-11-15',
                'next_vet_visit_due' => '2025-05-15',
                'adoption_status' => 'available',
                'date_admitted' => '2024-08-01',
                'description' => 'Milo is a vocal and affectionate Siamese cat who loves conversation and window watching. He\'s very social and will follow you around the house, chatting about his day. Milo enjoys interactive play and would thrive in a home where he gets plenty of attention.',
                'photo_url' => 'https://images.unsplash.com/photo-1513245543132-31f507417b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Rocky',
                'species' => 'Dog',
                'breed' => 'German Shepherd',
                'age' => 4,
                'gender' => 'Male',
                'weight' => 38.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'High-protein dog food',
                'last_vet_visit' => '2024-10-05',
                'next_vet_visit_due' => '2025-04-05',
                'adoption_status' => 'available',
                'date_admitted' => '2024-06-15',
                'description' => 'Rocky is a loyal and intelligent German Shepherd who excels at training and enjoys long hikes. He\'s protective of his family and would make an excellent companion for an active owner. Rocky knows basic and advanced commands and is eager to learn more.',
                'photo_url' => 'https://images.unsplash.com/photo-1568572933382-74d440642117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
        ];

        foreach ($featuredPets as $featuredPet) {
            $pets[] = [
                'shelter_id' => $shelterIds[array_rand($shelterIds)],
                'name' => $featuredPet['name'],
                'species' => $featuredPet['species'],
                'breed' => $featuredPet['breed'],
                'age' => $featuredPet['age'],
                'gender' => $featuredPet['gender'],
                'weight' => $featuredPet['weight'],
                'health_status' => $featuredPet['health_status'],
                'food_preferences' => $featuredPet['food_preferences'],
                'last_vet_visit' => $featuredPet['last_vet_visit'],
                'next_vet_visit_due' => $featuredPet['next_vet_visit_due'],
                'adoption_status' => ucfirst($featuredPet['adoption_status']),
                'date_admitted' => $featuredPet['date_admitted'],
                'description' => $featuredPet['description'],
                'photo_url' => $featuredPet['photo_url'],
            ];
        }
        
        // Additional pets with high-quality photos and descriptions
        $additionalPets = [
            [
                'name' => 'Charlie',
                'species' => 'Dog',
                'breed' => 'Labrador Retriever',
                'age' => 3,
                'gender' => 'Male',
                'weight' => 28.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'Premium dog food, loves fish treats',
                'last_vet_visit' => '2024-10-10',
                'next_vet_visit_due' => '2025-04-10',
                'adoption_status' => 'available',
                'date_admitted' => '2024-07-15',
                'description' => 'Charlie is a friendly and outgoing Labrador Retriever who loves water and playing fetch. He\'s great with children and other pets, making him an ideal family dog. Charlie is well-trained and responds well to commands.',
                'photo_url' => 'https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Whiskers',
                'species' => 'Cat',
                'breed' => 'Persian',
                'age' => 4,
                'gender' => 'Male',
                'weight' => 6.5,
                'health_status' => 'Good',
                'food_preferences' => 'Premium wet food, prefers chicken',
                'last_vet_visit' => '2024-11-05',
                'next_vet_visit_due' => '2025-05-05',
                'adoption_status' => 'available',
                'date_admitted' => '2024-08-20',
                'description' => 'Whiskers is a calm and regal Persian cat with luxurious long fur. He enjoys quiet environments and gentle grooming sessions. Whiskers is perfect for someone looking for a low-maintenance, affectionate companion.',
                'photo_url' => 'https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Daisy',
                'species' => 'Dog',
                'breed' => 'Bulldog',
                'age' => 5,
                'gender' => 'Female',
                'weight' => 22.0,
                'health_status' => 'Good',
                'food_preferences' => 'Special diet for sensitive stomach',
                'last_vet_visit' => '2024-09-30',
                'next_vet_visit_due' => '2025-03-30',
                'adoption_status' => 'available',
                'date_admitted' => '2024-06-01',
                'description' => 'Daisy is a gentle and loving Bulldog who enjoys lounging and short walks. She\'s great with families and loves attention. Daisy has a calm demeanor and would be perfect for a relaxed household.',
                'photo_url' => 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Shadow',
                'species' => 'Cat',
                'breed' => 'Maine Coon',
                'age' => 2,
                'gender' => 'Male',
                'weight' => 8.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'High-protein cat food',
                'last_vet_visit' => '2024-11-10',
                'next_vet_visit_due' => '2025-05-10',
                'adoption_status' => 'available',
                'date_admitted' => '2024-09-01',
                'description' => 'Shadow is a majestic Maine Coon with a friendly and playful personality. He\'s larger than average and loves interactive toys. Shadow gets along well with other cats and would make a wonderful addition to any home.',
                'photo_url' => 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Buddy',
                'species' => 'Dog',
                'breed' => 'Poodle',
                'age' => 1,
                'gender' => 'Male',
                'weight' => 15.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'Hypoallergenic dog food',
                'last_vet_visit' => '2024-10-20',
                'next_vet_visit_due' => '2025-04-20',
                'adoption_status' => 'available',
                'date_admitted' => '2024-08-10',
                'description' => 'Buddy is an intelligent and energetic Poodle who loves learning new tricks. He\'s hypoallergenic and great for families with allergies. Buddy is highly trainable and would excel in obedience training or agility.',
                'photo_url' => 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Sophie',
                'species' => 'Cat',
                'breed' => 'British Shorthair',
                'age' => 3,
                'gender' => 'Female',
                'weight' => 5.5,
                'health_status' => 'Good',
                'food_preferences' => 'Premium wet food',
                'last_vet_visit' => '2024-11-01',
                'next_vet_visit_due' => '2025-05-01',
                'adoption_status' => 'available',
                'date_admitted' => '2024-07-20',
                'description' => 'Sophie is a sweet British Shorthair with a calm temperament. She loves cozy spots and gentle petting sessions. Sophie is perfect for a quiet home and would make an excellent indoor companion.',
                'photo_url' => 'https://images.unsplash.com/photo-1570824104453-508955ab713e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Zeus',
                'species' => 'Dog',
                'breed' => 'Husky',
                'age' => 2,
                'gender' => 'Male',
                'weight' => 25.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'High-energy dog food',
                'last_vet_visit' => '2024-10-15',
                'next_vet_visit_due' => '2025-04-15',
                'adoption_status' => 'reserved',
                'date_admitted' => '2024-06-10',
                'description' => 'Zeus is an energetic Husky who loves outdoor adventures and cold weather. He needs an active family who can provide plenty of exercise. Zeus is friendly with other dogs and loves to run.',
                'photo_url' => 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Cleo',
                'species' => 'Cat',
                'breed' => 'Calico',
                'age' => 1,
                'gender' => 'Female',
                'weight' => 4.0,
                'health_status' => 'Excellent',
                'food_preferences' => 'Kitten food, gradually transitioning to adult',
                'last_vet_visit' => '2024-11-20',
                'next_vet_visit_due' => '2025-05-20',
                'adoption_status' => 'available',
                'date_admitted' => '2024-09-15',
                'description' => 'Cleo is a playful young Calico cat with beautiful markings. She\'s full of energy and loves interactive toys. Cleo would thrive in a home where she can play and explore.',
                'photo_url' => 'https://images.unsplash.com/photo-1574158622682-e40e69881006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Duke',
                'species' => 'Dog',
                'breed' => 'Rottweiler',
                'age' => 5,
                'gender' => 'Male',
                'weight' => 45.0,
                'health_status' => 'Good',
                'food_preferences' => 'Large breed dog food',
                'last_vet_visit' => '2024-09-20',
                'next_vet_visit_due' => '2025-03-20',
                'adoption_status' => 'available',
                'date_admitted' => '2024-05-01',
                'description' => 'Duke is a gentle giant Rottweiler with a protective nature. Despite his size, he\'s very gentle and loves children. Duke is well-trained and would be an excellent family guardian.',
                'photo_url' => 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
            [
                'name' => 'Ginger',
                'species' => 'Cat',
                'breed' => 'Domestic Shorthair',
                'age' => 6,
                'gender' => 'Female',
                'weight' => 4.5,
                'health_status' => 'Good',
                'food_preferences' => 'Senior cat formula',
                'last_vet_visit' => '2024-10-25',
                'next_vet_visit_due' => '2025-04-25',
                'adoption_status' => 'available',
                'date_admitted' => '2024-04-15',
                'description' => 'Ginger is a sweet senior cat looking for a quiet retirement home. She\'s very affectionate and loves lap time. Ginger would be perfect for someone looking for a calm, loving companion.',
                'photo_url' => 'https://images.unsplash.com/photo-1513245543132-31f507417b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ],
        ];

        foreach ($additionalPets as $pet) {
            $pets[] = [
                'shelter_id' => $shelterIds[array_rand($shelterIds)],
                'name' => $pet['name'],
                'species' => $pet['species'],
                'breed' => $pet['breed'],
                'age' => $pet['age'],
                'gender' => $pet['gender'],
                'weight' => $pet['weight'],
                'health_status' => $pet['health_status'],
                'food_preferences' => $pet['food_preferences'],
                'last_vet_visit' => $pet['last_vet_visit'],
                'next_vet_visit_due' => $pet['next_vet_visit_due'],
                'adoption_status' => ucfirst($pet['adoption_status']),
                'date_admitted' => $pet['date_admitted'],
                'description' => $pet['description'],
                'photo_url' => $pet['photo_url'],
            ];
        }
        
        DB::table('pets')->insert($pets);
    }
}
