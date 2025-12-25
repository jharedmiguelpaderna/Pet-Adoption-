<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [];
        
        // Test admin accounts (for development/testing)
        $admins[] = [
            'name' => 'Admin Test',
            'email' => 'admin@test.com',
            'password' => Hash::make('admin123'),
            'phone' => '+1234567890',
            'created_at' => now(),
        ];
        
        $admins[] = [
            'name' => 'Sarah Martinez',
            'email' => 'sarah.admin@happypaws.org',
            'password' => Hash::make('admin123'),
            'phone' => '+14155550123',
            'created_at' => now(),
        ];
        
        // Additional admin accounts with more diversity
        $adminData = [
            ['name' => 'Michael Chen', 'email' => 'michael.admin@test.com', 'phone' => '+12135550456'],
            ['name' => 'Emily Johnson', 'email' => 'emily.admin@test.com', 'phone' => '+12065550789'],
            ['name' => 'David Rodriguez', 'email' => 'david.admin@test.com', 'phone' => '+15125550321'],
            ['name' => 'Jennifer Lee', 'email' => 'jennifer.admin@test.com', 'phone' => '+14155550654'],
        ];
        
        foreach ($adminData as $data) {
            $admins[] = [
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('admin123'),
                'phone' => $data['phone'],
                'created_at' => now(),
            ];
        }
        
        DB::table('admin')->insert($admins);
    }
}


