
var app = angular.module('myApp', ['ngRoute', 'ngResource']);

//app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//    $routeProvider
//        .when('/TradeCreation', { templateUrl: './trade/TradeCreationPage', controller: 'TradeCreationPageController' })
//        .otherwise({ redirectto: '/TradeCreation' });
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });
//}]);
app.controller('RootController', ['$scope', '$window', function ($scope, $window) {
    
    try {
        
        $timout(function () {
            document.getElementById("firstTrade").click();
        }, 0);

    } catch (e) {

    }
    $scope.Logout = function () {
        
        $window.location.href = '/Home/LogOff';  
    }
     
   
}]);

