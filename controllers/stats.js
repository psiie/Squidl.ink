var express = require('express');
var db = require('../models');
var router = express.Router();

router.put('/:ul/:dl/:created', function(req, res) {
  console.log('entered inside');

  db.user.find({
    where: { id: req.user.id }
  }).then(function(profile) {
    req.params.ul > 0 ? profile.uploaded = parseInt(profile.uploaded) + parseInt(req.params.ul) : false;
    req.params.dl > 0 ? profile.downloaded = parseInt(profile.downloaded) + parseInt(req.params.dl) : false;
    req.params.created > 0 ? profile.created += 1 : false;
    profile.save();
  }).catch(function(err) {
    res.send('error updating user stats')
  })
})

module.exports = router;
