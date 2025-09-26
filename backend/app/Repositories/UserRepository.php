<?php
namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;
Class UserRepository implements UserRepositoryInterface {

    public function register(array $data){
        try{

             $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token
        ];

        } catch(Exception $e) {

          return [
            'error' => 'true',
            'message' => $e->getMessage()
          ];

        }
       
    }

        
        public function login(array $data) {
             
            try {

                $credentials = [
                    'email'    => $data['email'],
                    'password' => $data['password'],
                ];

                if (!$token = auth('api')->attempt($credentials)) {
                    return [
                        'status' => false,
                        'message' => 'invalid Credentials'
                    ];
                }

                return [
                    'status' => true,
                    'user'  => auth('api')->user(),
                    'token' => $token,
                ];

            }   catch(Exception $e) {

                    return [
                        'status' => false,
                        'message' => $e->getMessage()
                    ];
                }
       
        }

        
        public function logout() {

           try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return [
                'status'  => true,
                'message' => 'Successfully logged out',
            ];

           } catch (\Exception $e) {
                return [
                    'status'  => false,
                    'message' => 'Failed to logout, please try again',
                ];
            }
    
        }



}
