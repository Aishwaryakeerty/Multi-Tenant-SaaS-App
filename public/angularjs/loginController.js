var login = angular.module("login",[]);
login.controller("loginController",function($scope, $http){
	console.log("aaa");
	$scope.login=function(){
		alert("Hello!");
		$http({
            method: "POST",
            url: "/login",
            data: {
            	"username" : $scope.username,
            	"password": $scope.password,
            	"tenant_id": $scope.tenant_id
            }
		
        }).success(function (data) {
            if(data.statusCode==200){
        	$scope.answer = data.data;
    		}
            else 
            	$scope.answer = data.data;
            
        }).error(function (error) {
        	$scope.answer = "Error!";    
        });
	};
});
