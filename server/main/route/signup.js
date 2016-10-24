module.exports = function (app, passport) {
    
    app.get('/signup', function(req,res){
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            title: 'Signup',
            message: req.flash('signupMessage')
        });
    });
    
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