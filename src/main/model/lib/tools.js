// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var toolsSchema = mongoose.Schema({
    userId: String,
    tools: [{name:String,settings:[new mongoose.Schema({}),{strict:false}]}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Tools', toolsSchema);

