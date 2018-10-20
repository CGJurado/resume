angular.module('myApp')

.factory('helper', [
    '$rootScope',
    '$mdToast',
    function($rootScope, $mdToast){
        var obj = {
            broadcast: (action, arg) =>{
                $rootScope.$broadcast(action, {value: arg});
            },
            showToast: (txt) =>{
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(txt)
                        .position('bottom right')
                        .action('Close')
                        .highlightAction(true)
                        .hideDelay(3000)
                        .highlightClass('md-accent')
                );
            }
        }

        return obj;
    }
]);