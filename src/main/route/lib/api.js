var controller = require('../../controller')

module.exports = function (app,isLoggedIn) {
 app.get('/api/components',isLoggedIn ,controller.api.getComponents); 
 app.get('/api/files',isLoggedIn ,controller.api.listFilesInDirectory);
 app.get('/api/fileheaders',isLoggedIn ,controller.api.getHeaders);
 app.get('/api/getflows',isLoggedIn,controller.api.getFlows);
 app.post('/api/saveflow',isLoggedIn,controller.api.saveFlow);
 app.get('/api/analyzeflow',isLoggedIn,controller.api.analyzeFlow);
};