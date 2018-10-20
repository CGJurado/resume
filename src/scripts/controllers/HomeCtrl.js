angular.module('myApp')
.controller('HomeCtrl', [
    '$scope',
    'sceneFactory',
    'helper',
    function($scope, sceneFactory, helper){

        $scope.spades = [];
        $scope.hearts = [];
        $scope.clovers = [];
        $scope.diamonds = [];

        $scope.message = '<content>';

        $scope.$on('spade', function(action, arg){
            $scope.spades.push(arg.value);
            $scope.$apply();
        });
        $scope.$on('heart', function(action, arg){
            $scope.hearts.push(arg.value);
            $scope.$apply();
        });
        $scope.$on('clover', function(action, arg){
            $scope.clovers.push(arg.value);
            $scope.$apply();
        });
        $scope.$on('diamond', function(action, arg){
            $scope.diamonds.push(arg.value);
            $scope.$apply();
        });

        $scope.$on('returnMesh', function(action, arg){
            sceneFactory.add($scope[arg.value.type][arg.value.index]);
            helper.showToast($scope[arg.value.type][arg.value.index].name +' returned to scene!');
            $scope[arg.value.type].splice(arg.value.index, 1);
            $scope.$apply();
        });
    }
]);