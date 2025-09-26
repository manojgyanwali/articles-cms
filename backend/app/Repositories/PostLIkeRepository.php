<?php
namespace App\Repositories;

use App\Models\PostLike;
use App\Models\Post;


class PostLikeRepository {

    public function findByUserAndPost($userId, $postId) {

        return PostLike::where('user_id', $userId)
                       ->where('post_id', $postId)
                       ->first();
    }

    public function create($userId, $postId) {

        return PostLike::create([
            'user_id' => $userId,
            'post_id' => $postId
        ]);
    }

    public function delete($like) {
        
        return $like->delete();
    }
}

     
    





