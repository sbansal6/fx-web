var mongoose = require('mongoose');

// define the schema for our feedline
var nodeSchema = mongoose.Schema({
    userId: String,
    name:String,
    description:String,
    version:String,
    type:String, // should be enum Transformation | Connector
    icon:String,
    published:Boolean,
    scheme:mongoose.Schema.Types.Mixed
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Node', nodeSchema);
