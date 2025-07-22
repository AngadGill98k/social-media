<?php
namespace App\Http\Controllers\Chats;


use App\Http\Controllers\Controller;
use App\Services\Chat\chatservices;
use Illuminate\Http\Request;

class chatcontroller extends Controller{
    public function search_user(Request $request){
        $data=$request->all();
        $res=(new chatservices)->search_user($data);
        return $res;
    }
    public function send_req(Request $request){
        $data=$request->all();
        $res=(new chatservices)->send_req($data);
        return $res;
    }
    public function ret_req(){
        $res=(new chatservices)->ret_req();
        return $res;
    }
    public function update_status(Request $request){
        $data=$request->all();
        $res=(new chatservices)->update_status( $data);
        return $res;
    }
    public function ret_list(){
         $res=(new chatservices)->ret_list();
        return $res;
    }
    public function join_room(Request $request){
        $data=$request->all();
        $res=(new chatservices)->join_room($data);
        return $res;
    }
}