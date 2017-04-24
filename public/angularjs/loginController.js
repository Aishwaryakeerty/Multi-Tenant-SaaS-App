var login = angular.module("login",[]);
login.controller("loginController",function($scope, $http){
	
	$scope.login=function(){
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
