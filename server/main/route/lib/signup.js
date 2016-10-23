var controller = require('../../controller')
module.exports = function (app, passport) {
    app.get('/signup', controller.signup.main);
    app.post('/signup',function(req,res,next){
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err); }
            // Redirect if it fails
            if (!user) { return res.redirect('/' + '?signUpError=That email is already taken.'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                // Redirect if it succeeds
                return res.redirect('/home');
            });
        })(req, res, next);
    })

};