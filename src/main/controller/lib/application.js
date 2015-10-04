var fs = require('fs');
var csv = require('csv');
var response  = require('fx-response');

/*
* main controller for /application route
*/
var main = function (req, res, next) {
  var userProfile = req.user ;
  getFlows(userProfile,function(err,flows){
  	if (err) {
  		return next(new error.InternalServerError(500, err));
  	} else {
  		res.render('application', { 
        title: 'FeedStage',
        user:req.user,
        flows: flows    
      })
  	}

  })  
};

/**
*  Get all flows associated to this user 
*/
var getFlows = function(userProfile,getFlowsCb){
    var flows = [1]
    getFlowsCb(null,flows) ;
}

module.exports.main = main; 

