angular.module('myApp')

.factory('sceneFactory', [
    'animationFactory',
    function(animationFactory){
        
        var camera, scene, renderer, controls;

        var obj = {
            init: (container) =>{

                init();

                function init() {
                    
                    var aspect = container.clientWidth / container.clientHeight;
                    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
                    camera.position.z = 70;

                    scene = new THREE.Scene();

                    renderer = new THREE.WebGLRenderer( { antialias: true } );
                    renderer.setSize( container.clientWidth, container.clientHeight );
                    container.appendChild( renderer.domElement );
                    controls = new THREE.OrbitControls( camera, renderer.domElement );

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

                var newMeshArr = [];
                for(var i = 0; i <  n; i++){
                    newMeshArr.push(newMesh.clone());
                    newMeshArr[i].animations = ['moveInfRight', 'moveInfUp', 'rotate'];
                    newMeshArr[i].position.x = Math.floor(Math.random()*680)-340;
                    newMeshArr[i].position.y = Math.floor(Math.random()*100)-100;
                    newMeshArr[i].position.z = Math.floor(Math.random()*400)-200;
                    newMeshArr[i].rotation.x += Math.random();
                    newMeshArr[i].rotation.y += Math.random();
                    scene.add( newMeshArr[i] );
                }
                
            },
            addMeshArray: (arr) =>{
                console.log('adding '+ arr.length+ ' meshes');

                arr.forEach(newMesh => {
                    scene.add( newMesh );
                });
            },
            getCamera: () =>{
                return camera;
            },
            getSceneChildren: () =>{
                return scene.children;
            }
        }

        return obj;
    }
]);