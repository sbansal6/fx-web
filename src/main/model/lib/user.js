// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var environment = require('../../core/lib/environment'); // fix this long path
var path = require('path')
var ObjectId = require('mongodb').ObjectId

console.log("environment",environment)

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
userSchema.post('save',function(doc){
     this.rootDir = path.join(environment.filesystem.root,this._id.toString());
     this.lastUpdated = new Date();
     this.save() ;
})


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);