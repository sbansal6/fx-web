module.exports = function (app) {
  // =====================================
  // Logout PAGE 
  // =====================================
  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });
};