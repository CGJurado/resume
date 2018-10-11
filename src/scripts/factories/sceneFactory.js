angular.module('myApp')

.factory('sceneFactory', [
    'animationFactory',
    function(animationFactory){
        
        var camera, scene, renderer, controls;
        var meshes = [];

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
                    
                    if(typeof meshes !== 'undefined'){
                        meshes.forEach(element => {
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

                meshes.push(newMesh);
                scene.add( newMesh.body );
            },
            addN: (n, newMesh) =>{
                console.log('adding '+ n+ ' meshes');

                var newMeshArr = [];
                for(var i = 0; i <  n; i++){
                    newMeshArr.push({
                        body: newMesh.body.clone(),
                        animations: ['moveInfRight', 'moveInfUp', 'rotate']
                    });
                    newMeshArr[i].body.position.x = Math.floor(Math.random()*680)-340;
                    newMeshArr[i].body.position.y = Math.floor(Math.random()*100)-100;
                    newMeshArr[i].body.position.z = Math.floor(Math.random()*400)-200;
                    newMeshArr[i].body.rotation.x += Math.random();
                    newMeshArr[i].body.rotation.y += Math.random();
                    meshes.push(newMeshArr[i]);
                    scene.add(newMeshArr[i].body);
                }
                
            },
            addMeshArray: (arr) =>{
                console.log('adding '+ arr.length+ ' meshes');

                arr.forEach(newMesh => {
                    meshes.push(newMesh);
                    scene.add(newMesh.body);
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