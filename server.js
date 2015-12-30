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



// set up redis server
var redis_client;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  redis_client = require("redis").createClient(rtg.port, rtg.hostname);
  redis_client.auth(rtg.auth.split(":")[1]);
} else {
  redis_client = require("redis").createClient();
}

// set up the sharejs

var options = {
  db: {type: 'redis', client: redis_client},
};

sharejs.server.attach(app, options);


// listen

var port = process.env.PORT || 8000;
app.listen(port);
