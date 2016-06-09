module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('warning', 'You must be logged in to access that page');
    res.redirect('/auth/login');
  } else {
    next();
  }
};
