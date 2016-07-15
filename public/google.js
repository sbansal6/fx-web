var TOOL = [];
var shipDetails = [
    { Name: 'Hanari Carnes', City: 'Brazil' },
    { Name: 'Split Rail Beer & Ale', City: 'USA' },
    { Name: 'Ricardo Adocicados', City: 'Brazil' }
];
var flowDiagram ;

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

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

/**
 * Edit Node now , add more fields or whatever
 */
function editNode(nodeId){
    alert('editing ' + nodeId);
    // parse node tye from nodeID
    var nodeType = nodeId.split('_')[0];
    // get data from server if exists by node_id
    // use that data
    // save again after edit
    getNodeDataById(nodeId)

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

function drawNode(node,cb){
    console.log('drawing node',node,node.positionX,node.positionY)
    $.get("assests/node.html?time=" + (new Date()).getTime(), function(data) {
        var nodeId = node.nodeId ? node.nodeId : (node.name + '_' + guid());
        console.log('appending',data.format({
            node_id: nodeId,
            node_name:node.name,
            image:node.image
        }))
        $('.canvas').append(data.format({
            node_id: nodeId,
            node_name:node.name,
            image:node.image
        }));
        $('#'+nodeId).css('left', (node.positionX ? node.positionX : 30) + 'px');
        $('#'+nodeId).css('top', (node.positionY ? node.positionY : 30) + 'px');
        jsPlumb.draggable(nodeId,{containment:"parent"});
        node.fields.forEach(function(field){
            addField(nodeId,node,field);
        });
        cb()
    });
}

// save canvas as well as nodes
function save(){
    var nodes = []
    $(".tableDesign").each(function (idx, elem) {
        var $elem = $(elem);
        nodes.push({
            nodeId: $elem.attr('id'),
            nodeName: $elem.attr('id').split('_')[0],
            positionX: parseInt($elem.css("left"), 10),
            positionY: parseInt($elem.css("top"), 10)
        });
    });

    var connections = [];
    $.each(jsPlumb.getConnections(), function (idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId,
            anchors: $.map(connection.endpoints, function(endpoint) {
                return [[endpoint.anchor.x,
                    endpoint.anchor.y,
                    endpoint.anchor.orientation[0],
                    endpoint.anchor.orientation[1],
                    endpoint.anchor.offsets[0],
                    endpoint.anchor.offsets[1]]];

            })
        });
    });



    var flowChart = {};
    flowChart.nodes = nodes;
    flowChart.connections = connections;

    var flowChartJson = JSON.stringify(flowChart);
    TOOL.canvas = flowChartJson
    $.ajax({type: "POST",
        url: "/tool",
        data:
        {
            toolName:"google",
            canvas: TOOL.canvas,
            settings:TOOL.settings,
            nodes:TOOL.nodes
        },
        success:function(result) {
        alert('saved --' + result);
        }
    });

}

function getNodeDataById(nodeId){
    $.ajax({type: "GET",
        url: "/getstate",
        data:
        {
            toolName:"google",
            nodeId:nodeId 
        },
        success:function(result) {
            alert('saved --' + result);
        }
    });
}

// load combines physical with node data
// and then draw nodes and connections
function load(){

}

// get node data and fields from server by user
// if has use that else use from raw node

$('#btnSave').click(function(){
    save();
})

$('#btnLoad').click(function(){
    jsPlumb.load({savedObj : flowDiagram, containerSelector : "#canvas"});
})


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
    $.ajax({type: "GET",
        url: "/tool",
        data:
        {
            toolName:"google"
        },
        success:function(result) {
            console.log('result',result)
            TOOL = result;
            if (TOOL.canvas){
                console.log('loading from existing canvas')
                // draw nodes
                var canvasObject = JSON.parse(TOOL.canvas)
                async.waterfall([
                 function(cb){
                     async.eachSeries(canvasObject.nodes,function(cn,cb){
                         var onode = _.find(TOOL.nodes,function(n){return n.name === cn.nodeName})
                         if (onode){
                             onode.nodeId  = cn.nodeId;
                             onode.positionX = cn.positionX;
                             onode.positionY = cn.positionY;
                             drawNode(onode,cb);
                         }
                     },cb)
                 }  ,
                 function(cb){
                        alert('on to connectors')
                        // connect existing connectors
                        var connections = canvasObject.connections;
                        connections.forEach(function(c){
                            jsPlumb.connect({
                                source: c.pageSourceId,
                                target: c.pageTargetId,
                                anchors:c.anchors
                            });
                        });
                     cb()
                    }
                ])
            } else {
                // first time drawing canvas
                TOOL.nodes.forEach(function(n){
                    drawNode(n)
                });
            }
        }
    });
});
