angular.module('myApp')

.directive('collectedCards', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attr) {
            scope.getContentUrl = function() {
                return './card-' + attr.name + '.html';
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    };
});