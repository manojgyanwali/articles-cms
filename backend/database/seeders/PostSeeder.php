<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $faker = Faker::create();

        for ($i = 1; $i <= 30; $i++) {
            Post::create([
                'title' => $faker->sentence(7),        
                'body'  => $faker->paragraph(7),       
                'image' => 'posts/' . $faker->image('storage/app/public/posts', 640, 480, null, false), 
                'user_id' => rand(1, 20),           
            ]);
        }
    }
}
