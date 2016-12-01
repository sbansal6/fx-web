
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
    }
};
var editNode = function(nodeId){
    $('#form').empty();
    $("#form").alpaca({
        "schema":  {
        "title": "What do you think of Alpaca?",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "title": "Name"
            },
            "ranking": {
                "type": "string",
                "title": "Ranking",
                "enum": ['excellent', 'not too shabby', 'alpaca built my hotrod']
            }
        }
    },
        "options": {},
        "data":{}
    });
    $('#myModal').modal('show'); 
};
var deleteNode = function(nodeId){
    ktyle.remove(nodeId);
};

var pages = {
    feedline:{
        db:{},
        chartNodeHtml:'<div id = "{guid}" class="chart-node" data-name="{name}"> ' + 
                         '<div class="chart-node-item"> <i class="fa {icon} fa-3x"></i> </div> ' +
                         '<div class="chart-node-item-text"> <a>{name}</a> </div> ' +
                         '<div class="chart-node-group">' + 
                            '<div class="chart-node-item-button"> <div class="chart-node-button"> <button id = "btnEdit" title="Edit" onclick=editNode(\'{guid}\') style="float:right;" class="btn btn-xs btn-secondary btndelete"><span class="glyphicon glyphicon-edit"></span></button> </div> </div>' +
                            '<div class="chart-node-item-button"> <div class="chart-node-button"> <button id = "btnDelete" title="Delete" onclick=deleteNode(\'{guid}\') style="float:right;" class="btn btn-xs btn-secondary btndelete"><span class="glyphicon glyphicon-remove"></span></button> </div> </div>' +
                         '</div>' +
                     '</div>',             
        paletteNodeHtml:'<div class="palette-node" data-name="{name}"> <div class="palette-node-item"> <i class="fa {icon} fa-3x"></i> </div> <div class="palette-node-item-text"> <a>{name}</a> </div> </div>',
        /**
         * Define all behavior here
         */ 
        init:function(){
            var me = pages.feedline;
            me.db = {};
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
         * Returns node from local db storage
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
            me.db.nodes.forEach(function(n){
                if (n.name === nodeName){
                    returnNode = n;
                }
            })
            return returnNode;
        },
        addNode:function(nodeName,positionX,positionY){
            var me = pages.feedline
            var node = me.getNodebyName(nodeName);
            var newId = commonFunctions.guid();
            var html = commonFunctions.format(me.chartNodeHtml,{name:node.name,icon:me.getIcon(node),guid:newId});
            $(html).css('left', positionX + 'px').css('top', positionY + 'px').appendTo('#chart');
            ktyle.draggable(newId, {
            containment: "parent",
            grid:[10,10]
        });
    	},
        loadPalette : function(cb){
            $.ajax({
                type: "GET",
                url: "/api/nodes",
                success: function(result) {
                 var me = pages.feedline;
                 me.db.nodes = result.nodes;
                 result.nodes.forEach(function(n){
                     var html = commonFunctions.format(me.paletteNodeHtml,{name:n.name,icon:me.getIcon(n)});
                     // add to palette and make draggable
                     $(html).appendTo('#p'+n.type).draggable({
    	    		     helper: 'clone',
                    	 appendTo: '#chart',
                    	 containment:'#chart',
                    	 cursor: 'move'	
    	    		 });
                     cb();
                 })
             }
             });
       },
        /**
         * Update local storage variable db on any changes
         */ 
        updateDb:function(){
            
        },
        editNode:function(nodeId){
            alert('I am edited');
       }
   }
};