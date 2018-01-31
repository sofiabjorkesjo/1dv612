const express = require('express');
const expressHandlebars = require('express-handlebars');


const app = express();
const port = process.env.PORT || 5000;



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// app.engine('.hbs', expressHandlebars({
//     defaultLayout: 'default',
//     extname: 'hbs'
// }));

// app.set('view-engine', 'hbs');
// app.use('/', require('./routes/main'));

// app.use(express.static(path.join(__dirname, 'client')));
// app.get('/', function(req, res) {
//     //res.sendFile(path.join(__dirname, 'client', 'index.html'));
//     res.render('client/public/index.html');
// });
//app.set('views', './client/build');
app.listen(port, () => console.log('Started on ' + port));