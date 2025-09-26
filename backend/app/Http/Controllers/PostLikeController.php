<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PostLikeService;
use App\Services\PostService;

class PostLikeController extends Controller
{
    protected $postLikeSevice;

    public function __construct(PostLikeService $postService) {

            $this->postLikeSevice = $postService;
        
    }

    public function toggleLike($postId) {

        $postLike =  $this->postLikeSevice->toggleLike($postId);

        if(!$postLike['status']) {

            return response()->json([

                'status' => false,
                'message' => $postLike['message']
            ]);
        }

        return response()->json([

           'status' => true,
           'message' => $postLike['message'],
           'data' => $postLike['data']          

        ]);

    }
}
