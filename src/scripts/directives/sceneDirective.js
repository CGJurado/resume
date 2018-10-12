angular.module('myApp')
.directive('sceneDirective',[
    'sceneFactory',
    '$document',
    'helper',
    function(sceneFactory, $document, helper){
        return {
            restrict: 'AE',
            link: function(scope, element, attrs){
                
                sceneFactory.init(element[0]);
                sceneFactory.render();

                var headerContainer = $document[0].querySelector('div[ui-view="header"]');
                var height = element[0].offsetHeight;
                var width = element[0].offsetWidth;
                var mouse = {x: 0,y: 0};
                var INTERSECTED;

                function getIntersections(){
                    var mouse2D = new THREE.Vector2(mouse.x, mouse.y);
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
                        } else if(intersects[0].object.name === 'line'){
                            helper.broadcast('goTo', 'app');
                        } else{
                            sceneFactory.del(intersects[0].object);
                            console.log(sceneFactory.getSceneChildren().length);
                        }
                        
                        // intersects[0].object.scale.x++;
                        // intersects[0].object.scale.y++;
                        // intersects[0].object.scale.z++;
                    }
                });
            }
        }
    }
]);