// public/js/controllers/ClassifiedCtrl.js
angular.module('ListingCtrl', []).controller('ListingController', function($scope, $http, $routeParams) {
	$scope.homeUrl = window.location.origin;
	$scope.category = "category";
	$scope.subcategory = "subcategory";

	$http.get('/api/classifieds',{
	    params: {
	    	filters: "Listing"
	    }
	 }).success(function(data) {
            $scope.data = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});