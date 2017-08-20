
angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html'
    });
}])
.controller('View2Ctrl', ['$scope', '$log', '$location', '$http', function($scope, $log, $location, $http) {

	// Feel free to cahnge all the code below

	$scope.pageName = 'BLOG';

	var goToPage1 = function() {
       $location.path('/view1'); 
    };


    function init(){
    	getAllPosts();
    }
    init();
    function getAllPosts(){
    	$http.get('/api/view2')
    		 .success(function(posts){
    		 	$scope.posts = posts;
    		 });
    }
    
 
   // $scope.blogArray;
	$scope.add = function (post) {
		post.today = new Date();

		if(post.title.length!=0 && post.blog.length!=0){
			console.log(post);
		//	$scope.blogArray.push(post);			
			//$scope.blogArray.push({"title":$scope.titleInput,"blog":$scope.blogInput, "date":$scope.today});
			$http
				.post("/api/view2", post)
				.success(getAllPosts);
		}
		else
		$scope.showError="Please fill both the fields! ";
	};

	$scope.del = function(post_id){
		console.log(post_id);
		//$scope.blogArray.splice(index,1);
		$http
			.delete('/api/view2/'+post_id)
			.success(getAllPosts);
	}




}]);