var controller = require('../../controller')


module.exports = function (app,isLoggedIn) {
  // =====================================
  // APPLICATION PAGE (with logout links)
  // =====================================
  app.get('/application', isLoggedIn ,controller.application.main);
  
 };