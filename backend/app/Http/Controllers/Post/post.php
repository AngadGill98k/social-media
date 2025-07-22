<?php
namespace App\Http\Controllers\Post;

use App\Services\Post\postservices;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class post extends Controller{
    public function getallpost(Request $request){
     
        $res=(new postservices)->getallpost();
        return $res;
    }
    public function newpost(Request $request){
        $data=$request->all();
        $res=(new postservices)->newpost($data);
        return $res;
    }
    public function retpost(Request $request){
       
        $res=(new postservices)->retpost();
        return $res;
    }
    public function deletepost(Request $request){
        $data=$request->all();
        $res=(new postservices)->deletepost($data);
        return $res;
    }
    
}