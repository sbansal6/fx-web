// SDK REQUIRES
var LocalStrategy = require('passport-local').Strategy;
var _ = require('underscore');
var env = process.env.NODE_ENV || 'develop';

// load up the client model
var User = require('../../model').user;
var FeedLine  = require('../../model').feedline;
var nodeService  = require('../../services/node.service');

/**
 * Add basic tools to user on signup
 * @param newUser
 * @param cb
 */
function initializeTools(newUser,cb){
    var userTools = new Tools();
    var googleInitialNodes = [];
    var fileNode = nodeService.getNodeUIStructure('File');
    var googleDestinationNode = nodeService.getNodeUIStructure('Google');
    fileNode.isCoreNode = true;
    googleDestinationNode.isCoreNode = true;
    googleInitialNodes.push(fileNode);
    googleInitialNodes.push(googleDestinationNode);
    googleInitialNodes.push(nodeService.getNodeUIStructure('Replace'));
    googleInitialNodes.push(nodeService.getNodeUIStructure('SubString'));
    userTools.userId = newUser._id
    userTools.tools = [
                { name: "google", settings:{}, "canvas":{}, nodes: googleInitialNodes,"chart":[
                    [ 'Record', 'Valid', 'Invalid' ],
                    [ 'id', 0, 10000 ],
                    [ 'title', 0, 10000 ] ]}
    ]
    //todo :- add positionX and positionY as per elements in array
    userTools.save(function(err){
        err ? cb(err) : cb(null,newUser);
     })
}

// expose this function to our app using module.exports
module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message:'That email is already taken.'});
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser  = new User();

                        // set the user's local credentials
                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);

                        // save the user
                        newUser.register(newUser,function(err) {
                            if (err) {
                                return done(err);
                            } else {
                                return done(null,newUser);
                             }
                        });
                    }

                });

            });

        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        if (env === 'develop'){
            email = 'test@gmail.com';
            password = 'test';
            console.log('signing in as develop env')
        }
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) {
                return done(err);            
            }
            // if no user is found, return the message
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
             }
                
            // if the user is found but the password is wrong
            if (!user.isValidPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            return done(null, user);
        });

    }));
};