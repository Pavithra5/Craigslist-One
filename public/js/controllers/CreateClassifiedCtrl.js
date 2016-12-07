// public/js/controllers/CreateClassifiedCtrl.js
angular.module('CreateClassifiedCtrl', []).controller('CreateClassifiedController', function($scope, $http, $location,$routeParams, $cookies) {
	if($cookies.get('user')) {
		$scope.user = $cookies.get('user');	
	} else {
		$location.url('/');
	}
	var categoryFields = {};
	var subcategoryFields = {};
	$scope.subcategoryValue = "";

	$scope.formData = {};

	$('select#subcategoryDD').prop('disabled', true);

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

	$http.get('/api/classified/titlestatus')
	.success(function(data){
		$scope.statuses = data;
	})
	.error(function(data){
       console.log(data);
	});


	$http.get('/api/classified/size')
	.success(function(data){
		$scope.sizes = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/transmission')
	.success(function(data){
		$scope.transmissions = data;
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

	$http.get('/api/classified/colors')
	.success(function(data){
		$scope.colors = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/driveType')
	.success(function(data){
		$scope.drivetypes = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/vehicletype')
	.success(function(data){
		$scope.vehicletypes = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/employmenttype')
	.success(function(data){
		$scope.employmenttypes = data;
	})
	.error(function(data){
       console.log(data);
	});

	$http.get('/api/classified/housetype')
	.success(function(data){
		$scope.housetypes = data;
	})
	.error(function(data){
       console.log(data);
	});



	$scope.categoryChange = function() {
		$scope.subcategoryValue = "";
		$scope.currFields = {};
		$http.get('/api/categoryFields')
		.success(function(data){
			categoryFields = data;
		})
		.error(function(data){
	       console.log(data);
		});

		$http.get('/api/subcategoryFields')
		.success(function(data){
			subcategoryFields = data;
		})
		.error(function(data){
	       console.log(data);
		});
		$scope.categoryId = $('input[name="category-radio"]:checked').val();
		angular.forEach($scope.categories, function(value){
			if(value._id == $scope.categoryId) {
				$scope.subcategories = value.subcategories;
			}
		});
		$('select#subcategoryDD').prop('disabled', false);
	}



	$scope.subcategoryChange = function() {
		$('select#subcategoryDD').prop('disabled', true);
		$scope.currFields = {};
		$scope.currFields = categoryFields[$scope.categoryId];
		console.log("categoryFields ");
		console.log($scope.currFields);
		console.log("subcategory");
		console.log($scope.subcategoryValue);
		console.log("subcategoryFields ");
		console.log(subcategoryFields[$scope.subcategoryValue]);
		angular.forEach(subcategoryFields[$scope.subcategoryValue], function(val, key) {
			$scope.currFields[key] = val;
		});

		console.log("Final");
		console.log($scope.currFields);
	}

	$scope.submit = function() {
		$scope.formData.subcatid = $scope.subcategoryValue;
		$scope.formData.userid = $scope.user;
		$http.get('/api/classified/save', {
			params: {
				user: $scope.formData
			}
		}).then(function(response){
			if(response.data._id){
				$location.url('/classified/'+response.data._id);
			}
		});
	}
});