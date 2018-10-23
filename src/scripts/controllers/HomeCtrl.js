angular.module('myApp')
.controller('HomeCtrl', [
    '$scope',
    'sceneFactory',
    'helper',
    '$document',
    'customSceneFactory',
    'meshFactory',
    function($scope, sceneFactory, helper, $document, customSceneFactory, meshFactory){

        $scope.spades = [];
        $scope.hearts = [];
        $scope.clovers = [];
        $scope.diamonds = [];
        $scope.selectedItem = 'Spades';
        $scope.beenCustomized = false;
        $scope.sliderSize = 100;
        $scope.sliderColor = {red: 130, green: 130, blue: 130};
        var currentCubeRotation = 0;
        var currentSideIndex = 0;
        var customContainer = $document[0].querySelector('.customBox');
        var customMesh;

        $scope.sides = [{name: 'Spades', class: 'm1'}, {name: 'Hearts', class: 'm2'}, {name: 'Clovers', class: 'm3'}, {name: 'Diamonds', class: 'm4'}];

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

            $scope.calendarCSS = {
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

        }

        $scope.message = '<content>';

        $scope.$on('spade', function(action, arg){
            var rotateToSpades = parseInt(currentCubeRotation/360)*360;
            currentCubeRotation = rotateToSpades;
            
            $scope.rotateCube('rotate');
            
            $scope.spades.push(arg.value);
            currentSideIndex = 0;
            $scope.selectedItem = 'Spades';
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
            $scope.selectedItem = 'Hearts';
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
            $scope.selectedItem = 'Clovers';
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
            $scope.selectedItem = 'Diamonds';
        });

        $scope.$on('returnMesh', function(action, arg){
            sceneFactory.add($scope[arg.value.type][arg.value.index]);
            helper.showToast($scope[arg.value.type][arg.value.index].name +' returned to scene!');
            $scope[arg.value.type].splice(arg.value.index, 1);
            $scope.$apply();
        });

        $scope.$on('addCustomMesh', function(action, arg){
            
            if($scope.beenCustomized){
                helper.showToast("There's already a Mesh been Customized!");
            } else {
                customMesh = $scope[arg.value.type][arg.value.index];
                
                if(typeof customMesh.isCustom === 'undefined'){
                    if(customMesh.name === 'clover' || customMesh.name === 'spade')
                        customMesh.material = meshFactory.getCustomMaterial(customMesh.name);

                    customMesh.isCustom = true;
                }

                customSceneFactory.add(customMesh);

                setPropertiesFromMesh(customMesh);

                helper.showToast($scope[arg.value.type][arg.value.index].name +' ready to customize!');
                $scope[arg.value.type].splice(arg.value.index, 1);                

                $scope.beenCustomized = true;
                $scope.$apply();
            }
            
        });

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
            customSceneFactory.del(customMesh);
            $scope.$broadcast(customMesh.name, {value: customMesh});
            $scope.beenCustomized = false;
        };

        customSceneFactory.init(customContainer);
        customSceneFactory.add(meshFactory.helperCude());
        customSceneFactory.render();
    }
]);