var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;

  db.user.findOrCreate({
    where: { email: email },
    defaults: {
      name: name,
      password: password
    }
  }).spread(function(user, created) {
    if (created) {
      res.redirect('/');
    } else {
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

module.exports = router;
