var express = require('express');
var db = require('../models');
var router = express.Router();
var Hashids = require('hashids');
var hashids = new Hashids(process.env.HASH_ID);

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/new/:largeFile/:hash', function(req, res) {
  console.log("CREATING NEW", req.params.largeFile);
  db.link.findOrCreate({
    where: { magnet: req.params.hash },
    defaults: {
      owner: req.user ? req.user.id : null,
      uniqueClick: 0,
      isLarge: Boolean(parseInt(req.params.largeFile))
    }
  }).spread(function(data, created) {
    console.log("DATA: ", data);
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

    res.render('download', {magnet: data.magnet, isLarge: data.isLarge});
  }).catch(function(error) {
    // console.log('error occurred in /:id ', error.message);
    req.flash('link error');
    // res.send('link error');
    res.redirect('/');
  });
});

module.exports = router;
