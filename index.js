var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello Backend!');
});

app.listen(3000);

module.exports = app;
