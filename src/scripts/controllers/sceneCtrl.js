angular.module('myApp')
.controller('SceneCtrl', [
    '$scope',
    'sceneFactory',
    'meshFactory',
    function($scope, sceneFactory, meshFactory){
        
        sceneFactory.init();
        sceneFactory.render();

        var cube = meshFactory.cube();
        var line = meshFactory.line();
        var hearts = [];
        var diamonds = [];
        var spades = [];
        var clovers = [];

        //<<< Loading models from json files >>>
        //Creating & Adding Spades
        meshFactory.spades().then(function(mesh) {
            for(var i = 0; i <  20; i++){
                spades.push({
                    body: mesh.body.clone(),
                    animations: ['moveInfRight', 'moveInfUp', 'rotate']
                });
                spades[i].body.position.x = Math.floor(Math.random()*680)-340;
                spades[i].body.position.y = Math.floor(Math.random()*100)-100;
                spades[i].body.position.z = Math.floor(Math.random()*400)-200;
                spades[i].body.rotation.x += Math.random();
                spades[i].body.rotation.y += Math.random();
                sceneFactory.add(spades[i]);
            }
        }, function(reason) {
            console.log('Failed: '+ reason);
        });
        //Creating & Adding Clovers
        meshFactory.clover().then(function(mesh) {
            for(var i = 0; i <  20; i++){
                clovers.push({
                    body: mesh.body.clone(),
                    animations: ['moveInfRight', 'moveInfUp', 'rotate']
                });
                clovers[i].body.position.x = Math.floor(Math.random()*680)-340;
                clovers[i].body.position.y = Math.floor(Math.random()*100)-100;
                clovers[i].body.position.z = Math.floor(Math.random()*400)-200;
                clovers[i].body.rotation.x += Math.random();
                clovers[i].body.rotation.y += Math.random();
                sceneFactory.add(clovers[i]);
            }
        }, function(reason) {
            console.log('Failed: '+ reason);
        });
        //Creating & Adding Sussane
        meshFactory.monkey().then(function(mesh){
            mesh.animations.push('rotate');
            sceneFactory.add(mesh);
        }, function(reason){
            console.log('Failed: '+ reason);
        });
        //<<< END of Load>>>

        //<<< Adding models with threejs code >>>
        //Creating & Adding Hearts
        for(var i = 0; i < 20; i++){
            hearts.push(meshFactory.heart());
            hearts[i].animations.push('moveInfRight');
            hearts[i].animations.push('moveInfUp');
            hearts[i].animations.push('rotate');
            sceneFactory.add(hearts[i]);
        }
        //Creating & Adding Diamonds
        for(var i = 0; i < 20; i++){
            diamonds.push(meshFactory.diamond());
            diamonds[i].animations.push('moveInfRight');
            diamonds[i].animations.push('moveInfUp');
            diamonds[i].animations.push('rotate');
            sceneFactory.add(diamonds[i]);
        }
        //<<< END of Add>>>

        sceneFactory.add(cube);
        sceneFactory.add(line);

        cube.animations.push('rotate');
    }
]);