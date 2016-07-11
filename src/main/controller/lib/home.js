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
  		res.render('home', {
        title: 'AdTools - Home',
        user:req.user
      })
  	}
  })  
};

var decode = function(req,res,next){
    res.render('decode', {
        title: 'AdTools - Decode',
        user:req.user
    })
}

var google = function(req,res,next){
    res.render('google', {
        title: 'AdTools - Google',
        user:req.user
    })
}

/*
*  Get all flows for the user
*/
var getFlows  = function(user,cb){
    var userId  = user._id;
    Flow.find({userId:userId},function(err,flows){
      if (err) {
        return cb(err)
      } else {
        return cb(null,flows)
      }
    })
}

module.exports.main = main;
module.exports.decode = decode;
module.exports.google = google;

