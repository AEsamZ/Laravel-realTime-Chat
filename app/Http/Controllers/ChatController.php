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

    public function send(Request $request){
        $user=User::find(Auth::id());
        $this->saveToSession($request);
        event(new ChatEvent($request->message,$user));
    }

    public function saveToSession(Request $request){
        session()->put('chat',$request->chat);
    }

    public function getOldMsgs(){
        return session('chat');
    }

    public function deleteChat()
    {
    	session()->forget('chat');
    }

}
