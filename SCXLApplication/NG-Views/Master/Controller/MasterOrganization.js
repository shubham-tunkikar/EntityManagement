var app = angular.module('MyApp');

app.controller("MasterOrganization", ['$scope', '$http', '$timeout', '$route', function ($scope, $http, $timeout, $route) {

    $scope.Organisation = {};
    $scope.btnName = "Add Organisation";
   // $scope.Organisation.OrganisationNameForUpdate = "";
    $scope.tblOrganizationData = [];
    $scope.singleTableRecord = {};
    $scope.isEdit = false;
    var postData = { "action": "", "data": "" };

    //$scope.addingRole = function () {
    //    if ($scope.btnName == "Add Organisation") {
    //        var tempData = {
    //            Org_Id: "", "Org_Name": $scope.Organisation.Org_Name
    //        };
    //        if (tempData.Org_Name != "") {
    //            $http({
    //                method: 'PUT',
    //                url: 'http://localhost/application/Master/insertOrg',
    //                data: tempData
    //            }).then(function (response) {
    //                console.log(response.data);
    //                if (response.data == "Record Affected") {
    //                    $scope.Organisation.organisation = "";
    //                    $scope.btnName = "Add Organisation";
    //                    //$scope.getTableRoleData();
    //                }
    //            }, function (error) {

    //            });
    //        }
    //    }
    //}
  
    $scope.addOrganization = function (record) {
        if ($scope.Organisation.Org_Name == undefined || $scope.Organisation.Org_Name == "")
        {
            alert("Please enter organization name");
            return;
        }
        postData.action = "insertorganisation";
        postData.data = record;
        debugger;
        if (postData.data != '')
        {
            $http({
                method: 'POST',
                url: 'http://localhost/application/api/Data',
                data: postData
            }).then(function (response) {
                if (response.data != '' && response.data != undefined) {
                    alert("Record  added Successfully.");
                    $scope.refresh();
                    $scope.getTableData();
                }
            }, function (error) {
                alert("error adding record.");
                $scope.refresh();
            });
        }
    }

    $scope.getTableData = function () {
        $scope.tblOrganizationData = [];
        $http({
            method: 'GET',
            url: 'http://localhost/application/Master/GetTableData?queryString=SD_Organisation',
            data: "SD_Organisation"
        }).then(function (response) {
            if (response.data != '')
            {
                angular.forEach(response.data, function (data) {
                    $scope.singleTableRecord = {}; 
                    angular.forEach(data, function (subData) {
                        $scope.singleTableRecord[subData.Key] = subData.Value;
                    })
                    $scope.tblOrganizationData.push($scope.singleTableRecord);
                })
            }
        }, function (error) {
        });
    }
    $scope.getTableData();

    $scope.populateEditRecord = function (editRecord) {
        $scope.Organisation = editRecord;
        $scope.btnName = "Edit Organisation";
        $scope.isEdit = true;
    }
    $scope.refresh = function () {
        $scope.Organisation = {};
        $scope.btnName = "Add Organisation";
        $scope.isEdit = false;
    }
    $scope.editRecord = function (record) {
        postData.action = "updatemasterorganisation";
        postData.data = record;
        $http({
            method: 'POST',
            url: 'http://localhost/application/api/Data',
            data: postData
        }).then(function (response) {
            if (response.data != '' && response.data != undefined) {
                alert("Successfully updated record.");
                $scope.refresh();
                $scope.getTableData();
            }
        }, function (error) {
            alert("error updating record.");
            $scope.refresh();
        });
    }

    $scope.deleteRecord = function (record) {
        var canDelete = confirm("This record will be delete permanently. \n Press OK to delete.");
        if (canDelete == false)
            return;
        postData.action = "deleteorganisation";
        postData.data = record;
        $http({
            method: 'POST',
            url: 'http://localhost/application/api/Data',
            data: postData
        }).then(function (response) {
            if (response.data != '' && response.data != undefined) {
                alert("Successfully deleted record.");
                $scope.refresh();
                $scope.getTableData();
            }
        }, function (error) {
            alert("error deleting record.");
            $scope.refresh();
        });
    }
}]);