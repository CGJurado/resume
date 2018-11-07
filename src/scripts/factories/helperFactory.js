angular.module('myApp')

.factory('helper', [
    '$rootScope',
    '$mdToast',
    '$mdDialog',
    function($rootScope, $mdToast, $mdDialog){
        var obj = {
            broadcast: (action, arg) =>{
                $rootScope.$broadcast(action, {value: arg});
            },
            showToast: (txt) =>{
                $mdToast.show(
                    $mdToast.simple()
                        .toastClass('toastClass')
                        .textContent(txt)
                        .position('bottom right')
                        .action('Close')
                        .highlightAction(true)
                        .hideDelay(3000)
                        .highlightClass('md-accent')
                );
            },
            showSlidersDialog: (ev, mesh) => {
                var SlidersCtrl = function($scope, $mdDialog, customMesh){

                    $scope.beenCustomized = true;
                    $scope.sliderColor = {red: 130, green: 130, blue: 130};
            
                    $scope.sliderSize = customMesh.scale.x * 100;
                    $scope.sliderColor.red = customMesh.material.color.r * 255;
                    $scope.sliderColor.green = customMesh.material.color.g * 255;
                    $scope.sliderColor.blue = customMesh.material.color.b * 255;

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

                    $scope.apply = function() {
                        $mdDialog.hide({size: $scope.sliderSize, color: $scope.sliderColor});
                    };
                };

                return $mdDialog.show({
                    locals: {customMesh: mesh},
                    controller: SlidersCtrl,
                    templateUrl: './dialog-sliders.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    escapeToClose: true,
                    hasBackdrop: false
                });                

            },
            getTextures: () =>{
                var arr = [
                    {
                        name: 'None',
                        img: './images/blank.jpg',
                        selected: false,
                        opacity: 0
                    },
                    {
                        name: 'Checkers',
                        img: 'images/checkerBoard.jpg',
                        selected: false,
                        opacity: 0.5
                    },
                    {
                        name: 'Circles',
                        img: 'images/circles.jpg',
                        selected: false,
                        opacity: 0.5
                    },
                    {
                        name: 'Chains',
                        img: 'images/chains.jpg',
                        selected: false,
                        opacity: 0.5
                    }
                ];

                return arr;
            },
            generateRandId: ()=>{
                let r = Math.random().toString(36).substring(7);
                
                return r;
            }
        }

        return obj;
    }
]);