/**
 * Created by Lucien on 2017/3/2.
 */
(function () {
    var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
    var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
    var irModel = require("../../../common/ir-model.js").irModel;
    var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

    irModel = Object.create(irModel);

    angular.module('myweb.controllers').controller('JobDetailsController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', JobDetailsControllerCtrl]);

    function JobDetailsControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
        //将变量定义在self中，仅能被本controller和对应的页面访问到
        var self = this;
        console.log("this is JobDetailsController");
        self.hadSendResume = false;
        $scope.approveCountShow = 0;
        $scope.canApprove = true;
        var cur_job = GlobalStorageService.getJob();
        console.log(cur_job);
        $scope.jobdetail = cur_job;

        //getMostJobAppraise();
        function getMostJobAppraise() {
            irModel.getMostUsefulJobAppraiseModel.jobId = $scope.jobdetail.jobId;
            console.log(irModel.getMostUsefulJobAppraiseModel);
            business_ir.getMostUsefulJobAppraiseMethod(irModel.getMostUsefulJobAppraiseModel).then(
                function (req) {
                    console.log(req);
                    $scope.mostUsefulJobAppraise = req.response.param;
                    $scope.approveCountShow = $scope.mostUsefulJobAppraise.approveCount;
                },
                function (ret) {
                    console.log("请求获取最有用的工作评价失败!");
                    new $.zui.Messager("请求获取最有用的工作评价失败", {
                        type: 'warning',
                        time: 3000
                    }).show();
                }
            );
        }

        /* 投递简历 */
        $scope.sendResume = function (job) {

            if (self.hadSendResume){
                new $.zui.Messager("您已投递过该职位", {
                    type: 'warning',
                    time: 3000
                }).show();
                return false;
            }
            console.log("投递简历" + job.jobName + job.jobId);
            var account = GlobalStorageService.getUsername();
            if (account == undefined || account == ''){
                console.log("先登录后再投递简历");
                new $.zui.Messager("请先登录后再投递简历", {
                    type: 'warning',
                    time: 3000
                }).show();
                $scope.$apply(function () {
                    $location.path("/userlogin");
                });
            } else {
                irModel.sendResumeModel.account = account;
                irModel.sendResumeModel.jobId = job.jobId;

                business_ir.sendResumeMethod(irModel.sendResumeModel).then(
                    function (req) {
                        console.log(req);
                        new $.zui.Messager('投递简历成功！', {
                            type: 'success',
                            time: 3000
                        }).show();
                        self.hadSendResume = true;
                    }, function (ret) {
                        console.log(ret);
                        new $.zui.Messager("投递简历失败！", {
                            type: 'warning',
                            time: 3000
                        }).show();
                    }
                );
            }
        }

        /* 进入公司详情页 */
        $scope.toCompanyPage = function (comId) {
            console.log("跳转公司详情页面：" + comId);
            GlobalStorageService.setComId(comId);
            $location.path("/companypage");
        }

        /* 点赞 */
        $scope.canApprove = true;    //默认进入页面时可以点赞，没有做防止刷赞的操作
        $scope.approveJobAppraise = function (appraiseId) {
            if($scope.canApprove){
                $scope.approveCountShow++;
                console.log("点赞的id" + appraiseId);
                $scope.canApprove = false;
                irModel.approveJobAppraiseModel.appraiseId = appraiseId;
                console.log(irModel.approveJobAppraiseModel);
                business_ir.approveJobAppraiseMethod(irModel.approveJobAppraiseModel).then(
                    function (req) {
                        console.log("点赞成功" + req);
                        console.log(req.response.param.approveCount);
                    },
                    function (ret) {
                        console.log("点赞失败");
                    }
                );
            } else {
                new $.zui.Messager("不能重复点赞", {
                    type: 'warning',
                    time: 1500
                }).show();
            }
        }
    }
}());