<?php
namespace App\Interfaces;

interface CommentRepositoryInterface {
    
    public function create(array $data, int $PostId);
    public function getById(int $postId);
    public function getAll();
    public function update(int $postId, array $data);
    public function delete(int $postId);

}