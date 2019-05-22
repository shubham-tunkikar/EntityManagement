var app = angular.module('MyApp');

app.controller("LoginDetailsCont", ['$scope', '$http', '$timeout', '$route', function ($scope, $http, $timeout, $route) {

    $scope.messageLoginNotification = '';
    $scope.masterloginbtnName = "Add";
    $scope.InfoLoginMessage = false;
    $scope.ErrorLoginMessage = false;
    $scope.EmployeeTypeLoginList = [];
    $scope.EmployeeIDList = [];
    $scope.ListtableLogin = [];
    $scope.login = [];
    $scope.AllLoginEmployeeList = [];

    $scope.getEmployeeTypeIdAsPerList = function () {

        $http({
            method: 'GET',
            url: '/Master/GetEmployeeIDRoleIDAsPerPresentDataInLogin'
        }).then(function (response) {
            if (response.data != '') {
                for (var i = 0; i < response.data.length; i++) {

                    var tempEmployee = {
                        Emp_Id: response.data[i].Emp_Id, EMP_Name: response.data[i].EMP_Name
                    };
                    $scope.EmployeeIDList.push(tempEmployee);
                    var tempEmployee = {
                        FK_SD_Role_ID: response.data[i].FK_SD_Role_ID, FK_SD_Role_Name: response.data[i].FK_SD_Role_Name,
                        Emp_Id: response.data[i].Emp_Id, EMP_Name: response.data[i].EMP_Name
                    };

                    $scope.AllLoginEmployeeList.push(tempEmployee);
                }

            }
        }, function (error) {

        });

    }
    $scope.afterChangeEmpId = function (Emp_Id) {
        $scope.EmployeeTypeLoginList = [];
        if (Emp_Id != undefined) {

            var selectedObject = $scope.AllLoginEmployeeList.find(obj => {
                return obj.Emp_Id === parseInt(Emp_Id)
            });

            var temp = {
                FK_SD_Role_ID: selectedObject.FK_SD_Role_ID, FK_SD_Role_Name: selectedObject.FK_SD_Role_Name
            };
            $scope.EmployeeTypeLoginList.push(temp);
        }
    }
    $scope.getEmployeeTypeIdAsPerList();

    $scope.getLoginDetailsList = function () {
        $scope.ListtableLogin = [];
        $http({
            method: 'GET',
            url: '/Master/GetTableLoginDetails'
        }).then(function (response) {
            if (response.data != '') {
                for (var i = 0; i < response.data.length; i++) {
                    var temp_loginDetails = {
                        Login_Id: response.data[i].Login_Id,
                        FK_SD_Role_Id: response.data[i].FK_SD_Role_Id,
                        Role_Name: response.data[i].Role_Name,
                        FK_SD_Emp_Id: response.data[i].FK_SD_Emp_Id,
                        EMP_Name: response.data[i].EMP_Name,
                        User_Id: response.data[i].User_Id,
                        UPassword: response.data[i].UPassword
                    };
                    $scope.ListtableLogin.push(temp_loginDetails);
                }
            }
        }, function (error) {

        });

    }
    $scope.getLoginDetailsList();

    $scope.AddandUpdateDetails = function () {

        var tempLogin = {
            FK_SD_Emp_Id: parseInt($scope.login.FK_SD_Emp_Id),
            FK_SD_Role_Id: parseInt($scope.login.FK_SD_Role_Id),
            UPassword: $scope.login.UPassword,
            User_Id: $scope.login.User_Id
        };
        if ($scope.masterloginbtnName == "Add") {
            $http({
                method: 'POST',
                url: '/Master/insertLogin',
                data: tempLogin
            }).then(function (response) {
                    if (response.data == "Record Affected") {
                        $scope.clearLoginDetailsFunctionality();
                        $scope.InfoLoginMessage = true;
                        $scope.messageLoginNotification = "Record inserted into database";
                        $scope.masterempbtnName = "Add";
                        $scope.selectedTab = 2;
                        $scope.getLoginDetailsList();
                    }
                    else {
                        $scope.ErrorLoginMessage = true;
                        $scope.messageLoginNotification = "Record Not inserted into database";
                    }
                }, function (error) {

                });
        }
        else if ($scope.masterloginbtnName == "Update") {
            $http({
                method: 'POST',
                url: '/Master/updateLogin',
                data: tempLogin
            }).then(function (response) {
                if (response.data == "Record Affected") {
                    $scope.clearLoginDetailsFunctionality();
                    $scope.InfoLoginMessage = true;
                    $scope.messageLoginNotification = "Record update into database";
                    $scope.masterempbtnName = "Add";
                    $scope.selectedTab = 2;
                    $scope.getLoginDetailsList();
                }
                else {
                    $scope.ErrorLoginMessage = true;
                    $scope.messageLoginNotification = "Record Not update into database";
                }
            }, function (error) {

            });
        }
    }
    $scope.editLoginDetails = function (Login_Id) {
        var selecteddeleteObject = $scope.ListtableLogin.find(obj => {
            return obj.Login_Id === Login_Id
        });
        var tempeditLogin = {
            FK_SD_Emp_Id: selecteddeleteObject.FK_SD_Emp_Id.toString(),
            FK_SD_Role_Id: selecteddeleteObject.FK_SD_Role_Id.toString(),
            UPassword: selecteddeleteObject.UPassword,
            User_Id: selecteddeleteObject.User_Id
        };
        $scope.login = tempeditLogin;
        $scope.afterChangeEmpId(tempeditLogin.FK_SD_Emp_Id);
        $scope.masterloginbtnName = "Update";
        $scope.selectedTab = 1;
    }
    $scope.deleteLoginDetails = function (Login_Id) {
        var selectededitableObject = $scope.ListtableLogin.find(obj => {
            return obj.Login_Id === Login_Id
        });
    }
    $scope.addLoginDetailsInDatabase = function (Login_Id) {

    }
    $scope.clearLoginDetailsFunctionality = function () {
        $scope.login = [];
    }
}]);





