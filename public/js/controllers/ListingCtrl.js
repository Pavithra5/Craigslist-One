// public/js/controllers/ClassifiedCtrl.js
angular.module('ListingCtrl', []).controller('ListingController', function($scope, $http, $routeParams) {
	$scope.homeUrl = window.location.origin;

	$http.get('/api/categories/')
	.success(function(data){
		angular.forEach(data, function(value){
			if(value._id == $routeParams.cid)
			$scope.category = value.name;
			angular.forEach(value.subcategories, function(subValue) {
				if(subValue._id == $routeParams.sid)
					$scope.subcategory = subValue.name;
			});
		});
	})
	.error(function(data){
       console.log(data);
	});


	$http.get('/api/classified/show',{
	    params: {
	    	category_id:$routeParams.cid,
	    	subcategory_id: $routeParams.sid
	    }
	 }).success(function(data) {
            $scope.data = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});