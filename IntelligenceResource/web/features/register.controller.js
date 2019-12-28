/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../common/bussiness-ir").bussiness_IR;
var irModel = require("../common/ir-model.js").irModel;
var ajaxConfig = require("../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('RegisterUserController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', RegisterUserControllerCtrl]);

function RegisterUserControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is RegisterUser controller");
    $scope.checkoutPassFlag = false;  //密码框
    $scope.checkoutPassFlag1 = false; //确认密码框
    $scope.errmsg = '';


    $scope.registerUser = function () {
        var account = $scope.account;
        var password = $scope.password;
        if ($scope.checkoutPassFlag && $scope.checkoutPassFlag1) {
            irModel.registerUserModel.account = account;
            irModel.registerUserModel.password = password;
            console.log("注册用户...");
            console.log(irModel.registerUserModel);
            $.when(business_ir.registerUserMethod(irModel.registerUserModel))
                .done(
                    function (req) {
                        console.log("注册成功..." + req);
                        new $.zui.Messager('注册成功,请返回登录', {
                            type: 'success',
                            time: 3000
                        }).show();
                    })
                .fail(function (ret) {
                    console.log("请求失败！！！");
                    new $.zui.Messager(ret.responseMsg, {
                        type: 'warning',
                        time: 3000
                    }).show();
                    $scope.errmsg = ret.responseMsg;
                });
        } else {
            $scope.errmsg = '请输入帐号、密码';
        }
    }

    /* 跳转首页 */
    $scope.toHomePage = function () {
        $location.path('/homepage');
    }

    /* 跳转登录页面 */
    $scope.toLoginPage = function () {
        $location.path('/userlogin');
    }

    /* 校验密码格式 */
    $scope.checkoutpwd = function (flag) {
        $scope.checkoutPassFlag1 = false;
        if (!flag) {
            var pwd1 = $("#password").val();
            if (pwd1.length >= 6 && pwd1.length <= 16) {
                $scope.checkoutPassFlag = true;
            } else if (pwd1.length > 16) {
                $("#password").val(pwd1.substr(0, 16));
            } else {
                $scope.checkoutPassFlag = false;
            }
        } else {
            var pwd = $("#confirmpwd").val();
            if (pwd == $scope.password && pwd.length >= 6) {
                $scope.checkoutPassFlag1 = true;
            } else if (pwd.length > 16) {
                $("#confirmpwd").val(pwd.substr(0, 16));
            } else {
                $scope.checkoutPassFlag1 = false;
            }
        }
    }

}
