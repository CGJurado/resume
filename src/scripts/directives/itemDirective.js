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
                // transition: 'all 0.3s',
                cursor: 'pointer',
                height: '50px',
                width: '50px'
            });

            console.log(element);

            var hammer = new Hammer(element[0]);
            hammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
    
            hammer.on('panstart', function(event) {
                
                startX = event.center.x - x;
                startY = event.center.y - y;
            });
            hammer.on('pan', mousemove);
            hammer.on('panend', mouseup);
    
            function mousemove(event) {
                y = event.center.y - startY;
                x = event.center.x - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }
    
            function mouseup(event) {
                hammer.off('panmove', mousemove);
                hammer.off('pressup', mouseup);
                if(event.center.y < 600 && event.center.y > 50){
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
                    element.animate({
                        top: y + 'px',
                        left:  x + 'px'
                    }, 300);
                }
            }

        }
    }
]);