var fs = require('fs')
var path=require('path');
var csv = require('csv');
var Flow = require('../../model').flow;
var components = require('../../components');

/*
*  Returns all components via api call
   ******* Remove all rules engine logic..dont send that via api. its bread and butter
           Romove as much as u can

*/
var getComponents = function(req,res){
	var FileSourceConnector = new components.FileSourceConnector();
	var GoogleConnector = new components.GoogleConnector();
	var AmazonConnector = new components.AmazonConnector();
	var FacebookConnector = new components.FacebookConnector();
	var EbayConnector = new components.EbayConnector();
	var Function = new components.Function();
    res.send([FileSourceConnector,GoogleConnector,AmazonConnector,FacebookConnector,EbayConnector,Function]); 
} 

/*
*  Get all flows for the user
*/
var getFlows  = function(req,res){
    var userId  = req.user._id;
    Flow.find({userId:userId},function(err,flows){
      if (err) {
        res.status(500)
      } else {
        console.log("flows",flows)
        res.status(200).json(flows)
      }

    })
}

/*
* Saving the flow to the database
*/
var saveFlow = function(req,res){
  var userId  = req.user._id ;
  var flowModel =  req.body['model'] ;
  Flow.update({userId:userId,name:flowModel.name}, {$set: {model:flowModel}}, {upsert: true}, function(err){
     if (err){
      console.log("i am in error",err)
      res.status(500)
     } else {
       res.status(200)
     }

  })  
}


/**
   Lists all files in user directories
   *** need user profile info
*/
var listFilesInDirectory = function(req,res){
  var dir = req.user.rootDir
	var items = fs.readdirSync(dir);
	var files  = []
	for (var i in items){
        var name = dir + '/' + items[i];
        if (!(fs.statSync(name).isDirectory())){
            files.push(items[i]);
        } 
    }
    res.status(200).json(files);
}

var getHeaders = function(req,res){
    var dir = req.user.rootDir
    var fileName = req.query["fileName"]
    headers(path.join(dir,fileName),function(err,result){
    if (err){
      res.status(500)
    } else {
      res.status(200).json(result);
    }
    })
}

var headers = function(fileName,cb){
  var input = fs.createReadStream(fileName);
  var n = 0;
  var parser = csv.parse({delimiter: ','})
  input.pipe(parser);
  var hit = false;
  var headers = "";
  var n = 0;
  parser.on('readable', function() {
      n++;
      if (!hit) {
        var first = parser.read();
        headers = first;
        input.unpipe(parser);
        parser.end();
        hit = true;
        cb(null,{headers:headers})
      } 
        })

}

module.exports.getComponents = getComponents;
module.exports.listFilesInDirectory = listFilesInDirectory ;
module.exports.getHeaders = getHeaders ;
module.exports.saveFlow = saveFlow;
module.exports.getFlows = getFlows;