const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
let database = require('./config/database');
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





