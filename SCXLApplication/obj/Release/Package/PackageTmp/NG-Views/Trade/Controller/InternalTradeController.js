var app = angular.module('MyApp');

app.controller("InternalTradeCont", ['$scope', '$http', function ($scope, $http) {

    $scope.isLoading = true;
    $scope.secondTrade = [];
    $scope.trade = [];
    $scope.CounterpartyList = [];
    $scope.InternalCoList = [];
    $scope.TraderList = [];
    $scope.CommodityList = [];
    $scope.BuySellList = [];
    $scope.StrategyList = [];
    $scope.MOTList = [];
    $scope.TermsList = [];
    $scope.QtyUOMList = [];
    $scope.CarrierList = [];
    $scope.PeriodicityList = [];
    $scope.CalendarList = [];
    $scope.LocationList = [];
    $scope.ScheduleList = [];
    $scope.PriceTypeList = [];
    $scope.PriceTypeCList = [];
    $scope.IndexCList = [];
    $scope.UOMCList = [];
    $scope.CCYCList = [];
    $scope.CCYCCList = [];
    $scope.UOMCCList = [];
    $scope.DeliveryPeriodList = [];
    $scope.PaymentCCList = [];
    $scope.IndexCList = [];
    $scope.IndexList = [];
    $scope.dScheduleList = [];
    $scope.PricingRuleList = [];
    $scope.MTMCurveList = [];
    $scope.Agreementlist = [];
    $scope.Agreementtypeist = [];
    $scope.AgreementFormist = [];
    $scope.PricingTermList = [];
    $scope.PricePremDisc2List = [];
    $scope.PricePremDisc3List = [];
    $scope.VehicleList = [];
    $scope.AccountingPeriodList = [];
    $scope.trade.tradestatus = "Pending";
    $scope.fixed = false;
    $scope.Index = false;

    var today = new Date();
    $scope.today = today.toISOString();

    $scope.trade.tradedate = new Date();
    $scope.countertPartFunction = function () {
        $http({
            method: 'GET',
            url: '/Trade/GetReferenceData'
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                //CounterPart
                for (var coutnter = 0; coutnter < response.data[0].CounterpartyList.length; coutnter++) {
                    if (response.data[0].CounterpartyList[coutnter].Company_num == "1879") {
                        var temp = {
                            Company_num: response.data[0].CounterpartyList[coutnter].Company_num, Company_cd: response.data[0].CounterpartyList[coutnter].Company_cd
                        };
                        $scope.CounterpartyList.push(temp);
                    }
                }
                $scope.trade.counterPart = "1879";
                //Internal Co
                for (var internal = 0; internal < response.data[0].InternalCoList.length; internal++) {
                    var temp = {
                        Company_num: response.data[0].InternalCoList[internal].Company_num, Company_cd: response.data[0].InternalCoList[internal].Company_cd
                    };
                    $scope.InternalCoList.push(temp);
                }

                //Commodity
                for (var CommodityValue = 0; CommodityValue < response.data[0].CommodityList.length; CommodityValue++) {
                    var temp = {
                        cmdty_cd: response.data[0].CommodityList[CommodityValue].cmdty_cd, cmdty_name: response.data[0].CommodityList[CommodityValue].cmdty_name
                    };
                    $scope.CommodityList.push(temp);
                }

                //Buy Sell
                for (var buy = 0; buy < response.data[0].BuySellList.length; buy++) {
                    var temp = {
                        ID: response.data[0].BuySellList[buy].ID, Value: response.data[0].BuySellList[buy].Value
                    };
                    $scope.BuySellList.push(temp);
                }

                //Strategy
                for (var Strategy = 0; Strategy < response.data[0].StrategyList.length; Strategy++) {
                    var temp = {
                        strategy_num: response.data[0].StrategyList[Strategy].strategy_num, strategy_name: response.data[0].StrategyList[Strategy].strategy_name
                    };
                    $scope.StrategyList.push(temp);
                }

                //Mot
                for (var mot = 0; mot < response.data[0].MOTList.length; mot++) {
                    var temp = {
                        ID: response.data[0].MOTList[mot].ID, Value: response.data[0].MOTList[mot].Value
                    };
                    $scope.MOTList.push(temp);
                }
                //Terms
                for (var t = 0; t < response.data[0].TermsList.length; t++) {
                    var temp = {
                        delivery_term_cd: response.data[0].TermsList[t].delivery_term_cd, delivery_term_name: response.data[0].TermsList[t].delivery_term_name
                    };
                    $scope.TermsList.push(temp);
                    $scope.trade.Terms = "FOB";//by default selected
                }

                //Qty UOM
                for (var qty = 0; qty < response.data[0].QtyUOMList.length; qty++) {
                    var temp = {
                        Uom_cd: response.data[0].QtyUOMList[qty].Uom_cd, Cmdty_class_ind: response.data[0].QtyUOMList[qty].Cmdty_class_ind, Uom_type_ind: response.data[0].QtyUOMList[qty].Uom_type_ind
                    };
                    $scope.QtyUOMList.push(temp);
                    $scope.UOMCList.push(temp);
                    $scope.UOMCCList.push(temp);
                    $scope.PricePremDisc3List.push(temp);
                }
                //Carrier

                for (var cr = 0; cr < response.data[0].CarrierList.length; cr++) {
                    var temp = {
                        Company_num: response.data[0].CarrierList[cr].Company_num, Company_cd: response.data[0].CarrierList[cr].Company_cd
                    };
                    $scope.CarrierList.push(temp);
                }
                //Periodicity

                var periodiValue = ["0", "10", "15", "30", "31"];

                for (var pr = 0; pr < response.data[0].PeriodicityList.length; pr++) {
                    var periodicityID = response.data[0].PeriodicityList[pr].ID;
                    var notInclude = periodiValue.includes(periodicityID);
                    if (!notInclude) {
                        var temp = {
                            ID: periodicityID, Value: response.data[0].PeriodicityList[pr].Value
                        };
                        $scope.PeriodicityList.push(temp);
                    }
                }
                //Calender
                for (var cl = 0; cl < response.data[0].CalendarList.length; cl++) {
                    var temp = {
                        calendar_cd: response.data[0].CalendarList[cl].calendar_cd
                    };
                    $scope.CalendarList.push(temp);
                }
                //Location
                for (var loc = 0; loc < response.data[0].LocationList.length; loc++) {
                    var temp = {
                        location_num: response.data[0].LocationList[loc].location_num, Location_cd: response.data[0].LocationList[loc].Location_cd, Timezone_cd: response.data[0].LocationList[loc].Timezone_cd
                    };
                    $scope.LocationList.push(temp);
                }
                //Schedule

                for (var sch = 0; sch < response.data[0].ScheduleList.length; sch++) {
                    var temp = {
                        Qty_periodicity_ind: response.data[0].ScheduleList[sch].Qty_periodicity_ind, Deliv_sched_cd: response.data[0].ScheduleList[sch].Deliv_sched_cd
                    };
                    $scope.ScheduleList.push(temp);
                }
                $scope.trade.schedule = "Monthly";//by default selected 
                //Schedule Details
                for (var sch = 0; sch < response.data[0].dScheduleList.length; sch++) {
                    var temp = {
                        ID: response.data[0].dScheduleList[sch].ID, Value: response.data[0].dScheduleList[sch].Value
                    };
                    $scope.dScheduleList.push(temp);
                }
                $scope.trade.dschedule = "1";//by default selected 
                //Price Type

                for (var prty = 0; prty < response.data[0].PriceTypeList.length; prty++) {
                    if (response.data[0].PriceTypeList[prty].Value == "Fixed") {
                        var temp = {
                            ID: response.data[0].PriceTypeList[prty].ID, Value: response.data[0].PriceTypeList[prty].Value
                        };
                        $scope.PriceTypeList.push(temp);
                        $scope.PriceTypeCList.push(temp);
                    }
                    if (response.data[0].PriceTypeList[prty].Value == "Index") {
                        var temp = {
                            ID: response.data[0].PriceTypeList[prty].ID, Value: response.data[0].PriceTypeList[prty].Value
                        };
                        $scope.PriceTypeList.push(temp);
                        $scope.PriceTypeCList.push(temp);
                    }
                }

                //Index
                for (var ind = 0; ind < response.data[0].IndexCList.length; ind++) {
                    var temp = {
                        Quote_def_num: response.data[0].IndexCList[ind].Quote_def_num, Quote_def_cd: response.data[0].IndexCList[ind].Quote_def_cd
                    };
                    $scope.IndexCList.push(temp);
                    $scope.IndexList.push(temp);
                }
                //CCY 
                for (var ccy = 0; ccy < response.data[0].CCYCList.length; ccy++) {
                    var temp = {
                        curr_cd: response.data[0].CCYCList[ccy].curr_cd
                    };
                    $scope.CCYCList.push(temp);
                    $scope.CCYCCList.push(temp);
                    $scope.PricePremDisc2List.push(temp);
                }
                //Delivery Period
                for (var dlpr = 0; dlpr < response.data[0].DeliveryPeriodList.length; dlpr++) {
                    var temp = {
                        Period_cd: response.data[0].DeliveryPeriodList[dlpr].Period_cd
                    };
                    $scope.DeliveryPeriodList.push(temp);
                }
                //Payment 
                for (var pay = 0; pay < response.data[0].PaymentCCList.length; pay++) {
                    var temp = {
                        payment_term_cd: response.data[0].PaymentCCList[pay].payment_term_cd
                    };
                    $scope.PaymentCCList.push(temp);
                }
                //Pricing Rule 
                for (var pric = 0; pric < response.data[0].PricingRuleList.length; pric++) {
                    if (response.data[0].PricingRuleList[pric].ID == "5") {
                        var temp = {
                            ID: response.data[0].PricingRuleList[pric].ID, Value: response.data[0].PricingRuleList[pric].Value
                        };
                        $scope.PricingRuleList.push(temp);
                    }

                }
                //MTMCurve
                for (var mtm = 0; mtm < response.data[0].MTMCurveList.length; mtm++) {
                    var temp = {
                        Curve_num: response.data[0].MTMCurveList[mtm].Curve_num, Curve_def_cd: response.data[0].MTMCurveList[mtm].Curve_def_cd
                    };
                    $scope.MTMCurveList.push(temp);
                }
                for (var acp = 0; acp < response.data[0].AccountingPeriodList.length; acp++) {
                    var temp = {
                        Act_period_cd: response.data[0].AccountingPeriodList[acp].Act_period_cd
                    };
                    $scope.AccountingPeriodList.push(temp);
                }
            }
            $scope.isLoading = false;

        }, function (error) {

        });
    }
    $scope.countertPartFunction();

    $scope.getTraderData = function (internalCo, counterPart) {

        try {
            $scope.Agreementlist = [];
            $scope.Agreementtypeist = [];
            $scope.TraderList = [];
            var counterData = $scope.CounterpartyList.find(obj => {
                return obj.Company_num === counterPart
            })
            var interData = $scope.InternalCoList.find(obj => {
                return obj.Company_num === internalCo
            })
            var internal_company = interData.Company_cd;
            var counterpart_company = counterData.Company_cd;
            var trade_type_cd = 'internal physical';
            if (internal_company != undefined && counterpart_company != undefined && trade_type_cd != undefined) {
                $http({
                    method: 'GET',
                    url: '/Trade/GetReferenceAgreementData?internal_company=' + internal_company + '&counterpart_company=' + counterpart_company + '&trade_type_cd=' + trade_type_cd
                }).then(function (response) {

                    for (var tr = 0; tr < response.data.length; tr++) {
                        var temp = {
                            AgreementNo: response.data[tr].AgreementNo, AgreementCompanyLinkNo: response.data[tr].AgreementCompanyLinkNo, Provision_cd: response.data[tr].Provision_cd,
                            Agreement_cd: response.data[tr].Agreement_cd
                        };
                        $scope.Agreementlist.push(temp);
                        var temp1 = {
                            Agreement_cd: response.data[tr].Agreement_cd
                        };
                        $scope.Agreementtypeist.push(temp1)
                    }

                }, function (error) {
                    alert(error);

                });
            }
        } catch (e) {

        }

        //Trader dropdown
        try {
            if (internalCo != undefined) {

                $http({
                    method: 'GET',
                    url: '/Trade/GetReferenceTraderData?internalCo=' + internalCo
                }).then(function (response) {

                    for (var tr = 0; tr < response.data.length; tr++) {
                        var temp = {
                            Person_num: response.data[tr].Person_num, Person_name: response.data[tr].Person_name
                        };
                        $scope.TraderList.push(temp);
                    }

                }, function (error) {
                    alert(error);

                });
            }
        } catch (e) {

        }
    }

    $scope.agreementFromDropdown = function (Agreement_cd) {

        $scope.AgreementFormist = [];
        var selectedAgreement = $scope.Agreementlist.find(obj => {
            return obj.Agreement_cd === Agreement_cd
        })
        if (selectedAgreement != undefined) {
            var temp = {
                Provision_cd: selectedAgreement.Provision_cd
            };
            $scope.AgreementFormist.push(temp);
        }
    }
    $scope.getPricingRule = function (pricingRuleID) {
        try {
            if (pricingRuleID != undefined) {
                $http({
                    method: 'GET',
                    url: '/Trade/GetReferencePricingTermData?pricingRuleID=' + pricingRuleID
                }).then(function (response) {

                    for (var tr = 0; tr < response.data.length; tr++) {
                        var temp = {
                            Pricing_term_cd: response.data[tr].Pricing_term_cd
                        };
                        $scope.PricingTermList.push(temp);
                    }

                }, function (error) {
                    alert(error);

                });
            }
        } catch (e) {

        }
    }
    $scope.openTabData = function (evt, TabName) {

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(TabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    $scope.enablingDisablingComponent = function (priceType) {
        if (priceType == '1') {
            $scope.fixed = false;
            $scope.Index = false;
            $scope.trade.priceTypeC = "1";
        }
        else if (priceType == '0') {
            $scope.fixed = false;
            $scope.Index = true;
            $scope.trade.priceTypeC = "0";
        }
    }
    $scope.enablingDisablingComponent1 = function (priceType) {
        if (priceType == '1') {
            $scope.fixed = false;
            $scope.Index = false;
            $scope.trade.priceTypeC = "1";
        }
        else if (priceType == '0') {
            $scope.fixed = false;
            $scope.Index = true;
            $scope.trade.priceTypeC = "0";
        }
    }
    $scope.indexDropdownSelection = function (index) {
        $scope.trade.indexC = index;
    }
    $scope.indexDropdownSelection1 = function (indexC) {
        $scope.trade.index = indexC;
    }
    $scope.selectionpriceC = function (PricePremC) {
        $scope.trade.pricePremDisc1 = PricePremC;
    }
    $scope.selectionprice = function (pricePremDisc1) {
        $scope.trade.PricePremC = pricePremDisc1;
    }

    $scope.selectionCCY = function (CCYC) {
        $scope.trade.pricePremDisc2 = CCYC;
    }
    $scope.selectionCCY1 = function (pricePremDisc2) {
        $scope.trade.CCYC = pricePremDisc2;
    }
    $scope.selectionUOM1 = function (pricePremDisc3) {
        $scope.trade.UOMC = pricePremDisc3;
    }
    $scope.selectionUOM = function (UOMC) {
        $scope.trade.pricePremDisc3 = UOMC;
    }
    $scope.getTimePeriodData = function (Period_cd) {
        if (Period_cd != undefined) {
            $http({
                method: 'GET',
                url: '/Trade/GetReferenceTimePeriod?Period_cd=' + Period_cd
            }).then(function (response) {
                for (var tr = 0; tr < response.data.length; tr++) {
                    var temp = {
                        Period_start_dt: response.data[tr].Period_start_dt, Period_end_dt: response.data[tr].Period_end_dt
                    }
                }
                var stDate = new Date();
                var edDate = new Date();

                if (temp.Period_start_dt !== "" && temp.Period_end_dt !== "") {
                    stDate = new Date(temp.Period_start_dt.substring(0, 4) + "," + temp.Period_start_dt.substring(4, 6) + "," + temp.Period_start_dt.substring(6, 8));
                    edDate = new Date(temp.Period_end_dt.substring(0, 4) + "," + temp.Period_end_dt.substring(4, 6) + "," + temp.Period_end_dt.substring(6, 8));
                }
                if (Period_cd.toLowerCase() == "tomorrow") {
                    stDate.setDate(stDate.getDate() + 1);
                    edDate.setDate(edDate.getDate() + 1);
                }
                if (Period_cd.toLowerCase() == "yesterday") {
                    stDate.setDate(stDate.getDate() - 1);
                    edDate.setDate(edDate.getDate() - 1);
                }
                if (Period_cd.toLowerCase() == "this month") {
                    stDate = new Date(stDate.getFullYear(), stDate.getMonth(), 1);
                    edDate = new Date(edDate.getFullYear(), edDate.getMonth() + 1, 0);
                }
                $scope.trade.startDate = stDate;
                $scope.trade.endDate = edDate;


            }, function (error) {
                alert(error);

            });
        }
    }
    $scope.getVechicleData = function (MOT) {
        $scope.VehicleList = [];
        if (MOT != undefined) {
            $http({
                method: 'GET',
                url: '/Trade/GetReferenceVechicle?MOT=' + MOT
            }).then(function (response) {
                for (var tr = 0; tr < response.data.length; tr++) {
                    var temp = {
                        Mot_num: response.data[tr].Mot_num, Mot_cd: response.data[tr].Mot_cd

                    }
                    $scope.VehicleList.push(temp);
                }


            }, function (error) {
                alert(error);

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
    $scope.saveReference = function (validForm) {
        // if (validForm) {
        //var selectedmot = $scope.MOTList.find(obj => {
        //         return obj.ID === $scope.trade.MOT
        //     })
        //     var selectedlocation = $scope.LocationList.find(obj => {
        //         return obj.location_num === $scope.trade.location
        //     })
        //     var formatDate = $scope.formatDate($scope.trade.tradedate);
        //     var formatDatestart = $scope.formatDate($scope.trade.startDate);
        //     var formatDateend = $scope.formatDate($scope.trade.endDate);
        //     var selectedData = {
        //         counterPart: $scope.trade.counterPart,
        //         internalCo: $scope.trade.internalCo,
        //         trader: $scope.trade.trader,
        //         tradedate: formatDate,
        //         tradestatus: $scope.trade.tradestatus,
        //         tradeReferenceId: $scope.trade.tradeReferenceId,
        //         commodity: $scope.trade.commodity,
        //         buySell: $scope.trade.buySell,
        //         Strategy: $scope.trade.Strategy,
        //         MOT: $scope.trade.MOT,
        //         MOTName: selectedmot.Value,
        //         menQty: $scope.trade.menQty,
        //         Terms: $scope.trade.Terms,
        //         qtyUOM: $scope.trade.qtyUOM,
        //         carrier: $scope.trade.carrier,
        //         deliveryperiod: $scope.trade.deliveryperiod,
        //         startDate: formatDatestart,
        //         endDate: formatDateend,
        //         periodicity: $scope.trade.periodicity,
        //         calendar: $scope.trade.calendar,
        //         location: $scope.trade.location,
        //         locationtimeZone: selectedlocation.Timezone_cd,
        //         vehicle: $scope.trade.vehicle,
        //         schedule: $scope.trade.schedule,
        //         priceType: $scope.trade.priceType,
        //         index: $scope.trade.index,
        //         pricePremDisc1: $scope.trade.pricePremDisc1,
        //         pricePremDisc2: $scope.trade.pricePremDisc2,
        //         pricePremDisc3: $scope.trade.pricePremDisc3,
        //         dschedule: $scope.trade.dschedule,
        //         pricingRule: $scope.trade.pricingRule,
        //         pricingTerm: $scope.trade.pricingTerm,
        //         mTMCurveList: $scope.trade.mTMCurveList,
        //         agreementtype: $scope.trade.agreementtype,
        //         agreementForm: $scope.trade.agreementForm,
        //         priceTypeC: $scope.trade.priceTypeC,
        //         indexC: $scope.trade.indexC,
        //         PricePremC: $scope.trade.PricePremC,
        //         CCYC: $scope.trade.CCYC,
        //         UOMC: $scope.trade.UOMC,
        //         CCYCC: $scope.trade.CCYCC,
        //         UOMCC: $scope.trade.UOMCC,
        //         paymentCC: $scope.trade.paymentCC,
        //     }
        $(".secondtradeTab").removeClass("link-disable");
        $scope.selectedTab = 2;
        angular.extend($scope.secondTrade, $scope.trade);
        //     if (selectedData != undefined) {
        //         $http({
        //             method: 'POST',
        //             url: '/Trade/saveReference',
        //             data: selectedData
        //         }).then(function (response) {
        //             if (response.data) {
        //                 var tradeNumberFinding = response.data.replace("Trade saved successfully: Newly created trade no is", "");
        //                 tradeNumberFinding = tradeNumberFinding.replace(/['"]+/g, '');
        //                 tradeNumberFinding = tradeNumberFinding.trim();
        //                 if (tradeNumberFinding > 0) {
        //                     $scope.trade.tradeNumber = tradeNumberFinding;
        //                     $scope.trade.tradestatus = "Accepted";
        //                     window.location.href = "/#/InterbookSecondTrade";
        //                     $(".secondtradeTab").removeClass("link-disable");
        //                 }
        //             }
        //         }, function (error) {
        //             alert(error);

        //         });
        //     }

        // }

    }
    $scope.resetForm = function () {

        $scope.trade.internalCo = "";
        $scope.trade.trader = "";
        $scope.trade.tradestatus = "";
        $scope.trade.tradeReferenceId = "";
        $scope.trade.commodity = "";
        $scope.trade.buySell = "";
        $scope.trade.Strategy = "";
        $scope.trade.MOT = "";
        $scope.trade.menQty = "";
        $scope.trade.Terms = "";
        $scope.trade.qtyUOM = "";
        $scope.trade.carrier = "";
        $scope.trade.deliveryperiod = "";
        $scope.trade.startDate = "";
        $scope.trade.endDate = "";
        $scope.trade.periodicity = "";
        $scope.trade.calendar = "";
        $scope.trade.location = "";
        selectedlocation.Timezone_cd = "";
        $scope.trade.vehicle = "";
        $scope.trade.schedule = "";
        $scope.trade.priceType = "";
        $scope.trade.index = "";
        $scope.trade.pricePremDisc1 = "";
        $scope.trade.pricePremDisc2 = "";
        $scope.trade.pricePremDisc3 = "";
        $scope.trade.dschedule = "";
        $scope.trade.pricingRule = "";
        $scope.trade.pricingTerm = "";
        $scope.trade.mTMCurveList = "";
        $scope.trade.agreementtype = "";
        $scope.trade.agreementForm = "";
        $scope.trade.priceTypeC = "";
        $scope.trade.indexC = "";
        $scope.trade.PricePremC = "";
        $scope.trade.CCYC = "";
        $scope.trade.UOMC = "";
        $scope.trade.CCYCC = "";
        $scope.trade.UOMCC = "";
        $scope.trade.paymentCC = "";

    }

}]);