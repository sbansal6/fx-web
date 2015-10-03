var controller = require('../../controller')
module.exports = function (app) {
  // =====================================
  // Logout PAGE 
  // =====================================
  app.get('/logout', controller.logout.main);
};