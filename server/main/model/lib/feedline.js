var mongoose = require('mongoose');

// define the schema for our feedline
var feedLineSchema = mongoose.Schema({
    userId: String,
    name:String,
    settings:mongoose.Schema.Types.Mixed,
    canvas:mongoose.Schema.Types.Mixed,
    nodes:[mongoose.Schema.Types.Mixed],
    chart:[mongoose.Schema.Types.Mixed]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('FeedLine', feedLineSchema);

