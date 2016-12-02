// public/js/controllers/ClassifiedCtrl.js
angular.module('ListingCtrl', []).controller('ListingController', function($scope, $http, $routeParams) {
	$scope.homeUrl = window.location.origin;
	$scope.category = "category";
	$scope.subcategory = "subcategory";
	console.log($routeParams);

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