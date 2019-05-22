var app = angular.module('loginapp', []);

app.controller("AccountController", function ($scope, $http, $window) {
    
    $scope.EnvironmentList = [];
    $scope.loginpage = [];
    $scope.login = function () {
        
        var temp_loginData = {
            UserID: $scope.loginpage.UserID,
            Password: $scope.loginpage.Password,
            Server: $scope.loginpage.Server,
        };
        $http({
            method: 'POST',
            url: '/Home/Loginauthentication',
            data: temp_loginData
        }).then(function (response) {           
            if (response.data.IsAuthenticated == true) {  
                
                $window.location.href = '/Home/Index';               
            }
            else {
                alert(response.data.AppError);
            }
            
            }, function (error) {
                alert(error);

        });
    }

    $scope.getEnvironmentPartDetails = function () {
        
        $http({
            method: 'GET',
            url: '/Home/environmentListDetails'
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                var temp = {
                    value: response.data[i]
                };
                $scope.EnvironmentList.push(temp);
            }

        }, function (error) {

        });

    }
    $scope.getEnvironmentPartDetails();

})


