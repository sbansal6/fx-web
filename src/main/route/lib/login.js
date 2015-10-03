var controller = require('../../controller')
module.exports = function (app, passport) {
    app.get('/login', controller.login.main);
    // process the login form

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/application',
        // redirect to the secure apps section
        failureRedirect: '/login',
        // redirect back to the signup page if there is an error
        failureFlash: true  // allow flash messages
    }));
};