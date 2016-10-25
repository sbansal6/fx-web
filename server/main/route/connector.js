var nodeService = require("../services/node.service");

module.exports = function (app,isLoggedIn) {
    
    app.get('/connector',isLoggedIn,function(req,res){
            res.render('connector.ejs', {
                title: 'FeedExchange - Add Connector',
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