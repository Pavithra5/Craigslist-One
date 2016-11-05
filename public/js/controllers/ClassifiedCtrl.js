// public/js/controllers/ClassifiedCtrl.js
angular.module('ClassifiedCtrl', []).controller('ClassifiedController', function($scope, $http, $routeParams) {

	$http.get('/api/classified/' + $routeParams.id)
        .success(function(data) {
            $scope.data = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

});