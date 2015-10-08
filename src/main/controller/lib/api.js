var fs = require('fs')
var path=require('path');
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
    res.send([GoogleConnector,AmazonConnector,FacebookConnector,EbayConnector,Function]); 
} 

/**
   Lists all files in user directories
   *** need user profile info
*/
var listFilesInDirectory = function(req,res){
	console.log("i am here in")
	var items = fs.readdirSync(dir);
	var files  = []
	for (var i in items){
        var name = dir + '/' + items[i];
        console.log(name)
        if (!(fs.statSync(name).isDirectory())){
            files.push(items[i]);
        } 
    }
    console.log("files",files)
    res.status(200).json(files);
}

module.exports.getComponents = getComponents;