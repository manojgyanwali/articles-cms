<?php

namespace App\Services;
use App\Interfaces\CommentRepositoryInterface;

Class CommentService {

    protected $commentRepository;

    public function __construct( CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;  
    }

    public function create(array $data, $commentId) {

      return  $this->commentRepository->create($data, $commentId);
    }

    public function getAll()  {

      return  $this->commentRepository->getAll();
    }

    public function getById($commentId) {

     return   $this->commentRepository->getById($commentId);
    }


    public function update(int $commentId, array $data) {

      return  $this->commentRepository->update($commentId, $data);
    }


    public function delete(int $commentId) {

       return $this->commentRepository->delete($commentId);
    }


}
