var fs = require('fs');
var csv = require('csv');

var main = function (req, res) {
  res.render('application2', { 
        title: 'FeedStage',
        user:req.user
      })
};

module.exports.main = main; 

