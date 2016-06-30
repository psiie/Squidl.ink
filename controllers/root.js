var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require('hashids');
var hashids = new Hashids('3pLtFMMGbTFfk9kFP1xafNnn0SoKS379HMfhCjKt');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/new/:hash', function(req, res) {
  db.link.findOrCreate({
    where: { magnet: req.params.hash },
    defaults: {
      owner: req.user ? req.user.id : null,
      uniqueClick: 0
    }
  }).spread(function(data, created) {

    var idHash = hashids.encode(data.id);
    res.send({msg:'success', id: idHash });
  }).catch(function(error) {
    console.log('error occurred in /new/:hash ', error.message);
    res.send({msg:'error'});
  });
});

router.get('/:id', function(req, res) {
  var hashId = hashids.decode(req.params.id);
  db.link.find({
    where: { id: hashId }
  }).then(function(data) {
    data.uniqueClick += 1;
    data.save();

    res.render('download', {magnet: data.magnet});
  }).catch(function(error) {
    // console.log('error occurred in /:id ', error.message);
    req.flash('link error');
    // res.send('link error');
    res.redirect('/');
  });
});

module.exports = router;
