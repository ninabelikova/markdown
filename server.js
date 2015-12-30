var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// routes stuff
app.get('/', function(req, res) {
  res.render('pad');
});

app.get('/(:id)', function(req, res) {
  res.render('pad');
})

// sharejs stuff
var sharejs = require('share');
require('redis');

var options = {
  db: {type: 'redis'},
};

sharejs.server.attach(app, options);

// listen

var port = process.env.PORT || 8000;
app.listen(port);
