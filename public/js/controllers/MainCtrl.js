// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$http.get('/api/categories/')
	.success(function(data){
		/*data = [ { _id: '582de3323153725a276269c8',
    name: 'Housing',
    subcategories:
     [ { name: 'Apts/House', _id: 1 },
       { name: 'Housing Swap', _id: 2 } ] },
  { _id: '582de3683153725a276269c9',
    name: 'Services',
    subcategories:
     [ { name: 'Something', _id: 1 },
       { name: 'Something else', _id: 2 } ] } ];*/

       $scope.categories = data;
	})
	.error(function(data){
		/*data = [ { _id: '582de3323153725a276269c8',
    name: 'Housing',
    subcategories:
     [ { name: 'Apts/House', _id: 1 },
       { name: 'Housing Swap', _id: 2 } ] },
  { _id: '582de3683153725a276269c9',
    name: 'Services',
    subcategories:
     [ { name: 'Something', _id: 1 },
       { name: 'Something else', _id: 2 } ] } ];*/
       
       console.log(data);
	});

	$scope.date = new Date();




});