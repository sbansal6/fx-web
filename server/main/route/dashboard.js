var async = require('async');
var nodeService = require('../services/node.service');
var feedLineModel = require('../model/feedline');

module.exports = function(app, isLoggedIn) {
    app.get('/dashboard', isLoggedIn, function(req, res) {
        async.series([
            // get connectors
            function(cb){
                nodeService.getConnectors(req.user._id,cb)
            },
            // get feedlines
            function(cb){
                feedLineModel.find({userId:req.user._id},cb)
            }
            ],
           function(err,results){
               //console.log('dashboard',results[0],results[1]);
                res.render('dashboard.ejs', {
                        title: 'FeedExchange - dashboard',
                        userEmail: req.user.email,
                        connectors: results[0],
                        feedlines:results[1]
                });
        });
    });
};