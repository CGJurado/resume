angular.module('myApp')
.controller('SceneCtrl', [
    '$scope',
    'sceneFactory',
    'meshFactory',
    '$document',
    function($scope, sceneFactory, meshFactory, $document){
        
        var cube = meshFactory.cube();
        var line = meshFactory.line();
        var sussane;
        var hearts = [];
        var diamonds = [];

        var meshCount = 20;
        //<<< When document is ready add models to the scene
        $document.ready(function(){

            //<<< Loading models from json files >>>
                
            meshFactory.spades().then(function(mesh) {//Creating Spades
                sceneFactory.addN(meshCount, mesh);
            }, function(reason) {
                console.log('Failed: '+ reason);
            });
                
            meshFactory.clover().then(function(mesh) {//Creating Clovers
                sceneFactory.addN(meshCount, mesh);
            }, function(reason) {
                console.log('Failed: '+ reason);
            });
                
            meshFactory.monkey().then(function(mesh){//Creating Sussane
                mesh.animations.push('rotate');
                sussane = mesh;
                sceneFactory.add(sussane);
            }, function(reason){
                console.log('Failed: '+ reason);
            });
            //<<< END of Load>>>

            //<<< Creating models with threejs code >>>
                
            for(var i = 0; i < meshCount; i++){//Creating Hearts
                hearts.push(meshFactory.heart());
                hearts[i].animations.push('moveInfRight');
                hearts[i].animations.push('moveInfUp');
                hearts[i].animations.push('rotate');
            }
                
            for(var i = 0; i < meshCount; i++){//Creating Diamonds
                diamonds.push(meshFactory.diamond());
                diamonds[i].animations.push('moveInfRight');
                diamonds[i].animations.push('moveInfUp');
                diamonds[i].animations.push('rotate');
            }
            //<<< END of Create>>>

            sceneFactory.addMeshArray(hearts);
            sceneFactory.addMeshArray(diamonds);

            sceneFactory.add(cube);
            sceneFactory.add(line);

            cube.animations.push('rotate');
        });
        //<<< END of Add
    }
]);