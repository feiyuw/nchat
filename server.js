var debug = require('debug')('nchat');

function startServer(app) {
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  io.on('connection', function(socket) {
    io.emit('chat message', socket.id + ' connected!');
    socket.on('chat message', function(msg) {
      io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
      io.emit('chat message', socket.id + ' disconnected!');
    });
  });

  var server = http.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });

  return server;
}

module.exports.startServer = startServer;
