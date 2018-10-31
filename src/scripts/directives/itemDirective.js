angular.module('myApp')

.directive('item', [
    '$window',
    '$document',
    function($window, $document) {
        return {
            link: linker
        };

        function linker(scope, element, attr) {
            var startX = 0, x = 0;
            var startY = 0, y = 0;
            
            // element.ready(function(){
            //     element[0].insertAdjacentHTML('beforeend', '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="50px" height="50px" viewBox="0 0 512 512"><defs> <pattern id="blankPattern" patternUnits="userSpaceOnUse" width="220" height="220"><rect class="blankPattern" height="100%" width="100%" fill="blue"/><image style="opacity: 0.5;" href="./images/blank.jpg" x="0" y="0" width="220" height="220"> </image> </pattern> <pattern id="checkerPattern" patternUnits="userSpaceOnUse" width="220" height="220"><rect class="checkerPattern" height="100%" width="100%" fill="'+attr.svgcolor+'"/><image style="opacity: 0.5;" href="./images/checkerBoard.jpg" x="0" y="0" width="220" height="220"> </image></pattern> </defs><g><path class="pathClass" fill="url(#blankPattern)" d="M256,0L96,256l160,256l160-256L256,0z"/></g></svg>');
            // });

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
                    // helper.broadcast('returnMesh', {type: attr.name, index: attr.index});
                    scope.returnMeshToScene({type: attr.name, index: attr.index});
                } else if(nearRightCanvas || nearLeftCanvas){        //Inside Custom Scene
                    x = 0;
                    y = 0;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                    scope.addCustomMesh({type: attr.name, index: attr.index});
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