var app = angular.module('MyApp');

app.controller("EmployeeTypeCont", ['$scope', '$http', '$timeout', '$route', function ($scope, $http, $timeout, $route) {

    $scope.messageempTypeNotification = '';
    $scope.InfoempTypeMessage = false;
    $scope.ErrorempTypeMessage = false;
    $scope.ListtableempType = [];
    $scope.emptype = [];
    $scope.btnemptype = "Add";

    $scope.getEmployeeTypeData = function () {
        $scope.ListtableempType= [];
        $http({
            method: 'GET',
            url: 'http://localhost/Application/Master/GetTableEmployeeType'
        }).then(function (response) {
            if (response.data != '') {
                for (var i = 0; i < response.data.length; i++) {
                    var temp = {
                        Employee_Id: response.data[i].Employee_Id, Employee_Name: response.data[i].Employee_Name
                    };
                    $scope.ListtableempType.push(temp);
                }

            }
        }, function (error) {

        });
    }
    $scope.addingemptype = function () {

        if ($scope.btnemptype == "Add") {

            var temp_type = {
                Employee_Name: $scope.emptype.empTypeName
            };
            $http({
                method: 'POST',
                url: '/Master/insertEmployeeData',
                data: temp_type
            }).then(function (response) {
                if (response.data == "Record Affected") {
                    $scope.reSetemptypeForm();
                    $scope.InfoempTypeMessage = true;
                    $scope.messageempTypeNotification = "Record inserted into database";
                    $scope.btnemptype = "Add";
                    $scope.getEmployeeTypeData();
                }
                else {
                    $scope.ErrorMEssage = true;
                    $scope.messageempTypeNotification = "Record Not inserted into database";
                }
            }, function (error) {

            });
        }
        else if ($scope.btnemptype == "Update") {
            var temp_type = {
                Employee_Name: $scope.emptype.empTypeName
            };
            $http({
                method: 'POST',
                url: '/Master/updateEmployeeData',
                data: temp_type
            }).then(function (response) {
                if (response.data == "Record Affected") {
                    $scope.reSetemptypeForm();
                    $scope.InfoempTypeMessage = true;
                    $scope.messageempTypeNotification = "Record inserted into database";
                    $scope.btnemptype = "Add";
                    $scope.getEmployeeTypeData();
                }
                else {
                    $scope.ErrorMEssage = true;
                    $scope.messageempTypeNotification = "Record Not inserted into database";
                }
            }, function (error) {

            });
        }
    }
    $scope.reSetemptypeForm = function () {
        $scope.btnemptype = "Add";
        $scope.emptype = [];
    }
}]);





