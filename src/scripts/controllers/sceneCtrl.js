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

        for(var i = 0; i < 40; i++){
            hearts.push(meshFactory.heart());
            hearts[i].animations.push('moveInfRight');
            hearts[i].animations.push('moveInfUp');
            hearts[i].animations.push('rotate');
            sceneFactory.add(hearts[i]);
        }

        sceneFactory.add(meshFactory.heart());
        sceneFactory.add(cube);
        sceneFactory.add(line);

        cube.animations.push('rotate');
    }
]);