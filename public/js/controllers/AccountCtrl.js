angular.module('AccountCtrl', []).controller('AccountController', function($scope, $http, $location, $cookies) {
	$scope.user = $cookies.get('user');
	if($scope.user) {
		$http.get('/api/user', {
			params: {
				id: $scope.user
			}
		}).then(function(response){
			$scope.user = response.data[0];
			$scope.isAdmin = $scope.user.roleid == 1;
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

	$scope.editClassified = function(id) {
		$location.url('/classified/'+id+'/edit');
	}

	function updateListing() {
			if($scope.isAdmin) {
				$http.get('/api/classified/show').then(function(response){
					$scope.classifieds = response.data;
				});
			} else {
				$http.get('/api/classified/show', {
				params: {
					'user_id': $scope.user._id
				}
				}).then(function(response){
					$scope.classifieds = response.data;
				});
			}
				

			$http.get('/api/classified/favorite', {
			params: {
				'uid': $scope.user._id
			}
			}).then(function(response){
				console.log(response.data);
				$scope.favorites = response.data;
			});
	}

	$scope.removeFavorite= function(id) {
		$http.get('/api/favorite/delete', {
			params: {
			'id': id	
			}
			
		});
		updateListing();
	}
});