var app = angular.module('MyApp');

app.controller("MasterEmployeeCont", ['$scope', '$http', '$timeout', '$route', function ($scope, $http, $timeout, $route) {

    $scope.Listtableemployee = [];
    $scope.emp = [];
    $scope.emp.EMP_DateOfBirth = new Date();
    $scope.masterempbtnName = "Add";
    $scope.EmployeeTypeList = [];
    $scope.getEmployeeData = function () {
        $scope.Listtableemployee = [];
        $http({
            method: 'GET',
            url: 'http://localhost/Application/Master/GetTableEmployee'
        }).then(function (response) {
            if (response.data != '') {
                for (var i = 0; i < response.data.length; i++) {
                    var dateAfterConvert = $scope.formatDate(response.data[i].EMP_DateOfBirth);
                    var temp = {
                        Emp_Id: response.data[i].Emp_Id,
                        FK_SD_Role_ID: response.data[i].FK_SD_Role_ID,
                        FK_SD_Role_Name: response.data[i].FK_SD_Role_Name,
                        EMP_Name: response.data[i].EMP_Name,
                        EMP_Pan_Card_Number: response.data[i].EMP_Pan_Card_Number,
                        EMP_Adhar_Card_Number: response.data[i].EMP_Adhar_Card_Number,
                        EMP_Mobile_Number: response.data[i].EMP_Mobile_Number,
                        EMP_EmailId: response.data[i].EMP_EmailId,
                        EMP_Address: response.data[i].EMP_Address,
                        EMP_DateOfBirth: dateAfterConvert,
                        EMP_Bank_Acc_Number: response.data[i].EMP_Bank_Acc_Number,
                        EMP_Bank_Name: response.data[i].EMP_Bank_Name,
                        EMP_Bank_Branch_Name: response.data[i].EMP_Bank_Branch_Name,
                        EMP_Bank_IFSC_CODE: response.data[i].EMP_Bank_IFSC_CODE
                    };
                    $scope.Listtableemployee.push(temp);
                }

            }
        }, function (error) {

        });
    }
    $scope.ErrorMEssage = false;
    $scope.InfoMEssage = false;
    $scope.messageNotification = "";
    $scope.getRoleList = function () {
        $scope.EmployeeTypeList = [];
        $http({
            method: 'GET',
            url: 'http://localhost/Application/Master/GetTableRole'
        }).then(function (response) {
            if (response.data != '') {
                for (var i = 0; i < response.data.length; i++) {
                    var temp = {
                        Role_Id: response.data[i].Role_ID, Role_Name: response.data[i].Role_Name
                    };
                    $scope.EmployeeTypeList.push(temp);
                }

            }
        }, function (error) {

        });


    }
    $scope.getRoleList();

    $scope.getEmployeeData();

    $scope.addEmployeeTypeInDatabase = function () {
        var dateAfterConvert = $scope.formatDate($scope.emp.EMP_DateOfBirth);
        var tempemp = {
            EMP_Address: $scope.emp.EMP_Address,
            EMP_Adhar_Card_Number: $scope.emp.EMP_Adhar_Card_Number,
            EMP_Bank_Acc_Number: $scope.emp.EMP_Bank_Acc_Number,
            EMP_Bank_Branch_Name: $scope.emp.EMP_Bank_Branch_Name,
            EMP_Bank_IFSC_CODE: $scope.emp.EMP_Bank_IFSC_CODE,
            EMP_Bank_Name: $scope.emp.EMP_Bank_Name,
            EMP_DateOfBirth: dateAfterConvert ,
            EMP_EmailId: $scope.emp.EMP_EmailId,
            EMP_Mobile_Number: $scope.emp.EMP_Mobile_Number,
            EMP_Name: $scope.emp.EMP_Name,
            EMP_Pan_Card_Number: $scope.emp.EMP_Pan_Card_Number,
            FK_SD_Role_ID: $scope.emp.FK_SD_Role_ID
        };
        if ($scope.masterempbtnName == "Add") {
            $http({
                method: 'POST',
                url: 'http://localhost/Application/Home/Master/insertEmployeeType',
                data: tempemp
            }).then(function (response) {
                if (response.data == "Record Affected") {
                    $scope.clearFunctionality();
                    $scope.InfoMEssage = true;
                    $scope.messageNotification = "Record inserted into database";
                    $scope.masterempbtnName = "Add";
                    $scope.getTableRoleData();
                }
                else {
                    $scope.ErrorMEssage = true;
                    $scope.messageNotification = "Record Not inserted into database";
                }
            }, function (error) {

            });
        }
        else if ($scope.masterempbtnName == "Update") {
            $http({
                method: 'POST',
                url: 'http://localhost/Application/Home/Master/updateEmployeeType',
                data: tempemp
            }).then(function (response) {
                if (response.data == "Record Affected") {
                    $scope.clearFunctionality();
                    $scope.InfoMEssage = true;
                    $scope.messageNotification = "Record inserted into database";
                    $scope.masterempbtnName = "Add";
                    $scope.getTableRoleData();
                }
                else {
                    $scope.ErrorMEssage = true;
                    $scope.messageNotification = "Record Not inserted into database";
                }
            }, function (error) {

            });
        }
    }
    $scope.clearEmployeeFunctionality = function () {
        $scope.emp = [];
    }

    $scope.editEmployee = function (Emp_Id) {
        if (Emp_Id != undefined) {
            $scope.emp = [];
            var selectededitableObject = $scope.Listtableemployee.find(obj => {
                return obj.Emp_Id === Emp_Id
            });
            
            var tempemp = {
                EMP_Address: selectededitableObject.EMP_Address,
                EMP_Adhar_Card_Number: selectededitableObject.EMP_Adhar_Card_Number,
                EMP_Bank_Acc_Number: selectededitableObject.EMP_Bank_Acc_Number,
                EMP_Bank_Branch_Name: selectededitableObject.EMP_Bank_Branch_Name,
                EMP_Bank_IFSC_CODE: selectededitableObject.EMP_Bank_IFSC_CODE,
                EMP_Bank_Name: selectededitableObject.EMP_Bank_Name,                
                EMP_EmailId: selectededitableObject.EMP_EmailId,
                EMP_Mobile_Number: selectededitableObject.EMP_Mobile_Number,
                EMP_Name: selectededitableObject.EMP_Name,
                EMP_Pan_Card_Number: selectededitableObject.EMP_Pan_Card_Number,
                FK_SD_Role_ID: selectededitableObject.FK_SD_Role_ID.toString()
            };
            var temp_date = $scope.formatDate(selectededitableObject.EMP_DateOfBirth);
            $scope.emp.EMP_DateOfBirth = temp_date;
            $scope.emp = tempemp;
            $scope.masterempbtnName = "Update";
            $scope.selectedTab = 1;
        }
    }
    $scope.deleteEmployee = function (Emp_Id) {
        if (Emp_Id != undefined) {
            $scope.emp = [];
            var selectededitableObject = $scope.Listtableemployee.find(obj => {
                return obj.Emp_Id === Emp_Id
            });

            var tempemp = {
                EMP_Address: selectededitableObject.EMP_Address,
                EMP_Adhar_Card_Number: selectededitableObject.EMP_Adhar_Card_Number,
                EMP_Bank_Acc_Number: selectededitableObject.EMP_Bank_Acc_Number,
                EMP_Bank_Branch_Name: selectededitableObject.EMP_Bank_Branch_Name,
                EMP_Bank_IFSC_CODE: selectededitableObject.EMP_Bank_IFSC_CODE,
                EMP_Bank_Name: selectededitableObject.EMP_Bank_Name,
                EMP_EmailId: selectededitableObject.EMP_EmailId,
                EMP_Mobile_Number: selectededitableObject.EMP_Mobile_Number,
                EMP_Name: selectededitableObject.EMP_Name,
                EMP_Pan_Card_Number: selectededitableObject.EMP_Pan_Card_Number,
                FK_SD_Role_ID: selectededitableObject.FK_SD_Role_ID.toString()
            };
            var temp_date = $scope.formatDate(selectededitableObject.EMP_DateOfBirth);
            $scope.emp.EMP_DateOfBirth = temp_date;
            $scope.emp = tempemp;
            $http({
                method: 'POST',
                url: 'http://localhost/Application/Home/Master/deleteEmployee',
                data: tempData
            }).then(function (response) {
                if (response.data == "Record Affected") {                    
                    $scope.getTableRoleData();
                }
            }, function (error) {

            });
            
        }
    }
    $scope.formatDate = function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('/');
    }
}]);





