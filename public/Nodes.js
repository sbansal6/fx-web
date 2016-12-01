var NODES_OPTIONS = [
    {    name:'File'
        ,options: function(nodeId){
          return {
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
          }
        }

    },
    {
        name: 'Google'
    },
    {
        name:"Replace",
        "options": function(nodeId){
           return {
               "form": {
                   "buttons": {
                       "submit": {
                           "title": "Save",
                           "click": function() {
                               var value = this.getValue();
                               var thisNode = _.find(TOOL.nodes,function(n){return n.nodeId === nodeId});
                               thisNode.data = value;
                               $('#myModal').dialog("close");
                           }
                       }
                   }
               }
           }
        }
    },
    {
        name:"SubString",
        "options": function(nodeId){
            return {
                "form": {
                    "buttons": {
                        "submit": {
                            "title": "Save",
                            "click": function() {
                                var value = this.getValue();
                                var thisNode = _.find(TOOL.nodes,function(n){return n.nodeId === nodeId});
                                thisNode.data = value;
                                $('#myModal').dialog("close");
                            }
                        }
                    }
                }
            }
        }
    },
];