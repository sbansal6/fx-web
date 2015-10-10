var main = function (req, res, next) {
  var userProfile = req.user ;
  var requestParameters = ""
  		res.render('flow', { 
        title: 'FeedStage Studio',
        user:req.user, })  
 };


module.exports.main = main; 
