var nodeService = require('../services/node.service');
var processorService = require('../services/processor.service');


function updateTool(req,cb){
    var user = req.user;
    var body = req.body;
    var toolName = body.toolName;
    var query = {userId:user._id,"tools.name":toolName}
    var update = {
        "tools.$.settings":body.settings,
        "tools.$.canvas":body.canvas,
        "tools.$.nodes":body.nodes
    }
    tools.findOneAndUpdate(
        query,
        update,
        {new:true},
        function(err,doc){
            if (err){
                cb(err)
            } else {
                var tool = _.find(doc.tools, function (t) {
                    return t.name === toolName
                });
                cb(null,tool)
            }
        }
    )
}

