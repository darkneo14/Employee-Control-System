var app = angular.module('app', [
  'ngRoute'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'HomeController'
        })
        .when('/employee', {
            templateUrl: '../views/employee.html',
            controller: 'EmployeeController'
        })
}]);

app.factory('httpRequestInterceptor', ['$rootScope', function ($rootScope) {
  return {
    request: function ($config) {
      console.log($config);
        $config.headers['Authorization'] = $rootScope.accessToken;
        return $config;
    }
  };
}]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});