<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class ChatController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function chat(){
        return view('chat');
    }

    // public function send(Request $request){
    //     $user=User::find(Auth::id());
    //     event(new ChatEvent($request->message,$user));
    // }

    public function send(){
        $message='hello from send function';
        $user=User::find(Auth::id());
        event(new ChatEvent($message,$user));
    }
}
