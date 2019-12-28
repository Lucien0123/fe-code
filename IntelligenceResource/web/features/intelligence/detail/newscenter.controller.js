/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('NewsCenterController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', NewsCenterControllerCtrl]);

function NewsCenterControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is NewsCenterController");

    $scope.newsList = [];

    /* 获取新闻公告列表 */
    getNewsListFun();
    function getNewsListFun() {

        console.log("获取新闻公告列表...");
        business_ir.getNewsListMethod(irModel.getNewsListModel).then(
            function (req) {

                console.log("获取新闻公告列表成功...");
                console.log(req);
                $scope.newsList = req.response.param.newsList;
                $scope.$apply(function() {
                    $scope.newsList = $scope.newsList;
                });
            }, function (ret) {

                console.log("获取新闻公告列表失败！")
                console.log(ret);
            }
        );
    }

    /* 跳转新闻公告详情 */
    $scope.toNewsDetailsPage = function (news) {

        console.log("跳转，查看新闻详情：" + news.newsTitle);
        GlobalStorageService.setNews(news);
        $location.path("/newsdetails");
    }

}