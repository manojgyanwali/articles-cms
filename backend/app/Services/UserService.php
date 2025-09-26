<?php


namespace App\Services;

use App\Interfaces\UserRepositoryInterface;

class UserService
{
    protected $userRepository ;
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

     public function register(array $data): array
     {
        return $this->userRepository->register($data);
     }

      public function login(array $data): array
     {
        return $this->userRepository->login($data);
     }

      public function logout(): array
     {
        return $this->userRepository->logout();
     }

}