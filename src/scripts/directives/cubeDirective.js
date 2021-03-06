angular.module('myApp')

.directive('cubeFaces', [
    '$document',
    'helper',
    '$window',
    function($document, helper, $window) {
        return {
            restrict: 'A',
            link: linker
        };

        function linker(scope, element, attr) {

            var landa = 360/4;
            
            element.css({
                '-webkit-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)',
                '-moz-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)',
                '-o-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)',
                'transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)'
            });
            
            // $('#cubeContainer').css({
            element.parent().parent().css({
                'transform':'translateZ(-'+ (element[0].clientWidth/2) +'px)'
            });

            angular.element($window).bind('resize', function(){
                
                element.css({
                    '-webkit-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)',
                    '-moz-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)',
                    '-o-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)',
                    'transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (element[0].clientWidth/2) +'px)'
                });
                element.parent().parent().css({
                    'transform':'translateZ(-'+ (element[0].clientWidth/2) +'px)'
                });
                
            });

            // console.log('tamo aki mmg!');

            // var deg2rad = Math.PI/180;
            // var rad2deg = 180/Math.PI;
            // var ratio   = Math.tan( 90 * deg2rad );

            // function getTanFromDegrees(degrees) {
            //     return Math.tan(degrees * (Math.PI/180));
            // }

            // var landa = (360/attr.length)/2;
            // var RW = 0.5/getTanFromDegrees(landa);
            // var rFW = parseInt(attr.rfw);

            // console.log('index: '+ attr.index);
            // console.log('landa: '+ landa);
            // console.log('RW: '+ RW);
            // console.log('rFW: '+ rFW);
            // console.log(Math.atan( ratio ) * rad2deg);

            // element.css({
            //     '-webkit-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (rFW*RW) +'px)',
            //     '-moz-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (rFW*RW) +'px)',
            //     '-o-transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (rFW*RW) +'px)',
            //     'transform':'rotateY('+ (attr.index*landa) +'deg) translateZ('+ (rFW*RW) +'px)'
            // });
        }
    }
]);