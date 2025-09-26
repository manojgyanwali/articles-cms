<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommentService;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller

{
    protected $commentService;

    public function __construct(CommentService $commentService) {

        $this->commentService = $commentService; 
    }

    public function create(Request $request, $postId) {

        $validator = Validator::make($request->all(), [
            'comment' => 'required',
        ]);

         if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }


          $data = $validator->validated();

       
        $result = $this->commentService->create($data, $postId);

        if (!$result['status']) {

            return response()->json([

                'status' => false,
                'message' => $result['message'],
            ]);
        }

        return response()->json([

            'status' => true,
            'post' => $result['data']

        ],201);





    }
}
