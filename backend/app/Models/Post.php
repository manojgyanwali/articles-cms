<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $fillable = [
        'title',
        'body',
        'image',
    ];


     public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    
    public function likedUsers()
    {
        return $this->belongsToMany(User::class, 'post_likes', 'post_id', 'user_id');
    }


    public function users(){
        return $this->belongsTo(User::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);

    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }
}
