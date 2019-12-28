/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('CompanyPageController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', CompanyPageControllerCtrl]);

function CompanyPageControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is CompanyPageController");

    $scope.comBaseInfor = {};
    $scope.comRecuriteJobs = [];
    $scope.comQuestions = [];
    $scope.askQuestion = '';
    var comId = GlobalStorageService.getComId();  //当前公司的id
    console.log("当前公司的id：" + comId);

    /* 进入工作详情页 */
    $scope.toJobDetail = function (job) {
        console.log("跳转工作详情页面，工作详情名称" + job.jobName);
        GlobalStorageService.setJob(job);
        $location.path("/jobdetails");
    }
    
    /* 进入问题详情页面 */
    $scope.showQuestion = function (question) {
        console.log("跳转问题详情页面");
        GlobalStorageService.setQuestion(question);
        $location.path("/replyCompanyQuestion");
    }
    
    
    getCompanyBaseInfor();
    getRecuriteJobsFun();
    getCompanyQuestionsFun();

    /* 获取公司的基本信息 */
    function getCompanyBaseInfor() {
        irModel.getCompanyBaseInforModel.companyId = comId;
        console.log(irModel.getCompanyBaseInforModel);
        business_ir.getCompanyBaseInforMethod(irModel.getCompanyBaseInforModel).then(
            function (req) {

                console.log("获取公司基本信息成功！");
                console.log(req);
                $scope.comBaseInfor = req.response.param.companyBaseInfor;
                $scope.$apply(function() {
                    $scope.comBaseInfor = $scope.comBaseInfor;
                });
            }, function (ret) {

                console.log("获取公司基本信息失败！" + ret);
            }
        );
    }

    /* 获取公司正在招聘工作的列表 */
    function getRecuriteJobsFun() {
        irModel.getRecuriteJobsModel.companyId = comId;
        console.log(irModel.getRecuriteJobsModel);
        business_ir.getRecuriteJobsMethod(irModel.getRecuriteJobsModel).then(
            function (req) {

                console.log("获取公司招聘工作列表成功！");
                console.log(req);
                $scope.comRecuriteJobs = req.response.param.recruiteJobs;
                $scope.$apply(function() {
                    $scope.comRecuriteJobs = $scope.comRecuriteJobs;
                });
                console.log("招聘工作的长度：" + $scope.comRecuriteJobs.length);
            }, function (ret) {

                console.log("获取公司基本信息失败！" + ret);
            }
        );
    }

    /* 获取公司的问答中心的问题列表 */
    function getCompanyQuestionsFun() {
        irModel.getCompanyQuestionsModel.companyId = comId;
        console.log(irModel.getCompanyQuestionsModel);
        business_ir.getCompanyQuestionsMethod(irModel.getCompanyQuestionsModel).then(
            function (req) {

                console.log("获取公司问答列表成功！");
                console.log(req);
                $scope.comQuestions = req.response.param.questionList;
                $scope.$apply(function() {
                    $scope.comQuestions = $scope.comQuestions;
                });
                console.log("问答列表的长度：" + $scope.comQuestions.length);
            }, function (ret) {

                console.log("获取公司基本信息失败！" + ret);
            }
        );
    }

    /* 在公司页面提问操作 */
    $scope.askQuestionAction = function () {
        var username = GlobalStorageService.getUsername();
        if (username == undefined || '' == username){
            new $.zui.Messager("请先登录后再提问！", {
                type: 'warning',
                time: 3000
            }).show();
            $location.path("/userlogin");
            return false;
        }
        console.log("提问内容：" + $scope.askQuestion);
        irModel.askQuestionActionModel.comId = GlobalStorageService.getComId();
        irModel.askQuestionActionModel.userId = username;
        irModel.askQuestionActionModel.quesContent = $scope.askQuestion;
        console.log(irModel.askQuestionActionModel);
        business_ir.askQuestionActionMethod(irModel.askQuestionActionModel).then(
            function (req) {
                $scope.askQuestion = '';   //置空问题输入框
                console.log("提问成功:" + req);
                new $.zui.Messager("提问成功！", {
                    type: 'success',
                    time: 3000
                }).show();
                console.log("重新加载问题列表...");
                $scope.comQuestions = [];
                getCompanyQuestionsFun();
            },
            function (ret) {
                console.log("提问失败：" + ret);
                new $.zui.Messager("提问失败！", {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        );
    }

    /* 查看问题详情 */
    $scope.showQuestion = function (question) {

        var qid = question.id;
        console.log("问题id为：" + question.questionContent + "   跳转问题回答页面...");
        GlobalStorageService.setQuestion(question);
        $location.path("/replyCompanyQuestion");
    }



}
