angular.module('myApp')
.controller('SceneCtrl', [
    '$scope',
    'sceneFactory',
    'meshFactory',
    '$document',
    '$state',
    '$transitions',
    function($scope, sceneFactory, meshFactory, $document, $state, $transitions){
        
        var land = meshFactory.land();
        var cube = meshFactory.cube();
        var particleLight = meshFactory.particleLight();
        
        var arrow;
        var sussane;
        var hearts = [];
        var diamonds = [];
        var isFullscreen = false;
        $scope.fullSText = 'Go fullscreen';

        if($state.$current.name == 'app.aboutme'){
            sceneFactory.stopRender();
            $scope.cubeCSS = {
                '-webkit-transform':'rotateY(-90deg)',
                '-moz-transform':'rotateY(-90deg)',
                '-o-transform':'rotateY(-90deg)',
                'transform':'rotateY(-90deg)'
            };
        }

        $transitions.onSuccess({ to: 'app.aboutme' }, function(transition) {
            sceneFactory.stopRender();
            $scope.cubeCSS = {
                '-webkit-transform':'rotateY(-90deg)',
                '-moz-transform':'rotateY(-90deg)',
                '-o-transform':'rotateY(-90deg)',
                'transform':'rotateY(-90deg)'
            };
        });
        $transitions.onSuccess({ to: 'app' }, function(transition) {
            sceneFactory.render();
            $scope.cubeCSS = {
                '-webkit-transform':'rotateY(0deg)',
                '-moz-transform':'rotateY(0deg)',
                '-o-transform':'rotateY(0deg)',
                'transform':'rotateY(0deg)'
            };
        });

        var meshCount = 20;
        //<<< When document is ready add models to the scene
        $document.ready(function(){
            $scope.isMobile = sceneFactory.getIsMobile();

            //<<< Loading models from json files >>>

            meshFactory.getExternalMesh('spade').then(function(mesh) {//Creating Spades
                sceneFactory.addN(meshCount, mesh);
            }, function(reason) {
                console.log('Failed: '+ reason);
            });
            
            meshFactory.getExternalMesh('clover').then(function(mesh) {//Creating Clovers
                sceneFactory.addN(meshCount, mesh);
            }, function(reason) {
                console.log('Failed: '+ reason);
            });
            
            meshFactory.getExternalMesh('heart').then(function(mesh) {//Creating Hearts
                sceneFactory.addN(meshCount, mesh);
            }, function(reason) {
                console.log('Failed: '+ reason);
            });
            
            meshFactory.getExternalMesh('diamond').then(function(mesh) {//Creating Diamonds
                sceneFactory.addN(meshCount, mesh);
            }, function(reason) {
                console.log('Failed: '+ reason);
            });
            
            meshFactory.monkey().then(function(mesh){//Creating Sussane
                mesh.animations.push('rotate');
                sceneFactory.add(mesh);
            }, function(reason){
                console.log('Failed: '+ reason);
            });

            meshFactory.arrow().then(function(mesh){//Creating arrow
                sceneFactory.addToCamera(mesh);
            }, function(reason){
                console.log('Failed: '+ reason);
            });
            //<<< END of Load>>>

            //<<< Creating models with threejs code >>>
            
            // for(var i = 0; i < meshCount; i++){//Creating Hearts
            //     hearts.push(meshFactory.heart());
            //     hearts[i].animations.push('moveInfRight');
            //     hearts[i].animations.push('moveInfUp');
            //     hearts[i].animations.push('rotate');
            // }
                
            // for(var i = 0; i < meshCount; i++){//Creating Diamonds
            //     diamonds.push(meshFactory.diamond());
            //     diamonds[i].animations.push('moveInfRight');
            //     diamonds[i].animations.push('moveInfUp');
            //     diamonds[i].animations.push('rotate');
            // }
            //<<< END of Create>>>

            sceneFactory.add(land);
            sceneFactory.add(particleLight);
            sceneFactory.add(meshFactory.helperCude());

            // sceneFactory.addMeshArray(hearts);
            // sceneFactory.addMeshArray(diamonds);

            sceneFactory.add(cube);
            sceneFactory.add( new THREE.AmbientLight( 0x222222 ) );
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
            directionalLight.position.set( 1, 1, 1 ).normalize();
            sceneFactory.add( directionalLight );

            cube.animations.push('rotate');
            particleLight.animations.push('orbit');
        });
        //<<< END of Add

        
        $scope.toggleFullscreen = function Fullscreen() {
            
            var elem = $document[0].querySelector('.three');

            if(!isFullscreen){
                /* Go fullscreen */
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    elem.msRequestFullscreen();
                }
                $scope.fullSText = 'Close fullscreen';
            } else{
                /* Close fullscreen */
                if ($document[0].exitFullscreen) {
                    $document[0].exitFullscreen();
                } else if ($document[0].mozCancelFullScreen) { /* Firefox */
                    $document[0].mozCancelFullScreen();
                } else if ($document[0].webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    $document[0].webkitExitFullscreen();
                } else if ($document[0].msExitFullscreen) { /* IE/Edge */
                    $document[0].msExitFullscreen();
                }
                $scope.fullSText = 'Go fullscreen';
            }

            isFullscreen = !isFullscreen;
            
        }

    }
]);