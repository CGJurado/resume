angular.module('myApp')

.factory('meshFactory', [
    '$q',
    function($q){

        var obj = {
            cube: () =>{                
                console.log('cube++');
                
                var geometry = new THREE.BoxGeometry( 20, 20, 20 );
                var material = new THREE.MeshNormalMaterial();
                var mesh =  new THREE.Mesh( geometry, material );
                mesh.animations = [];
                mesh.name = 'cube';
                mesh.position.x = 100;

                return mesh;

            },
            sphere: () =>{
                console.log('sphere++');

                var geometry = new THREE.SphereGeometry( 0.2, 6, 32 );
                var material = new THREE.MeshNormalMaterial();
                var mesh =  new THREE.Mesh( geometry, material );
                mesh.animations = [];
                mesh.name = 'sphere';
                mesh.position.x = -100;

                return mesh;

            },
            heart: () =>{
                console.log('heart++');

                var x = 0, y = 0;

                var heartShape = new THREE.Shape();
                
                heartShape.moveTo( x + 5, y + 5 );
                heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
                heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
                heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
                heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
                heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
                heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

                var extrudeSettings = {
                    depth: 2,
                    bevelEnabled: true,
                    bevelSegments: 1,
                    steps: 2,
                    bevelSize: 1,
                    bevelThickness: 1
                };
                
                var preGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
                var geometry = preGeometry.scale(0.5,0.5,0.5);
                var material = new THREE.MeshNormalMaterial();
                var mesh =  new THREE.Mesh( geometry, material );
                mesh.animations = [];
                mesh.name = 'heart';

                mesh.position.x = Math.floor(Math.random()*680)-340;
                mesh.position.y = Math.floor(Math.random()*100)-100;
                mesh.position.z = Math.floor(Math.random()*400)-200;
                mesh.rotation.x += Math.random();
                mesh.rotation.y += Math.random();                

                return mesh;

            },
            diamond: () =>{
                console.log('diamond++');
                
                var vectors = [];
                var a = new THREE.Vector2(0,-20);
                var b = new THREE.Vector2(10,0);
                var c = new THREE.Vector2(0,20);
                var d = new THREE.Vector2(-10,0);
                vectors = [a,b,c,d];

                var diamondShape = new THREE.Shape(vectors);

                var extrudeSettings = {
                    depth: 2,
                    bevelEnabled: true,
                    bevelSegments: 1,
                    steps: 2,
                    bevelSize: 1,
                    bevelThickness: 1
                };
                
                var preGeometry = new THREE.ExtrudeGeometry( diamondShape, extrudeSettings );
                var geometry = preGeometry.scale(0.3,0.3,0.3);
                var material = new THREE.MeshNormalMaterial();
                var mesh =  new THREE.Mesh( geometry, material );
                mesh.animations = [];
                name.name = 'diamond';
                // mesh.position.x = -100;
                mesh.position.x = Math.floor(Math.random()*680)-340;
                mesh.position.y = Math.floor(Math.random()*100)-100;
                mesh.position.z = Math.floor(Math.random()*400)-200;
                mesh.rotation.x += Math.random();
                mesh.rotation.y += Math.random();

                return mesh;
            },
            spades: () =>{
                return $q((resolve, reject) =>{

                    var loader = new THREE.JSONLoader();
                    // Load a glTF resource
                    loader.load(
                        // resource URL
                        './models/spades.json',
                        // called when the resource is loaded
                        function(geometry, m){
                            console.log('spade++');
                            
                            var material = new THREE.MeshNormalMaterial();
                            var mesh =  new THREE.Mesh( geometry, material );
                            mesh.animations = [];
                            mesh.name = 'spades';
                            // mesh.position.x = -100;
                            mesh.position.x = Math.floor(Math.random()*680)-340;
                            mesh.position.y = Math.floor(Math.random()*100)-100;
                            mesh.position.z = Math.floor(Math.random()*400)-200;
                            mesh.rotation.x += Math.random();
                            mesh.rotation.y += Math.random();

                            resolve(mesh);
                        },
                        // called while loading is progressing
                        function ( xhr ) {
                    
                            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                    
                        },
                        // called when loading has errors
                        function ( error ) {
                    
                            reject( 'An error happened' );
                    
                        }
                    );
                    
                });
            },
            clover: () =>{
                return $q((resolve, reject) =>{

                    var loader = new THREE.JSONLoader();
                    // Load a glTF resource
                    loader.load(
                        // resource URL
                        './models/clover.json',
                        // called when the resource is loaded
                        function(geometry, m){
                            console.log('clover++');
                            
                            var material = new THREE.MeshNormalMaterial();
                            var mesh =  new THREE.Mesh( geometry, material );
                            mesh.animations = [];
                            mesh.name = 'clover';
                            // mesh.position.x = -100;
                            mesh.position.x = Math.floor(Math.random()*680)-340;
                            mesh.position.y = Math.floor(Math.random()*100)-100;
                            mesh.position.z = Math.floor(Math.random()*400)-200;
                            mesh.rotation.x += Math.random();
                            mesh.rotation.y += Math.random();

                            resolve(mesh);
                        },
                        // called while loading is progressing
                        function ( xhr ) {
                    
                            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                    
                        },
                        // called when loading has errors
                        function ( error ) {
                    
                            reject( 'An error happened' );
                    
                        }
                    );
                    
                });
            },
            monkey: () =>{
                console.log('sussane++');
                
                return $q((resolve, reject) =>{
                    var loader = new THREE.JSONLoader();
                    loader.load('./models/monkey.json',
                        function(geometry, m){
                            console.log('monkey++');

                            var material = new THREE.MeshNormalMaterial();
                            var mesh =  new THREE.Mesh( geometry, material );
                            mesh.animations = [];
                            mesh.name = 'sussane';
                            mesh.position.x = -100;
                            resolve(mesh);
                        },
                        // called while loading is progressing
                        function ( xhr ) {                    
                            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );                    
                        },
                        // called when loading has errors
                        function ( error ) {                    
                            reject( 'An error happened' );
                        }
                    );
                });
            },
            line: () =>{
                console.log('line++');

                var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
                geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
                geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
                var mesh = new THREE.Line( geometry, material );
                mesh.animations = [];
                mesh.name = 'line';

                return mesh;
            }
        }

        return obj;
    }
]);