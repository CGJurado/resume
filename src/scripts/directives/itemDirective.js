angular.module('myApp')

.directive('item', [
    '$document',
    'helper',
    function($document, helper) {
        return {
            link: linker
        };

        function linker(scope, element, attr) {
            var startX = 0, x = 0;
            var startY = 0, y = 0;
            // element.text('(X:'+ x +',Y:'+ y +')');
    
            element.css({
                position: 'relative',
                // border: '1px solid red',
                // backgroundColor: 'lightgrey',
                cursor: 'pointer',
                height: '50px',
                width: '50px'
            });
    
            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                // if((attr.length - 1) == attr.index){
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                // }                
            });
    
            function mousemove(event) {
                // element.text('(X:'+ x +',Y:'+ y +') (pageX:'+ event.pageX +',pageY:'+ event.pageY +')');
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }
    
            function mouseup(event) {
                console.log(x +', '+ y);
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                if(event.pageY < 600 && event.pageY > 50){
                    x = 0;
                    y = 0;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                    helper.broadcast('returnMesh', {type: attr.name, index: attr.index});
                } else{
                    x = 0;
                    y = 0;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }
            }
        }
    }
]);