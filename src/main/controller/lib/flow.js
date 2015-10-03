var main = function (req, res, next) {
  var userProfile = req.user ;
  var requestParameters = ""
  		res.render('flow', { 
        title: 'FeedStage',
        user:req.user, })  
 };


module.exports.main = main; 
