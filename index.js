var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello Backend!');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
