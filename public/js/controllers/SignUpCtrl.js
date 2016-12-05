angular.module('SignUpCtrl', []).controller('SignUpController', function($scope, $http, $location) {

	$scope.formData = {};
	$scope.password = "";
	$scope.confirmPassword = "";

	$http.get('/api/classified/state').success(function(data){
		$scope.states = data;
	});

	$scope.submit = function() {
		if($scope.password != "" && $scope.formData.email) {
			if($scope.password === $scope.confirmPassword) {
				//$scope.formData._id=null;
				$scope.formData.contacttime = "Anytime";
				$scope.formData.roleid = 2;
				$scope.formData.isactive = 1;

				$http.get('api/user/create', {
					params: {
						user: $scope.formData,
						password: $scope.password
					}
				}).then(function(response){
					console.log(response);
					$location.url('/');
				});
			}
		}
	}


});