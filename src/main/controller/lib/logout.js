var main = function (req, res) {
  req.logout();
  res.redirect('/login');
};
module.exports.main = main;