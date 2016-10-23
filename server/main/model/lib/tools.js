// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var toolsSchema = mongoose.Schema({
    userId: String,
    tools: [
        {
            name:String,
            settings:mongoose.Schema.Types.Mixed,
            canvas:mongoose.Schema.Types.Mixed,
            nodes:[mongoose.Schema.Types.Mixed],
            chart:[mongoose.Schema.Types.Mixed]
        }
    ]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Tools', toolsSchema);

