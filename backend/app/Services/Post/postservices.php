<?php

namespace App\Services\Post;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class postservices
{
    public function getallpost(){
        $post = Post::with(['user', 'comments.user'])->latest()->take(40)->get();

        if ($post) {
            return response()->json(['post' => $post, 'msg' => true]);
        } else {
            return response()->json(['msg' => false]);
        }
    }


    public function newpost($data){
         $user = Auth::id(); 

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated','msg'=>false], 401);
    }
    $post = Post::create([
        'msg' => $data['post_msg'] ?? null,
        'image' => $data['image'] ?? null,
        'video' => $data['video'] ?? null,
        'user_id' => $user,
        'likes' => 0,
        'dislikes' => 0
    ]);

    if ($post) {
        return response()->json([
            'msg' => true,
            'message' => 'Post created successfully',
            'post' => $post
        ], 201);
    }

    return response()->json(['msg' => false, 'message' => 'Failed to create post'], 500);
    }


    public function retpost(){
        $user = Auth::user(); 

    if (!$user) {
        return response()->json(['msg' => false, 'message' => 'Unauthenticated'], 401);
    }

    $posts = Post::with(['comments.user']) 
                 ->where('user_id', $user->id)
                 ->latest()
                 ->get();

    return response()->json([
        'msg' => true,
        'posts' => $posts
    ], 200);
    }

    
    public function deletepost($data){
        $user = Auth::user(); 
    if (!$user) {
        return response()->json(['msg' => false, 'message' => 'Unauthenticated'], 401);
    }

    $post = Post::find($data['post_id']);

    if (!$post) {
        return response()->json(['msg' => false, 'message' => 'Post not found'], 404);
    }

    // Check if the authenticated user is the owner of the post
    if ($post->user_id !== $user->id) {
        return response()->json(['msg' => false, 'message' => 'Unauthorized'], 403);
    }

  
    $post->delete();

    return response()->json([
        'msg' => true,
        'message' => 'Post deleted successfully'
    ], 200);
    }
}
