var nodeService = require('../services/node.service');


module.exports = function(app, isLoggedIn) {
    app.get('/dashboard', isLoggedIn, function(req, res) {
        nodeService.getConnectors(req.user._id, function(err, connectors) {
            if (err) {
                res.status(500);
            } else {
                res.render('dashboard.ejs', {
                    title: 'FeedExchange - dashboard',
                    userEmail: req.user.email,
                    connectors: connectors
                });
            }
        });
    });
};