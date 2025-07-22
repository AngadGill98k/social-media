
<?php

use App\Http\Controllers\Post\post;
use App\Http\Controllers\UserAuth\usercontroller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Chats\chatcontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;


Route::post('/signin',[usercontroller::class,'signin']);
Route::post('/signup',[usercontroller::class,'signup']);
Route::post('/send_req',[chatcontroller::class,'send_req']);
Route::get('/ret_req',[chatcontroller::class,'ret_req']);
Route::put('/update_status',[chatcontroller::class,'update_status']);
Route::get('/ret_list',[chatcontroller::class,'ret_list']);
Route::post('/join_room',[chatcontroller::class,'join_room']);

Route::get('/posts',[post::class,'getallpost']);
Route::post('/new_post',[post::class,'newpost']);
Route::get('/ret_post',[post::class,'retpost']);


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['XSRF-TOKEN' => csrf_token()]);
});
