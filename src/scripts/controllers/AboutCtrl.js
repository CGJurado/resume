angular.module('myApp')
.controller('AboutCtrl', [
    '$scope', 
    function($scope){
        $scope.description = 'My personal description.';
    }
]);