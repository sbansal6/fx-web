var nodeService = require('../services/node.service');


module.exports = function(app, isLoggedIn) {
    app.get('/dashboard', isLoggedIn, function(req, res) {
        console.log('dashboard',req.user._id);
        nodeService.getConnectors(req.user._id, function(err, connectors) {
            if (err) {
                res.status(500);
            } else {
                res.render('dashboard2.ejs', {
                    title: 'FeedExchange - dashboard',
                    connectors: connectors
                });
            }
        });
    });
};