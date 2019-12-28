/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('NewsDetailsController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', '$sce', NewsDetailsControllerCtrl]);

function NewsDetailsControllerCtrl($scope, $location, $rootScope, GlobalStorageService, $sce) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is NewsDetailsController");

    $scope.newsDetails = GlobalStorageService.getNews();
    $scope.newsDetails.newsContent = $sce.trustAsHtml($scope.newsDetails.newsContent);

    console.log("当前查看新闻的标题：" + $scope.newsDetails.newsTitle);


}