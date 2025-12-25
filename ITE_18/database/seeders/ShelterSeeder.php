<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShelterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get available admin IDs
        $adminIds = DB::table('admin')->pluck('admin_id')->toArray();
        
        if (empty($adminIds)) {
            $this->command->error('No admins found. Please run AdminSeeder first.');
            return;
        }
        
        // High-quality shelter data with photos and descriptions (from mock data)
        $shelterData = [
            [
                'shelter_name' => 'Happy Paws Animal Shelter',
                'staff_name' => 'Sarah Martinez',
                'staff_email' => 'sarah.martinez@happypaws.org',
                'staff_phone' => '(415) 555-0123',
                'location' => '123 Bay Street, San Francisco, CA 94102',
                'contact_info' => 'info@happypaws.org',
                'description' => 'Happy Paws Animal Shelter has been serving the Bay Area community since 1998. We are dedicated to rescuing, rehabilitating, and rehoming abandoned and neglected pets.',
                'image_url' => 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            ],
            [
                'shelter_name' => 'Second Chance Rescue',
                'staff_name' => 'Michael Chen',
                'staff_email' => 'michael.chen@secondchancerescue.org',
                'staff_phone' => '(213) 555-0456',
                'location' => '456 Hope Avenue, Los Angeles, CA 90012',
                'contact_info' => 'contact@secondchancerescue.org',
                'description' => 'Second Chance Rescue is committed to giving every animal a second chance at life. Founded in 2005, we focus on rescuing animals from high-kill shelters and providing them with medical care and love.',
                'image_url' => 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            ],
            [
                'shelter_name' => 'Furry Friends Haven',
                'staff_name' => 'Emily Johnson',
                'staff_email' => 'emily.johnson@furryfriendshaven.org',
                'staff_phone' => '(206) 555-0789',
                'location' => '789 Pet Lane, Seattle, WA 98101',
                'contact_info' => 'hello@furryfriendshaven.org',
                'description' => 'Furry Friends Haven provides a safe and loving environment for animals in need. We specialize in caring for senior pets and those with special needs.',
                'image_url' => 'https://images.unsplash.com/photo-1516750484197-6e8a7d34a6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            ],
            [
                'shelter_name' => 'Golden Hearts Pet Sanctuary',
                'staff_name' => 'David Rodriguez',
                'staff_email' => 'david.rodriguez@goldenheartssanctuary.org',
                'staff_phone' => '(512) 555-0321',
                'location' => '321 Sanctuary Road, Austin, TX 78701',
                'contact_info' => 'info@goldenheartssanctuary.org',
                'description' => 'Golden Hearts Pet Sanctuary is a no-kill shelter dedicated to providing lifetime care for animals. We believe every pet deserves a loving home and second chances.',
                'image_url' => 'https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            ],
            [
                'shelter_name' => 'Paws & Claws Rescue Center',
                'staff_name' => 'Jennifer Lee',
                'staff_email' => 'jennifer.lee@pawsandclaws.org',
                'staff_phone' => '(415) 555-0654',
                'location' => '555 Rescue Drive, Portland, OR 97201',
                'contact_info' => 'contact@pawsandclaws.org',
                'description' => 'Paws & Claws Rescue Center specializes in rescuing abandoned and stray animals. We provide comprehensive veterinary care and behavioral training to prepare our animals for their forever homes.',
                'image_url' => 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            ],
        ];
        
        $shelters = [];
        $count = min(count($shelterData), count($adminIds));
        
        for ($i = 0; $i < $count; $i++) {
            $shelters[] = [
                'admin_id' => $adminIds[$i],
                'shelter_name' => $shelterData[$i]['shelter_name'],
                'staff_name' => $shelterData[$i]['staff_name'],
                'staff_email' => $shelterData[$i]['staff_email'],
                'staff_phone' => $shelterData[$i]['staff_phone'],
                'location' => $shelterData[$i]['location'],
                'contact_info' => $shelterData[$i]['contact_info'],
                'description' => $shelterData[$i]['description'],
                'image_url' => $shelterData[$i]['image_url'],
            ];
        }
        
        DB::table('shelters')->insert($shelters);
    }
}
