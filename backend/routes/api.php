<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostLikeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    //user route
    Route::get('/logout', [UserController::class, 'logout']);
    Route::post('/create', [PostController::class, 'create']);

    //post crud routes
    Route::get('/user/post', [PostController::class, 'getALLByUser']);

    Route::post('/post', [PostController::class, 'create']);
    Route::put('/post/{id}', [PostController::class, 'update']);
    Route::delete('/post/{id}', [PostController::class, 'delete']);

    //comment
    Route::post('/comment/{post_id}', [CommentController::class, 'create']);
    Route::get('/like/{post_id}', [PostLikeController::class, 'toggleLike']);


});
    Route::get('/post', [PostController::class, 'getAll']);
    Route::get('/post/{id}', [PostController::class, 'getById']);


    Route::get('/posts/search', [PostController::class, 'search']);


