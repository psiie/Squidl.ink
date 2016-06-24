module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash('error', 'You are not logged in');
    res.redirect('/auth/login');
  }
};
