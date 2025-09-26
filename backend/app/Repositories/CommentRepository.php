<?php
namespace App\Repositories;

use App\Interfaces\CommentRepositoryInterface;
use App\Models\Comment;
use App\Models\Post;


Class CommentRepository implements CommentRepositoryInterface {

    public function create(array $data, int $postId) {

        try {

          $post = Post::find($postId); 

            if (!$post) {
                return [
                    'status' => false,
                    'message' => 'Post  not found'
                ];
            }

          $comment = $post->comments()->create([

            'user_id' => auth('api')->id(),
            'comment' => $data['comment'],
           ]);

            return [

                'status' => true,
                'data' => $comment,
            ]; 

        } catch(\Throwable $e) {

            return [

                'status'  => false,
                'message' => $e->getMessage()
            ];
        }

    }

    public function getAll() {

        try {

            $comment = Comment::all(); 

            return [

                'status' => true,
                'data' => $comment
            ];

            } catch (\Throwable $th) {

                return [

                    'status' => false,
                    'message' => $th->getMessage(),
                ];
            }

    }



    public function getById(int $commentId) {

        try {

            $comment = Comment::find($commentId);

            if (!$comment) {

                return [

                   'status' => false,
                   'message' => 'error id not found'

                ];
            }

            return [

                'status' => true,
                'data' => $comment

            ];
           
        } catch (\Throwable $e) {

           return [

            'status' => false,
            'message' => $e->getMessage()

           ];
        }
       

    }


    

   public function update(int $commentId, array $data) {

        try {
                $comment = Comment::find($commentId);

                if (!$comment) {
                    return [
                        'status' => false,
                        'message' => ' ID not found'
                    ];
                }
                
                $data =  $comment->update([
                    'comment' => $data['comment']
                   
                ]);

                return [
                    'status' => true,
                    'data' => $data
                ];

            } catch (\Throwable $e) {
                return [
                    'status' => false,
                    'error' => $e->getMessage()
                ];
            }
        }



    public function delete(int $commentId) {

       try {

        $comment = Comment::find($commentId);
        
        if (!$comment) {
            return [
                'status' => false,
                'message' => "error id not found"
            ];
        }
        
         $comment->delete();

        return [
            'status' => true,
            'message' => 'data deleted successfully'
        ];

       } catch (\Throwable $th) {

          return [
            'status' => false,
            'message' =>$th->getMessage()

          ];
       }
    }


 }



