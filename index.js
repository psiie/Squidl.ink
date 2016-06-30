var express = require('express');
var db = require('./models');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/profile', isLoggedIn, function(req, res) {


  var qClicked;
  query = 'SELECT SUM(links."uniqueClick") FROM links INNER JOIN users ON users.id = CAST(links.owner as integer) WHERE CAST(links.owner as integer) =' +
  req.user.id + ';'
  db.sequelize.query(query)
    .spread(function(results, metadata) {
      qClicked = results[0].sum;
    }).catch(function(err) {
      console.log('error in profile sum query', err);
    });


  db.user.find({
    where: { id: req.user.id }
  }).then(function(info) {
    res.render('profile', {linksClicked: qClicked});
  }).catch(function(error) {
    console.log(error);
    res.send('server error');
  });

});

// app.get('/', function(req, res) {
//   res.render('index');
// });

app.use('/stats', isLoggedIn, require('./controllers/stats'));
app.use('/auth', require('./controllers/auth'));
app.use('/', require('./controllers/root'));

var server = app.listen(process.env.PORT || 3005);

module.exports = server;
