
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
            .when('/InternalTrade', {
                templateUrl: '/NG-Views/Trade/HTML/InternalTrade.html',
                controller: 'InternalTradeCont'
            })
            .when('/TradePriceCalculation', {
                templateUrl: '/NG-Views/PriceExport/HTML/TradePriceCalculation.html',
                controller: 'TradePriceCalculationCont'
            })
        $locationProvider.html5Mode(false).hashPrefix('!'); // This is for Hashbang Mode
    })

.controller('RootController', ['$scope', '$window', function ($scope, $window) {
    
    $scope.Logout = function () {

        $window.location.href = '/Home/LogOff';
    }


}])