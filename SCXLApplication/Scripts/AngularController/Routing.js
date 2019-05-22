
angular.module('MyApp', ['ngRoute']) //extending from previously created angularjs module in part1//'ui.bootstrap',
    // here ['ngRoute'] is not required, I have just added to make you understand in a single place
    .config(function ($routeProvider, $locationProvider) {
        //here we will write code for implement routing 
        $routeProvider
            //.when('/', { // This is for reditect to another route
            //    redirectTo: function () {
            //        return '/InternalTrade';
            //    }
            //})
            .when('/MasterRole', {
                templateUrl: 'http://localhost/Application/NG-Views/Master/HTML/MasterRole.html',
                controller: 'MasterRoleCont'
            })
            .when('/MasterEmployee', {
                templateUrl: 'http://localhost/Application/NG-Views/Master/HTML/MasterEmployee.html',
                controller: 'MasterEmployeeCont'
            })
            .when('/MasterLoginDetails', {
                templateUrl: 'http://localhost/Application/NG-Views/Master/HTML/LoginDetails.html',
                controller: 'LoginDetailsCont'
            })
            .when('/MasterEmployeeType', {
                templateUrl: 'http://localhost/Application/NG-Views/Master/HTML/EmployeeType.html',
                controller: 'EmployeeTypeCont'
            })
        .when('/MasterOrganization', {
            templateUrl: 'http://localhost/Application/NG-Views/Master/HTML/MasterOrganization.html',
            controller: 'MasterOrganization'
        })
        $locationProvider.html5Mode(false).hashPrefix('!'); // This is for Hashbang Mode
    })

.controller('RootController', ['$scope', '$window', function ($scope, $window) {
    
    $scope.Logout = function () {

        $window.location.href = 'http://localhost/Application/Home/LogOff';
    }


}])