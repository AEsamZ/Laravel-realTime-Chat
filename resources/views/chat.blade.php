<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
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
            <div class="offset-4">
  <li class="list-group-item active">Chat Rooms</li>

        <ul class="list-group">
  <message v-for="value in chat.message">
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