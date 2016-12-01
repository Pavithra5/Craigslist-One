// public/js/controllers/CreateClassifiedCtrl.js
angular.module('CreateClassifiedCtrl', []).controller('CreateClassifiedController', function($scope, $http, $routeParams) {
	$scope.subcategoryValue = "";

	$scope.years = [
		"2016",
		"2015",
		"2014",
		"2013",
		"2012",
		"2011",
		"2010",
		"2009",
		"2008",
		"2007",
		"2006",
		"2005",
		"2004",
		"2003",
		"2002",
		"2001",
		"2000",
		"1999",
		"1998",
		"1997"
	];

	$http.get('/api/categories/')
	.success(function(data){
		$scope.categories = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/fueltype')
	.success(function(data){
		$scope.fuelTypes = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/condition')
	.success(function(data){
		$scope.conditions = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/cylinder')
	.success(function(data){
		$scope.cylinders = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/driveType')
	.success(function(data){
		$scope.driveTypes = data;
	})
	.error(function(data){
       console.log(data);
	});

	$scope.categoryChange = function() {
		$scope.categoryId = $('input[name="category-radio"]:checked').val();
		angular.forEach($scope.categories, function(value){
			if(value._id == $scope.categoryId) {
				$scope.subcategories = value.subcategories;
			}
		});
	}



	$scope.$watch('subcategoryValue', function(value){
		
	});
});