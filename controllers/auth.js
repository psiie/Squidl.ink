var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
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
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
      })(req, res);
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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
