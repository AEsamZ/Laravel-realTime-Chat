<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Chat</title>
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <style>
        .list-group{
            overflow-y:scroll ;
            height: 200px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div id="app" class="row">
            <div class="offset-4 offset-sm-1 col-sm-6">
  <li class="list-group-item active">Chat Rooms</li>
        <div class="badge badge-pill badge-primary">@{{typing}}</div>
        <ul class="list-group" v-chat-scroll>
  <message 
  v-for="value,index in chat.message" :key="value.index" 
  :color=chat.color[index] 
  :user=chat.user[index] 
  :time=chat.time[index]>
      @{{value}}
  </message>
</ul>
<input v-model='message' v-on:keyup.enter='send' type="text" class="form-control" placeholder="type your message">
</div>
        </div>
    </div>
    <script src="{{asset('js/app.js')}}"></script>
</body>

</html>