/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('ModifyPasswordController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', ModifyPasswordControllerCtrl]);

function ModifyPasswordControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is ModifyPasswordController");
    $scope.account = GlobalStorageService.getUsername();
    $scope.checkoutPassFlag = false;  //密码框
    $scope.checkoutPassFlag1 = false; //确认密码框
    $scope.errmsg = '';

    /* 修改用户名密码 */
    $scope.modifypasswordFun = function () {
        var account = $scope.account;
        var password = $scope.password;
        var oldpsw = $scope.oldpsw;
        if ($scope.checkoutPassFlag && $scope.checkoutPassFlag1) {
            irModel.modifyPasswordModel.account = account;
            irModel.modifyPasswordModel.password = password;
            irModel.modifyPasswordModel.oldpsw = oldpsw;
            console.log("修改密码...");
            $.when(business_ir.modifyPasswordMethod(irModel.modifyPasswordModel))
                .done(
                    function (req) {
                        console.log("修改成功..." + req);
                        new $.zui.Messager('修改成功,请返回登录', {
                            type: 'success',
                            time: 3000
                        }).show();
                        GlobalStorageService.setUsername('');
                        $scope.$apply(function() {
                            $location.path("/userlogin");
                        });
                    })
                .fail(function (ret) {
                    console.log("修改s=失败！！！");
                    new $.zui.Messager(ret.responseMsg, {
                        type: 'warning',
                        time: 3000
                    }).show();
                    $scope.errmsg = ret.responseMsg;
                    $scope.$apply(function() {
                        $scope.errmsg = $scope.errmsg;
                    });
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
