var controller = require('../../controller')

module.exports = function (app,isLoggedIn) {
 app.get('/api/components',isLoggedIn ,controller.api.getComponents); 
 //app.get('/api/listdirectory',isLoggedIn ,controller.api.listFilesInDirectory);
};