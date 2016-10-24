var Node = require('../../model').node;
var controller = require('../../controller')
var decode = require('urldecode');


/*
 * Convert data from req body to connector format
 */
function castToConnector(user,body){
  var connector = new Node();
    connector.userId = user._id;
    connector.name = body.name;
    connector.description = body.description;
    connector.version = body.version || 'v 1.0.0';
    connector.type = 'Connector';
    connector.image = '';
    connector.published = false;
    connector.scheme = {};
    // model validation object
    body.schemaFields.forEach(function(sf) {
        connector.scheme[sf.fieldName] = {};
        connector.scheme[sf.fieldName]["description"] = sf.description;
        var validation = {};
        for (var property in sf) {
            if (!property.startsWith("field")) {
                validation[property] = sf[property];
            }
        }
        connector.scheme[sf.fieldName]["validation"] = validation;
    })
    return connector;
}

/*
 * Adds a new connector to the system 
 */
function addConnector(user,body,cb) {
    var connector = castToConnector(user,body);
    connector.save(cb);
}

module.exports = function(app, isLoggedIn) {
    app.get('/api/components', isLoggedIn, controller.api.getComponents);
    app.get('/api/files', isLoggedIn, controller.api.listFilesInDirectory);
    app.get('/api/fileheaders', isLoggedIn, controller.api.getHeaders);
    app.get('/api/getflows', isLoggedIn, controller.api.getFlows);
    app.post('/api/saveflow', isLoggedIn, controller.api.saveFlow);
    app.get('/api/analyzeflow', isLoggedIn, controller.api.analyzeFlow);
    app.post('/decode', isLoggedIn, function(req, res) {
        console.log(req.body)
        var data = req.body.data;
        var lines = data.split('\n');
        var outlines = [];
        lines.forEach(function(l) {
            outlines.push(decode(l))
        })
        res.send(outlines.join('\n'));
    })

    /**
     * Returns all feedlines tied to this user
     */
    app.get('/api/feedline', isLoggedIn, function(req, res) {

    })

    /**
     * List all actvities related to this user
     */
    app.get('/api/activity', isLoggedIn, function(req, res) {

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
    app.post('/api/connector', isLoggedIn, function(req, res) {
        addConnector(req.user,req.body,function(err){
         if (err){
          console.log('error posting connector')
         } else {
          res.send({status:"connector added successfully"})
         }
        })
    })

};