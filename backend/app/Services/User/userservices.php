<?php
namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class userservices{
    public function signup(array $data){
        $validator = Validator::make($data, [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:users',
        'pass' => 'required|string',
    ]);
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors(),'msg'=>false], 422);
    }
    $user=User::create([
        'name'=>$data['name'],
        'email'=>$data['email'],
        'password'=> bcrypt($data['pass'])
    ]);
    return response()->json(['msg'=>true]);
    }


    public function signin(array $data){
        $credentials = [
        'email' => $data['email'],
        'password' => $data['pass'],
    ];
    if (Auth::attempt($credentials)) {   
        session()->regenerate();
        return response()->json([
            'message' => 'Login successful',
            'msg'=>true
        ], 200);
    } else {
        return response()->json(['error' => 'Invalid credentials','msg'=>false], 401);
    }
    }
}