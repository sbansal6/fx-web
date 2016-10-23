// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var environment = require('../../core/lib/environment'); // fix this long path

// define the schema for our flow model
var flowSchema = mongoose.Schema({
    userId: String,
    name: String,
    model: String
});

/**
 * todo
 * Update User account setting after save.
 * can we done async, return call back
 * 
 */

// create the model for users and expose it to our app
module.exports = mongoose.model('Flow', flowSchema);