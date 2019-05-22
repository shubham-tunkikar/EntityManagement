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
    $scope.loderMessage = "";
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
        debugger;

        $scope.ListOuterTable = [];
        $scope.isLoadingPrice = true;
        $scope.loderMessage="Loading...";
        var dataPassing = { TradeNumber: $scope.tradePrice.TradeNumber, ActPeriodCd: $scope.tradePrice.Act_period_cd, DealID2: $scope.tradePrice.DealID2 };
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
                $scope.loderMessage = "";
            }
            else {
                $scope.isLoadingPrice = true;
                $scope.loderMessage = "No Data Found.";
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

        var expandButtonValue = document.getElementById("expandInnerButton");
        if (expandButtonValue.innerText == "+") {
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

    }
    $scope.getInnerTableAllData = function () {
        debugger;
        var expandButtonValue = document.getElementById("expandButton");
        if (expandButtonValue.innerText == "+") {
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

    }


    $scope.resetFunction = function () {
        $scope.alertNotification("This dive alert notification", true);
        $route.reload();

    }


    $scope.ExportTable = function () {
        debugger;
        var customers = new Array();
        for (var i = 0; i < $scope.ListOuterTable.length; i++) {
            if ($scope.ListOuterTable[i].InnerTable[0] != undefined) {
                var keyNames = Object.keys($scope.ListOuterTable[i].InnerTable[0]);
                var flagChecking = true;
                for (var j = 1; j < keyNames.length - 1; j++) {
                    if ((keyNames[j].includes("Provisional Price")) || (keyNames[j].includes("Provisional Price Rv"))) {
                        //if (keyNames[j].includes("Primary Settlement")) {
                        flagChecking = false;
                    }
                }
                if (flagChecking) {
                    var temp_customers = ["Trade Number",
                        "Section",
                        "Suncor Buy/Sell",
                        "SAP Material",
                        "SAP Plant",
                        "Price Currency",
                        "Price UOM",
                        "MOT",
                        "Underlying Date",
                    ];
                    for (var j = 1; j < keyNames.length - 1; j++) {
                        if (keyNames[j].includes("Primary Settlement")) {
                            temp_customers.push(keyNames[j]);
                        }
                    }
                }
                else {
                    ////Provisional Price Provisional Price Rv this avilable in table removing code below area

                }
            }

        }

        if (temp_customers.length > 1) {

            customers.push(temp_customers);


            for (var outer = 0; outer < $scope.ListOuterTable.length; outer++) {
                for (var i = 0; i < $scope.ListOuterTable[outer].InnerTable.length; i++) {
                    var temp_customers_data = [$scope.ListOuterTable[outer].Trade_Number,
                    $scope.ListOuterTable[outer].Section,
                    $scope.ListOuterTable[outer].Buy_sell,
                    $scope.ListOuterTable[outer].Commodity,
                    $scope.ListOuterTable[outer].Location,
                    $scope.ListOuterTable[outer].Price_CCY,
                    $scope.ListOuterTable[outer].Price_UOM,
                    $scope.ListOuterTable[outer].MOT,];

                    //checking in that Provisional Price, Provisional Price Rv avilable or not
                    var keyNames = Object.keys($scope.ListOuterTable[outer].InnerTable[0]);

                    var valuesNames = Object.values($scope.ListOuterTable[outer].InnerTable[i]);
                    var additionOfallCostype = 0;
                    for (var k = 0; k < valuesNames.length - 1; k++) {
                        if ((keyNames[k] != "Provisional Price") || (keyNames[k] != "Provisional Price Rv")) {
                            if (keyNames[k] != "UnderlyingDate") {
                                additionOfallCostype = additionOfallCostype + valuesNames[k];
                                temp_customers_data.push(additionOfallCostype);
                            }
                            else {
                                temp_customers_data.push(valuesNames[k]);
                            }

                        }
                    }
                    customers.push(temp_customers_data);
                }
            }
            //Create a HTML Table element.
            var table = document.createElement("TABLE");
            table.border = "1";
            //Get the count of columns.
            var columnCount = customers[0].length;

            //Add the header row.
            var row = table.insertRow(-1);
            for (var i = 0; i < columnCount; i++) {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = customers[0][i];
                row.appendChild(headerCell);
            }

            //Add the data rows.
            for (var i = 1; i < customers.length; i++) {
                row = table.insertRow(-1);
                for (var j = 0; j < columnCount; j++) {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = customers[i][j];
                }
            }

            if (true) {
                var secoundTable = new Array();
                for (var i = 0; i < $scope.ListOuterTable.length; i++) {
                    if ($scope.ListOuterTable[i].InnerTable[0] != undefined) {
                        var keyNames = Object.keys($scope.ListOuterTable[i].InnerTable[0]);
                        var flagChecking = true;
                        for (var j = 1; j < keyNames.length - 1; j++) {
                            if ((keyNames[j] != "Primary Settlement")) {
                                if ((keyNames[j] == "Provisional Price") || (keyNames[j] == "Provisional Price Rv")) {
                                    flagChecking = true;
                                }
                                else { flagChecking = false; }
                            }

                        }
                        if (flagChecking) {
                            var temp_customers = ["Trade Number",
                                "Section",
                                "Suncor Buy/Sell",
                                "SAP Material",
                                "SAP Plant",
                                "Price Currency",
                                "Price UOM",
                                "MOT",
                                "Underlying Date",
                            ];
                            for (var j = 1; j < keyNames.length - 1; j++) {
                                if ((keyNames[j].includes("Provisional Price")) || (keyNames[j].includes("Provisional Price Rv"))) {
                                    temp_customers.push(keyNames[j]);
                                }
                            }
                        }
                        else {
                            ////Primary Settlement this avilable in table removing code below area

                        }
                    }

                }
                if (temp_customers.length > 1) {

                    secoundTable.push(temp_customers);
                    for (var outer = 0; outer < $scope.ListOuterTable.length; outer++) {
                        for (var i = 0; i < $scope.ListOuterTable[outer].InnerTable.length; i++) {
                            var temp_customers_data = [$scope.ListOuterTable[outer].Trade_Number,
                            $scope.ListOuterTable[outer].Section,
                            $scope.ListOuterTable[outer].Buy_sell,
                            $scope.ListOuterTable[outer].Commodity,
                            $scope.ListOuterTable[outer].Location,
                            $scope.ListOuterTable[outer].Price_CCY,
                            $scope.ListOuterTable[outer].Price_UOM,
                            $scope.ListOuterTable[outer].MOT,];

                            //checking in that Provisional Price, Provisional Price Rv avilable or not
                            var keyNames = Object.keys($scope.ListOuterTable[outer].InnerTable[0]);

                            var valuesNames = Object.values($scope.ListOuterTable[outer].InnerTable[i]);
                            var additionOfallCostype = false;
                            for (var k = 0; k < valuesNames.length - 1; k++) {
                                if ((keyNames[k] == "Provisional Price") || (keyNames[k] == "Provisional Price Rv")) {
                                    temp_customers_data.push(valuesNames[k]);
                                    additionOfallCostype = true;
                                }
                                else if (keyNames[k].includes("UnderlyingDate")) {
                                    temp_customers_data.push(valuesNames[k]);
                                }
                            }
                            if (additionOfallCostype) {
                                secoundTable.push(temp_customers_data);
                            }
                        }
                    }
                    //Create a HTML Table element.
                    var TwoTable = document.createElement("TABLE");
                    TwoTable.border = "1";

                    //Get the count of columns.
                    var columnCount = secoundTable[0].length;

                    //Add the header row.
                    var row = TwoTable.insertRow(-1);
                    for (var i = 0; i < columnCount; i++) {
                        var headerCell = document.createElement("TH");
                        headerCell.innerHTML = secoundTable[0][i];
                        row.appendChild(headerCell);
                    }

                    //Add the data rows.
                    for (var i = 1; i < secoundTable.length; i++) {
                        row = TwoTable.insertRow(-1);
                        for (var j = 0; j < columnCount; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = secoundTable[i][j];
                        }
                    }

                }
            }

            var dvTable = document.getElementById("dvTable");
            dvTable.innerHTML = "";
            dvTable.appendChild(table);
            var TempTable = document.createElement("TABLE");
            var row = TempTable.insertRow(-1);
            var headerCell = document.createElement("TH");
            row.appendChild(headerCell);
            dvTable.appendChild(TempTable);
            dvTable.appendChild(TwoTable);

        }

        $("#dvTable").table2excel({
            filename: "PriceExport.xls"
        });

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



