app.controller('HomeController',['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope,$location) {
    console.log("controller invoked");

    $scope.login = function(){
    	var user = {};
    	user.email = $scope.email;
    	user.password = $scope.password;
    	$http.post("../api/login", user)
    	.success(function(data) {
    		if(data.success){
    			$rootScope.accessToken = data.token;
    			$location.path('/employee');
    		}
            // alertify.success("successfully copied template");
            $location.path('/employee');
        })
        .error(function(data, status, headers, config) {
           if (status == CUSTOM_RESPONSE_STATUS.HibernateDataValidation) {
                // alertify.error(data.message)
                console.log("data", data);
            } else if (status === 401) {
                console.log("Unauthorized");
                $location.path('/');
            } else {
                $location.path('/');
            }
        })
    	console.log("here");
    }
}]);