var traverse = require('traverse');
var clone = require('clone');
var is = require('is');

module.exports = function (app,isLoggedIn) {
    
     var Nodes = [
                    {
                        name:"Text File",
                        type:"Source",
                        icon:"fa-file-text",
                        schema: {
                            "type": "object",
                            "properties": {
                                "selectFile": {
                                    "type": "string",
                                    "format": "uri"
                                },
                                "type": {
                                    "type":"string",
                                    "title":"FileType",
                                    "enum":['csv','tab'],
                                    "required": true
                                }
                            }
                        },
                        options:{
                            "fields":{
                  "selectFile": {
                      "type": "file"

                  },
                  "type":{
                      "removeDefaultNone":true
                  }
              },
                            "form": {
                              "attributes": {
                                  "method": "POST",
                                  "action": "/upload"
                              },
                              "buttons": {
                                  "submit": {
                                      "value": "Save",
                                      "click": function(){
                                          //event.preventDefault()
                                          // this has all the values, use this to update data object or any other object on save.
                                          var val = this.getValue();
                                          //alert(JSON.stringify(val))
                                          var form = $('#alpaca2')
                                          form.ajaxSubmit({
                                              error: function(xhr) {
                                                  console.log('error happend in form submit',xhr.status)
                                                  alert('Error: ' + xhr.status);
                                              },
                                              success: function(response) {
                                                  var thisNode = pages.feedline.getNodeById(nodeId);
                                                  thisNode.fields = response.fields;
                                                  thisNode.data = val;
                                                  thisNode.fileName = response.fileName;
                                                  $('#myModal').dialog("close");
                                                  drawNode(thisNode,function(){
                                                      console.log('Node edited and redrawn');
                                                  })
                                              }
                                          });
                                          return false;
                                      }
                                  }
                              }
              }
                        },
                        data:{}
                    },
                    {
                        name:"Google",
                        type:"Connector",
                        icon:""
                    },
                    {
                        name:"Replace",
                        type:"Function",
                        
                    }
                    ]

    
    /**
     * Returns all nodes in the system (connectors specific to that users tho)
     * 
     */ 
    app.get('/api/nodes',isLoggedIn,function(req,res){
            var copyOfNodes = clone(Nodes);
            copyOfNodes.forEach(function(n){
                traverse(n).forEach(function(x){
                    if (is.function(x)){
                       x = x.toString();
                       this.update(x);
                    }
                })
            })
            res.json({
               nodes:copyOfNodes
            });
    });
}