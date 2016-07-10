var controller = require('../../controller')
module.exports = function (app, passport) {
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home',
        // redirect to the secure apps section
        failureRedirect: '/',
        // redirect back to the signup page if there is an error
        failureFlash: true  // allow flash messages
    }));
};