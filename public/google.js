var FEEDLINE = [];
var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ]

];

/**
 * Edit Node now , add more fields or whatever
 */
function editNode(nodeId) {
    console.log('editNode',nodeId, FEEDLINE.nodes)
    var thisNode = _.find(FEEDLINE.nodes, function(n) {
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
    ktyle.remove(nodeId);
}

function encode(e){
    return e.replace(/[^]/g,function(e){return"&#"+e.charCodeAt(0)+";"})
}

function addFields(nodeId,node){
    if (node.fields && node.fields.length > 0){
        //////console.log('addFields',node.fields,node.fields.length);
        node.fields.forEach(function(field) {
            var rowId = nodeId + '_' + field.name;
            //////console.log('addFields',rowId);
            var desc = field.description ? encode(field.description) : "";
            var tableRow = '<tr id=' + rowId + '>' +
                '<td align="center" title= '+ desc+' >' + field.name +  (field.required ? ' *' : '' )  +  '</td>' +
                '</tr>'
            $('#' + nodeId + " .table").append(tableRow);
            //////console.log('setting endpoint for ',rowId,node);
            setEndPoint(rowId, node)
        });
    } else {
        var rowId = nodeId + '_' + 'default';
        var tableRow = '<tr id=' + rowId + '>' +
            '<td align="center"></td>' +
            '</tr>'
        $('#' + nodeId + " .table").append(tableRow);
        //////console.log('printing node',node)
        setEndPoint(rowId, node)
    }
}

function addSourceEndPoint(rowId) {
    //////console.log('addSourceEndPoint',rowId)
    ktyle.addEndpoint(rowId, {
        anchors: ['Right'],
        isSource: true,
        isTarget: false,
        endpoint: ["Dot", {
            radius: 7
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
    ktyle.addEndpoint(rowId, {
        anchors: ['Left'],
        isSource: false,
        isTarget: true,
        endpoint: ["Dot", {
            radius: 7
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
            ////console.log('max connection limit reached')
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
    //////console.log('adding node',JSON.stringify(node,null,4))
    if (node.nodeId){
        ktyle.remove(node.nodeId);
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
            $('#' + nodeId).find('.btndelete').remove();
        }
        ktyle.draggable(nodeId, {
            containment: "parent",
            grid:[10,10]
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
    $.each(ktyle.getConnections(), function(idx, connection) {
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
    FEEDLINE.canvas = flowChartJson
    $.ajax({
        type: "POST",
        url: "/FEEDLINE",
        data: {
            FEEDLINEName: "google",
            canvas: FEEDLINE.canvas,
            settings: FEEDLINE.settings,
            nodes: FEEDLINE.nodes
        },
        success: function(result) {
            ////console.log('i am done saving')
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
    // add FEEDLINEtip
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
            chartArea: {width: '60%'},
            'width':450,
            'height':400,
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
    FEEDLINE.nodes.forEach(function(n){
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
            // find node details from FEEDLINEs paletteNodes
            // add node to chart/ draw node
            var thisNode = clone(_.find(FEEDLINE.nodes, function(n) {
                return n.name === draggableId
            }))
            thisNode.nodeId = thisNode.name + '_' + guid() ;
            thisNode.positionX = positionX;
            thisNode.positionY = positionY;
            drawNode(thisNode,function(){
            })
        }
    });
}

/**
 * Iniializes grid at start
 * Todo:- Need to fix this.
 */
function initGrid(){
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
}

/**
 * Initialzes Save button
 *
 */
function initSaveButton(){
    $('#btnSave').click(function() {
        save(function(){
            alert('Settings saved!!');
        });
    })
}

/**
 * Initialzes Analyze button
 */
function initAnalyzeButton(){
    $('#btnAnalyze').click(function() {
        save(function(){
            //////console.log('analyze',FEEDLINE)
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
                    FEEDLINEName: "google",
                    canvas: FEEDLINE.canvas,
                    settings: FEEDLINE.settings,
                    nodes: FEEDLINE.nodes
                },
                success: function(result) {
                    renderGrid(result.outputRows);
                    renderChart(result.stats);
                }
            });
        });

    })
}

/**
 * Initializes export button
 */
function initExportButton(){
    $("#btnExport").click(function(){
        $('#gridTable').tableExport({type:'txt',escape:'false',ignoreColumn: []});
    });
}

/**
 * Initialize google chart
 */
function initChart() {
    google.charts.load('current', {packages: ['corechart', 'bar']});
}

/**
 * init ktyle
 */
function initktyle(){
    ktyle.importDefaults({
        Connector: ["Bezier"],  // Bezier | Straight | Flowchart | StateMachine
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
                        ////console.log('connection overlay clicked')
                    },
                }
            }],
            // this is how you add label to arrow
            //[ "Label", { label:"Relationship", id:"lblPrimary_" + 'casasc' } ]
        ]
    })
    ktyle.setContainer("canvas");
    ktyle.bind("connection", function(info, originalEvent) {
        //alert("connected "+info.sourceId+" and "+info.targetId + " via "+info.connection);
        var connection1 = info.connection;
        connection1.bind("click", function(connection, originalEvent) {
            //alert("you clicked on "+ connection);
            connection.setPaintStyle({
                strokeStyle: "rgba(0, 17, 255, 1)",
                lineWidth: 3.5
            });
            keyboardJS.on('del', function(event, keys, keyComboStr) {
                ktyle.detach(connection)
            })
            keyboardJS.on('esc', function(event, keys, keyComboStr) {
                connection.setPaintStyle({
                    strokeStyle: "rgba(50,50,50,1)",
                    lineWidth: 2.5
                });
            })

        });
    });
}

/**
 * If canvas exists in db
 * Means user updated the state
 * @param canvas
 */
function useStoredCanvas(FEEDLINE){
    ////console.log('loading from existing canvas')
    // draw nodes
    var canvasObject = FEEDLINE.canvas;
    async.waterfall([
        function(cb) {
            async.eachSeries(canvasObject.nodes, function(cn, eachSeriesCb) {
                ////console.log("canvas node",cn);
                var onode = _.find(FEEDLINE.nodes, function(n) {
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
                    ktyle.connect({
                        source: c.pageSourceId,
                        target: c.pageTargetId,
                        anchors: anchorsInt,
                        endpoint: ["Dot", {
                            radius: 7
                        }]
                    });
                });
            }
            cb()
        },
        function(cb){
            if(FEEDLINE.chart){
                renderChart(FEEDLINE.chart)
            }
        }
    ],function(){
        ////console.log('done loading from canvas')
    })
}

function renderCanvasForFirstTime(FEEDLINE){
    // first time drawing canvas
    // only draw core nodes
    var nodeCount = 0;
    async.eachSeries(FEEDLINE.nodes,function(n,eachSeriesCb){
        if (n.isCoreNode){
            nodeCount++;
            n.positionX = 30 * (nodeCount === 1 ? 1 : 20);
            n.positionY = 30 ;
            ////console.log('node',n);
            drawNode(n,eachSeriesCb)
        } else {
            eachSeriesCb();
        }
    },function(){
        if(FEEDLINE.chart){
            renderChart(FEEDLINE.chart)
        }
        ////console.log('done loading from nodes')
    })
}

ktyle.ready(function() {
    initGrid();
    initSaveButton();
    initAnalyzeButton();
    initExportButton();
    initChart();
    initOnDrag();
    initktyle();
    $.ajax({
        type: "GET",
        url: "/FEEDLINE",
        data: {
            FEEDLINEName: "google"
        },
        success: function(result) {
            ////console.log('return from ',result)
            FEEDLINE = result;
            loadPalette();
            if (FEEDLINE.canvas) {
                useStoredCanvas(FEEDLINE);
            }
            else {
                renderCanvasForFirstTime(FEEDLINE);
            }
        }
    });
});