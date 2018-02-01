const express = require('express');
const expressHandlebars = require('express-handlebars');


const app = express();
const port = process.env.PORT || 5000;

app.get('/hej', (req, res) => {
  res.send({ express: 'Heeej' });
});

app.listen(port, function() {
  console.log('Started on ' + port
)});