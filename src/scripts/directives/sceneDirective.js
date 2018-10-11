angular.module('myApp')
.directive('sceneDirective',[
    'sceneFactory',
    '$document',
    function(sceneFactory, $document){
        return {
            restrict: 'AE',
            link: function(scope, element, attrs){
                
                sceneFactory.init(element[0]);
                sceneFactory.render();

                var headerContainer = $document[0].querySelector('div[ui-view="header"]');
                var height = element[0].offsetHeight;
                var width = element[0].offsetWidth;
        
                element.bind('mousedown', function(event){
                    event.stopPropagation();
                    
                    var clientY = event.clientY - headerContainer.clientHeight;
                    var mouse2D = new THREE.Vector2( ( event.clientX / width ) * 2 - 1,
                                                    -( clientY / height ) * 2 + 1);
                    var raycaster =  new THREE.Raycaster();
                    raycaster.setFromCamera( mouse2D, sceneFactory.getCamera() );
        
                    var intersects = raycaster.intersectObjects( sceneFactory.getSceneChildren() );
        
                    if ( intersects.length > 0 ) {
                        intersects[0].object.scale.x++;
                        intersects[0].object.scale.y++;
                        intersects[0].object.scale.z++;
                    }
                });
            }
        }
    }
]);