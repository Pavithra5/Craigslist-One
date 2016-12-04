// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {
	
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
		$location.url('/login')
	}

});