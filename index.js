var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log("server đang chạy ");

io.on('connection', function(socket){

  console.log('có thiết bị kết nối');

  socket.on('connect user', function(user){
    console.log("kết nối user");
    io.emit('connect user', user);
  });

  socket.on('on typing', function(typing){
    console.log("đang nhập văn bản... ");
    io.emit('on typing', typing);
  });

  socket.on('chat message', function(msg){
    console.log("Message " + msg['message']);
    io.emit('chat message', msg);
  });
});

// http.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });