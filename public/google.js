String.prototype.format = function(placeholders) {
    if ($.isArray(placeholders)) {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    }
    else { //Object
        var s = this;
        for(var propertyName in placeholders) {
            var re = new RegExp('{' + propertyName + '}', 'gm');
            s = s.replace(re, placeholders[propertyName]);
        }
        return s;
    }
};
var shipDetails = [
    { Name: 'Hanari Carnes', City: 'Brazil' },
    { Name: 'Split Rail Beer & Ale', City: 'USA' },
    { Name: 'Ricardo Adocicados', City: 'Brazil' }
];

var nodes = [
    {    name:'File'
        ,label:'File'
        ,type:'source'
        ,image:"http://www.knowledgebase-script.com/kb/assets/file-txt.png"
        ,fields:[
        {name:'field1'}
        ,{name:'field2'}
        ,{name:'field3'}
    ],
        schema : {
            "type": "object",
            "properties": {
                "selectFile": {
                    "type": "string",
                    "format": "uri"
                },
                "type": {
                    "type":"string",
                    "title":"FileType",
                    "enum":['csv','tab']
                }
            }
        },
        options :{
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
                    "action": "http://localhost:3001/upload"
                },
                "buttons": {
                    "submit": {
                        "value": "Submit the Form",
                        "click": function(){
                            // this has all the values, use this to update data object or any other object on save.
                            var val = this.getValue();
                            var form = $('#alpaca2')
                            form.ajaxSubmit({
                                error: function(xhr) {
                                    console.log('error happend in form submit',xhr.status)
                                    alert('Error: ' + xhr.status);
                                },
                                success: function(response) {
                                    $("#status").empty().text(response);
                                    alert(JSON.stringify(response));
                                    //var selected = $("#diagram").getKendoDiagram().select();
                                    //var nodeById = getNodeById(selected);
                                    //alert(nodeById)
                                    // code dialog
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
    {   name:'Google'
        ,label:'Google'
        ,type:'target'
        ,image:"http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png"
        ,fields:[
        {name:'id',required:true}
        ,{name:'title',required:true}
        ,{name:'description',required:true}
        ,{name:'google_product_category',required:true}
        ,{name:'product_type',required:true}
        ,{name:'link',required:true}
        ,{name:'image_link',required:true}
        ,{name:'price',required:true}
        ,{name:'condition',required:true}
        ,{name:'availability',required:true}
        ,{name:'brand',required:true}
        ,{name:'gtin',required:false}
        ,{name:'mpn',required:false}
        ,{name:'item_group_id',required:false}
        ,{name:'additional_image_link',required:false}
        ,{name:'sale_price',required:false}
        ,{name:'sale_price_effective_date',required:false}
        ,{name:'gender',required:false}
        ,{name:'age_group',required:false}
        ,{name:'color',required:false}
        ,{name:'size',required:false}
        ,{name:'material',required:false}
        ,{name:'pattern',required:false}
        ,{name:'shipping_weight',required:false}
        ,{name:'adwords_grouping',required:false}
        ,{name:'adwords_labels',required:false}
        ,{name:'excluded_destination',required:false}
        ,{name:'online_only',required:false}
        ,{name:'expiration_date',required:false}
        ,{name:'adwords_redirect',required:false}
        ,{name:'adult',required:false}
        ,{name:'multipack',required:false}
    ]}
];

// Pull from google feed canvas from /storage
// if empty, draw
var LocalStorage = {};

/**
 * Edit Node now , add more fields or whatever
 */
function editNode(nodeId){
    alert('editing ' + nodeId);
    // update properties on node
    //nodes[0].fields.push('field4');
    //drawNode(nodes[0],nodeId)




//            $("#form").alpaca({
//                "schema": {
//                    "title":"User Feedback",
//                    "description":"What do you think about Alpaca?",
//                    "type":"object",
//                    "properties": {
//                        "name": {
//                            "type":"string",
//                            "title":"Name"
//                        },
//                        "feedback": {
//                            "type":"string",
//                            "title":"Feedback"
//                        },
//                        "ranking": {
//                            "type":"string",
//                            "title":"Ranking",
//                            "enum":['excellent','ok','so so']
//                        }
//                    }
//                }
//            });
//
//
//            $('#myModal').dialog({
//                autoOpen:true,
//                my: "center",
//                at: "center",
//                of: window
//            });

}

function addField(nodeId,node,field){
    var rowId = nodeId + '_' + field.name
    var tableRow = '<tr id=' + rowId + '>' +
        '<td align="center">'+field.name+'</td>'+
        '</tr>'
    $('#' + nodeId + " .table").append(tableRow);
    setEndPoint(rowId,node)
}

function addSourceEndPoint(rowId){
    jsPlumb.addEndpoint(rowId, {
        anchors:['Right'],
        isSource:true,
        isTarget:false,
        endpoint : ["Rectangle",{width:15, height:15}],
        endpointStyle : {fillStyle:"orange", outlineColor:"orange", outlineWidth:1 },
        hoverPaintStyle:{ fillStyle:"yellow"},
        maxConnections:10
    });
}

function addTargetEndPoint(rowId){
    jsPlumb.addEndpoint(rowId, {
        anchors:['Left'],
        isSource:false,
        isTarget:true,
        endpoint : ["Rectangle",{width:12, height:12}],
        endpointStyle : {fillStyle:"blue", outlineColor:"blue", outlineWidth:1},
        hoverPaintStyle:{fillStyle:"lightblue"},
        maxConnections:1,
        onMaxConnections: function(){
            console.log('max connection limit reached')
        }
    });
}

function setEndPoint(rowId,node){
    if (node.type === 'transform'){
        addSourceEndPoint(rowId);
        addTargetEndPoint(rowId);
    }
    if (node.type === 'source'){
        addSourceEndPoint(rowId);
    }
    if (node.type === 'target'){
        addTargetEndPoint(rowId);
    }
}

function drawNode(node,nodeId){
    $.get("assests/node.html?time=" + (new Date()).getTime(), function(data) {
        var nodeId = nodeId ? nodeId : (node.name + '_' + new Date().getTime());
        $('.canvas').append(data.format({node_id: nodeId,node_name:node.name,nodeClass:node.name,image:node.image}));
        jsPlumb.draggable(nodeId,{containment:"parent"});
        node.fields.forEach(function(field){
            addField(nodeId,node,field);
        });
    });
}

jsPlumb.ready(function() {
    $("#outterSplitter").ejSplitter({
        height: 1520,
        //width: "100%",
        orientation: ej.Orientation.Horizontal,
        enableAutoResize: true,
        properties: [{ collapsible: true }]
    });
    $('#Grid').ejGrid({
        dataSource: shipDetails
    });

    jsPlumb.importDefaults({
        Connector: ["Straight"],
        PaintStyle: {strokeStyle: "rgba(50,50,50,1)", lineWidth:2.5},
        HoverPaintStyle: { lineWidth:3.5,
            strokeStyle: 'rgba(0, 17, 255, 1)'
        },
        ConnectionOverlays: [
            [ "Arrow", {
                width:10,
                height:10, location:0.5, id:"arrow",
                events:{
                    click: function(){
                        //alert('connection overlay clicked')
                        console.log('connection overlay clicked')
                    },
                }
            } ],
            // this is how you add label to arrow
            //[ "Label", { label:"Relationship", id:"lblPrimary_" + 'casasc' } ]
        ]
    })
    jsPlumb.setContainer("canvas");
    jsPlumb.bind("connection", function (info, originalEvent) {
        //alert("connected "+info.sourceId+" and "+info.targetId + " via "+info.connection);
        var connection1 = info.connection;
        connection1.bind("click", function(connection, originalEvent) {
            //alert("you clicked on "+ connection);
            connection.setPaintStyle({strokeStyle:"rgba(0, 17, 255, 1)", lineWidth:3.5});
            keyboardJS.on('del', function(event, keys, keyComboStr) {
                jsPlumb.detach(connection)
            })
            keyboardJS.on('esc', function(event, keys, keyComboStr) {
                connection.setPaintStyle({strokeStyle: "rgba(50,50,50,1)", lineWidth:2.5});
            })

        });
    });
    nodes.forEach(function(n){
        drawNode(n)
    });
});
