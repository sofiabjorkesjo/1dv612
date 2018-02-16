const express = require('express');
const main = require('./routes/main.js');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;

app.use('/main', main);

let server = http.createServer(app).listen(port, function() {
  console.log('Started on ' + port);
});

let socket = require('socket.io')(server);

socket.on('connection', function() {
  console.log('hhh');
 // socket.emit('message', 'You are connected to sockets');
 // socket.on('disconnected', function () {
   //   console.log('disconnected socket');
 // });
});



