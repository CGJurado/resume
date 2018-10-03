angular.module('myApp')
.controller('HeaderCtrl', [
    '$scope',
    '$state',
    function($scope, $state){
        $scope.currentNavItem = 'page1';
        $scope.secondTabDisabled = false;
        $scope.disableInkBar = false;

        $scope.$watch(function(){
            return $state.$current.name
        }, function(newVal, oldVal){
            $scope.currentNavItem = newVal;
        });

        $scope.goto = function(page) {
            $state.go(page);
        };
    }
]);