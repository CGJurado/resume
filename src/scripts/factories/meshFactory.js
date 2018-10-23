angular.module('myApp')

.factory('meshFactory', [
    '$q',
    function($q){

        var land;

        var obj = {
            land: () =>{
                console.log('land++');

                var geometry = new THREE.SphereGeometry( 500, 16, 8 );
                geometry.scale( - 1, 1, 1 );

                var material = new THREE.MeshBasicMaterial( {
                    map: new THREE.TextureLoader().load( 'images/space.png' )
                } );

                land = new THREE.Mesh( geometry, material );

                return land;
            },
            cube: () =>{
                console.log('cube++');
                
                var geometry = new THREE.BoxGeometry( 20, 20, 20 );
                geometry.scale(1.3,1.3,1.3);
                
                var material = new THREE.MeshStandardMaterial( { color: 0x0000ff, metalness: 0.5, roughness: 0 } );
                // var material = new THREE.MeshNormalMaterial({color: 0x0000ff});
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
                var material = new THREE.MeshStandardMaterial( { color: 0xff0000, metalness: 0.5, roughness: 0.2 } );
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
                material = new THREE.MeshStandardMaterial( { color: 0xff00f2, metalness: 0.5, roughness: 0.2 } );
                var mesh =  new THREE.Mesh( geometry, material );
                mesh.animations = [];
                mesh.name = 'diamond';
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
                            
                            var material = new THREE.MeshStandardMaterial( { color: 0x222222, metalness: 0.75, roughness: 0.4 } );
                            var mesh =  new THREE.Mesh( geometry, material );
                            mesh.animations = [];
                            mesh.name = 'spade';
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
                            
                            var material = new THREE.MeshStandardMaterial( { color: 0x01bf20, metalness: 0.5, roughness: 0.1 } );
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

                            geometry.scale(1.8,1.8,1.8);

                            var textureSphere = new THREE.TextureLoader().load( "images/space.png" );
                            textureSphere.mapping = THREE.SphericalReflectionMapping;
                            
                            var material = new THREE.MeshStandardMaterial( { color: 0xffee00, envMap: textureSphere, metalness: 0.95, roughness: 0.2 } );
                            var mesh =  new THREE.Mesh( geometry, material );
                            mesh.animations = [];
                            mesh.name = 'sussane';
                            mesh.position.x = -100;
                            resolve(mesh);
                        },
                        // called while loading is progressing
                        function ( xhr ) {
                            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded sussane' );                    
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
            },
            particleLight: () =>{
                console.log('particleLight++');

                var mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
                mesh.animations = [];
                mesh.name = 'particleLight';

                var pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
                mesh.add( pointLight );

                return mesh;
            },
            helperCude: ()=>{
                var helperGeometry = new THREE.BoxBufferGeometry( 500, 500, 500, 4, 4, 4 );
				var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xa31e4b, wireframe: true } );
                var mesh = new THREE.Mesh( helperGeometry, helperMaterial );
                
				return mesh;
            },
            arrow: () =>{

                return $q((resolve, reject) =>{
                    var loader = new THREE.JSONLoader();
                    loader.load('./models/arrow.json',
                        function(geometry, m){
                            console.log('arrow++');

                            geometry.scale(1.7,1.7,1.7);
                            // var material = new THREE.MeshNormalMaterial();
                            var material = new THREE.MeshStandardMaterial( { color: 0x2dadb6, metalness: 0.8, roughness: 1 } );
                            var mesh =  new THREE.Mesh( geometry, material );
                            mesh.animations = [];
                            mesh.position.y = -18;
                            mesh.position.z = -83;
                            mesh.name = 'arrow';
                            resolve(mesh);
                        },
                        // called while loading is progressing
                        function ( xhr ) {
                            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded arrow' );
                        },
                        // called when loading has errors
                        function ( error ) {
                            reject( 'An error happened' );
                        }
                    );
                });
            },
            getCustomMaterial: (str)=>{
                var material;

                if(str === 'spade'){
                    material = new THREE.MeshStandardMaterial( { color: 0x222222, metalness: 0.75, roughness: 0.4 } );
                } else {
                    material = new THREE.MeshStandardMaterial( { color: 0x01bf20, metalness: 0.5, roughness: 0.1 } );
                }

                return material;
            }
        }

        return obj;
    }
]);