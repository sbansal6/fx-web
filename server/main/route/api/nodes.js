var clone = require('clone');
var JSONfn = require('json-fn');
var nodeService = require("../../services/node.service");

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
                                  "action": "/api/upload"
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
                                                  var nodeId = $('#inputNodeId').val()
                                                  var thisNode = pages.feedline.getNodeById(nodeId);
                                                  thisNode.data.outFields = response.fields;
                                                  thisNode.data.type = val.type;
                                                  thisNode.data.fileName = response.fileName;
                                                  $('#myModal').modal('hide'); 
                                                  pages.feedline.updateNodeAfterEdit(nodeId);
                                              }
                                          });
                                          return false;
                                      }
                                  }
                              }
              }
                        },
                        data:{
                            type:"csv",
                            fileName:"",
                            outFields:[],
                        }
                    },
                    {
                        name:"Replace",
                        type:"Function",
                        "schema": {
                                "type": "object",
                                "properties": {
                                    "selectField": {
                                        "type":"string",
                                        "title":"field",
                                        "enum":[]
                                     },
                                    "searchValue": {
                                        "type": "string",
                                        "title": "searchValue"
                                    },
                                    "newValue": {
                                        "type": "string",
                                        "title": "newValue"
                                    }
                                }
                       },
                        options:{
                           "form":{
                            "buttons":{
                                "submit":{
                                    "click":function(){
                                        var val = this.getValue();
                                        var nodeId = $('#inputNodeId').val()
                                        var thisNode = pages.feedline.getNodeById(nodeId);
                                        for (var key in val){
                                            thisNode.data[key] = val[key];
                                        }
                                        $('#myModal').modal('hide'); 
                                    }
                                }
                            }
                           },
                           "fields": {
                               "selectField": {
                                "type": "select",
                                "removeDefaultNone": true
                            }
                           }
                       },
                        data:{
                            "selectField":"",
                            "searchValue": "this",
                            "newValue": "that",
                            "outFields":[],
                        }
                        
                    }
                    ]
    
    /**
     * Returns all nodes in the system (connectors specific to that users tho)
     * 
     */ 
    app.get('/api/nodes',isLoggedIn,function(req,res){
            var copyOfNodes = clone(Nodes);
            nodeService.getConnectors(req.user._id,function(err,conns){
               res.json({
                  nodes:JSONfn.stringify(copyOfNodes.concat(conns))
               });
            })
            
    });
}