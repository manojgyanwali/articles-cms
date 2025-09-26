<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected  $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

       
        $result = $this->userService->register($data);

        return response()->json([
            'status' => true,
            'user' => $result['user'],
            'token' => $result['token']
        ], 201);
    }

    public function login(request $request) {

            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password'  => 'required',
        
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()
                ], 422);
            }

            $validated_data = $validator->validated();

            $data = $this->userService->login($validated_data);

            if (!$data['status']) {
                return response()->json([
                    'status'  => false,
                    'message' => $data['message']
                ], 401);
            }

            return response()->json([
                'status'  => true,
                'user' => $data['user'],
                'token'    => $data['token']
            ]);

    }

    public function logout(){
        $success = $this->userService->logout();

        if ($success) {
            return response()->json([
                'status'  => true,
                'message' => 'Logout successful',
            ]);
        }

        return response()->json([
            'status'  => false,
            'message' => 'Failed to logout',
        ], 500);

    }
    
}
