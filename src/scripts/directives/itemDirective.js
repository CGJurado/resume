angular.module('myApp')

.directive('item', [
    '$window',
    'helper',
    '$document',
    function($window, helper, $document) {
        return {
            link: linker
        };

        function linker(scope, element, attr) {
            var startX = 0, x = 0;
            var startY = 0, y = 0;
            // element.text('(X:'+ x +',Y:'+ y +')');
    
            // element.css({
            //     position: 'relative',
            //     cursor: 'pointer',
            //     height: '50px',
            //     width: '50px',
            //     zIndex: '60',
            //     color: attr.color
            // });

            // if(attr.custom){
            //     element.css({
            //         backgroundColor: attr.color
            //     })
            // }

            var hammer = new Hammer(element[0]);
            hammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
    
            hammer.on('panstart', function(event) {
                console.log('item index: '+ attr.index);
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

                let heightLimit = ($window.innerHeight/2) + 50;
                let nearRightCanvas = $document[0].elementFromPoint(event.center.x+50, event.center.y).closest('canvas');
                let nearLeftCanvas = $document[0].elementFromPoint(event.center.x-50, event.center.y).closest('canvas');

                if(event.center.y < heightLimit && event.center.y > 50){//Inside Main Scene
                    x = 0;
                    y = 0;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                    helper.broadcast('returnMesh', {type: attr.name, index: attr.index});
                } else if(nearRightCanvas || nearLeftCanvas){        //Inside Custom Scene
                    x = 0;
                    y = 0;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                    helper.broadcast('addCustomMesh', {type: attr.name, index: attr.index});
                } else{                                            //Back to init position
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