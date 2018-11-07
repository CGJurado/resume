angular.module('myApp')
.directive('secondSceneDirective',[
    '$state',
    '$window',
    '$transitions',
    '$document',
    function( $state, $window, $transitions, $document){
        function linker(scope, element, attrs){

            var camera, scene, renderer, controls, id, initialPos;
            var mouse = {x: 0,y: 0};
            var headerContainer = $document[0].querySelector('div[ui-view="header"]');
            var activeAnimation = false;
            var targetDistance = {};
            const animationTime = 3*60;

            var diff = function (num1, num2) { return (num1 > num2)? num1-num2 : num2-num1; };

            element.css({
                height: $window.innerHeight/2
            })

            function init(){
                let aspect = element[0].clientWidth / element[0].clientHeight;
                camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
    
                scene = new THREE.Scene();
                scene.add(camera);
    
                renderer = new THREE.WebGLRenderer( { antialias: true } );
                renderer.setSize( element[0].clientWidth, element[0].clientHeight );
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.BasicShadowMap;
                element[0].appendChild( renderer.domElement );
    
                controls = new THREE.OrbitControls( camera, renderer.domElement );
            }
            
            function updateCanvas(){
                
                let newAspect = element[0].clientWidth / element[0].clientHeight;
                camera.aspect = newAspect;
                camera.updateProjectionMatrix();
                renderer.setSize( element[0].clientWidth, element[0].clientHeight );

            }

            function animate() {

                id = requestAnimationFrame( animate );

                if(activeAnimation){
                    moveCamera();
                }

                controls.update();

                renderer.render( scene, camera );

            }

            function moveCamera(){


                if(camera.animationTime <= 0){
                    activeAnimation = false;
                    return;
                }
                
                camera.animationTime--;

                if(camera.animationTime%2 !== 0){
                    return;
                }

                let moveFactor = (animationTime-camera.animationTime)/animationTime;
                let newPos = {
                    x: initialPos.x+(targetDistance.x*moveFactor),
                    y: initialPos.y+(targetDistance.y*moveFactor),
                    z: initialPos.z+(targetDistance.z*moveFactor)
                }
                camera.position.set(newPos.x, newPos.y, newPos.z);
                
                camera.animationTime--;
            }

            init();

            // animate();

            
            scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );

            var light = new THREE.PointLight( 0xffffff, 0.8, 500);
            light.position.set(100, 60, 60);
            light.castShadow = true;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 500;
            scene.add(light);
            
            scene.background = new THREE.Color( 0x222333 );

            // var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
            // directionalLight.position.set( 0, 1, 1 ).normalize();
            // directionalLight.castShadow = true;
            // scene.add( directionalLight );

            // var light = new THREE.DirectionalLight( 0xffffff );
            // light.position.set( 0, 0, 1 );
            // scene.add( light );

            // var light = new THREE.DirectionalLight( 0xffff00, 0.75 );
            // light.position.set( 0, 0, - 1 );
            // scene.add( light );

            controls.target.set(-50,0,0);
            camera.position.set(-65, 5, 60);

            var texLoader = new THREE.TextureLoader();            
            
            var geometry = new THREE.PlaneGeometry( 1000, 600, 60, 60 );
            var material = new THREE.MeshPhongMaterial({ color: 0x334555, side: THREE.DoubleSide });
            var floor = new THREE.Mesh( geometry, material );
            floor.rotation.x = -90 * Math.PI/180;
            floor.position.y = -40;
            floor.position.z = -100;
            floor.receiveShadow = true;
            scene.add( floor );

            var geometry1 = new THREE.PlaneGeometry( 60, 60, 32 );
            var material1 = new THREE.MeshPhongMaterial({ map: texLoader.load('./images/angular-cert.jpg'), side: THREE.DoubleSide });
            var plane1 = new THREE.Mesh( geometry1, material1 );
            plane1.name = 'plane';
            plane1.position.x = -100;
            plane1.castShadow = true;

            var geometry2 = new THREE.PlaneGeometry( 60, 60, 32 );
            var material2 = new THREE.MeshPhongMaterial({ map: texLoader.load('./images/genomic-cert.jpg'), side: THREE.DoubleSide });
            var plane2 = new THREE.Mesh( geometry2, material2 );
            plane2.name = 'plane';
            plane2.castShadow = true;

            var geometry3 = new THREE.PlaneGeometry( 60, 60, 32 );
            var material3 = new THREE.MeshPhongMaterial({ map: texLoader.load('./images/frontEnd-cert.jpg'), side: THREE.DoubleSide });
            var plane3 = new THREE.Mesh( geometry3, material3 );
            plane3.name = 'plane';
            plane3.position.x = 100;
            plane3.castShadow = true;

            scene.add( plane1 );
            scene.add( plane2 );
            scene.add( plane3 );

            function getIntersections(){
                var mouse2D;
                
                mouse2D = new THREE.Vector2(mouse.x, mouse.y);
                
                var raycaster =  new THREE.Raycaster();
                raycaster.setFromCamera( mouse2D, camera );
                
                return raycaster.intersectObjects( scene.children );
            }
            
            element.bind('mousedown', function(event){
                mouse.x = (event.clientX / element[0].clientWidth) * 2 - 1;
                mouse.y = -( (event.clientY - headerContainer.clientHeight) / element[0].clientHeight ) * 2 + 1;
                
                event.stopPropagation();
    
                var intersects = getIntersections();
    
                if ( intersects.length > 0 ) {
                    
                    if(intersects[0].object.name === 'plane'){
                        targetDistance = {                            
                            x: diff(intersects[0].object.position.x,camera.position.x),
                            y: diff(intersects[0].object.position.y,camera.position.y),
                            z: diff(intersects[0].object.position.z+50 ,camera.position.z)
                        };

                        if(intersects[0].object.position.x < camera.position.x)
                            targetDistance.x = -targetDistance.x;
                        if(intersects[0].object.position.y < camera.position.y)
                            targetDistance.y = -targetDistance.y;
                        if(intersects[0].object.position.z+50 < camera.position.z)
                            targetDistance.z = -targetDistance.z;
                        
                        controls.target.set(intersects[0].object.position.x,intersects[0].object.position.y,intersects[0].object.position.z);
                        camera.animationTime = animationTime;
                        initialPos = {
                            x: camera.position.x,
                            y: camera.position.y,
                            z: camera.position.z
                        };
                        activeAnimation = true;
                    }

                }
            });

            angular.element($window).bind('resize', function(){
                
                element.css({
                    height: $window.innerHeight/2,
                    width: $window.innerWidth
                })
                updateCanvas();
            });

            if($state.$current.name == 'app.aboutme'){
                animate();
            }
            $transitions.onSuccess({ to: 'app.aboutme' }, function(transition) {
                animate();
            });
            $transitions.onSuccess({ to: 'app' }, function(transition) {
                cancelAnimationFrame(id);
            });

        }
        
        return {
            restrict: 'A',
            link: linker
        }
    }
]);