angular.module('myApp')

.factory('sceneFactory', [
    'animationFactory',
    function(animationFactory){
        
        var camera, scene, renderer, controls, isMobile;

        var obj = {
            init: (container) =>{

                init();

                function init() {

                    if (navigator.userAgent.match(/Android/i)
                        || navigator.userAgent.match(/webOS/i)
                        || navigator.userAgent.match(/iPhone/i)
                        || navigator.userAgent.match(/iPad/i)
                        || navigator.userAgent.match(/iPod/i)
                        || navigator.userAgent.match(/BlackBerry/i)
                        || navigator.userAgent.match(/Windows Phone/i)
                    ) {
                        isMobile = true;
                    }
                    else {
                        isMobile = false;
                    }
                    
                    var aspect = container.clientWidth / container.clientHeight;
                    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
                    camera.position.z = 75;

                    scene = new THREE.Scene();
                    scene.add(camera);

                    renderer = new THREE.WebGLRenderer( { antialias: true } );
                    renderer.setSize( container.clientWidth, container.clientHeight );
                    container.appendChild( renderer.domElement );

                    if(isMobile){
                        controls = new THREE.DeviceOrientationControls( camera );
                    } else{
                        controls = new THREE.OrbitControls( camera, renderer.domElement );
                    }

                }

            },
            render: () =>{
                
                animate()

                function animate() {

                    requestAnimationFrame( animate );
                    
                    if(typeof scene.children !== 'undefined'){
                        scene.children.forEach(element => {
                            if(typeof element.animations !== 'undefined'){
                                animationFactory.runAni(element);
                            }
                        });
                    }

                    controls.update();

                    renderer.render( scene, camera );

                }
            },
            updateCanvas: (container) =>{
                var newAspect = container.clientWidth / container.clientHeight;
                camera.aspect = newAspect;
                camera.updateProjectionMatrix();
                renderer.setSize( container.clientWidth, container.clientHeight );
            },
            add: (newMesh) =>{
                console.log('something was "added"');

                scene.add( newMesh );
            },
            del: (oldMesh) =>{
                console.log('something was "removed"');

                scene.remove( oldMesh );
            },
            addN: (n, newMesh) =>{
                console.log('adding '+ n+ ' meshes');

                for(var i = 0; i <  n; i++){
                    var meshClone = newMesh.clone();
                    meshClone.animations = ['moveInfRight', 'moveInfUp', 'rotate'];
                    meshClone.position.x = Math.floor(Math.random()*680)-340;
                    meshClone.position.y = Math.floor(Math.random()*100)-100;
                    meshClone.position.z = Math.floor(Math.random()*400)-200;
                    meshClone.rotation.x += Math.random();
                    meshClone.rotation.y += Math.random();
                    scene.add( meshClone );
                }
                
            },
            addMeshArray: (arr) =>{
                console.log('adding '+ arr.length+ ' meshes');

                arr.forEach(newMesh => {
                    scene.add( newMesh );
                });
            },
            addToCamera: (newMesh) =>{
                camera.add(newMesh);
            },
            getCamera: () =>{
                return camera;
            },
            getSceneChildren: () =>{
                return scene.children;
            },
            getIsMobile: () =>{
                return isMobile;
            }
        }

        return obj;
    }
]);