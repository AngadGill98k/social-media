<?php

namespace App\Services\Chat;

use App\Models\User;
use App\Models\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Chat;
use App\Models\Friendship;
use Illuminate\Support\Facades\Log;
use App\Models\Message;
use Illuminate\Support\Facades\Http;
class chatservices
{
    public function search_user($data)
    {
        $name = $data['value'] ?? null;

        if (!$name) {
            return response()->json([
                'msg' => false,
                'message' => 'Email is required'
            ], 400);
        }

        $user = User::where('name', $name)->first();

        if ($user) {
            return response()->json([
                'msg' => true,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'msg' => false,
                'message' => 'User not found'
            ], 404);
        }
    }
    public function send_req($data)
    {

        $sender_id = Auth::id();
        $receiver_id = $data['id'] ?? null;






        // Basic validation
        if (!$sender_id || !$receiver_id) {
            return response()->json([
                'msg' => false,
                'message' => 'Sender and Receiver IDs are required',
                'sender id' => $sender_id
            ], 400);
        }

        // Prevent sending request to self
        if ($sender_id == $receiver_id) {
            return response()->json([
                'msg' => false,
                'message' => 'You cannot send a request to yourself'
            ], 422);
        }

        // Check if the request already exists
        $existing = Request::where('sender_id', $sender_id)
            ->where('receiver_id', $receiver_id)
            ->first();

        if ($existing) {
            return response()->json([
                'msg' => false,
                'message' => 'Request already sent'
            ], 409);
        }

        // Create the request
        $request = Request::create([
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'status' => 'pending'
        ]);

        return response()->json([
            'msg' => true,
            'message' => 'Friend request sent',
            'request' => $request
        ], 201);
    }
    public function ret_req()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'msg' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        $user_id = $user->id;

        // Get all requests where this user is the receiver
        $requests = Request::with('sender')
            ->where('receiver_id', $user_id)
            ->get();

        return response()->json([
            'msg' => true,
            'user_id' => $user_id,
            'requests' => $requests
        ]);
    }
    public function update_status($data)
    {
        $requestId = $data['id'];
        $status = $data['status']; // should be 'accepted' or 'rejected'

        $request = Request::find($requestId);

        if (!$request) {
            return response()->json([
                'msg' => false,
                'message' => 'Request not found'
            ], 404);
        }

        // Check if the status is valid
        if (!in_array($status, ['accepted', 'rejected'])) {
            return response()->json([
                'msg' => false,
                'message' => 'Invalid status'
            ], 400);
        }

        // Update the request status
        $request->status = $status;
        $request->save();

        // If accepted, create friendships and chat
        if ($status === 'accepted') {


            try {
                // Add both friendships (bidirectional)
                Friendship::create([
                    'user_id' => $request->sender_id,
                    'friend_id' => $request->receiver_id,
                ]);

                Friendship::create([
                    'user_id' => $request->receiver_id,
                    'friend_id' => $request->sender_id,
                ]);

                // Create the chat room
                Chat::create([
                    'user_1' => $request->sender_id,
                    'user_2' => $request->receiver_id,
                ]);

                $request->delete();

                return response()->json([
                    'msg' => true,
                    'message' => 'Request accepted. Friendship and chat created.'
                ]);
            } catch (\Exception $e) {


                return response()->json([
                    'msg' => false,
                    'message' => 'Error occurred: ' . $e->getMessage()
                ], 500);
            }
        }
        $request->delete();
        return response()->json([
            'msg' => true,
            'message' => 'Request status updated to ' . $status
        ]);
    }
    public function ret_list()
    {
        $userId = Auth::id(); // Get logged-in user's ID

        // Get all friend IDs (bi-directional)
        $friendIds = Friendship::where('user_id', $userId)
            ->pluck('friend_id')
            ->merge(
                Friendship::where('friend_id', $userId)->pluck('user_id')
            );

        // Fetch all friend user details
        $friends = User::whereIn('id', $friendIds)->get();
        if ($friends) {

            return response()->json(["msg" => true, "list" => $friends]);
        } else {
            return response()->json($friends);
            return response()->json(["msg" => false]);
        }
    }

    public function join_room($data)
    {
        $userId = Auth::id();
        $friendId = $data['id'];
        $chatroom = Chat::where(function ($query) use ($userId, $friendId) {
            $query->where('user_1', $userId)
                ->where('user_2', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_1', $friendId)
                ->where('user_2', $userId);
        })->first();


        $chatroomid = $chatroom->id;
        $messages = Message::where('chatroom_id', $chatroomid)
            ->orderBy('created_at')
            ->get();




        if ($messages !== null) {
            return response()->json([
                "msg" => true,
                "chatroom_id" => $chatroomid,
                "messages" => $messages
            ]);
        } else {
            return response()->json(["msg" => false]);
        }
    }

    public function save_msg($data)
    {
        $userId = Auth::id();
        $user = User::find($userId);
        $senderName = $user ? $user->name : 'Unknown';
        $msg = $data['msg'];
        $chatroomid = $data['chatroomid'];
        // Validate input
        if (!$userId || !$msg || !$chatroomid) {
            return response()->json(['msg' => false, 'error' => 'Missing data'], 400);
        }

        $message = new Message();
        $message->chatroom_id = $chatroomid;
        $message->sender_id = $userId;
        $message->msg = $msg;
        $message->save();

         Http::post('http://localhost:3001/broadcast_message', [
        'chatroom_id' => $chatroomid,
        'sender_id' => $userId,
        'sender_name' => $senderName,
        'msg' => $msg,
        'created_at' => $message->created_at->toISOString(),
    ]);

        return response()->json(['msg' => true, 'message_' => $message]);
    }
}
