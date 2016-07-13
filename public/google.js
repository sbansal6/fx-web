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
var flowDiagram ;
// get node data and fields from server by user
// if has use that else use from raw node

$('#btnSave').click(function(){
    save();
})

$('#btnLoad').click(function(){
    jsPlumb.load({savedObj : flowDiagram, containerSelector : "#canvas"});
})

/**
 * Edit Node now , add more fields or whatever
 */
function editNode(nodeId){
    alert('editing ' + nodeId);
    // parse node tye from nodeID
    // get nodeID specific data from users--> tool --> nodes
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

// save physical layout, save nodes and connections
// draw function will use these nodes and connections along with data to draw the diagram
// node data is saved on edit of node
// save to db later on
function save(){
    var nodes = []
    $(".tableDesign").each(function (idx, elem) {
        var $elem = $(elem);
        nodes.push({
            blockId: $elem.attr('id'),
            nodeType: $elem.attr('id').split('_')[0],
            positionX: parseInt($elem.css("left"), 10),
            positionY: parseInt($elem.css("top"), 10)
        });
    });

    var connections = [];
    $.each(jsPlumb.getConnections(), function (idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId
        });
    });

    var flowChart = {};
    flowChart.nodes = nodes;
    flowChart.connections = connections;

    var flowChartJson = JSON.stringify(flowChart);
    $.ajax({type: "POST",
        url: "/save",
        data: flowChartJson,
        success:function(result) {
        alert('saved --' + result);
        }
    });

}

// load combines physical with node data
// and then draw nodes and connections
function load(){

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
