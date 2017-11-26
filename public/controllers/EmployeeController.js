app.controller('EmployeeController',['$scope','$rootScope','$http', '$location',  function ($scope, $rootScope, $http, $location) {
    console.log("controller invoked");


    var getEmployeeData = function () {
    	$http.get("../api/getData")
    	.success(function(data) {
            // alertify.success("successfully ");
            console.log(data);
            $scope.employees = data.data;
            $scope.displayData = data.data;
        })
        .error(function(data, status, headers, config) {
           if (status === 401) {
                console.log("Unauthorized");
                $location.path('/');
            } else {
                $location.path('/');
            }
        })
    }
    getEmployeeData();

    $scope.addEmployee = function () {
    	if(!$scope.name || !$scope.age || !$scope.salary || !$scope.jobStatus){
    		alert("Please Enter Values in all Fields");
    		return;
    	}
    	var employee = {};
    	employee.name = $scope.name;
    	employee.age = $scope.age;
    	employee.salary = $scope.salary;
    	employee.jobstatus = $scope.jobStatus;

    	$http.post("../api/addData",employee)
    	.success(function(data) {
            if(data.success){
            	$scope.name = null;
            	$scope.age = null;
            	$scope.salary = null;
            	$scope.jobstatus = null;
            	$scope.employees.push(employee);
            }
            else{
            	alert(data.message);
            }
        })
        .error(function(data, status, headers, config) {
           if (status === 401) {
                console.log("Unauthorized");
                $location.path('/');
            } else {
                $location.path('/');
            }
        })
    }

    $scope.filter = function (filter, recur) {
    	if(filter == "jobstatus"){
    		if(!$scope.jobStatusFilter){
    			return;
    		}
    		var allData;
    		if(!recur){    			
    			allData = $scope.displayData;
    		}
    		else{
    			allData = $scope.employees;	
    		}    		
    		$scope.displayData = [];
    		for(var i=0; i< allData.length;i++){
    			if(allData[i].jobstatus == $scope.jobStatusFilter){
    				$scope.displayData.push(allData[i]);
    			}
    		}
    		if(recur){
    			$scope.filter("salary", false);
    		}
    	}
    	else{
    		if(!$scope.minSalaryFilter || !$scope.maxSalaryFilter || ($scope.minSalaryFilter > $scope.minSalaryFilter)){
    			return;
    		}
    		var allData;
    		if(!recur){
    			allData = $scope.displayData;    			
    		}
    		else{
    			allData = $scope.employees;	
    		}
			$scope.displayData = [];
    		for(var i=0; i< allData.length;i++){
    			if(allData[i].salary >= $scope.minSalaryFilter && allData[i].salary <= $scope.maxSalaryFilter){
    				$scope.displayData.push(allData[i]);
    			}
    		}
    		if(recur){
				$scope.filter("jobstatus", false);
			}

    	}
    }

    $scope.clearFilters = function(){
    	console.log($scope.employees);
    	$scope.displayData = $scope.employees;
    	$scope.jobStatusFilter = '';
    	$scope.minSalaryFilter = 0;
    	$scope.maxSalaryFilter = 0;
    }


}]);