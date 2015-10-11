var fs = require('fs');
var csv = require('csv');
var Flow = require('../../model').flow;
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
      console.log("flows",flows)
  		res.render('application', { 
        title: 'FeedStage',
        user:req.user,
        flows: flows    
      })
  	}
  })  
};

/*
*  Get all flows for the user
*/
var getFlows  = function(user,cb){
    var userId  = user._id;
    Flow.find({userId:userId},function(err,flows){
      if (err) {
        retrun cb(err)
      } else {
        return cb(null,flows)
      }
    })
}

module.exports.main = main; 

