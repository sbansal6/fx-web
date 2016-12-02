// http://www.eslinstructor.net/jsonfn/
// encrypt data coming from server using key
// store key in here and decrypt using key
var currentPage = document.location.href.match(/[^\/]+$/)[0];
var commonFunctions = {
    format: function(htmlString,placeholders) {
        if ($.isArray(placeholders)) {
            var args = arguments;
            return htmlString.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ?
                    args[number] :
                    match;
            });
        } else { //Object
            var s = htmlString;
            for (var propertyName in placeholders) {
                var re = new RegExp('{' + propertyName + '}', 'gm');
                s = s.replace(re, placeholders[propertyName]);
            }
            return s;
        }
    },
    ajaxindicatorstart:function(text){
    if(jQuery('body').find('#resultLoading').attr('id') != 'resultLoading'){
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="images/ajax_loader_5.gif"><div>'+text+'</div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'width':'100%',
        'height':'100%',
        'position':'fixed',
        'z-index':'10000000',
        'top':'0',
        'left':'0',
        'right':'0',
        'bottom':'0',
        'margin':'auto'
    });

    jQuery('#resultLoading .bg').css({
        'background':'#000000',
        'opacity':'0.7',
        'width':'100%',
        'height':'100%',
        'position':'absolute',
        'top':'0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px',
        'height':'75px',
        'text-align': 'center',
        'position': 'fixed',
        'top':'0',
        'left':'0',
        'right':'0',
        'bottom':'0',
        'margin':'auto',
        'font-size':'16px',
        'z-index':'10',
        'color':'#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
},
    ajaxindicatorstop:function(){
        jQuery('#resultLoading .bg').height('100%');
        jQuery('#resultLoading').fadeOut(300);
        jQuery('body').css('cursor', 'default');
    },
    guid:function() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
},
    toCamelCase:function(str){
        return str.split(' ').map(function(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
    },
    encode: function(e){return e.replace(/[^]/g,function(e){return"&#"+e.charCodeAt(0)+";"})}
};
var editNode = function(nodeId){
    var node = pages.feedline.getNodeById(nodeId);
    $("#inputNodeId").val(node.guid);
    $('#form').empty();
    $("#form").alpaca({
        "schema": node.schema,
        "options": node.options,
        "data":node.data
    });
    $('#myModal').modal('show'); 
};
var deleteNode = function(nodeId){
    ktyle.remove(nodeId);
};
var saveNode = function(){
    
};

var pages = {
    feedline:{
        palette:{},
        chart:{
            nodes:[]
        },
       chartNodeHtml:'<div id = "{guid}" class="chart-node item" data-name="{name}"> ' + 
                         '<div class="chart-node-row-group"> '+ 
                                 '<div class="chart-node-item"> <i class="fa {icon} fa-3x"></i> </div> ' +
                                 '<div class="chart-node-item-text"> <a>{name}</a> </div> ' +
                                 '<div class="chart-node-column-group">' + 
                                    '<div class="chart-node-item-button"> <div class="chart-node-button"> <button id = "btnEdit" title="Edit" onclick=editNode(\'{guid}\') style="float:right;" class="btn btn-xs btn-secondary btndelete"><span class="glyphicon glyphicon-edit"></span></button> </div> </div>' +
                                    '<div class="chart-node-item-button"> <div class="chart-node-button"> <button id = "btnDelete" title="Delete" onclick=deleteNode(\'{guid}\') style="float:right;" class="btn btn-xs btn-secondary btndelete"><span class="glyphicon glyphicon-remove"></span></button> </div> </div>' +
                                 '</div>' +
                         '</div>' +
                     '</div>',  
        paletteNodeHtml:'<div class="palette-node" data-name="{name}"> <div class="palette-node-item"> <i class="fa {icon} fa-3x"></i> </div> <div class="palette-node-item-text"> <a>{name}</a> </div> </div>',
        /**
         * Define all behavior here
         */ 
        init:function(){
            var me = pages.feedline;
            me.palette = {};
            /**
             * This needs to have all the logic to check what kind of node is dragged
             * and check rules after stop even
             */
            $("#chart").droppable({
    	        containment: "#chart",
    	        drop: function (e, ui) {
    	            var droppedElement = ui.helper.clone();
    	            var mainDiv = ui.draggable;
    	            var draggable = $(mainDiv[0].lastChild);
    	            var draggableId = draggable.attr('id');
    	            var draggableName = $(droppedElement).data('name')
    	            // http://stackoverflow.com/questions/849030/how-do-i-get-the-coordinate-position-after-using-jquery-drag-and-drop
    	            var currentPos = ui.helper.position();
    	            ui.helper.remove();
    	            me.addNode(draggableName,currentPos.left,currentPos.top);
    	        }
             });
        },
        /**
         * Returns node from local palette storage
         */ 
        getIcon: function(n){
            if (n.type === 'Function'){
                return 'fa-fn'
            } else {
                return (n.icon ? n.icon : 'fa-'+ (n.name).toLowerCase());
            }
        },
        getNodebyName:function(nodeName){
            var me = pages.feedline;
            var returnNode ;
            me.palette.nodes.forEach(function(n){
                if (n.name === nodeName){
                    var object = $.extend(true,{},n);
                    returnNode = object;
                }
            })
            return returnNode;
        },
        getNodeById:function(guid){
            var me = pages.feedline;
            var returnNode ;
            me.chart.nodes.forEach(function(n){
                if (n.guid === guid){
                    returnNode = n;
                }
            })
            return returnNode;
        },
        addNode:function(nodeName,positionX,positionY){
            var me = pages.feedline
            var node = me.getNodebyName(nodeName);
            var newId = commonFunctions.guid();
            node.guid = newId;
            me.chart.nodes.push(node);
            var html = commonFunctions.format(me.chartNodeHtml,{name:node.name,icon:me.getIcon(node),guid:newId});
            $(html).css('left', positionX + 'px').css('top', positionY + 'px').appendTo('#chart');
            ktyle.draggable(newId, {
                containment: "parent",
                grid:[10,10]
           });
           if (node.type === "Function"){
               pages.feedline.setEndPoint(node.guid, node);
           }
    	},
        loadPalette : function(cb){
            $.ajax({
                type: "GET",
                url: "/api/nodes",
                success: function(result) {
                 var me = pages.feedline;
                 me.palette.nodes = JSONfn.parse(result.nodes);
                 me.palette.nodes.forEach(function(n){
                     var html = commonFunctions.format(me.paletteNodeHtml,{name:n.name,icon:me.getIcon(n)});
                     // add to palette and make draggable
                     $(html).appendTo('#p'+n.type).draggable({
    	    		     helper: 'clone',
                    	 appendTo: '#chart',
                    	 containment:'#chart',
                    	 cursor: 'move'	,
                    	 revert: "invalid"
    	    		 });
                 })
                 cb();
             }
             });
       },
       /**
        * Update node on chart (mostly data has changed) 
        */
        updateNodeAfterEdit: function(nodeId,cb) {
            var node = pages.feedline.getNodeById(nodeId);
            pages.feedline.addFields(node);
        },
        drawNode: function(node,cb){
            
        },
        addFields: function (node){
            if (node.data.fields && node.data.fields.length > 0){
                $('#' + node.guid).find('.chart-node-item-field').remove()
                if (node.type === 'Source'){
                    $('#' + node.guid).css('top',0);
                    $('#' + node.guid).css('left',0);
                }
                if (node.type === 'Connector'){
                    $('#' + node.guid).css('top',0);
                    $('#' + node.guid).css('right',0);
                }
                node.data.fields.forEach(function(field) {
                    var rowId = node.guid + '_' + field.name;
                    var desc = field.description ? commonFunctions.encode(field.description) : "";
                    var fieldItemHtml = '<div id="'+rowId+'" class="chart-node-item-field"> '+field.name +  (field.required ? ' *' : '' )+' </div> '
                    $('#' + node.guid).append(fieldItemHtml);
                    pages.feedline.setEndPoint(rowId, node);
                });
            }
        },
        setEndPoint : function (rowId, node) {
            if (node.type === 'Function') {
                pages.feedline.addSourceEndPoint(rowId);
                pages.feedline.addTargetEndPoint(rowId);
            }
            if (node.type === 'Source') {
                pages.feedline.addSourceEndPoint(rowId);
            }
            if (node.type === 'Connector') {
                pages.feedline.addTargetEndPoint(rowId);
            }
        },
        addSourceEndPoint : function (rowId) {
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
       },
        addTargetEndPoint: function (rowId) {
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
                    console.log('max connection limit reached')
                }
             });
        }
   }
};

// fire page specific javascript
if (currentPage === "feedline"){
    ktyle.ready(function() {
         ktyle.setContainer("chart");
         var self = pages.feedline;
         self.init();
         self.loadPalette(function(){});
    })
    
}

if (currentPage === "connector"){
    $("#form").alpaca({
    "data": {},
    "schema": {
                "title": "New Connector",
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name",
                        "description":"Name of the connector, this has to be unique",
                        "required":true,
                        "minLength":1
                    },
                    "description": {
                        "type": "string",
                        "title": "Description",
                        "description":"Short description about the connector, what is does and all"
                    },
                    "schemaFields": {
                        "type": "array",
                        "minLength":1,
                        "required":true,
                        "items": {
                            "type": "object",
                            "properties": {
                                "fieldName": {
                                    "title":"FieldName",
                                    "description":"Name of the field.",
                                    "type": "string",
                                    "required":true,
                                    "minLength":1,
                                    "maxLength":50
                                },
                                "fieldDescription": {
                                    "title":"Description"
                                } ,
                                "type":{
                                    "title": "DataType",
                                    "description":"Data type of field",
                                    "type":"string",
                                    "enum":['string','number','integer','boolean','date','any','array'],
                                    "default":'string'
                                },
                                "optional":{
                                    "title":"Required",
                                    "description":"Defines if property is required or not",
                                    "type":"string",
                                    "enum":['true','false'],
                                    "default":'false'
                                },
                                // dependency on type == string,array
                                "minLength":{
                                    "title": "MinLength",
                                    "description":"Min length in case of string or array",
                                    "type":"number",
                                    "required":true,
                                    "minimum":1,
                                    "default":1
                                },
                                // dependency on type == string,array
                                "maxLength":{
                                    "title": "MaxLength",
                                    "type":"number",
                                    "required":true
                                },
                                // Specify possible values in case its an array
                                "arrayValues":{
                                    "title":"Possible Values",
                                    "description":"List of possible array values in case field is an array",
                                    "type":"array",
                                    "minLength":1,
                                    "required":true,
                                    "items":{
                                        "type": "object",
                                        "properties":{
                                            "value":{
                                                "type":"string",
                                                "required":true,
                                                "minLength":1
                                            }
                                        }
                                    }
                                },
                                // dependency on type == string
                                "pattern":{
                                    "title": "Pattern",
                                    "type":"string",
                                    "enum":['regexp','email','url','date-time','date','time','color','numeric','integer','decimal','alpha','alphaNumeric','upperString','lowerString'],
                                    "default":'alphaNumeric',
                                    "required":true
                                },
                                "patternValue":{
                                    "title":"Regex Value for pattern",
                                    "type":"string",
                                    "required":true,
                                    "minLength":1
                                },
                                "rules":{
                                    "title":"Compare",
                                    "type":"array",
                                      "minLength":0,
                                    "items": {
                                        "type": "object",
                                        "properties":{
                                            "operator":{
                                                "title":"Operator",
                                                "type":"string",
                                                "enum":['lt','lte','gt','gte','eq','ne'],
                                                "default":'lt'
                                            },
                                            "operatorValue":{
                                                "title":"Value",
                                                "type":"number",
                                                "minLength":1,
                                                "required":true
                                            }
                                        }
                                    }
                                }
                            },
                            "dependencies":{
                                "minLength": ["type"],
                                "maxLength": ["type"],
                                "pattern":["type"],
                                "arrayValues":["type"],
                                "patternValue":["pattern"],
                                "rules":["type"]
                            }
                        }
                    },
                    "public":{
                        "title":"Public",
                        "type":"string",
                        "enum":['true','false'],
                        "default":'false'
                    }
                    
                }
            },
    "options":{
                "fields":{
                    "name":{
                        "focus":true,
                        "showMessages":true,
                        "validate":true
                    },
                    "schemaFields":{
                        "toolbarSticky": true,
                        "showMessages":true,
                        "validate":true,
                        "fields":{
                            "item": {
                                "fields":{
                                    "fieldDescription" : {
                                        "type": "textarea",
                                        "rows": 2,
                                        "cols": 40
                                    },
                                    "type":{
                                        "removeDefaultNone": true,
                                        "type":"select"
                                    },
                                    "optional":{
                                        "removeDefaultNone": true
                                    },
                                    "minLength":{
                                        "dependencies":{
                                            "type":"string"
                                        }
                                    },
                                    "maxLength":{
                                        "dependencies":{
                                            "type":"string"
                                        }
                                    },
                                    "pattern":{
                                        "removeDefaultNone": true,
                                        "dependencies":{
                                            "type":["string"]
                                        }
                                    },
                                    "patternValue":{
                                        "dependencies":{
                                            "pattern":"regexp"
                                        }
                                    },
                                    "arrayValues":{
                                        "dependencies":{
                                            "type":"array"
                                        }
                                    },
                                    "rules":{
                                        "toolbarSticky": true,
                                        "dependencies":{
                                            "type":"number"
                                        },
                                        "fields":{
                                            "item":{
                                                "fields":{
                                                    "operator":{
                                                        "removeDefaultNone": true,
                                                        "type":"select"
                                                    },
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                    "public":{
                        "removeDefaultNone": true
                    },
                },
                "form":{
                    "attributes":{
                        "action":"/connector",
                        "method":"POST"
                    },
                    "buttons":{
                        "submit":{
                            "title": "Save",
                            "click": function() {
                                var val = this.getValue();
                                if (this.isValid(true)) {
                                    alert("Valid value: " + JSON.stringify(val, null, "  "));
                                    this.ajaxSubmit().done(function() {
                                        console.log("done submitting",JSON.stringify(val, null, "  "))
                                    });
                                } else {
                                    alert("Invalid value: " + JSON.stringify(val, null, "  "));
                                }
                            }
                        }
                    }
                },
            },
    "view": {
        "parent": "bootstrap-edit-horizontal",
        "wizard": {
            "title": "Welcome to the Wizard",
            "description": "Please fill things in as you wish",
            "bindings": {
                "name": 1,
                "description":1,
                "schemaFields": 2,
                "public":3
            },
            "steps": [{
                "title": "Connector Info",
                "description": "Basic Information"
            }, {
                "title": "Fields",
                "description": "Specify connector attributes"
            }, {
                "title": "Settings",
                "description": "Advance options."
            }],
            "hideSubmitButton":true
        }
    }
});
}