/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('ReplyCompanyQuestionController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', ReplyCompanyQuestionControllerCtrl]);

function ReplyCompanyQuestionControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is ReplyCompanyQuestionController");
    $scope.applyList = [];
    $scope.replyContent1 = '';
    $scope.replyContent2 = '';
    $scope.beReplierName = '';
    $scope.questionInfo = {};
    $scope.question = GlobalStorageService.getQuestion();
    console.log($scope.question);

    self.beReplierAccount = '';
    self.firCommentId = '';

    /* 如果全局变量questionId不为空，则说明是从推送消息进入的 */
    var questionId = GlobalStorageService.getQuestionId();
    if (questionId != undefined && questionId != '') {
        //重新获取问题详情，给$scope.question赋值
        getQuestionDetailsFun(questionId);
    }

    function getQuestionDetailsFun(id) {
        console.log("推送消息问题Id：" + id);
        irModel.getQuestionDetailModel.questionId = id;
        business_ir.getQuestionDetailMethod(irModel.getQuestionDetailModel).then(
            function (req) {
                console.log("获取问题详情成功！");
                console.log(req);
                $scope.question = req.response.param.questiondetail;
                $scope.$apply(function() {
                    $scope.question = $scope.question;
                });

            }, function (ret) {
                console.log("获取问题详情失败！")
                console.log(ret);
            }
        );

    }

    /* 回复操作 */
    $scope.replyAction = function (type) {

        if (GlobalStorageService.getUsername() == undefined || GlobalStorageService.getUsername() == '') {
            console.log("请登录后操作...");
            $location.path("/userlogin");
        }
        irModel.replyActionModel.replyType = type;
        irModel.replyActionModel.questionId = $scope.question.questionId;
        if (GlobalStorageService.getUsername() == undefined || GlobalStorageService.getUsername() == '') {
            console.log("当前未登录...");
            new $.zui.Messager("请先登录后再提问！", {
                type: 'warning',
                time: 3000
            }).show();
            $location.path("/userlogin");
            return false;
        } else {
            irModel.replyActionModel.replierAccount = GlobalStorageService.getUsername();

            console.log($scope.replyContent1);
            if ("FIRSTREPLY" == type) {
                irModel.replyActionModel.replyContent = $scope.replyContent1;

            } else if ("SECONDREPLY" == type) {
                irModel.replyActionModel.firCommentId = self.firCommentId;
                irModel.replyActionModel.replyContent = $scope.replyContent2;
                irModel.replyActionModel.beReplier = self.beReplierAccount;

                self.beReplierAccount = '';
                self.firCommentId = '';
            }

            business_ir.replyActionMethod(irModel.replyActionModel).then(
                function (req) {

                    console.log(req);
                    new $.zui.Messager("回复成功！", {
                        type: 'success',
                        time: 3000
                    }).show();
                    //重新获取问题
                    getQuestionDetailFun();
                }, function (ret) {

                    console.log(ret);
                    new $.zui.Messager("回复失败！", {
                        type: 'warning',
                        time: 3000
                    }).show();
                }
            );
        }

    }

    function getQuestionDetailFun() {
        irModel.getQuestionDetailModel.questionId = $scope.question.questionId;

        console.log(irModel.getQuestionDetailModel);
        business_ir.getQuestionDetailMethod(irModel.getQuestionDetailModel).then(
            function (req) {

                console.log(req);
                $scope.question = req.response.param.questiondetail;
                $scope.$apply(function () {
                    $scope.question = $scope.question;
                });
            }, function (ret) {
                console.log(ret);
                new $.zui.Messager("重新问题失败！", {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        );
    }

    $scope.setSecondReply = function (firCommentId, beReplier) {

        self.beReplierAccount = beReplier;
        self.firCommentId = firCommentId;
    }
}