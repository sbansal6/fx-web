var nodeService = require("../services/node.service");
var processorService = require('../services/processor.service');
var JSONfn = require('json-fn');

module.exports = function (app,isLoggedIn) {
    
    // move to seperate analyze route
    app.post('/analyze', isLoggedIn, function(req, res) {
        console.log('analyze',req.user,JSON.parse(req.body.feedlineState));
        res.send({});
    })
    
    
    app.get('/connector',isLoggedIn,function(req,res){
            res.render('connector.ejs', {
                title: 'FeedExchange - Add Connector',
                userEmail: req.user.email,
                message: ""
        });
    })
    
      /**
    * Add a new connector to the system
     * incoming data example
     { name: 'TestConnector',
       description: 'Test Connector',
       schemaFields:
                 [ { fieldName: 'Id',
                    fieldDescription: 'test id',
                    type: 'string',
                    optional: 'false',
                    minLength: '1',
                    maxLength: '255',
                    pattern: 'alphaNumeric'
                  } ]
     }
    */
     app.post('/connector', isLoggedIn, function(req, res) {
        nodeService.addConnector(req.user,req.body,function(err){
         if (err){
          console.log('error posting node|connector')
         } else {
          res.send({status:"node|connector added successfully"})
         }
        })
    })


}