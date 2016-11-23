// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$http.get('/api/categories/')
	.success(function(data){
		$.each(data, function(index, value){
			var count = 0;
			value.length = value.subcategories.length;
		});
       $scope.categories = data;
	})
	.error(function(data){
       console.log(data);
	});

	$scope.date = new Date();




});