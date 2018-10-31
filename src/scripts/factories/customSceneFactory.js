angular.module('myApp')

.factory('customSceneFactory', [
    'animationFactory',
    'helper',
    function(animationFactory, helper){
        
        var camera, scene, renderer, controls;
        var customMeshPos, customMeshRot;

        var obj = {
            init: (container) =>{

                init();

                function init() {
                    
                    var aspect = container.clientWidth / container.clientHeight;
                    camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
                    camera.position.z = 35;

                    scene = new THREE.Scene();
                    scene.background = new THREE.Color( 0x085a80 );
                    scene.add(camera);
                    
                    scene.add( new THREE.AmbientLight( 0xffffff ) );
                    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
                    directionalLight.position.set( 1, 1, 1 ).normalize();
                    scene.add( directionalLight );

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
                customMeshPos = {x: newMesh.position.x, y: newMesh.position.y, z: newMesh.position.z};
                customMeshRot = {x: newMesh.rotation.x, y: newMesh.rotation.y};
                newMesh.position.x = 0;
                newMesh.position.y = 0;
                newMesh.position.z = 0;
                newMesh.rotation.x = 0;
                newMesh.rotation.y = 0;

                scene.add( newMesh );
            },
            del: (oldMesh) =>{
                helper.showToast('Custom '+ oldMesh.name +' is back!');
                
                oldMesh.position.x = customMeshPos.x;
                oldMesh.position.y = customMeshPos.y;
                oldMesh.position.z = customMeshPos.z;
                oldMesh.rotation.x = customMeshRot.x;
                oldMesh.rotation.y = customMeshRot.y;

                scene.remove( oldMesh );
            },
            getCamera: () =>{
                return camera;
            }
        }

        return obj;
    }
]);