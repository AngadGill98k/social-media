<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = ['user_1', 'user_2'];

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_2');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'chatroom_id');
    }
}

