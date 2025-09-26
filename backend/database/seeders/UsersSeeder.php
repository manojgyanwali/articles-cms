<?php

namespace Database\seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $users = [
            ['name' => 'User 1', 'email' => 'user1@example.com', 'password' => 'password'],
            ['name' => 'User 2', 'email' => 'user2@example.com', 'password' => 'password'], 
            ['name' => 'User 3', 'email' => 'user3@example.com', 'password' => 'password'],
            ['name' => 'User 4', 'email' => 'user4@example.com', 'password' => 'password'],
            ['name' => 'User 5', 'email' => 'user5@example.com', 'password' => 'password'],
            ['name' => 'User 6', 'email' => 'user6@example.com', 'password' => 'password'],
            ['name' => 'User 7', 'email' => 'user7@example.com', 'password' => 'password'],
            ['name' => 'User 8', 'email' => 'user8@example.com', 'password' => 'password'],
            ['name' => 'User 9', 'email' => 'user9@example.com', 'password' => 'password'],
            ['name' => 'User 10', 'email'=> 'user10@example.com','password' => 'password']
        ];

        foreach($users as $user){
            
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                 'password' => bcrypt($user['password'])            
            ]);
        }
    }
}
