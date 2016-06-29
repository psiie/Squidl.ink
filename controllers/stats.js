var express = require('express');
var db = require('../models');
var router = express.Router();

router.post('/:ul/:dl/:created', function(req, res) {

  db.user.find({
    where: { id: req.user.id }
  }).then(function(profile) {
    console.log(profile);
    // req.params.ul > 0 ? profile.uploaded += req.params.ul : false;
    // req.params.dl > 0 ? profile.downloaded += req.params.dl : false;
    // req.params.created > 0 ? profile.created += 1 : false;
    profile.created += 1;
    profile.save();
    res.send('success');
  }).catch(function(err) {
    res.send('error updating user stats')
  })
})

module.exports = router;
