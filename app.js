// Generated by CoffeeScript 1.7.1
(function() {
  var app, express, fs, http, io, masterSocket, server, _;

  fs = require("fs");

  express = require('express');

  _ = require("lodash");

  app = express();

  app.use(express["static"](__dirname + '/client'));

  http = require('http');

  server = http.createServer(app);

  io = require('socket.io').listen(server);

  server.listen(process.env.PORT || 5000);

  masterSocket = null;

  io.sockets.on('connection', function(socket) {
    socket.on('master', function() {
      console.log('master connected');
      return masterSocket = socket;
    });
    socket.on('move', function(data) {
      console.log('move event', data);
      return masterSocket != null ? masterSocket.emit("move", data) : void 0;
    });
    socket.on('stop', function(data) {
      console.log('stop event', data);
      return masterSocket != null ? masterSocket.emit("stop", data) : void 0;
    });
    socket.on('fire', function(data) {
      console.log('fire event', data);
      return masterSocket != null ? masterSocket.emit("fire", data) : void 0;
    });
    socket.on('colorAssigned', function(data) {
      console.log('colorAssigned', data);
      return io.sockets.emit("colorAssigned", data);
    });
    socket.on('scoreUpdated', function(data) {
      console.log('scoreUpdated', data);
      return io.sockets.emit("scoreUpdated", data);
    });
    socket.on('connected', function(data) {
      console.log('new user connected', data);
      return masterSocket != null ? masterSocket.emit("connected", data) : void 0;
    });
    return socket.on('disconnect', function() {
      console.log('userDisconnected');
      return masterSocket != null ? masterSocket.emit('userDisconnected') : void 0;
    });
  });

}).call(this);

//# sourceMappingURL=app.map
