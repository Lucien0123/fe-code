/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('PersonalCenterController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', PersonalCenterControllerCtrl]);

function PersonalCenterControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is PersonalCenterController");
    $scope.canUpload = true;   //是否可以提交保存附件

    $scope.personal = {};
    var account = GlobalStorageService.getUsername();

    /* 获取个人中信息 */
    getPersonalInfor();
    function getPersonalInfor() {
        irModel.getPersonalInforModel.account = account;

        business_ir.getPersonalInforMethod(irModel.getPersonalInforModel).then(
            function (req) {

                console.log(req);
                $scope.personal = req.response.param.personalInfor;
                $scope.$apply(function () {
                    $scope.personal = $scope.personal;
                });
            }, function (ret) {
                console.log(ret);
                new $.zui.Messager("获取个人信息失败，请重新登录！", {
                    type: 'warning',
                    time: 3000
                }).show();
                $scope.$apply(function () {
                    $location.path("/userlogin");
                });
            }
        );
    }

    /* 修改个人信息 */
    $scope.modifyPersonInfor = function () {
        irModel.modifyPersonalInforModel.account = GlobalStorageService.getUsername();
        irModel.modifyPersonalInforModel.realname = $scope.personal.realname;
        irModel.modifyPersonalInforModel.gender = $scope.personal.gender;
        irModel.modifyPersonalInforModel.occupation = $scope.personal.occupation;
        irModel.modifyPersonalInforModel.personalDesc = $scope.personal.personalDesc;
        irModel.modifyPersonalInforModel.telphone = $scope.personal.telphone;
        console.log(irModel.modifyPersonalInforModel);
        business_ir.modifyPersonalInforMethod(irModel.modifyPersonalInforModel).then(
            function (req) {

                console.log(req);
                $scope.personal = req.response.param.personalInfor;
                $scope.$apply(function () {
                    $scope.personal = $scope.personal;
                });
                new $.zui.Messager("修改个人信息成功！", {
                    type: 'success',
                    time: 3000
                }).show();
            }, function (ret) {

                console.log(ret);
                new $.zui.Messager("修改个人信息失败！", {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        );
    }

    /* 请求附件保存接口 */
    function saveAttachmentPath(filename, downLoadPath) {

        irModel.saveAttachmentModel.fileName = filename;
        irModel.saveAttachmentModel.account = GlobalStorageService.getUsername();
        irModel.saveAttachmentModel.filePath = downLoadPath;
        console.log(irModel.saveAttachmentModel);
        business_ir.saveAttachmentMethod(irModel.saveAttachmentModel).then(
            function (req) {

                console.log(req);
                $scope.canUpload = true;   //显示上传按钮
                $scope.$apply(function () {
                    $scope.canUpload = $scope.canUpload;
                });
                new $.zui.Messager("附件简历上传成功！", {
                    type: 'success',
                    time: 3000
                }).show();
                $scope.personal.accessResume = req.response.param.downLoadPath;
                $scope.$apply(function () {
                    $scope.personal.accessResume = $scope.personal.accessResume;
                });
            }, function (ret) {
                $scope.canUpload = true;
                console.log(ret);
                new $.zui.Messager("保存附件下载路径失败！", {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        );
    }

    /* 获取文件流 */
    $scope.uploadAttachment = function () {
        console.log("上传附件简历...");
        var formData = new FormData($("#attachmentForm")[0]);
        business_ir.uploadAttachmentMethod(formData).then(
            function (req) {
                console.log(req);
                var fileId = req.response.fileList[0].fileId;
                console.log("返回的fileId：" + fileId);

                var downLoadPath = window.downAccessPath + "?fileId=" + fileId;
                console.log("附近下载地址：" + downLoadPath);

                //请求保存附件
                var filename = '附件简历';
                if ($scope.personal.accessName != undefined && $scope.fileName != '') {
                    filename = $scope.personal.accessName;
                }
                saveAttachmentPath(filename, downLoadPath);

            }, function (ret) {
                console.log(ret);
                $.zui.messager.show("获取文件失败！", {
                    type: 'danger',
                    placement: 'top',
                    time: '3000'
                });
            }
        );
    }

    $scope.toModifyPsw = function () {

        console.log("修改密码");
        $location.path("/modifypsw");
    }
}