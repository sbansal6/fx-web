var controller = require('../../controller')
var decode = require('urldecode');

module.exports = function (app,isLoggedIn) {
 app.get('/api/components',isLoggedIn ,controller.api.getComponents);
 app.get('/api/files',isLoggedIn ,controller.api.listFilesInDirectory);
 app.get('/api/fileheaders',isLoggedIn ,controller.api.getHeaders);
 app.get('/api/getflows',isLoggedIn,controller.api.getFlows);
 app.post('/api/saveflow',isLoggedIn,controller.api.saveFlow);
 app.get('/api/analyzeflow',isLoggedIn,controller.api.analyzeFlow);

 app.post('/decode',isLoggedIn,function (req,res) {
  console.log(req.body)
  var data = req.body.data;
  var lines = data.split('\n');
  var outlines = [];
  lines.forEach(function(l){
   outlines.push(decode(l))
  })
  res.send(outlines.join('\n'));
 })

 /**
  * Returns all feedlines tied to this user
     */
 app.get('api/feedlines',isLoggedIn,function(req,res){

 })

 /**
  * List all actvities related to this user
     */
 app.get('api/activity',isLoggedIn,function(req,res){

 })

};