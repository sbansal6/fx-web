var TOOL = [];
var shipDetails = [
    {
        Name: 'Hanari Carnes',
        City: 'Brazil'
    },
    {
        Name: 'Split Rail Beer & Ale',
        City: 'USA'
    },
    {
        Name: 'Ricardo Adocicados',
        City: 'Brazil'
    }];
var flowDiagram;


String.prototype.format = function(placeholders) {
    if ($.isArray(placeholders)) {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    } else { //Object
        var s = this;
        for (var propertyName in placeholders) {
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
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

/**
 * Edit Node now , add more fields or whatever
 */
function editNode(nodeId) {
    var thisNode = _.find(TOOL.nodes, function(n) {
        return n.nodeId === nodeId
    })
    $('#form').empty();
    $("#form").alpaca({
        "schema": {
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
        "options": {
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
                            var form = $('#alpaca2')
                            form.ajaxSubmit({
                                error: function(xhr) {
                                    console.log('error happend in form submit',xhr.status)
                                    alert('Error: ' + xhr.status);
                                },
                                success: function(response) {
                                    var thisNode = _.find(TOOL.nodes,function(n){return n.nodeId === nodeId});
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
        "data":{}
    });
    $('#myModal').dialog({
        autoOpen: true,
        width:'30%',
        my: "center",
        at: "center",
        of: window,
        resizable: false,
        draggable: true
    });
    $('#myModal').dialog('option', 'title', 'Edit Node');
}

function addField(nodeId, node, field) {
    var rowId = nodeId + '_' + field.name
    var tableRow = '<tr id=' + rowId + '>' +
        '<td align="center">' + field.name + '</td>' +
        '</tr>'
    $('#' + nodeId + " .table").append(tableRow);
    setEndPoint(rowId, node)
}

function addSourceEndPoint(rowId) {
    jsPlumb.addEndpoint(rowId, {
        anchors: ['Right'],
        isSource: true,
        isTarget: false,
        endpoint: ["Rectangle", {
            width: 15,
            height: 15
        }],
        endpointStyle: {
            fillStyle: "#ff7473",
            outlineColor: "#ff7473",
            outlineWidth: 1
        },
        hoverPaintStyle: {
            fillStyle: "yellow"
        },
        maxConnections: 10
    });
}

function addTargetEndPoint(rowId) {
    jsPlumb.addEndpoint(rowId, {
        anchors: ['Left'],
        isSource: false,
        isTarget: true,
        endpoint: ["Rectangle", {
            width: 12,
            height: 12
        }],
        endpointStyle: {
            fillStyle: "#424a5d",
            outlineColor: "#424a5d",
            outlineWidth: 1
        },
        hoverPaintStyle: {
            fillStyle: "lightblue"
        },
        maxConnections: 1,
        onMaxConnections: function() {
            console.log('max connection limit reached')
        }
    });
}

function setEndPoint(rowId, node) {
    if (node.type === 'transform') {
        addSourceEndPoint(rowId);
        addTargetEndPoint(rowId);
    }
    if (node.type === 'source') {
        addSourceEndPoint(rowId);
    }
    if (node.type === 'target') {
        addTargetEndPoint(rowId);
    }
}

function drawNode(node, cb) {
    console.log('drawing node', node, node.positionX, node.positionY)
    if (node.nodeId){
        jsPlumb.remove(node.nodeId);
    }
    $.get("assests/node.html?time=" + (new Date()).getTime(), function(data) {
        var nodeId = node.nodeId ? node.nodeId : (node.name + '_' + guid());
        console.log('appending', data.format({
            node_id: nodeId,
            node_name: node.name,
            image: node.image
        }))
        $('.canvas').append(data.format({
            node_id: nodeId,
            node_name: node.name,
            image: node.image
        }));
        $('#' + nodeId).css('left', (node.positionX ? node.positionX : 30) + 'px');
        $('#' + nodeId).css('top', (node.positionY ? node.positionY : 30) + 'px');
        jsPlumb.draggable(nodeId, {
            containment: "parent"
        });
        node.fields.forEach(function(field) {
            addField(nodeId, node, field);
        });
        cb()
    });
}

// save canvas as well as nodes
function save() {
    var nodes = []
    $(".tableDesign").each(function(idx, elem) {
        var $elem = $(elem);
        nodes.push({
            nodeId: $elem.attr('id'),
            nodeName: $elem.attr('id').split('_')[0],
            positionX: parseInt($elem.css("left"), 10),
            positionY: parseInt($elem.css("top"), 10)
        });
    });

    var connections = [];
    $.each(jsPlumb.getConnections(), function(idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId,
            anchors: $.map(connection.endpoints, function(endpoint) {
                return [
                    [endpoint.anchor.x,
                        endpoint.anchor.y,
                        endpoint.anchor.orientation[0],
                        endpoint.anchor.orientation[1],
                        endpoint.anchor.offsets[0],
                        endpoint.anchor.offsets[1]
                    ]
                ];

            })
        });
    });
    var flowChart = {};
    flowChart.nodes = nodes;
    flowChart.connections = connections;

    var flowChartJson = flowChart;
    TOOL.canvas = flowChartJson
    $.ajax({
        type: "POST",
        url: "/tool",
        data: {
            toolName: "google",
            canvas: TOOL.canvas,
            settings: TOOL.settings,
            nodes: TOOL.nodes
        },
        success: function(result) {
            alert('saved --' + result);
        }
    });

}


// get node data and fields from server by user
// if has use that else use from raw node

$('#btnSave').click(function() {
    save();
})

$('#btnAnalyze').click(function() {
    var gridObj = $("#Grid").data("ejGrid");
    var nodes = []
    $(".tableDesign").each(function(idx, elem) {
        var $elem = $(elem);
        nodes.push({
            nodeId: $elem.attr('id'),
            nodeName: $elem.attr('id').split('_')[0],
            positionX: parseInt($elem.css("left"), 10),
            positionY: parseInt($elem.css("top"), 10)
        });
    });

    var connections = [];
    $.each(jsPlumb.getConnections(), function(idx, connection) {
        connections.push({
            connectionId: connection.id,
            pageSourceId: connection.sourceId,
            pageTargetId: connection.targetId,
            anchors: $.map(connection.endpoints, function(endpoint) {
                return [
                    [endpoint.anchor.x,
                        endpoint.anchor.y,
                        endpoint.anchor.orientation[0],
                        endpoint.anchor.orientation[1],
                        endpoint.anchor.offsets[0],
                        endpoint.anchor.offsets[1]
                    ]
                ];

            })
        });
    });
    var flowChart = {};
    flowChart.nodes = nodes;
    flowChart.connections = connections;

    var flowChartJson = flowChart;
    TOOL.canvas = flowChartJson
    $.ajax({
        type: "POST",
        url: "/analyze",
        data: {
            toolName: "google",
            canvas: TOOL.canvas,
            settings: TOOL.settings,
            nodes: TOOL.nodes
        },
        success: function(result) {
            alert('analyzed --' + JSON.stringify(result));
            $('#GridContainer').empty()
            $('#GridContainer').append('<div id="Grid"></div>')
            $('#Grid').ejGrid({
                dataSource:result
            });
        }
    });
})

jsPlumb.ready(function() {
    $("#tabstrip").ejTab();
    //todo :- should populate with empty columns
    $('#GridContainer').empty()
    $('#GridContainer').append('<div id="Grid"></div>')
    $('#Grid').ejGrid({
        dataSource:shipDetails
    });

    $("#chart").ejChart(
        {
            //Initializing Primary X Axis
            primaryXAxis:
            {
                title: { text: 'Year' },
                range:{min:2006,max:2015,interval:1}
            },

            //Initializing Primary Y Axis
            primaryYAxis:
            {
                title: { text: 'Sales Percentage(%)' }
            },

            //Initializing Common Properties for all the series
            commonSeriesOptions:
            {
                type:'stackingbar100',
                enableAnimation: true,
                tooltip:
                {
                    visible: true,
                    format: "  #series.name# <br/> X :  #point.x# <br/> Y :  #point.y#  <br/>Percentage :  #point.percentage# %"
                }
            },

            //Initializing Series
            series:
                [
                    {
                        points: [{ x: 2007, y:453 }, { x: 2008, y: 354 }, { x: 2009, y: 282 }, { x: 2010, y: 321 },
                            { x: 2011, y: 333 }, { x: 2012, y:351 }, { x: 2013, y:403 }, { x: 2014,y:421 }],
                        name: "John",
                        fill:"#1ABC9C"
                    },
                    {
                        points: [{ x: 2007, y:876 }, { x: 2008, y: 564 }, { x: 2009, y: 242 }, { x: 2010, y: 121 },
                            { x: 2011, y: 343 }, { x: 2012, y: 451 }, { x: 2013, y:203 },{ x: 2014,y:431 }],
                        name: "Andrew",
                        fill:"#3498DB"
                    },
                    {
                        points: [{ x: 2007, y:356 }, { x: 2008, y:876 }, { x: 2009, y: 898 }, { x: 2010, y: 567 },
                            { x: 2011, y: 456 }, { x: 2012, y: 345 }, { x: 2013, y: 543 }, { x: 2014, y:654 }],
                        name: "Thomas",
                        fill:"#34495E"
                    },
                    {
                        points: [{ x: 2007, y: 122 }, { x: 2008, y: 444 }, { x: 2009, y: 222 }, { x: 2010, y: 231 },
                            { x: 2011, y: 122 }, { x: 2012, y: 333}, { x: 2013, y: 354}, { x: 2014,y:100 }],
                        name: "Hendry",
                        fill:"#00FFFF"
                    }
                ],
            load:"loadTheme",
            title: { text: 'Sales by year'},
            size: { height: "600"},
            legend: { visible: true,position: 'right', alignment:"near" }
        });

    jsPlumb.importDefaults({
        Connector: ["Straight"],
        PaintStyle: {
            strokeStyle: "rgba(50,50,50,1)",
            lineWidth: 2.5
        },
        HoverPaintStyle: {
            lineWidth: 3.5,
            strokeStyle: 'rgba(0, 17, 255, 1)'
        },
        ConnectionOverlays: [
            ["Arrow", {
                width: 10,
                height: 10,
                location: 0.5,
                id: "arrow",
                events: {
                    click: function() {
                        //alert('connection overlay clicked')
                        console.log('connection overlay clicked')
                    },
                }
            }],
            // this is how you add label to arrow
            //[ "Label", { label:"Relationship", id:"lblPrimary_" + 'casasc' } ]
        ]
    })
    jsPlumb.setContainer("canvas");
    jsPlumb.bind("connection", function(info, originalEvent) {
        //alert("connected "+info.sourceId+" and "+info.targetId + " via "+info.connection);
        var connection1 = info.connection;
        connection1.bind("click", function(connection, originalEvent) {
            //alert("you clicked on "+ connection);
            connection.setPaintStyle({
                strokeStyle: "rgba(0, 17, 255, 1)",
                lineWidth: 3.5
            });
            keyboardJS.on('del', function(event, keys, keyComboStr) {
                jsPlumb.detach(connection)
            })
            keyboardJS.on('esc', function(event, keys, keyComboStr) {
                connection.setPaintStyle({
                    strokeStyle: "rgba(50,50,50,1)",
                    lineWidth: 2.5
                });
            })

        });
    });
    $.ajax({
        type: "GET",
        url: "/tool",
        data: {
            toolName: "google"
        },
        success: function(result) {
            TOOL = result;
            if (TOOL.canvas) {
                console.log('loading from existing canvas')
                // draw nodes
                var canvasObject = TOOL.canvas;
                async.waterfall([
                    function(cb) {
                        async.eachSeries(canvasObject.nodes, function(cn, eachSeriesCb) {
                            var onode = _.find(TOOL.nodes, function(n) {
                                return n.name === cn.nodeName
                            })
                            if (onode) {
                                onode.nodeId = cn.nodeId;
                                onode.positionX = cn.positionX;
                                onode.positionY = cn.positionY;
                                drawNode(onode, eachSeriesCb);
                            }
                        }, cb)
                    },
                    function(cb) {
                        // connect existing connectors
                        if (canvasObject.connections){
                            var connections = canvasObject.connections;
                            connections.forEach(function(c) {
                                // ** fix, acnhors getting saved as string in mongo
                                // trick to convert to int
                                var anchorsInt = $.map(c.anchors,function(a){
                                    return [$.map(a,function(ai){
                                        return Number(ai)
                                    })]
                                })
                                jsPlumb.connect({
                                    source: c.pageSourceId,
                                    target: c.pageTargetId,
                                    anchors: anchorsInt
                                });
                            });
                        }
                        cb()
                    }
                ],function(){
                    console.log('done loading from canvas')
                })
            }
            else {
                // first time drawing canvas
                async.eachSeries(TOOL.nodes,function(n,eachSeriesCb){
                    drawNode(n,eachSeriesCb)
                },function(){
                    console.log('done loading from nodes')
                })
            }
        }
    });
});