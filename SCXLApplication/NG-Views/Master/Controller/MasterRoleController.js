var app = angular.module('MyApp');

app.controller("MasterRoleCont", ['$scope', '$http', '$timeout', '$route', function ($scope, $http, $timeout, $route) {

    $scope.role = [];
    $scope.btnName = "Add Role";
    $scope.ListTableRole = [];
    $scope.role.roleNameForUpdate = "";
    $scope.getTableRoleData = function () {
        $scope.ListTableRole = [];
        $http({
            method: 'GET',
            url: 'http://localhost/Application/Master/GetTableRole'
        }).then(function (response) {
            if (response.data != '') {
                for (var i = 0; i < response.data.length; i++) {
                    var temp = {
                        Role_Id: response.data[i].Role_ID, Role_Name: response.data[i].Role_Name                        
                    };
                    $scope.ListTableRole.push(temp);
                }

            }
        }, function (error) {

        });

    }
    $scope.getTableRoleData();

    $scope.addingRole = function () {

        if ($scope.btnName == "Add Role") {
            var tempData = {
                Role_Id:"","Role_Name": $scope.role.roleName
            };
            if (temp.Role_Name != "") {
                $http({
                    method: 'PUT',
                    url: '/Master/insertRole',
                    data: tempData
                }).then(function (response) {
                    if (response.data == "Record Affected") {
                        $scope.role.roleName = "";
                        $scope.btnName = "Add Role";
                        $scope.getTableRoleData();
                    }
                }, function (error) {

                });
            }
        }
        if ($scope.btnName == "Update Role") {
            if ($scope.role.roleNameForUpdate != "") {
                var selectedUpdateObject = [];
                selectedUpdateObject = $scope.ListTableRole.find(obj => {
                    return obj.Role_Name === $scope.role.roleNameForUpdate
                });
                selectedUpdateObject.Role_Name = $scope.role.roleName;
                if (selectedUpdateObject.Role_Name != "") {
                    $http({
                        method: 'PUT',
                        url: '/Master/updateRole',
                        data: selectedUpdateObject
                    }).then(function (response) {
                        if (response.data== "Record Affected") {
                            $scope.role.roleName = "";
                            $scope.btnName = "Add Role";
                            $scope.getTableRoleData();
                        }
                    }, function (error) {

                    });
                }
            }
        }
    }
    $scope.reSetRoleForm = function () {
        $scope.btnName = "Add Role";
        $scope.role.roleName = "";
    }
    $scope.edit = function (editSrNumber) {
        $scope.role.roleNameForUpdate = "";
        var selectededitableObject = $scope.ListTableRole.find(obj => {
            return obj.Role_Id === editSrNumber
        });
        $scope.role.roleName = selectededitableObject.Role_Name;
        $scope.role.roleNameForUpdate = selectededitableObject.Role_Name;
        $scope.btnName = "Update Role";
    }
    $scope.delete = function (deleteSrNumber) {
        var selectedDeleteObject = $scope.ListTableRole.find(obj => {
            return obj.Role_Id === deleteSrNumber
        });
        var tempData = {
            Role_Id: selectedDeleteObject.Role_Id,
            Role_Name: selectedDeleteObject.Role_Name
        };
        if (selectedDeleteObject.Role_Name != "") {
            $http({
                method: 'POST',
                url: '/Master/deleteRole',
                data: tempData    
            }).then(function (response) {
                if (response.data == "Record Affected") {
                    $scope.role.roleName = "";
                    $scope.btnName = "Add Role";
                    $scope.getTableRoleData();
                }
            }, function (error) {

            });
        }

    }
}]);





