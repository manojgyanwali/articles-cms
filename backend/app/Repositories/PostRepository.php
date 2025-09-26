<?php
namespace App\Repositories;

use App\Interfaces\PostRepositoryInterface;
use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Support\Facades\Storage;


Class PostRepository implements PostRepositoryInterface {

    public function create(array $data) {

        $user = auth('api')->user();
        $imagePath = null;
        
        if (isset($data['image']) && $data['image']) {

            $imagePath = $data['image']->store('posts', 'public');       
        }

        try {

            $post = $user->posts()->create([

                'title' => $data['title'],
                'body'  => $data['body'],
                'image' => $imagePath
            ]);

            return [

                'status' => true,
                'post' => $post,
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

            $posts = Post::paginate(12);

            return [

                'status' => true,
                'data' => $posts
            ];

            } catch (\Throwable $th) {

                return [

                    'status' => false,
                    'message' => $th->getMessage(),
                ];
            }

    }

    public function getAllByUser() {

         $user =  auth('api')->user();

         $posts = Post::where('user_id', $user->id)->get();

         return $posts;

    }
     

  

    public function getPostWithComments(int $postId)
    {
          return Post::with(['comments.user'])->find($postId);
      
    }

    public function getById(int $postId) {

        try {
             $isLoggedIn = auth('api')->check();

             if ($isLoggedIn) {

                        $liked = PostLike::where('post_id', $postId)
                        ->where('user_id', auth('api')->id())
                        ->exists();

                         $post = Post::with(['comments.users', 'likes'])
                                ->withCount('likes') 
                                ->findOrFail($postId);

                                 if($liked) {

                                    return [
                                        'status' => true,
                                        'data' => $post,
                                        'user_like' =>$liked   
                                    ];

                                 } else {

                                    return [
                                        'status' => true,
                                        'data' => $post,
                                        'user_like' => $liked
                                    ];

                                 } ;
             } else{

                 $post = Post::with(['comments.users', 'likes'])
                                ->withCount('likes') 
                                ->findOrFail($postId);

                                
                                    return [

                                        'status' => true,
                                        'data' => $post,
                                        'user_like' => 'user not logged in'
                                    ];

            } ;

             
         
           
        } catch (\Throwable $e) {

           return [

            'status' => false,
            'message' => $e->getMessage()

           ];
        }
    }


    

   public function update(int $postId, array $data) {

        try {
                $post = Post::find($postId);

                if (!$post) {
                    return [
                        'status' => false,
                        'message' => 'Post ID not found'
                    ];
                }

                $imagePath = $post->image; 

                
                if (!empty($data['image'])) {

                   
                    if ($post->image && \Storage::disk('public')->exists($post->image)) {
                        \Storage::disk('public')->delete($post->image);
                    }

                   
                    $imagePath = $data['image']->store('posts', 'public');
                }

                
                $post->update([
                    'title' => $data['title'],
                    'body'  => $data['body'],
                    'image' => $imagePath,
                ]);

                return [
                    'status' => true,
                    'data' => [
                        'id'    => $post->id,
                        'title' => $post->title,
                        'body'  => $post->body,
                        'image' => $post->image ? url('storage/' . $post->image) : null,
                    ],
                ];

            } catch (\Throwable $e) {
                return [
                    'status' => false,
                    'error' => $e->getMessage()
                ];
            }
        }



    public function delete(int $postId) {

       try {

        $post = Post::find($postId);
        
        if (!$post) {
            return [
                'status' => false,
                'message' => "error id not found"
            ];
        }

        if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
         }

       
         $post->delete();

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

   
   public function getPostsByTag(string $tag) {
        
        try {
            $posts = Post::where('something', 'value')->get();

            if ($posts->isEmpty()) {
                return [
                    'status' => true,
                    'message' => 'No posts found',
                    'data' => $posts
                ];
            }

            return [
                'status' => true,
                'data' => $posts
            ];

            } catch (\Throwable $th) {
                return [
                    'status' => false,
                    'message' => 'Query failed: ' . $th->getMessage()
                ];
            }

    }

    
    public function search(array $criteria) {

        try {
            $query = Post::query();

            if (!empty($search)) {
                $query->where('title', 'like', "%$search%")
                    ->orWhere('body', 'like', "%$search%");
            }

            $posts = $query->get();

            return [
                'status'  => true,
                'data'    => $posts,
                'message' => $posts->isEmpty() ? 'No posts found' : 'Posts retrieved'
            ];

            } catch (\Throwable $e) {
                return [
                    'status'  => false,
                    'message' => $e->getMessage()
                ];
            } 
    }

    public function likeUnlike(){
        
    }

 }
    





