<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\PostLikeRepository;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

class PostLikeService
{
    protected $postLikeRepository;

    public function __construct(PostLikeRepository $postLikeRepository)
    {
        $this->postLikeRepository = $postLikeRepository;
    }

    public function toggleLike($postId)
    {
        try {
            $user = auth('api')->user();
            $post = Post::findOrFail($postId);

            if(!$post) {

                return [
                    'status' => false,
                    'message' => "id not found"
                ];
            }

            $like = $this->postLikeRepository->findByUserAndPost($user->id, $post->id);

        if ($like) {
            $this->postLikeRepository->delete($like);

            return [
                'status' => true,
                'message' => 'unliked',
                'data' => $post->likes()->count()
            ];

        } else {
            $this->postLikeRepository->create($user->id, $post->id);

            return [

                 'status' => true,
                'message' => 'liked',
                'data' => $post->likes()->count()
            ];
        }
            } catch (\Throwable $th) {
                return [
                    'status' => false,
                    'message' => $th->getMessage()
                ];
            }
         
    
    }
}
