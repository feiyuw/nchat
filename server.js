var debug = require('debug')('nchat');

function startServer(app) {
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var nickNames = {};

  io.on('connection', function(socket) {
    socket.on('message', function(msg) {
      if (nickNames[socket.id] == null) {
        nickNames[socket.id] = msg;
        socket.broadcast.emit('hi', msg);
      } else {
        socket.broadcast.emit('message', {'user': nickNames[socket.id], 'body': msg});
      }
    });
    socket.on('disconnect', function() {
      socket.broadcast.emit('bye', nickNames[socket.id]);
      delete(nickNames[socket.id]);
    });
  });

  var server = http.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });

  return server;
}

module.exports.startServer = startServer;
