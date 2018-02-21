const express = require('express');
const main = require('./routes/main.js');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
//let env = require('env2')('.env');
const port = process.env.PORT || 5000;

app.use('/main', main);
app.use(bodyParser.json());
app.use(cors());

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



