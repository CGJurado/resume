angular.module('myApp')
.controller('HeaderCtrl', [
    '$scope',
    '$state',
    '$mdDialog',
    function($scope, $state, $mdDialog){

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
                bottom: '20px'
            });
            addBtn.animate({
                bottom: '+=100'
            }, {duration:300, queue: false});


            infoBtn.fadeIn({duration: 300, queue: false});
            infoBtn.css({
                bottom: '20px',
                right: '20px'
                // bottom: menuBtn.offset().bottom,
                // right: menuBtn.offset().right
            });
            infoBtn.animate({
                bottom: '+=60',
                right: "+=70"
            }, {duration:300, queue: false});

            gitBtn.fadeIn({duration: 300, queue: false});
            gitBtn.css({
                right: '20px'
            });
            gitBtn.animate({
                right: "+=100"
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

        $scope.showInfoDialog = function(ev) {
            $mdDialog.show({
                locals: {tabSelected: ev.currentTarget.id},
                controller: ['$scope', '$mdDialog', 'tabSelected', 'sceneFactory', DialogController],
                templateUrl: 'dialog-info.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                escapeToClose: true,
                clickOutsideToClose:true
            })
                // .then(function(answer) {
                //   $scope.status = 'You said the information was "' + answer + '".';
                // }, function() {
                //   $scope.status = 'You cancelled the dialog.';
                // });
        };
        
        function DialogController($scope, $mdDialog, tabSelected, sceneFactory) {

            if(tabSelected === 'addBtn'){
                $scope.tabSelected = 1;
            } else {
                $scope.tabSelected = 0;
            }

            $scope.stopTime = function(){
                sceneFactory.stopTime();
            }

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
    }
]);