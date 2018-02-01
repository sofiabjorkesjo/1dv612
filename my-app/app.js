const express = require('express');
const expressHandlebars = require('express-handlebars');
const main = require('./routes/main.js');

const app = express();
const port = process.env.PORT || 5000;

app.use('/main', main);

app.listen(port, function() {
  console.log('Started on ' + port
)});