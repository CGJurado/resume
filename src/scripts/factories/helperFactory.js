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
            },
            getTextures: () =>{
                var arr = [
                    {
                        name: 'None',
                        img: './images/blank.jpg',
                        selected: false
                    },
                    {
                        name: 'Checkers',
                        img: 'images/checkerBoard.jpg',
                        selected: false
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