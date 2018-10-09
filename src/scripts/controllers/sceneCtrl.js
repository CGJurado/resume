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

        var monkey = meshFactory.monkey();
        monkey.then(function(mesh) {
            mesh.animations.push('rotate');
            sceneFactory.add(mesh);
        }, function(reason) {
            console.log('Failed: '+ reason);
        });

        for(var i = 0; i < 20; i++){
            hearts.push(meshFactory.heart());
            hearts[i].animations.push('moveInfRight');
            hearts[i].animations.push('moveInfUp');
            hearts[i].animations.push('rotate');
            sceneFactory.add(hearts[i]);
        }

        for(var i = 0; i < 20; i++){
            diamonds.push(meshFactory.diamond());
            diamonds[i].animations.push('moveInfRight');
            diamonds[i].animations.push('moveInfUp');
            diamonds[i].animations.push('rotate');
            sceneFactory.add(diamonds[i]);
        }

        sceneFactory.add(cube);
        sceneFactory.add(line);

        cube.animations.push('rotate');
    }
]);