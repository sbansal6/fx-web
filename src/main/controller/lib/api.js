var components = require('../../components');

/*
*  Returns all components via api call
   ******* Remove all rules engine logic..dont send that via api. its bread and butter
           Romove as much as u can

*/
var getComponents = function(req,res){
	var FileSource = new components.FileSource();
	var GoogleConnector = new components.GoogleConnector();
	var AmazonConnector = new components.AmazonConnector();
    res.send([FileSource,GoogleConnector.AmazonConnector]); 
} 

module.exports.getComponents = getComponents;