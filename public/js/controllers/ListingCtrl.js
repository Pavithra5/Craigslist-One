// public/js/controllers/ClassifiedCtrl.js
angular.module('ListingCtrl', []).controller('ListingController', function($scope, $http, $routeParams) {
	$scope.homeUrl = "/";
	$scope.catUrl = "/classifieds?cid="+$routeParams.cid;
	/*$scope.pages = [1,2,3,4];
	$scope.page = $scope.pages[0];
	$('select#pagination').val(1);
*/
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
	    	subcategory_id: $routeParams.sid,
	    	classified_id:$routeParams.clid,
	    	user_id:$routeParams.uid,
	    	post_date:$routeParams.pdate,
	    	update_date:$routeParams.udate,
	    	employmenttype:$routeParams.etype,
	    	conditionid:$routeParams.condition,
	    	dateavailable:$routeParams.avail,
	    	bed:$routeParams.bed,
	    	bath:$routeParams.bath,
	    	housetype:$routeParams.htype,
	    	laundry:$routeParams.laundry,
	    	parking:$routeParams.parking,
	    	furnished:$routeParams.furn,
	    	privateroom:$routeParams.proom,
	    	privatebath:$routeParams.pbath,
	    	colors:$routeParams.color,
	    	propulsion:$routeParams.propulsion,
	    	cylinder:$routeParams.cylinder,
	    	drivetype:$routeParams.drive,
	    	fueltype:$routeParams.fuel,
	    	size:$routeParams.size,
	    	titlestatus:$routeParams.titlestatus,
	    	transmission:$routeParams.transmission,
	    	vehicletype:$routeParams.vehicle,
	    	make:$routeParams.make,
	    	model:$routeParams.model,
	    	dealer:$routeParams.dealer,
	    	area1:$routeParams.area1,
	    	area2:$routeParams.area2,
	    	price1:$routeParams.price1,
	    	price2:$routeParams.price2,
	    	width1:$routeParams.width1,
	    	width2:$routeParams.width2,
	    	height1:$routeParams.height1,
	    	height2:$routeParams.height2,
	    	length1:$routeParams.length1,
	    	length2:$routeParams.length2,
	    	year1:$routeParams.year1,
	    	year2:$routeParams.year2,
	    	odometer1:$routeParams.odometer1,
	    	odometer2:$routeParams.odometer2,
	    	search:$routeParams.search
	    }
	 }).success(function(data) {
            $scope.data = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});