var main = function (req, res, next) {
  var userProfile = req.user ;
  console.log("This is my user",userProfile)
  var requestParameters = ""
  		res.render('flow', { 
        title: 'FeedStage Studio',
        user:req.user, })  
 };


module.exports.main = main; 
