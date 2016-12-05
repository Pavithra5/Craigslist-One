// public/js/controllers/ClassifiedCtrl.js
angular.module('ClassifiedCtrl', []).controller('ClassifiedController', function($scope, $http, $routeParams) {
	
	$http.get('/api/classified/show', {params: { classified_id : $routeParams.id}})
        .success(function(data) {
            $scope.data = data[0];
			$http.get('/api/categoryFields')
			.then(function(response){
				$scope.categoryFields = response.data;
				$http.get('/api/subcategoryFields')
				.then(function(data){
					$scope.subcategoryFields = data;
					$scope.currFields = $scope.categoryFields[$scope.data.catid];
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