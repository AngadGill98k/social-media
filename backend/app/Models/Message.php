<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['chatroom_id', 'sender_id', 'msg'];

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chatroom_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
