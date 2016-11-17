// public/js/controllers/ClassifiedCtrl.js
angular.module('CategoryCtrl', []).controller('CategoryController', function($scope, $http, $routeParams) {

	$http.get('/api/classified/show')
        .success(function(data) {
            $scope.data = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

});