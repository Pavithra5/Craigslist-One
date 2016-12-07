angular.module('AccountCtrl', []).controller('AccountController', function($scope, $http, $location, $cookies) {
	$scope.user = $cookies.get('user');
	if($scope.user) {
		$http.get('/api/user', {
			params: {
				id: $scope.user
			}
		}).then(function(response){
			$scope.user = response.data[0];
			$http.get('/api/classified/show', {
			params: {
				'user_id': '5835074d2e415690e60becc1'//$scope.user._id
			}
			}).then(function(response){
				$scope.classifieds = response.data;
			});
		});

	} else {
		$location.url('/login');
	}
});