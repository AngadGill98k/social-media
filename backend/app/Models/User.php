<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function posts()
{
    return $this->hasMany(Post::class);
}

public function comments()
{
    return $this->hasMany(Comment::class);
}

public function sentRequests()
{
    return $this->hasMany(Request::class, 'sender_id');
}

public function receivedRequests()
{
    return $this->hasMany(Request::class, 'receiver_id');
}

public function friendships()
{
    return $this->hasMany(Friendship::class);
}

public function messages()
{
    return $this->hasMany(Message::class, 'sender_id');
}

public function chatsAsUser1()
{
    return $this->hasMany(Chat::class, 'user_1');
}

public function chatsAsUser2()
{
    return $this->hasMany(Chat::class, 'user_2');
}

}
