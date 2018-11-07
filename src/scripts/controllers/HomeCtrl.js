angular.module('myApp')
.controller('HomeCtrl', [
    '$scope',
    'sceneFactory',
    'helper',
    '$document',
    'customSceneFactory',
    'meshFactory',
    '$mdDialog',
    '$transitions',
    '$state',
    function($scope, sceneFactory, helper, $document, customSceneFactory, meshFactory, $mdDialog, $transitions, $state){

        $scope.spades = [];
        $scope.hearts = [];
        $scope.clovers = [];
        $scope.diamonds = [];
        $scope.selectedItem = 'spade';
        $scope.beenCustomized = false;
        $scope.sliderSize = 100;
        $scope.sliderColor = {red: 130, green: 130, blue: 130};
        $scope.textures = helper.getTextures();
        var currentCubeRotation = 0;
        var currentSideIndex = 0;
        var customContainer = $document[0].querySelector('.customBox');
        var customMesh;

        if($state.$current.name == 'app.aboutme'){
            sceneFactory.stopRender();
            $scope.outerCubeCSS = {
                '-webkit-transform':'rotateY(90deg)',
                '-moz-transform':'rotateY(90deg)',
                '-o-transform':'rotateY(90deg)',
                'transform':'rotateY(90deg)'
            };
        }
        $transitions.onBefore({ to: 'app.aboutme' }, function(transition) {
            customSceneFactory.stopRender();
            $scope.outerCubeCSS = {
                '-webkit-transform':'rotateY(90deg)',
                '-moz-transform':'rotateY(90deg)',
                '-o-transform':'rotateY(90deg)',
                'transform':'rotateY(90deg)'
            };
        });
        $transitions.onSuccess({ to: 'app' }, function(transition) {
            if($scope.beenCustomized)
                customSceneFactory.render();

            $scope.outerCubeCSS = {
                '-webkit-transform':'rotateY(0deg)',
                '-moz-transform':'rotateY(0deg)',
                '-o-transform':'rotateY(0deg)',
                'transform':'rotateY(0deg)'
            };
        });
        
        // instantiate a texture loader
        var loader = new THREE.TextureLoader();
        //allow cross origin loading
        loader.crossOrigin = '';

        $scope.getRandId = function(){
            return helper.generateRandId();
        };

        $scope.sides = [{name: 'spade', class: 'm1'}, {name: 'heart', class: 'm2'}, {name: 'clover', class: 'm3'}, {name: 'diamond', class: 'm4'}];

        $scope.rotateCube = function(direction){
            if(direction == 'right'){
                currentCubeRotation -= 90;

                currentSideIndex++;
                if(currentSideIndex > 3)
                    currentSideIndex = 0;

                $scope.selectedItem = $scope.sides[currentSideIndex].name;

            } else if(direction == 'left'){
                currentCubeRotation += 90;
                
                currentSideIndex--;
                if(currentSideIndex < 0)
                    currentSideIndex = 3;

                $scope.selectedItem = $scope.sides[currentSideIndex].name;
            }

            $scope.cubeCSS = {
                '-webkit-transform':'rotateY('+ (currentCubeRotation) +'deg)',
                '-moz-transform':'rotateY('+ (currentCubeRotation) +'deg)',
                '-o-transform':'rotateY('+ (currentCubeRotation) +'deg)',
                'transform':'rotateY('+ (currentCubeRotation) +'deg)'
            };
        };

        function setPropertiesFromMesh(mesh){

            $scope.sliderSize = mesh.scale.x * 100;
            $scope.sliderColor.red = mesh.material.color.r * 255;
            $scope.sliderColor.green = mesh.material.color.g * 255;
            $scope.sliderColor.blue = mesh.material.color.b * 255;

            for(let i = 0; i < $scope.textures.length; i++){
                if(i !== mesh.textureIndex)
                    $scope.textures[i].selected = false;
            }
            $scope.textures[mesh.textureIndex].selected = true;

        }

        $scope.message = '<content>';

        $scope.$on('spade', function(action, arg){
            var rotateToSpades = parseInt(currentCubeRotation/360)*360;
            currentCubeRotation = rotateToSpades;
            
            $scope.rotateCube('rotate');
            
            $scope.spades.push(arg.value);
            currentSideIndex = 0;
            $scope.selectedItem = 'spade';
        });
        $scope.$on('heart', function(action, arg){
            var rotateToHearts;
            
            if(currentCubeRotation > 0)
                rotateToHearts = (parseInt(currentCubeRotation/360)*360)+270;
            else
                rotateToHearts = (parseInt(currentCubeRotation/360)*360)-90;

            currentCubeRotation = rotateToHearts;
            
            $scope.rotateCube('rotate');

            $scope.hearts.push(arg.value);
            currentSideIndex = 1;
            $scope.selectedItem = 'heart';
        });
        $scope.$on('clover', function(action, arg){
            var rotateToClovers;
            
            if(currentCubeRotation > 0)
                rotateToClovers = (parseInt(currentCubeRotation/360)*360)+180;
            else
                rotateToClovers = (parseInt(currentCubeRotation/360)*360)-180;
                
            currentCubeRotation = rotateToClovers;
            
            $scope.rotateCube('rotate');

            $scope.clovers.push(arg.value);
            currentSideIndex = 2;
            $scope.selectedItem = 'clover';
        });
        $scope.$on('diamond', function(action, arg){
            var rotateToDiamonds;
            
            if(currentCubeRotation < 0)
                rotateToDiamonds = (parseInt(currentCubeRotation/360)*360)-270;
            else
                rotateToDiamonds = (parseInt(currentCubeRotation/360)*360)+90;
                
            currentCubeRotation = rotateToDiamonds;
            
            $scope.rotateCube('rotate');

            $scope.diamonds.push(arg.value);
            currentSideIndex = 3;
            $scope.selectedItem = 'diamond';
        });

        $scope.returnMeshToScene = function(meshInfo){
            sceneFactory.add($scope[meshInfo.type][meshInfo.index]);
            helper.showToast($scope[meshInfo.type][meshInfo.index].name +' returned to scene!');
            $scope[meshInfo.type].splice(meshInfo.index, 1);
            $scope.$apply();
        };

        $scope.addMeshToCustomScene = function(meshInfo){
            
            if($scope.beenCustomized){
                helper.showToast("There's already a Mesh been Customized!");
            } else {
                customMesh = $scope[meshInfo.type][meshInfo.index];
                
                if(typeof customMesh.isCustom === 'undefined'){
                    customMesh.material = meshFactory.getCustomMaterial(customMesh.name);
                    customMesh.svgIMG = $scope.textures[0].img;
                    customMesh.svgOPACITY = 0;
                    customMesh.textureIndex = 0;
                    customMesh.isCustom = true;
                }

                customSceneFactory.add(customMesh);

                setPropertiesFromMesh(customMesh);

                helper.showToast(customMesh.name +' ready to customize!');
                $scope[meshInfo.type].splice(meshInfo.index, 1);

                $scope.beenCustomized = true;
                customSceneFactory.render();
                $scope.$apply();
            }
            
        };

        $scope.showSlidersDialog = function(ev){
            helper.showSlidersDialog(ev, customMesh).then(function(answer) {
                $scope.sliderSize = answer.size;
                $scope.sliderColor = answer.color;
            }, function() {
                setPropertiesFromMesh(customMesh);
            });
        };

        $scope.$watch('sliderSize', function(value){
            if($scope.beenCustomized){
                var newValue = value /100;
                customMesh.scale.set(newValue, newValue, newValue);
            }
        });

        $scope.$watch('sliderColor.red', function(value){
            if($scope.beenCustomized){
                var green = customMesh.material.color.g;
                var blue = customMesh.material.color.b;
                customMesh.material.color.setRGB(value/255, green, blue);
            }
        });

        $scope.$watch('sliderColor.green', function(value){
            if($scope.beenCustomized){
                var red = customMesh.material.color.r;
                var blue = customMesh.material.color.b;
                customMesh.material.color.setRGB(red, value/255, blue);
            }
        });

        $scope.$watch('sliderColor.blue', function(value){
            if($scope.beenCustomized){
                var red = customMesh.material.color.r;
                var green = customMesh.material.color.g;
                customMesh.material.color.setRGB(red, green, value/255);
            }
        });

        $scope.saveCustomMesh = function(){
            
            customMesh.svgOPACITY = $scope.textures[customMesh.textureIndex].opacity;
            
            if(customMesh.textureIndex !== 0){
                customMesh.svgOPACITY += 0.25*customMesh.material.color.g;
                customMesh.svgOPACITY += 0.1*customMesh.material.color.r;
            }

            customSceneFactory.del(customMesh);
            $scope.$broadcast(customMesh.name, {value: customMesh});
            $scope.beenCustomized = false;
            customSceneFactory.stopRender();
        };

        
        $scope.showTexturesDialog = function(ev){
            $mdDialog.show({
                locals: {textures: $scope.textures, customMesh: customMesh},
                controller: ['$scope', 'meshFactory', 'textures', 'customMesh', TexDialogCtrl],
                templateUrl: './dialog-textures.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                escapeToClose: true,
                hasBackdrop: false
            });
        };

        var TexDialogCtrl = function($scope, meshFactory, textures, customMesh){
            $scope.textures = textures;
                        
            $scope.applyTexture = function(index){
                for(let i = 0; i < $scope.textures.length; i++){
                    if(i !== index)
                        $scope.textures[i].selected = false;
                }
                $scope.textures[index].selected = true;
                
                customMesh.material.map = meshFactory.getCustomTexture(index);
                customMesh.svgIMG = $scope.textures[index].img;
                customMesh.textureIndex = index;
                customMesh.material.map.needsUpdate = true;
            };

            $scope.apply = function(){
                $mdDialog.hide();
            }
        };

        $scope.applyCustomTexture = function(index){
            for(let i = 0; i < $scope.textures.length; i++){
                if(i !== index)
                    $scope.textures[i].selected = false;
            }
            $scope.textures[index].selected = true;
            
            customMesh.material.map = meshFactory.getCustomTexture(index);
            customMesh.svgIMG = $scope.textures[index].img;
            customMesh.textureIndex = index;
            customMesh.material.map.needsUpdate = true;
        };

        customSceneFactory.init(customContainer);
        customSceneFactory.add(meshFactory.helperCude());
        // customSceneFactory.render();

        $scope.detail = {
            who: 'Carlos Grisanty',
            what: 'Web Developer',
            exp: 'I have three years of working experience developing Web applications and Hybrid mobile applications in full Javascript.',
            notes: "I made this page in my free time without any real purpose but to satisfy my own goals, it can be considered as a personal project.",
            email: 'CGjurado@gmail.com'
        }
    }
]);