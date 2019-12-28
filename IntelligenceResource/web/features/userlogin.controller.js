/**
 * Created by Lucien on 2017/3/7.
 */

var ajaxUtilObj = require("../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../common/bussiness-ir").bussiness_IR;
var irModel = require("../common/ir-model.js").irModel;
var ajaxConfig = require("../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('CommonLoginController', ['$scope', '$rootScope', '$location', '$route', 'GlobalStorageService', CommonLoginControllerCtrl]);

function CommonLoginControllerCtrl($scope, $rootScope, $location, $route, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    $scope.errmsg = '';
    console.log("CommonLoginController start...");

    /* 跳转注册页面 */
    $scope.toRegisterPage = function () {
        console.log("注册帐号...");
        $location.path("/registeruser");
    }

    /* 跳转首页 */
    $scope.toHomePage = function () {
        console.log("注册帐号...");
        $location.path("/homepage");
    }
    /* 普通用户登录操作 */
    $scope.commonLogin = function () {
        var account = $scope.account;
        var pwd = $scope.password;
        if (account == '' || pwd == '' || account == undefined || pwd == undefined) {
            $scope.errmsg = '帐号、密码不能为空！';
        } else {
            irModel.getLoginAuthModel.account = account;
            irModel.getLoginAuthModel.password = pwd;
            business_ir.getLoginAuthMethod(irModel.getLoginAuthModel).then(
                function (req) {
                    console.log("登录成功....")
                    console.log(req);
                    GlobalStorageService.setUsername(req.response.param.account);
                    var account = GlobalStorageService.getUsername();
                    irModel.getMessageListModel.account = account;
                    business_ir.getMessageListMethod(irModel.getMessageListModel).then(
                        function (req) {
                            console.log("获取当前用户的推送消息列表");
                            console.log(req);
                            var messageList = req.response.param.messageList;
                            GlobalStorageService.setMessageList(messageList);
                            console.log("登录成功，跳转到主页");
                            $scope.$apply(function() {
                                $location.path("/homepage");
                            });
                        }, function (ret) {
                            console.log("获取推送消息列表失败！");
                            console.log(ret);
                            console.log("登录成功，跳转到主页");
                            $scope.$apply(function() {
                                $location.path("/homepage");
                            });
                        }
                    );
                },
                function (ret) {
                    console.log("登录失败....")
                    console.log(ret);
                    $scope.errmsg = '帐号、密码输入错误';
                }
            );
        }
    }
}