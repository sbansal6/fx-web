var Node = require('../../model').node;
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
   app.get('/api/feedline',isLoggedIn,function(req,res){

   })

    /**
    * List all actvities related to this user
       */
   app.get('/api/activity',isLoggedIn,function(req,res){

   })

   /**
   * Add a new connector to the system
   */ 
   app.post('/api/connector',isLoggedIn,function(req,res){
       var body = req.body;
       console.log('incoming data',body);
       var connector = new Node();
       // convert to connector format and add to database
       res.send({})
   })

};