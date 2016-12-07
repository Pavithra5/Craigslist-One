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

	function populateFields() {
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

	}

	function populateCurrFields() {
		$scope.currFields = categoryFields[$scope.categoryId];
		angular.forEach(subcategoryFields[$scope.subcategoryValue], function(val, key) {
			$scope.currFields[key] = val;
		});
	}

	$scope.categoryChange = function() {
		$scope.subcategoryValue = "";
		$scope.currFields = {};
		populateFields();
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
		populateCurrFields();
	}

	$scope.submit = function() {
		$scope.formData.subcatid = $scope.subcategoryValue;
		$scope.formData.userid = $scope.user;
		$scope.formData.isactive = 1;
		$scope.formData.pdate = new Date();
		$scope.formData.udate = new Date();
		if($scope.formData.furnished){
			$scope.formData.furnished = 1;
		} else {
			$scope.formData.furnished = null;
		}
		if($scope.formData.laundry){
			$scope.formData.laundry = 1;
		}else {
			$scope.formData.laundry = null;
		}
		if($scope.formData.parking){
			$scope.formData.parking = 1;
		} else {
			$scope.formData.parking = null;
		}
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

	if($routeParams.id) {
		console.log($routeParams.id);
		$scope.isEdit = true;
		$http.get('/api/classified/show', {
			params: {
				classified_id: $routeParams.id
			}
		}).then(function(response){
			console.log(response.data[0]);
			$scope.formData = response.data[0];
			$scope.categoryId = $scope.formData.catid;
			$scope.subcategoryValue = $scope.formData.subcatid;
			if($scope.formData.housetype[0]){
				$scope.formData.housetype = $scope.formData.housetype[0]._id
			} else {
				delete $scope.formData.housetype;
			}
			if($scope.formData.cylinders[0]){
				$scope.formData.cylinders = $scope.formData.cylinders[0]._id
			} else {
				delete $scope.formData.cylinders;
			}
			if($scope.formData.titlestatus[0]){
				$scope.formData.titlestatus = $scope.formData.titlestatus[0]._id
			} else {
				delete $scope.formData.titlestatus;
			}
			if($scope.formData.vehicletype[0]){
				$scope.formData.vehicletype = $scope.formData.vehicletype[0]._id
			} else {
				delete $scope.formData.vehicletype;
			}

			if($scope.formData.employmenttype[0]){
				$scope.formData.employmenttype = $scope.formData.employmenttype[0]._id
			} else {
				delete $scope.formData.employmenttype;
			}
			$http.get('/api/categoryFields')
			.success(function(data){
				categoryFields = data;
				$http.get('/api/subcategoryFields')
				.success(function(data){
					subcategoryFields = data;
					$scope.currFields = categoryFields[$scope.categoryId];
							angular.forEach(subcategoryFields[$scope.subcategoryValue], function(val, key) {
								$scope.currFields[key] = val;
							});


					console.log($scope.currFields);

				})
				.error(function(data){
			       console.log(data);
				});
			})
			.error(function(data){
		       console.log(data);
			});
		});

		$scope.save = function() {
			delete $scope.formData.categ;
			delete $scope.formData.subcateg;
			delete $scope.formData.condition;
			delete $scope.formData.user;
			delete $scope.formData.transmission;
			delete $scope.formData.fuel;
			delete $scope.formData.drive;
			delete $scope.formData.paint;
			delete $scope.formData.vehiclesize;
			delete $scope.formData.propulsion;


			$scope.formData.udate = new Date();
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
	}
});