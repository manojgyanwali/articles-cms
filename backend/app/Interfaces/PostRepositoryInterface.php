<?php
namespace App\Interfaces;

interface PostRepositoryInterface {
    
    public function create(array $data);
    public function getById(int $postId);
    public function getAll();
    public function update(int $postId, array $data);
    public function delete(int $postId);

   
    public function getPostsByTag(string $tag);
   

   
    public function search(array $criteria);

}