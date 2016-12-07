// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, $cookies) {
	
	$scope.user = $cookies.get('user');
	if($scope.user) {
		$http.get('/api/user', {
			params: {
				id: $scope.user
			}
		}).then(function(response){
			$scope.user = response.data[0];
		});
	}

	$http.get('/api/categories/')
	.success(function(data){
		angular.forEach(data, function(value){
			value.length = value.subcategories.length;
		});
       $scope.categories = data;
	})
	.error(function(data){
       console.log(data);
	});

	$scope.date = new Date();

	$scope.postAClassified = function() {
		$location.url('/classified/new');
	}

	$scope.myAccount = function() {
		$location.url('/account');
	}

	$scope.login = function() {
		$location.url('/login');
	}

	$scope.logout = function() {
		$cookies.remove('user');
		$scope.user = null;
		$location.url('/');
	}

});