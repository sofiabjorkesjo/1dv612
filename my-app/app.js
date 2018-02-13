const express = require('express');
const main = require('./routes/main.js');
const app = express();
const http = require('http');
let passport = require('passport');
let strategy = require('passport-github').Strategy;
const port = process.env.PORT || 5000;


passport.use(new strategy({
  clientID: '80168115df9ea9d87e1f',
  clientSecret: '5a1aafce5111dc000f94b189de7043cfb3e2cc09',
  callbackURL: 'http://localhost:3000/dashboard'
},
function(accessToken, refreshToken, profile, cb) {
  console.log('ssss');
  User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
  });
}

));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
      console.log('test');
      cb(err, user)
  })
});

app.use(passport.initialize());
app.use(passport.session());
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



