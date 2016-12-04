angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $location) {

	$scope.email = "";
	$scope.password = "";
	$scope.err = "";
	$scope.submit = function() {
		$http.get('/api/check', {
			params: {
				email: $scope.email, 
				password: $scope.password
			}
		}).success(function(data) {
			if(data.err) {
				$scope.err = data.err;
			} else {
				$scope.err = "";
				$scope.$root.user = data[0];
				$location.url('/');
			}
		});
	}

});