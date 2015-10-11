var Flow = require('../../model').flow;

var main = function (req, res, next) {
  var userProfile = req.user ;
  // get flow id from request if exists
  console.log("params",req.query.id)
  var requestParameters = ""
  		res.render('flow', { 
        title: 'FeedStageStudio',
        user:req.user, 

    })  
 };

var getFlowById = function(){

}

module.exports.main = main; 
