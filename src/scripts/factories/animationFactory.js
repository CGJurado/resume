angular.module('myApp')

.factory('animationFactory', [
    function(){

        function findAni(aniArr, aniName){//Search if the recieved mesh has the desired animation
            var found = aniArr.find(function(element) {
                return element === aniName;
            });

            if(typeof found === 'undefined'){
                aniArr.push(aniName);
            }
        }

        var animations = {
            rotate: (mesh) =>{//Rotates slowly an object
                findAni(mesh.animations, 'rotate');

                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.02;
            },
            moveInfRight: (mesh) =>{//Move infinitly to the right
                findAni(mesh.animations, 'moveInfRight');

                mesh.position.x += 0.3;
                if(mesh.position.x > 380){
                    mesh.position.x = -380;
                }
            },
            moveInfUp: (mesh) =>{//Move infinitly up
                findAni(mesh.animations, 'moveInfRight');

                mesh.position.y += 0.2;
                if(mesh.position.y > 150){
                    mesh.position.y = -150;
                }
            },
            orbit: (mesh) =>{//Orbits an object or point
                
                findAni(mesh.animations, 'orbit');
                var timer = Date.now() * 0.0003;

                mesh.position.x = (Math.sin( timer * 7 ) * 25)-100;
				mesh.position.y = Math.cos( timer * 5 ) * 50;
				mesh.position.z = Math.cos( timer * 3 ) * 25;
            }
        }

        var obj = {
            runAni: (mesh) =>{//Execute each animation in the mesh
                mesh.animations.forEach(element => {
                    animations[element](mesh);
                });
            }
        }

        return obj;
    }
]);