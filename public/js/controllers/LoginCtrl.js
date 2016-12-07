angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $location, $cookies) {

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
				$cookies.put('user', data[0]._id);
				$location.url('/account');
			}
		});
	}

});