var controller = require('../../controller')
module.exports = function (app, passport) {
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/home',
    //     // redirect to the secure apps section
    //     failureRedirect: '/',
    //     // redirect back to the signup page if there is an error
    //     failureFlash: true  // allow flash messages
    // }));
    app.post('/login',function(req,res,next){
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            // Redirect if it fails
            if (!user) { return res.redirect('/' + '?message=invalid email or password'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                // Redirect if it succeeds
                return res.redirect('/home');
            });
        })(req, res, next);
    })

};