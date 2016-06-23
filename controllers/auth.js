var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {

  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      console.log('user created');
      res.redirect('/');
    } else {
      console.log('user with that email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('error occurred', error.message);
    res.redirect('/auth/signup');
  });

});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

module.exports = router;
