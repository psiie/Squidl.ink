var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../models');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.user.findById(id)
    .then(function(user) {
      cb(null, user);
    }).catch(cb);
});

// username password field from the form!
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: { email: email }
  }).then(function(user) {
    if (user && user.validPassword(password)) {
      cb(null, user);
    } else {
      cb(null, false);
    }
  }).catch(cb);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.BASE_URL + 'auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email']
}, function(accessToken, refreshToken, profile, cb) {
  console.log('USER PROFILE------: ', profile);
  db.user.findOrCreate({
    where: { facebookId: profile.id },
    defaults: {
      name: profile.displayName,
      email: profile.email
    }
  }).spread(function(user, created) {
    user.facebookToken = accessToken;
    user.save();
    // user.facebookId = 27;
    console.log("UUUUUUUSSSSSSSEEEEEEERRRRRRR: ", profile.id, profile.displayName);
    console.log("facebookToken: ", accessToken);
    return cb(null, user);
  }).catch(function(err) {
    return cb(err, null);
  })
}

))

module.exports = passport;
