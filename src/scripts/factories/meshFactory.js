angular.module('myApp')

.factory('meshFactory', [
    function(){

        var obj = {
            cube: () =>{                
                console.log('cube++');
                
                var geometry = new THREE.BoxGeometry( 20, 20, 20 );
                var material = new THREE.MeshNormalMaterial();
                var mesh = {
                    body: new THREE.Mesh( geometry, material ),
                    animations: []
                };
                mesh.body.position.x = 100;

                return mesh;

            },
            sphere: () =>{
                console.log('sphere++');

                var geometry = new THREE.SphereGeometry( 0.2, 6, 32 );
                var material = new THREE.MeshNormalMaterial();
                var mesh = {
                    body: new THREE.Mesh( geometry, material ),
                    animations: []
                };        
                mesh.body.position.x = -100;

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
                
                var geometry = new THREE.ShapeGeometry( heartShape );
                var material = new THREE.MeshNormalMaterial();
                var mesh = {
                    body: new THREE.Mesh( geometry, material ),
                    animations: []
                };
                mesh.body.position.x = -100;

                mesh.body.position.x = Math.floor(Math.random()*680)-340;
                mesh.body.position.y = Math.floor(Math.random()*100)-100;
                mesh.body.position.z = Math.floor(Math.random()*400)-200;
                mesh.body.rotation.x += Math.random();
                mesh.body.rotation.y += Math.random();

                

                return mesh;

            },
            line: () =>{
                console.log('line++');

                var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
                geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
                geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
                var mesh = {
                    body: new THREE.Line( geometry, material ),
                    animations: []
                };

                return mesh;
            }
        }

        return obj;
    }
]);