
angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html'
    });
}])
.controller('View2Ctrl', ['$scope', '$log', '$location', function($scope, $log, $location) {

	// Feel free to cahnge all the code below

	$scope.pageName = 'BLOG';

	var goToPage1 = function() {
       $location.path('/view1'); 
    };
 
    $scope.blogArray = [];
	$scope.add = function () {
		if($scope.titleInput.length!=0 && $scope.blogInput.length!=0)
		$scope.blogArray.push({"title":$scope.titleInput,"blog":$scope.blogInput});
		else
		$scope.showError="Please fill both the fields! ";
	};

	$scope.del = function(index){
		$scope.blogArray.splice(index,1);
	}




}]);