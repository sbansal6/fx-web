var main = function (req, res) {
  req.logout();
  res.redirect('/');
};
module.exports.main = main;