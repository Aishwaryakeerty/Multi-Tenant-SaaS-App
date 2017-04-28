var login = angular.module('login',[]);

login.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

login.controller('gradesController', ['$scope','$http', function($scope,$http, fileUpload){
	$scope.panel1=true;
	$scope.panel2=false;
	$scope.complete = false;
	$scope.publish = false;
	$scope.img = "image/1.jpg";
	$scope.file_upload = function(){
		$scope.disable = true;
		var file = $scope.file;
		console.dir(file);
		var uploadUrl = "/upload";
		var fd = new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.success(function(data){
			if(data.statusCode == 200)
			{
				
				$scope.panel1=false;
				$scope.img = "image/output.png";
				$scope.panel2=true;
				
			}
			else 
				alert("Sorry, we are experiencing a problem");
		})
		.error(function(error){
			alert("Oops! We've encountered a problem");
		});
	};
	$scope.insertData=function(){		
		$http({
			method: "PUT",
			url: "/insertdata",
			data: {
				'tenantNumber':$scope.tenantNumber,
				'score':$scope.score,
				'grades':$scope.grades,
				'comments':$scope.comments,
				'complete':$scope.complete,
				'publish':$scope.publish

			}

		}).success(function (data) {
			if(data.statusCode==200){
				alert("Data inserted Successfully");
			}
			else 
				alert("Sorry! We've encountered some problem.")
		}).error(function (error) {
			alert("Error.")
		});
	};

}]);

