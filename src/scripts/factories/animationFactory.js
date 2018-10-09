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

                mesh.body.rotation.x += 0.01;
                mesh.body.rotation.y += 0.02;
            },
            moveInfRight: (mesh) =>{//Move infinitly to the right
                findAni(mesh.animations, 'moveInfRight');

                mesh.body.position.x += 0.6;
                if(mesh.body.position.x > 380){
                    mesh.body.position.x = -380;
                }
            },
            moveInfUp: (mesh) =>{//Move infinitly up
                findAni(mesh.animations, 'moveInfRight');

                mesh.body.position.y += 0.4;
                if(mesh.body.position.y > 150){
                    mesh.body.position.y = -150;
                }
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