angular.module('myApp')

.factory('helper', [
    '$rootScope',
    function($rootScope){
        var obj = {
            broadcast: (action, arg) =>{
                $rootScope.$broadcast(action, {value: arg});
            }
        }

        return obj;
    }
]);