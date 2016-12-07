angular.module('AccountCtrl', []).controller('AccountController', function($scope, $http, $location) {

	$scope.user = $scope.$root.user;

});