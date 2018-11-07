angular.module('myApp')
.directive('sceneDirective',[
    'sceneFactory',
    '$document',
    'helper',
    '$window',
    function(sceneFactory, $document, helper, $window){
        function linker(scope, element, attrs){
                
            element.css({
                height: $window.innerHeight/2
            })
            
            sceneFactory.init(element[0]);
            sceneFactory.render();

            var headerContainer = $document[0].querySelector('div[ui-view="header"]');
            var height = element[0].clientHeight;
            var width = element[0].clientWidth;
            var mouse = {x: 0,y: 0};
            var INTERSECTED;

            angular.element($window).bind('resize', function(){
                // if($window.innerWidth < 750){
                //     element[0].clientHeight = $window.innerHeight;
                // }
                element.css({
                    height: $window.innerHeight/2,
                    width: $window.innerWidth
                })
                width = element[0].clientWidth;
                height = element[0].clientHeight;
                sceneFactory.updateCanvas(element[0]);
            });

            function getIntersections(){
                var mouse2D;
                if(sceneFactory.getIsMobile()){
                    mouse2D = new THREE.Vector2(0, 0);
                } else {
                    mouse2D = new THREE.Vector2(mouse.x, mouse.y);
                }
                var raycaster =  new THREE.Raycaster();
                raycaster.setFromCamera( mouse2D, sceneFactory.getCamera() );
                
                return raycaster.intersectObjects( sceneFactory.getSceneChildren() );
            }

            element.bind('mousemove', function(event){
                mouse.x = (event.clientX / width) * 2 - 1;
                mouse.y = -( (event.clientY - headerContainer.clientHeight) / height ) * 2 + 1;

                var intersects = getIntersections();

                if ( intersects.length > 0 ) {
                    if(intersects[0].object != INTERSECTED){
                        if(INTERSECTED)
                            INTERSECTED.animations = INTERSECTED.currentAni;
                        
                        INTERSECTED = intersects[0].object;

                        INTERSECTED.currentAni = INTERSECTED.animations;

                        INTERSECTED.animations = [];

                        if(INTERSECTED.name === 'sussane'){
                            INTERSECTED.rotation.x = 0;
                            INTERSECTED.rotation.y = 0;
                        }
                    }
                } else{
                    
                    if(INTERSECTED)
                        INTERSECTED.animations = INTERSECTED.currentAni;

                    INTERSECTED = null;
                }
            });
    
            element.bind('mousedown', function(event){
                
                event.stopPropagation();
    
                var intersects = getIntersections();
    
                if ( intersects.length > 0 ) {
                    
                    if(intersects[0].object.name === 'sussane'){
                        helper.broadcast('goTo', 'app.aboutme');
                    } else if(intersects[0].object.name === 'arrow'){
                        helper.broadcast('goTo', 'app');
                    } else if(intersects[0].object.name === 'cube'){
                        sceneFactory.stopTime();
                    } else if(intersects[0].object.name === 'spade'){
                        helper.broadcast('spade', intersects[0].object);
                        sceneFactory.del(intersects[0].object);
                    } else if(intersects[0].object.name === 'heart'){
                        helper.broadcast('heart', intersects[0].object);
                        sceneFactory.del(intersects[0].object);
                    } else if(intersects[0].object.name === 'clover'){
                        helper.broadcast('clover', intersects[0].object);
                        sceneFactory.del(intersects[0].object);
                    } else if(intersects[0].object.name === 'diamond'){
                        helper.broadcast('diamond', intersects[0].object);
                        sceneFactory.del(intersects[0].object);
                    } else{}

                }
            });

        }
        
        return {
            restrict: 'A',
            link: linker
        }
    }
]);