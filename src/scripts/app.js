angular.module('myApp', ['ui.router', 'ngMaterial', 'ngMessages'])

.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $mdThemingProvider){
        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'header.html',
                        controller  : 'HeaderCtrl'
                    },
                    'content': {
                        templateUrl : 'home.html',
                        controller  : 'HomeCtrl'
                    },
                    'footer': {
                        template : '<div></div>',
                    }
                }

            })
            // route for the aboutme page
            .state('app.aboutme', {
                url:'aboutme',
                views: {
                    'content@': {
                        templateUrl : 'aboutme.html',
                        controller  : 'AboutCtrl'                  
                    }
                }
            });
            
        $urlRouterProvider.otherwise('/');

        $mdThemingProvider.theme('default')
            .dark();
    }
])