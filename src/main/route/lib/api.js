var controller = require('../../controller')

module.exports = function (app,isLoggedIn) {
 app.get('/api/components',isLoggedIn ,controller.api.getComponents); 
 app.get('/api/files',isLoggedIn ,controller.api.listFilesInDirectory);
 app.get('/api/fileheaders',isLoggedIn ,controller.api.getHeaders);
 app.post('/api/savemodel',controller.api.saveModel);
};