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

module.exports.getComponents = getComponents;