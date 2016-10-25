module.exports = function(app, isLoggedIn) {
    app.get('/feedline', isLoggedIn, function(req, res) {
    res.render('feedline.ejs', {
                    title: 'FeedExchange - feedline',
                    connectors: ''
                });
        
    })
}