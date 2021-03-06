// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpController'
        })

        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'AccountController'
        })

        .when('/classified/new', {
            templateUrl: 'views/classified/create.html',
            controller: 'CreateClassifiedController'
        })

        .when('/classified/:id/edit', {
            templateUrl: 'views/classified/create.html',
            controller: 'CreateClassifiedController'
        })
        
        .when('/classified/:id', {
            templateUrl: 'views/classified/show.html',
            controller: 'ClassifiedController'
        })

        .when('/classifieds/', {
            templateUrl: 'views/classified/listing.html',
            controller: 'ListingController'
        });

        


    $locationProvider.html5Mode(true);

}]);