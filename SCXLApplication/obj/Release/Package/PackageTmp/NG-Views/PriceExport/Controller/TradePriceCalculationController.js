var app = angular.module('MyApp');

app.controller("TradePriceCalculationCont", ['$scope', '$http', '$timeout', '$route', function ($scope, $http, $timeout, $route) {

    $scope.chkPeriod = false
    $scope.chkSchedule = false;
    $scope.ScheduleListP = [];
    $scope.AccPeriodListP = [];
    $scope.tradePrice = [];
    $scope.ListOuterTable = [];
    $scope.tradePrice_ListOuterTable = [];
    $scope.isLoadingPrice = false;
    $scope.isLoadingPriceInnerTable = false;
    $scope.showSuccessNotificationPrice = false;
    $scope.showErrorNotificationPrice = false;
    $scope.notiMessagePrice = '';
   
    var temp = {
        scheduleName: "Daily"
    }
    $scope.ScheduleListP.push(temp);
    temp = {
        scheduleName: "Monthly"
    }
    $scope.ScheduleListP.push(temp);
    temp = {
        scheduleName: "Custom"
    }
    $scope.ScheduleListP.push(temp);
    $scope.tradePrice.schedule = "Daily";

    $scope.tradePrice.ActPeriodCd = new Date();

    $scope.formatDate = function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var date = [year, month].join('/');
        return date.replace("/", "");


    }
    $scope.stringToDate = function (inputstring) {
        var yyyy = inputstring.substring(0, 4);
        var mm = inputstring.substring(4, 6);
        var dd = inputstring.substring(6, 8);

        return [yyyy, mm, dd].join('/');
    }
    $scope.SearchFunction = function () {
        if ($scope.tradePrice.tradeNumberP != undefined || $scope.tradePrice.ref2NumberP != undefined || $scope.tradePrice.ScheduleP != undefined || $scope.tradePrice.accperiodP != undefined) {

        }
    }
    $scope.expandAll = function (expanded) {
        $scope.$broadcast('onExpandAll', {
            expanded: expanded
        });
    };

    $scope.returnWitoutSlashFromCostType = function (Cost_Type) {

        var listOfCostType = [];
        var arrayOfCost_Type = Cost_Type.split("/");
        for (var i = 0; i < arrayOfCost_Type.length; i++) {
            listOfCostType.push(arrayOfCost_Type[i]);
        }
        return listOfCostType;
    }

    $scope.getIteamHeadeList = function () {
        $scope.ListOuterTable = [];
        $scope.isLoadingPrice = true;
        var dataPassing = { TradeNumber: $scope.tradePrice.TradeNumber, ActPeriodCd: null, DealID2: $scope.tradePrice.DealID2 };
        $http({
            method: 'POST',
            url: '/TradePrice/GetItemHeaderList',
            data: dataPassing
        }).then(function (response) {

            if (response.data != "") {
                for (var coutnter = 0; coutnter < response.data.length; coutnter++) {
                    var innerTableList = [];
                    var tempMainArray = {
                        "Commodity": response.data[coutnter].Commodity,
                        "Location": response.data[coutnter].Location,
                        "Buy_sell": response.data[coutnter].Buy_sell,
                        "Price_UOM": response.data[coutnter].Price_UOM,
                        "Price_CCY": response.data[coutnter].Price_CCY,
                        "MOT": response.data[coutnter].MOT,
                        "Underlying_Start_Date": response.data[coutnter].Underlying_Start_Date,
                        "Underlying_End_Date": response.data[coutnter].Underlying_End_Date,
                        "Ref_2": response.data[coutnter].Ref_2,
                        "Price": response.data[coutnter].Price,
                        "Cost_Type": response.data[coutnter].Cost_Type,
                        "Trade_Number": response.data[coutnter].Trade_Number,
                        "Section": response.data[coutnter].Section,
                        "item_hdr_num": response.data[coutnter].item_hdr_num,
                        "deliv_sched_cd": response.data[coutnter].deliv_sched_cd,
                        "cost_Type_Item_Hdr_Num": response.data[coutnter].cost_Type_Item_Hdr_Num,
                        "InnerTable": innerTableList,
                    };
                    $scope.ListOuterTable.push(tempMainArray);
                }
                $scope.isLoadingPrice = false;
            }
            else {
                $scope.isLoadingPrice = false;
                $scope.showNotificationMessage("Enter Trade Number : " + $scope.tradePrice.TradeNumber + " No Content Found.", false);
            }
        }, function (error) {

        });

        //var dataPassing = { TradeNumber: $scope.tradePrice.TradeNumber, ActPeriodCd: $scope.formatDate($scope.tradePrice.ActPeriodCd), DealID2: $scope.tradePrice.DealID2 };

        //with ajax call api
        //$.ajax({
        //    url: '/TradePrice/GetItemHeaderList',
        //    type: 'post',
        //    dataType: 'json',
        //    data: dataPassing,
        //    success: function (response) {
        //        
        //    },
        //    complete: function (data) {
        //        
        //    },
        //    error: function (XMLHttpRequest, textStatus, errorThrown) {
        //        
        //        if (textStatus == 'timeout') {
        //            //doe iets
        //        } else if (textStatus == 'error') {
        //            //doe iets
        //        }

        //    }
        //});
        // Jquery call API



    }

    $scope.getInnerTableData = function (item_hdr_num) {

        var selectedOuterRow = $scope.ListOuterTable.find(obj => {
            return obj.item_hdr_num === item_hdr_num
        });

        if (selectedOuterRow.InnerTable.length == 0) {
            $scope.isLoadingPriceInnerTable = true;
            $http({
                method: 'GET',
                url: '/TradePrice/GetItemHeaderInnerList?item_hdr_num=' + item_hdr_num + "&deliv_sched_cd=" + selectedOuterRow.deliv_sched_cd + "&cost_Type=" + selectedOuterRow.cost_Type_Item_Hdr_Num,
            }).then(function (response) {

                /// inner table
                if (response.data != "") {
                    $http({
                        method: 'POST',
                        url: '/TradePrice/ModificationInInnerAllList',
                        data: response.data
                    }).then(function (responseInInnerAllList) {

                        if (responseInInnerAllList.data != "") {
                            var resultFinal = JSON.parse(responseInInnerAllList.data);
                            selectedOuterRow.InnerTable = resultFinal;
                            $scope.isLoadingPriceInnerTable = false;
                        }
                    }, function (error) {

                    });
                }
                ///

            }, function (error) {

            });
        }
    }
    $scope.getInnerTableAllData = function () {

        if ($scope.ListOuterTable.length != 0) {
            $scope.isLoadingPriceInnerTable = true;
            $http({
                method: 'POST',
                url: '/TradePrice/GetItemHeaderInnerAllList',
                data: $scope.ListOuterTable
            }).then(function (response) {
                if (response.data != "") {
                    /// inner table       

                    var tempIncrementValue = 0;
                    var finalTotalLength = response.data.length;
                    for (var i = 0; i < response.data.length; i++) {
                        $http({
                            method: 'POST',
                            url: '/TradePrice/ModificationInInnerAllList',
                            data: response.data[i],
                            async: true,
                        }).then(function (responseInInnerAllList) {
                            responseIsOccuer = "True";
                            var item_hdr_num = response.data[tempIncrementValue][0].HeaderName;
                            item_hdr_num = item_hdr_num.split(":");
                            item_hdr_num = item_hdr_num[1];
                            var selectedOuterRow = $scope.ListOuterTable.find(obj => {
                                return obj.item_hdr_num === item_hdr_num
                            });
                            if (responseInInnerAllList.data != "") {
                                var resultFinal = JSON.parse(responseInInnerAllList.data);
                                selectedOuterRow.InnerTable = resultFinal;
                            }
                            tempIncrementValue++;
                            if (tempIncrementValue == finalTotalLength) {
                                $scope.isLoadingPriceInnerTable = false;
                            }
                        }, function (error) {

                        });
                    }
                }
            }, function (error) {

            });
        }
    }


    $scope.resetFunction = function () {
        $route.reload();

    }
    $scope.showNotificationMessage = function (message, isSuccess) {
        $scope.notiMessagePrice = message;
        if (isSuccess)
            $scope.showSuccessNotificationPrice = true;
        else
            $scope.showErrorNotificationPrice = true;
        $timeout(function () {
            $scope.notiMessagePrice = "";
            $scope.showSuccessNotificationPrice = false;
            $scope.showErrorNotificationPrice = false;
        }, 10000);
    }

    $scope.ExportTable = function () {
        debugger;
        //$scope.tradePrice_ListOuterTable = $scope.ListOuterTable;
        //for (var i = 0; i < $scope.ListOuterTable.length; i++) {
        //    var temp = {
        //        "Buy_sell": $scope.ListOuterTable[i].Buy_sell,
        //        "Commodity": $scope.ListOuterTable[i].Commodity,
        //        "Cost_Type": $scope.ListOuterTable[i].Cost_Type,
        //        "tradePrice_InnerTable": $scope.ListOuterTable[i].InnerTable,
        //        "Location": $scope.ListOuterTable[i].Location,
        //        "MOT": $scope.ListOuterTable[i].MOT,
        //        "Price": $scope.ListOuterTable[i].Price,
        //        "Price_CCY": $scope.ListOuterTable[i].Price_CCY,
        //        "Price_UOM": $scope.ListOuterTable[i].Price_UOM,
        //        "Ref_2": $scope.ListOuterTable[i].Ref_2,
        //        "Section": $scope.ListOuterTable[i].Section,
        //        "Trade_Number": $scope.ListOuterTable[i].Trade_Number,
        //        "Underlying_End_Date": $scope.ListOuterTable[i].Underlying_End_Date,
        //        "Underlying_Start_Date": $scope.ListOuterTable[i].Underlying_Start_Date,
        //        "cost_Type_Item_Hdr_Num": $scope.ListOuterTable[i].cost_Type_Item_Hdr_Num,
        //        "deliv_sched_cd": $scope.ListOuterTable[i].deliv_sched_cd,
        //        "item_hdr_num": $scope.ListOuterTable[i].item_hdr_num
        //    };
        //    $scope.tradePrice_ListOuterTable.push(temp);
        //}
        //$("#exportable").table2excel({
        //    filename: "Table.xls"
        //});
        //{
        //    $("#exportable").tableExport({
        //        headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
        //        footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
        //        formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
        //        fileName: "id",                    // (id, String), filename for the downloaded file
        //        bootstrap: true,                   // (Boolean), style buttons using bootstrap
        //        position: "well",                // (top, bottom), position of the caption element relative to table
        //        ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file
        //        ignoreCols: null,                 // (Number, Number[]), column indices to exclude from the exported file
        //        ignoreCSS: ".tableexport-ignore"   // (selector, selector[]), selector(s) to exclude from the exported file
        //    });
        //}  

        //$('#exportable').tableExport({ type: 'excel', escape: 'false' });

    }


}]);

app.directive('expand', function () {
    function link(scope, element, attrs) {
        scope.$on('onExpandAll', function (event, args) {
            scope.expanded = args.expanded;
        });
    }
    return {
        link: link
    };
});
