/**
 * Created by Lucien on 2017/3/9.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('HomePageController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', HomePageControllerCtrl]);
function HomePageControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is HomePageController");
    $scope.hideSwaper = [false, true, true];
    $scope.hotSearch = '';
    $scope.recommentJobs = [];
    $scope.hotJobs = [];
    $scope.recentlyJobs = [];
    $scope.cates = [];

    var show = [true, false, false];
    GlobalStorageService.setShow(show);

    /* 鼠标悬停显示轮播图 */
    $scope.showSwaper = function (swaperIndex) {
        for (var item in $scope.hideSwaper) {
            if (item == swaperIndex) {
                $scope.hideSwaper[item] = false;
            } else {
                $scope.hideSwaper[item] = true;
            }
        }
    }

    /* 通过左侧工作类别进入搜索工作列表 */
    $scope.toJobList = function (item) {
        console.log("跳转工作列表页面：" + item.cateStr + "------" + item.cateId);
        GlobalStorageService.setJobCate(item);
        $location.path("/searchjoblist");
    }

    /* 进入公司详情页 */
    $scope.toCompanyPage = function (comId) {
        console.log("跳转公司详情页面：" + comId);
        GlobalStorageService.setComId(comId);
        $location.path("/companypage");
    }

    /* 进入工作详情页 */
    $scope.toJobDetail = function (job) {
        console.log("跳转工作详情页面，工作详情名称" + job.jobName);
        GlobalStorageService.setJob(job);
        $location.path("/jobdetails");
    }

    getJobCates();
    getHotSearch();
    getRecommendJobs();
    getHotJobs();
    getRecentlyJobs();

    /* 获取热门搜索工作类别，在点击类被是对应点击次数+1，在搜索时同样去匹配工作类别，请求后台执行匹配过程 */
    function getHotSearch() {

        console.log("获取热门搜索类别");
        $.when(business_ir.getHotSearchMethod(irModel.getHotSearchModel))
            .done(
                function (req) {
                    console.log("获取热门搜索列表成功" + req);
                    $scope.hotSearch = req.response.param.hotJobSearchCates;
                    $scope.$apply(function () {
                        $scope.hotSearch = $scope.hotSearch;
                    });
                })
            .fail(
                function (ret) {
                    console.log("获取热门搜索列表失败，网络连接错误！");
                }
            );
    }

    /* 获取工作类别 */
    function getJobCates() {
        console.log("获取工作类别...");
        business_ir.getJobCategoryMethod(irModel.getJobCategoryModel).then(
            function (req) {
                console.log("获取所有的工作类别" + req);
                $scope.cates = req.response.param.cates;
                $scope.$apply(function () {
                    $scope.cates = $scope.cates;
                });

            }, function (ret) {
                console.log("获取工作类别异常" + ret);
            }
        );
    }

    /* 获取推荐职位10条 */
    function getRecommendJobs() {
        console.log("获取推荐职位...");
        irModel.getRecHotRecJobsModel.jobsType = 'recommend';
        business_ir.getRecommendJobsMethod(irModel.getRecHotRecJobsModel).then(
            function (req) {
                console.log("获取推荐职位:" + req);
                $scope.recommentJobs = req.response.param.jobList;
                $scope.$apply(function () {
                    $scope.recommentJobs = $scope.recommentJobs;
                });
            },
            function (ret) {
                console.log("获取推荐失败" + ret.responseMsg);
            }
        );
    }

    /* 获取热门职位10条 */
    function getHotJobs() {
        console.log("获取热门职位...");
        irModel.getRecHotRecJobsModel.jobsType = 'hot';
        business_ir.getHotJobsMethod(irModel.getRecHotRecJobsModel).then(
            function (req) {
                console.log("获取热门职位:" + req);
                $scope.hotJobs = req.response.param.jobList;
                $scope.$apply(function () {
                    $scope.hotJobs = $scope.hotJobs;
                });
            },
            function (ret) {
                console.log("获取热门失败" + ret.responseMsg);
            }
        );
    }

    /* 获取最新职位10条 */
    function getRecentlyJobs() {
        console.log("获取最新职位...");
        irModel.getRecHotRecJobsModel.jobsType = 'recently';
        business_ir.getRecentlyJobsMethod(irModel.getRecHotRecJobsModel).then(
            function (req) {
                console.log("获取最新职位:" + req);
                $scope.recentlyJobs = req.response.param.jobList;
                $scope.$apply(function () {
                    $scope.recentlyJobs = $scope.recentlyJobs;
                });
            },
            function (ret) {
                console.log("获取推荐失败" + ret.responseMsg);
            }
        );
    }

    /* 通过搜索条查找工作列表 */
    $scope.searchJobs = function () {
        var condition = $scope.searchCondition;
        console.log("搜索条件：" + condition);
        if (condition != undefined) {
            GlobalStorageService.setSearchCondition(condition);
            $location.path("/searchjoblist");

        } else {
            console.log("查询条件为空");
            alert("请输入搜索条件!");
        }
    }
}

/* 头部页面控制器 */
angular.module('myweb.controllers').controller('H5TopViewController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', H5TopViewControllerCtrl]);
function H5TopViewControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is topview H5TopViewController");

    //接收消息的帐号
    var goEasyaccount = GlobalStorageService.getUsername();
    if (goEasyaccount == undefined || goEasyaccount == '') {
        goEasyaccount = '$$$&&&***@@@';
    }

    //定义goEasy
    var goEasy = new GoEasy({
        appkey: window.goeasycode
    });

    $scope.messageShow = false;
    $scope.show = GlobalStorageService.getShow();
    $scope.isLogin = false;
    //登录状态
    var username = GlobalStorageService.getUsername();
    if (username != undefined && username != '') {
        $scope.isLogin = true;
    }

    $scope.messageList = GlobalStorageService.getMessageList();

    //接受推送消息
    goEasy.subscribe({
        channel: goEasyaccount,
        onMessage: function (message) {
            var msg = message.content;
            var msgEntity = {};
            msgEntity.id = msg.split('&:&:&')[3].split('$messageid$')[1];
            msgEntity.content = msg.split('&:&:&')[0] + '&:&:&' + msg.split('&:&:&')[1] + '&:&:&' + msg.split('&:&:&')[2];
            msgEntity.account = goEasyaccount;
            $scope.messageList.push(msgEntity);
            $scope.$apply(function () {
                $scope.messageList = $scope.messageList;
            });
        }
    });

    /* 阅读消息 */
    $scope.readMessage = function (messageId, type, id) {
        console.log("查看的messageId：" + messageId);
        getMessageListFun(messageId, type, id);
    }

    /* 从数据库中获取消息 */
    function getMessageListFun(messageId, type, id) {
        irModel.readMessageActionModel.account = GlobalStorageService.getUsername();
        irModel.readMessageActionModel.id = messageId;
        business_ir.readMessageActionMethod(irModel.readMessageActionModel).then(
            function (req) {

                console.log("阅读消息！");
                $scope.messageList = req.response.param.messageList;
                //更新当前用户的推送信息
                GlobalStorageService.setMessageList($scope.messageList);
                $scope.$apply(function () {
                    $scope.messageList = $scope.messageList;
                    if (type == 'reply') {
                        //去跳转问题回答页面，查看回复内容，或继续回复
                        GlobalStorageService.setQuestionId(id);
                        $location.path("/replyCompanyQuestion");
                    }
                });
            }, function (ret) {
                console.log("阅读消息失败！");
                new $.zui.Messager("阅读消息异常！", {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        );
    }

    $scope.switchUser = function () {
        GlobalStorageService.setUsername('');
        GlobalStorageService.setJobCate('');
        GlobalStorageService.setSearchCondition('');
        $location.path("/userlogin");
    }

    /* 显示/关闭消息框 */
    $scope.showMessage = function () {
        $scope.messageShow = !$scope.messageShow;
    }

    /* 跳转注册页面 */
    $scope.toRegisterPage = function () {
        console.log("注册帐号...");
        $location.path("/registeruser");
    }

    /* 跳转登录页面 */
    $scope.toLoginPage = function () {
        console.log("登录...");
        $location.path("/userlogin");
    }

    $scope.toHomePage = function () {
        $scope.show = [true, false, false];
        GlobalStorageService.setShow($scope.show);
        console.log("跳转首页...");
        $location.path("/homepage");
    }

    $scope.toNewsPage = function () {
        $scope.show = [false, true, false];
        GlobalStorageService.setShow($scope.show);
        console.log("跳转新闻页...");
        $location.path("/newscenter");
    }

    $scope.toAboutMe = function () {
        $scope.show = [false, false, true];
        GlobalStorageService.setShow($scope.show);
        console.log("跳转关于我们...");
        $location.path("/aboutwe");
    }

    $scope.toPersonalPage = function () {

        console.log("跳转个人中心...");
        $location.path("/personalcenter");
    }
}
