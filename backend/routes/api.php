<?php

use App\Http\Controllers\Post\post;
use App\Http\Controllers\UserAuth\usercontroller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Chats\chatcontroller;







Route::delete('/post_delete',[post::class,'deletepost']);

Route::post('/search_user',[chatcontroller::class,'search_user']);



