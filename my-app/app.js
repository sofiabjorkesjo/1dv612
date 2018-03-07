const express = require('express');
//const main = require('./routes/main.js');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
let database = require('./config/database');
// const ngrok = require('ngrok');
// const url = await ngrok.connect();
//let env = require('env2')('.env');
const port = process.env.PORT || 5000;

database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
let server = http.createServer(app).listen(port, function() {
  console.log('Started on ' + port);
});
app.use(cors());
let io = require('socket.io')(server);
app.use('/main',require('./routes/main.js')(io));


// io.on('connection', function(socket) {
//   console.log('socket connection');
//    socket.join('room');
//    io.sockets.in('room').emit('connectToRoom', 'in the room');

//   socket.on('disconnected', function () {
//      console.log('disconnected socket');
//  });
// });




