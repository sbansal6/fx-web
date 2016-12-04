var feedlineModel =  require('../model/feedline');

module.exports = function(app, isLoggedIn) {
    
    app.get('/feedline', isLoggedIn, function(req, res) {
        var id = req.query.id ;
        if (!id){
            res.render('feedline.ejs', {
                title: 'FeedExchange - feedline',
                userEmail: req.user.email
            });
        } else {
               feedlineModel.find({id:id},function(err,doc){
                   console.log('returned feedline',JSON.stringify(doc));
                   res.render('feedline.ejs', {
                        title: 'FeedExchange - feedline',
                        userEmail: req.user.email,
                        chartData:doc
               });
            })
        }
    });
    
    
    // insert update feedline state
    app.post('/feedline',isLoggedIn,function(req,res){
        var reqBody = req.body;
        feedlineModel.findOneAndUpdate(
            {id:reqBody.id},
            {userId:req.user._id,name:reqBody.name,id:reqBody.id,chartData:reqBody.chartData},
            {upsert:true},function(err,doc){
                res.send({status:"saved"});
        })
    })
}