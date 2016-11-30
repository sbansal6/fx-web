module.exports = function(app, isLoggedIn) {
    app.get('/feedline', isLoggedIn, function(req, res) {
    res.render('feedline2.ejs', {
                    title: 'FeedExchange - feedline',
                    connectors: ''
                });
        
    })
}