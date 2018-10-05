angular.module('myApp')

.factory('sceneFactory', [
    'animationFactory',
    function(animationFactory){
        
        var camera, scene, renderer, controls;
        var meshes = [];
        
        var container = document.querySelector('.three');
        var height = container.clientHeight;
        var aspect = container.clientWidth / height;

        var obj = {
            init: () =>{

                init();

                function init() {

                    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
                    camera.position.z = 70;

                    scene = new THREE.Scene();

                    renderer = new THREE.WebGLRenderer( { antialias: true } );
                    renderer.setSize( container.clientWidth, height );
                    container.appendChild( renderer.domElement );
                    controls = new THREE.OrbitControls( camera, renderer.domElement );

                }

            },
            add: (newMesh) =>{
                console.log('something was "added"');

                meshes.push(newMesh);
                scene.add( newMesh.body );
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
            }
        }

        return obj;
    }
]);