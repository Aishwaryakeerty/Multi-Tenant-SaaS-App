var login = angular.module("login",[]);
login.controller("loginController",function($scope, $http, $window){
	console.log("aaa");
	$scope.login=function(){
		alert("Hello!");
		$http({
			method: "POST",
			url: "/login",
			data: {
				"username" : $scope.username,
				"password": $scope.password,

			}

		}).success(function (data) {
			if(data.statusCode==200){
				window.location = "/grades";
			}
			else 
				alert("Invalid username or password");

		}).error(function (error) {
			alert("oops! We've encountered a problem");
		});
	};
});
