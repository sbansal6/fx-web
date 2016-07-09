var controller = require('../../controller')


module.exports = function (app,isLoggedIn) {
  // =====================================
  // APPLICATION PAGE (with logout links)
  // =====================================
  app.get('/application', isLoggedIn ,controller.application.main);
  app.get('/decode',isLoggedIn,controller.application.decode);
  //app.get('/encode',isLoggedIn,controller.application.encode);
  //app.get('/google',isLoggedIn,controller.application.google);
 };