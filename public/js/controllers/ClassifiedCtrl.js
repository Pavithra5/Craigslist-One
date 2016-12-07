// public/js/controllers/ClassifiedCtrl.js
angular.module('ClassifiedCtrl', []).controller('ClassifiedController', function($scope, $http, $routeParams) {
	
	$http.get('/api/classified/show', {params: { classified_id : $routeParams.id}})
        .success(function(data) {
            $scope.data = data[0];
			$http.get('/api/categoryFields')
			.then(function(response){
				$scope.categoryFields = response.data;
				$http.get('/api/subcategoryFields')
				.then(function(response){
					$scope.subcategoryFields = response.data;
					$scope.currFields = $scope.categoryFields[$scope.data.catid];
					console.log($scope.currFields);
					$scope.subcategoryValue = $scope.data.subcatid;
					angular.forEach($scope.subcategoryFields[$scope.subcategoryValue], function(val, key) {
						$scope.currFields[key] = val;
					});
					console.log($scope.currFields);
				});
			});
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

});