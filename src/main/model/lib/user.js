// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = require('fx-config');
var path = require('path')
var ObjectId = require('mongodb').ObjectId
var mkdirp = require('mkdirp');

// define the schema for our user model
var userSchema = mongoose.Schema({
    email: String,
    password: String,
    company: { type: String, default: "" },
    tier: { type: String, default: "" },
    rootDir: { type: String, default: "" },
    createDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * todo
 * Update User account setting after save.
 * can we done async, return call back
 * 
 */
var register = function ( newUser, callBackFunction ) { // accept the callback
    newUser.save ( function ( err,doc ) {
        if (err) {
            return callBackFunction(false);
        }
        newUser.rootDir = path.join(config.filesystem.root,doc._id.toString());
        newUser.lastUpdated = new Date();
        mkdirp.sync(newUser.rootDir); //todo make this async
        newUser.save(callBackFunction);
    });
};

userSchema.methods.register = register ;

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
