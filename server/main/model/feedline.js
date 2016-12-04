var mongoose = require('mongoose');

// define the schema for our feedline
var feedLineSchema = mongoose.Schema({
    userId: String,
    name:String,
    id:String,
    chartData:mongoose.Schema.Types.Mixed
});

// create the model for users and expose it to our app
module.exports = mongoose.model('FeedLine', feedLineSchema);

