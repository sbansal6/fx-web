// SDK REQUIRES
var LocalStrategy = require('passport-local').Strategy;
var _ = require('underscore');

// load up the client model
var User = require('../../model').user;
var Tools  = require('../../model').tools;
var nodes  = require('./nodes');

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function getNode(name){
    var node = _.find(nodes,function(n){
        return n.name === name
    })
    node.nodeId = node.name + '_' +  guid()
    return node;
}

/**
 * Add basic tools to user on signup
 * @param newUser
 * @param cb
 */
function initializeTools(newUser,cb){
    var userTools = new Tools();
    var googleInitialNodes = []
    googleInitialNodes.push(getNode('File'))
    googleInitialNodes.push(getNode('Google'))
    userTools.userId= newUser._id
    userTools.tools = [
                {name: "decode",settings:{}},
                {name: "encode",settings:{}},
                {name: "google",settings:{},"canvas":{},nodes:googleInitialNodes}
    ]
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
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
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
                                initializeTools(newUser,done)
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