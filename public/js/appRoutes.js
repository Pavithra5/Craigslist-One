// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/classified/:id', {
            templateUrl: 'views/classified.html',
            controller: 'ClassifiedController'
        });


    $locationProvider.html5Mode(true);

}]);