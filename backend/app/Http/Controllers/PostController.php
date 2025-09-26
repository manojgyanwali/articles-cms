<?php

namespace App\Http\Controllers;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PostLike;
class PostController extends Controller
{
    protected  $postService;
    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function create(Request $request){

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body'  => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

       
        $result = $this->postService->create($data);

        if (!$result['status']) {

            return response()->json([

                'status' => false,
                'message' => $result['message'],
            ]);
        }

        return response()->json([

            'status' => true,
            'post' => $result['post']

        ],201);

    }

    public function getAll() {

       $post = $this->postService->getAll();

       if (!$post['status']) {

           return response()->json([
            'status' => false,
             'message' =>$post['message']

           ]);

       }

       if ($post['data']->isEmpty()) {

            return response()->json([
                'status' => true,
                'message' => 'no post found',
                'data' => $post['data']
            ]);

       }

       return response()->json([
           'status' => true,
           'data' => $post['data']

       ]);
    }

   public function getAllByUser(){

    $post = $this->postService->getAllByUser();

    if (!$post['status']) {
        return response()->json([
             'status' => false,
        'message' => $post['message']
        ]);
       

    };

    return response()->json([
        'status' => true,
         'data' =>$post['data']
    ]);



   }


    public function getBYId($postId){

          

       $post = $this->postService->getBYId($postId);

       if (!$post['status']) {

        return response()->json([

            'status' => false,
            'message' => $post['message']

        ]);

       }

        return response()->json([

            'status' => true,
            'data' => $post['data'],
            'user_like' =>$post['user_like']
            
        ]);
    }


    public function update(int $id, Request $request) {

             $validator = Validator::make($request->all(), [

                'title' => 'required|string',
                'body'  => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            ]);

            if ( $validator->fails()){

                return response()->json([

                    'status' => false,
                    'errors' =>$validator->errors()

                ], 422);
            }

            $data = $validator->validated();

            $result = $this->postService->update($id , $data);

            if( !$result['status']) {

                 return response()->json([
                   'status' => false,
                   'message' =>$result['message']
                 ]);
            }

            return response()->json([

                'status' => true,
                'message' => $result['data']
            ]);
    }

    public function delete(int $id) {

        $result = $this->postService->delete($id);

        if( !$result['status']) {

            return response()->json([

                'status' => false,
                'message' => $result['message']
            ]); 
        }

        return response()->json([

            'status' => true,
            'message' => $result['message']

        ]);



    }


    public function search(Request $request) {

       $data = $request->all();
       $search = $this->postService->search($data);

       if (!$search['status']) {

            return response()->json([
                'status' =>false,
                'messaage' =>$search['message']
            ]);
       }

       return response()->json([

         'status' => true,
         'data' => $search['data'],
         'message' => $search['message']
       ]);
    }
}
