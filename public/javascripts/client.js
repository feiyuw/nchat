var socket = io();

$('form').submit(function(){
  socket.emit('message', $('#m').val());
  $('#messages').append($('<li>').text('me: ' + $('#m').val()));
  $('#m').val('');
  return false;
});

socket.on('message', function(msg) {
  $('#messages').append($('<li>').text(msg.user + ': ' + msg.body));
});

socket.on('hi', function(userName) {
  $('#messages').append($('<li>').text('User ' + userName + ' connected!'));
});

socket.on('bye', function(userName) {
  $('#messages').append($('<li>').text('User ' + userName + ' left!'));
});
