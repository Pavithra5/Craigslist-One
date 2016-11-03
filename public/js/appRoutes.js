// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // posts page that will use the PostController
        .when('/posts', {
            templateUrl: 'views/posts.html',
            controller: 'PostController'
        });

    $locationProvider.html5Mode(true);

}]);