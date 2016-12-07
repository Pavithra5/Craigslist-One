angular.module('AccountCtrl', []).controller('AccountController', function($scope, $http, $location, $cookies) {
	$scope.user = $cookies.get('user');
	if($scope.user) {
		$http.get('/api/user', {
			params: {
				id: $scope.user
			}
		}).then(function(response){
			$scope.user = response.data[0];
			updateListing();
		});

	} else {
		$location.url('/login');
	}

	$scope.deleteClassified=function(id){
		$http.get('api/classified/delete',{
			params: {
				'id': id
			}
		}).then(function (response) {
			updateListing();
		});
	}

	function updateListing() {
		$http.get('/api/classified/show', {
			params: {
				'user_id': $scope.user._id
			}
			}).then(function(response){
				$scope.classifieds = response.data;
			});
	}
});