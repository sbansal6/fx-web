var controller = require('../../controller')


module.exports = function (app,isLoggedIn) {
  // =====================================
  // APPLICATION PAGE (with logout links)
  // =====================================
  app.get('/home', isLoggedIn ,controller.home.main);
  app.get('/decode',isLoggedIn,controller.home.decode);
  //app.get('/encode',isLoggedIn,controller.application.encode);
  app.get('/google',isLoggedIn,controller.home.google);
 };