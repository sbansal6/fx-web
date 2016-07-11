var controller = require('../../controller')
module.exports = function (app, passport) {
    app.get('/signup', controller.signup.main);
    // process the login form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        // redirect to the secure apps section
        failureRedirect: '/signup',
        // redirect back to the signup page if there is an error
        failureFlash: true  // allow flash messages
    }));
};