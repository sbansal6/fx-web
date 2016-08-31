var TOOL = [];
var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];


/**
 * Edit Node now , add more fields or whatever
 */
function editNode(nodeId) {
    var thisNode = _.find(TOOL.nodes, function(n) {
        return n.nodeId === nodeId
    })
    var thisNodeOptions = _.find(NODES_OPTIONS,function(n){
        return n.name === thisNode.name
    })
    $('#form').empty();
    $("#form").alpaca({
        "schema": thisNode.schema,
        "options": thisNodeOptions.options(nodeId),
        "data":thisNode.data
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

/**
 * Deletes a node on delete button
 * @param nodeId
 */
function deleteNode(nodeId) {
    jsPlumb.remove(nodeId);
}

function addFields(nodeId,node){
    if (node.fields && node.fields.length > 0){
        node.fields.forEach(function(field) {
            var rowId = nodeId + '_' + field.name
            var tableRow = '<tr id=' + rowId + '>' +
                '<td align="center">' + field.name + '</td>' +
                '</tr>'
            $('#' + nodeId + " .table").append(tableRow);
            setEndPoint(rowId, node)
        });
    } else {
        var rowId = nodeId + '_' + 'default';
        var tableRow = '<tr id=' + rowId + '>' +
            '<td align="center"></td>' +
            '</tr>'
        $('#' + nodeId + " .table").append(tableRow);
        console.log('printing node',node)
        setEndPoint(rowId, node)
    }
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
    if (node.type === 'transformation') {
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

function drawNode(node,cb) {
    if (node.nodeId){
        jsPlumb.remove(node.nodeId);
    }
    $.get("assests/node.html?time=" + (new Date()).getTime(), function(data) {
        var nodeId = node.nodeId ? node.nodeId : (node.name + '_' + guid());
        var nodeHtml = data.format({
            node_id: nodeId,
            node_name: node.name,
            image: node.image
        })
        $('.canvas').append(nodeHtml);
        $('#' + nodeId).css('left', (node.positionX ? node.positionX : 30) + 'px');
        $('#' + nodeId).css('top', (node.positionY ? node.positionY : 30) + 'px');
        if (node.isCoreNode){
            $('#' + nodeId).find('.btn-danger').remove();
        }
        jsPlumb.draggable(nodeId, {
            containment: "parent"
        });
        addFields(nodeId,node);
        cb()
    });
}

// save canvas as well as nodes
function save(cb) {
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
            cb();
        }
    });

}

function renderGrid(result){
    $('#GridContainer').empty()
    $('#GridContainer').append('<table id="gridTable" class="display" width="100%"></table>')
    //Get dynamic column.
    var dynamicColumns = [];
    var i = 0;
    var maxKeys = Object.keys(result[0]).length;
    $.each(result[0], function (key, value) {
        var obj = { sTitle: toCamelCase(key) };
        dynamicColumns[i] = obj;
        i++;
    });
    //fetch all records from JSON result and make row data set.
    var rowDataSet = [];
    var i = 0;
    $.each(result, function (key, value) {
        var rowData = [];
        var j = 0;
        $.each(result[i], function (key, value) {
            rowData[j] = JSON.stringify(value,null,4);
            j++;
        });
        rowDataSet[i] = rowData;

        i++;
    });
    $('#gridTable').DataTable({
        "bDestroy": true,
        "bJQueryUI": true,
        "bFilter": true,
        "bSort": true,
        "aaData": rowDataSet,
        "aoColumns": dynamicColumns,  //These are dynamically created columns present in JSON object.
        "fnRowCallback":function(nRow,aData,iDisplayIndex,iDisplayIndexFull){
            if ( aData[maxKeys - 2] == "false" )
            {
                $('td', nRow).css('color', 'Red');
            }
        }
    });
    // add tooltip
    $('#gridTable tbody tr').each( function() {
        var row = $('td', this);
        var title = $(row[maxKeys - 1]).text();
        this.setAttribute( 'title', title );
    });
    // remove column from grid
    var table = $('#gridTable').DataTable();
    table.column(maxKeys - 1).visible(false)
}

function renderChart(stats){
    google.charts.setOnLoadCallback(drawStacked);
    function drawStacked() {
        var data = google.visualization.arrayToDataTable(stats);
        var options = {
            title: 'Feed Statistics',
            chartArea: {width: '50%'},
            isStacked: true,
            hAxis: {
                title: 'Total Records',
                minValue: 0,
            },
            vAxis: {
                title: 'Fields'
            }
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart'));
        chart.draw(data, options);
    }

}

function loadPalette(nodes){
    TOOL.nodes.forEach(function(n){
        if (!(n.isCoreNode)){
            var d = document.createElement("div");
            var nodeName = n.name;
            d.id = nodeName;
            $("#palette").append(d);
            $("#" + d.id).append('<div class="palette_node" id="' + nodeName + '">'+nodeName+'</div>');
            $(d).draggable({
                helper: 'clone',
                appendTo: 'body',
                revert: true,
                revertDuration: 50
            });
        }
    });
}

function initOnDrag(){
    $("#canvas").droppable({
        containment: "canvas",
        drop: function (e, ui) {
            var droppedElement = ui.helper.clone();
            var mainDiv = ui.draggable;
            var draggable = $(mainDiv[0].lastChild);
            var draggableId = draggable.attr('id');
            var positionX = ui.offset.left - $(this).offset().left;
            var positionY = ui.offset.top - $(this).offset().top;
            ui.helper.remove();
            // find node details from tools paletteNodes
            // add node to chart/ draw node
            var thisNode = _.find(TOOL.nodes, function(n) {
                return n.name === draggableId
            })
            thisNode.positionX = positionX;
            thisNode.positionY = positionY;
            console.log('originalNode',thisNode)
            drawNode(thisNode,function(){

            })
        }
    });
}

$('#btnSave').click(function() {
    save(function(){
        alert('Settings saved!!');
    });
})

$('#btnAnalyze').click(function() {
    save(function(){

        $.ajax({
            type: "POST",
            url: "/analyze",
            beforeSend: function() {
                // Here we show the loader
                ajaxindicatorstart('analyzing feed.. please wait..');
            },
            complete: function(){
                ajaxindicatorstop();
            },
            data: {
                toolName: "google",
                canvas: TOOL.canvas,
                settings: TOOL.settings,
                nodes: TOOL.nodes
            },
            success: function(result) {
                renderGrid(result.outputRows);
                renderChart(result.stats);
            }
        });
    });

})

jsPlumb.ready(function() {
    $('#gridTable').DataTable({
        data: dataSet,
        columns: [
        { title: "Name" },
        { title: "Position" },
        { title: "Office" },
        { title: "Extn." },
        { title: "Start date" },
        { title: "Salary" }
    ]});
    $("#btnExport").click(function(){
        $('.e-table').tableExport({type:'csv',escape:'false'});
    });
    google.charts.load('current', {packages: ['corechart', 'bar']});
    initOnDrag();
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
            console.log('return from ',result)
            TOOL = result;
            loadPalette();
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
                                drawNode(onode,eachSeriesCb);
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
                // only draw core nodes
                var nodeCount = 0;
                async.eachSeries(TOOL.nodes,function(n,eachSeriesCb){
                    if (n.isCoreNode){
                        nodeCount++;
                        n.positionX = 30 * (nodeCount === 1 ? 1 : 15);
                        n.positionY = 30 ;
                        console.log('node',n);
                        drawNode(n,eachSeriesCb)
                    } else {
                        eachSeriesCb();
                    }
                },function(){
                    console.log('done loading from nodes')
                })
            }
        }
    });
});