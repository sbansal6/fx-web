var controller = require('../../controller')


module.exports = function (app,isLoggedIn) {
  // =====================================
  // APPLICATION PAGE (with logout links)
  // =====================================
  app.get('/flow'
  	, isLoggedIn 
  	,controller.flow.main);  
};