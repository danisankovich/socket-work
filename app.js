var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});
server.listen(3000, function(){
  console.log('Chat it up on localhost:3000');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('user enter', function(msg) {
    io.emit('user enter', msg);
    console.log("someone\'s entered")
  });
  socket.on('user leave', function(msg) {
    io.emit('user leave', msg);
    console.log('user disconnected');
  });
  socket.on('user typing', function(msg) {
    io.emit('user typing', msg);
    console.log('typing')
  });
});
