<?php
namespace App\Http\Controllers\UserAuth;

use App\Http\Controllers\Controller;
use App\Services\User\userservices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class usercontroller extends Controller{
    public function signin(Request $request){
        $data=$request->all();
      Log::info('Signin request data:', $data);
        $res=(new userservices )->signin($data);
         Log::info($res);
        return $res;
    }
    public function signup(Request $request){
        $data=$request->all();
        Log::info('Signup request data:', $data);
        $res=(new userservices)->signup($data);
        Log::info($res);
        return $res;
    }
 


}