angular.module('myApp')
.controller('HeaderCtrl', [
    '$scope',
    '$state',
    '$document',
    function($scope, $state, $document){

        $scope.currentNavItem = 'page1';
        $scope.secondTabDisabled = false;
        $scope.disableInkBar = false;
        $scope.dontHide = true;
        $scope.fabIsOpen = false;
        var addBtn = $('#addBtn');
        var infoBtn = $('#infoBtn');
        var gitBtn = $('#gitBtn');
        var menuBtn = $('#menuBtn');

        $scope.$watch(function(){
            return $state.$current.name
        }, function(newVal, oldVal){
            $scope.currentNavItem = newVal;
        });

        $scope.goto = function(page) {
            $state.go(page);
        };

        $scope.$on('goTo', function(ev, arg){
            $scope.goto(arg.value);
        });

        function toggleBtns(){
            
            addBtn.fadeIn({duration: 300, queue: false});
            addBtn.css({
                top: menuBtn.offset().top
            });
            addBtn.animate({
                top: '-=100'
            }, {duration:300, queue: false});


            infoBtn.fadeIn({duration: 300, queue: false});
            infoBtn.css({
                top: menuBtn.offset().top,
                left: menuBtn.offset().left
            });
            infoBtn.animate({
                top: '-=60',
                left: "-=70"
            }, {duration:300, queue: false});

            gitBtn.fadeIn({duration: 300, queue: false});
            gitBtn.css({
                left: menuBtn.offset().left
            });
            gitBtn.animate({
                left: "-=100"
            }, {duration:300, queue: false});
            
        }

        $scope.openFabMenu = function(){

            if($scope.fabIsOpen){

                addBtn.fadeOut({queue: false});
                infoBtn.fadeOut({queue: false});
                gitBtn.fadeOut({queue: false});
                $scope.fabIsOpen = false;

            } else {

                toggleBtns();
                $scope.fabIsOpen = true;

            }
        }

        menuBtn.focusout(function(){
            $scope.openFabMenu();
        });
    }
]);