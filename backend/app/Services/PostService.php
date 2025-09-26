<?php

namespace App\Services;
use App\Interfaces\PostRepositoryInterface;

Class PostService {

    protected $postRepository;

    public function __construct( PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;  
    }

    public function create(array $data) {

      return  $this->postRepository->create($data);
    }

    public function getAll()  {

      return  $this->postRepository->getAll();
    }

    public function getPostWithComments(int $postId)
    {
        $post = $this->postRepository->getPostWithComments($postId);

        if (!$post) {
            return [
                'status' => false,
                'message' => 'Post not found',
                'data' => null,
            ];
        }
        

        return [
            'status' => true,
            'message' => 'Post fetched successfully',
            'data' => $post,
        ];
    }

      public function getAllByUser() {

        $post = $this->postRepository->getAllByUser();

        if (!$post) {
          return response()->json([
            'status' =>false,
            'message' => $post['message']

          ]);

        }

        return [
          'status' => true,
          'data' => $post
        ];       
          
    }



    public function getById($postId) {

     return   $this->postRepository->getById($postId);
    }


    public function update(int $postId, array $data) {

      return  $this->postRepository->update($postId, $data);
    }


    public function delete(int $postId) {

       return $this->postRepository->delete($postId);
    }

   
    public function getPostsByTag(string $tag) {

      return  $this->postRepository->getPostsByTag($tag);
    }
   

   
    public function search(array $criteria) {

     return   $this->postRepository->search($criteria);
    }


}
