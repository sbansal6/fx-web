     $panzoom = $('#container').find('.panzoom').panzoom({
                minScale: 0.4,
                maxScale: 2,
                increment: 0.1,
                startTransform: 'scale(.9)',
                maxScale: 1,
                increment: 0.1,
                contain: true,
                cursor: ""/*empty string prevents panzoom
                    from changing cursor styles defined in your css.*/
              }).on("panzoomstart",function(e,pz,ev){
                $panzoom.css("cursor","move");//set "move" cursor on start only
              })
              .on("panzoomend",function(e,pz){
                $panzoom.css("cursor","");//restore cursor
        });
       
        $panzoom.parent()
              .on('mousewheel.focal', function( e ) {
                //if Control pressed then zoom
                if(e.ctrlKey||e.originalEvent.ctrlKey)
                {
                 e.preventDefault();
                 var delta = e.delta || e.originalEvent.wheelDelta;
                 var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                 $panzoom.panzoom('zoom', zoomOut, {
                    animate: true,
                    exponential: false,
                 });
                }else{//else pan (touchpad and Shift key works)
                 e.preventDefault();
                 var deltaY = e.deltaY || e.originalEvent.wheelDeltaY || (-e.originalEvent.deltaY);
                 var deltaX = e.deltaX || e.originalEvent.wheelDeltaX || (-e.originalEvent.deltaX);
                 $panzoom.panzoom("pan",deltaX/2,deltaY/2,{
                    animate: true,
                    relative: true,
                 });
                }
              })
              //on start store initial offsets and mouse coord
              .on("mousedown touchstart",function(ev){
                var matrix = $container.find(".panzoom").panzoom("getMatrix");
                var offsetX = matrix[4];
                var offsetY = matrix[5];
                var dragstart = {x:ev.pageX,y:ev.pageY,dx:offsetX,dy:offsetY};
                $(ev.target).css("cursor","move");
                $(this).data('dragstart', dragstart);
              })
              //calculate mouse offset from starting pos and apply it to panzoom matrix
              .on("mousemove touchmove", function(ev){
                var dragstart = $(this).data('dragstart');
                if(dragstart)
                {
                 var deltaX = dragstart.x-ev.pageX;
                 var deltaY = dragstart.y-ev.pageY;
                 var matrix = $container.find(".panzoom").panzoom("getMatrix");
                 matrix[4] = parseInt(dragstart.dx)-deltaX;
                 matrix[5] = parseInt(dragstart.dy)-deltaY;
                 $container.find(".panzoom").panzoom("setMatrix",matrix);
                }
              })
              .on("mouseup touchend touchcancel", function(ev){
                $(this).data('dragstart',null);
                $(ev.target).css("cursor","");
              });
 
       var currentScale = 1;
        $('#container').find("#diagram .item").draggable({
           start: function(e){
             var pz = $container.find(".panzoom");
             //save current scale factor to consider it later
             currentScale = pz.panzoom("getMatrix")[0];
             $(this).css("cursor","move");
             //disable panzoom, to avoid panning while dragging node
             pz.panzoom("disable");
           },
           drag:function(e,ui){
             /*compensate current scale while dragging,
                 else pointer and node will have different speeds*/
             ui.position.left = ui.position.left/currentScale;
             ui.position.top = ui.position.top/currentScale;
             //it's possible to have not connected nodes, so let's check it.
             if($(this).hasClass("jsplumb-connected"))
             {
              plumb.repaint($(this).attr('id'),ui.position);
             }
           },
           stop: function(e,ui){
             var nodeId = $(this).attr('id');
             if($(this).hasClass("jsplumb-connected"))
             {
              plumb.repaint(nodeId,ui.position);
             }
             $(this).css("cursor","");
             $container.find(".panzoom").panzoom("enable");
           }
        });