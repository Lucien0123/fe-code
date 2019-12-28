/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../../../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../../../common/bussiness-ir").bussiness_IR;
var irModel = require("../../../common/ir-model.js").irModel;
var ajaxConfig = require("../../../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('SearchJobListController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', SearchJobListControllerCtrl]);
function SearchJobListControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    $scope.recentlyViewJobs = [];
    //$scope.jobList = [];
    $scope.totalPage = 0;
    $scope.pagesTag = [];
    $scope.pageContent = [];
    console.log("this is SearchJobListController");
    var jobCategory = GlobalStorageService.getJobCate();
    console.log("获取首页选择的工作类别：" + jobCategory);
    $scope.searchConditions = {
        'jobCate': '',   //当工作类别不为空时，优先查找
        'jobName': '',
        'workExperience': '',
        'education': '',
        'worktype': '',
        'jobSalary': '',
        'workPosition': ''
    };

    $scope.workExperienceStrs = [
        {'str': '应届毕业生', 'show': false},
        {'str': '3年及以下', 'show': false},
        {'str': '3-5年', 'show': false},
        {'str': '5-10年', 'show': false},
        {'str': '10年以上', 'show': false},
        {'str': '不要求', 'show': false}
    ];
    $scope.educationStrs = [
        {'str': '大专', 'show': false},
        {'str': '本科', 'show': false},
        {'str': '硕士', 'show': false},
        {'str': '博士', 'show': false},
        {'str': '不要求', 'show': false}
    ];
    $scope.workstypeStrs = [
        {'str': '移动互联网', 'show': false},
        {'str': '电子商务', 'show': false},
        {'str': '金融', 'show': false},
        {'str': '企业服务', 'show': false},
        {'str': '教育', 'show': false},
        {'str': '文化娱乐', 'show': false},
        {'str': '游戏', 'show': false},
        {'str': 'O2O', 'show': false},
        {'str': '硬件', 'show': false}
    ];

    $scope.jobName = '';  //搜索页面输入框关键字
    $scope.jobSalary = '';//筛选条件，工作薪资
    $scope.workPosition = ''; //工作类别，实习，兼职，全职
    self.workExperience = []; //工作经验
    self.education = [];      //学历
    self.worktype = [];       //行业领域


    if (GlobalStorageService.getJobCate() != undefined && GlobalStorageService.getJobCate != '') {
        $scope.jobCate = GlobalStorageService.getJobCate().cateStr;
    }
    if (GlobalStorageService.getSearchCondition() != undefined && GlobalStorageService.getSearchCondition() != '') {
        $scope.searchCondition = GlobalStorageService.getSearchCondition();
    }

    /* 在搜索页面更切换筛选工作条件后，重新搜索工作 */
    $scope.research = function (item, type, index, pageNumber) {
        console.log("搜索页面的操作正在进行中...");
        searchJobList(item, type, index, pageNumber);
    }

    /* 进入工作详情页 */
    $scope.toJobDetail = function (job) {
        console.log("跳转工作详情页面，工作详情名称" + job.jobName);
        GlobalStorageService.setJob(job);
        $location.path("/jobdetails");
    }
    /* 进入公司详情页 */
    $scope.toCompanyPage = function (comId) {
        console.log("跳转公司详情页面：" + comId);
        GlobalStorageService.setComId(comId);
        $location.path("/companypage");
    }

    //进入搜索页面时执行
    searchJobList('', 'mainpage', '', 0);
    function searchJobList(item, type, index, pageNumber) {

        if (pageNumber == undefined) {
            pageNumber = 0;
        }
        console.log(item + " -- item的值 -- type类型 -- " + type + " -- index的值 -- " + index);
        if (type == 'salary') {

            console.log("修改工作薪资范围触发：" + $scope.jobSalary);
            $scope.searchConditions.jobSalary = $scope.jobSalary;
        } else if (type == 'type') {  //实习、兼职、全职

            console.log("修改工作形式要求触发：" + $scope.workPosition);
            $scope.searchConditions.workPosition = $scope.workPosition;
        } else if (type == 'key') {

            $scope.searchConditions.jobCate = '';
            console.log("搜索页面搜索工作关键字触发：" + $scope.jobName);
            $scope.searchConditions.jobName = $scope.jobName;
        } else if (type == 'mainpage') {

            console.log($scope.searchCondition);
            //从首页进入，根据进入时携带的参数，初始化搜索工作列表页面
            if ($scope.jobCate != undefined) {
                $scope.searchConditions.jobCate = $scope.jobCate;
            } else if ($scope.searchCondition != undefined) {
                $scope.searchConditions.jobName = $scope.searchCondition;
            }
        } else if (type == 'page') {

        } else {
            if (type == 'workExperience') {  //工作经验要求
                if (self.workExperience.length > 0) {
                    var arrayLength = self.workExperience.length;
                    for (var i in self.workExperience) {
                        if (self.workExperience[i] == item) {
                            self.workExperience.splice(i, 1);
                        }
                    }
                    if (arrayLength == self.workExperience.length) {
                        //如果匹配过后，数组的长度没有发生变化，则说明原数组中不包含当前选中的，添加
                        self.workExperience.push(item);
                    }
                } else {
                    self.workExperience.push(item);
                }
                $scope.searchConditions.workExperience = self.workExperience.join("-");
                $scope.workExperienceStrs[index].show = !$scope.workExperienceStrs[index].show;

            } else if (type == 'education') {  //学历要求
                if (self.education.length > 0) {
                    var arrayLength = self.education.length;
                    for (var i in self.education) {
                        if (self.education[i] == item) {
                            self.education.splice(i, 1);
                        }
                    }
                    if (arrayLength == self.education.length) {
                        self.education.push(item);
                    }
                } else {
                    self.education.push(item);
                }
                $scope.searchConditions.education = self.education.join("-");
                $scope.educationStrs[index].show = !$scope.educationStrs[index].show;
            } else if (type == 'worktype') { //工作类别
                if (self.worktype.length > 0) {
                    var arrayLength = self.worktype.length;
                    for (var i in self.worktype) {
                        if (self.worktype[i] == item) {
                            self.worktype.splice(i, 1);
                        }
                    }
                    if (arrayLength == self.worktype.length) {
                        self.worktype.push(item);
                    }
                } else {
                    self.worktype.push(item);
                }
                $scope.searchConditions.worktype = self.worktype.join("-");
                $scope.workstypeStrs[index].show = !$scope.workstypeStrs[index].show;
            } else {
                new $.zui.Messager('筛选工作失败，请退出重试！', {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        }

        //封装参数，请求获取新的工作列表，多条件查询，若工作类别为空，则从返回值中找工作类别
        $scope.pagesTag = [];
        $scope.jobObj = {};
        //$scope.jobObj.jobList = [];   //清空工作列表，重新加载
        $scope.searchConditions.worktype = self.worktype.join(',');
        $scope.searchConditions.education = self.education.join(',');
        $scope.searchConditions.workExperience = self.workExperience.join(',');
        console.log('多条件动态查询请求参数：' + $scope.searchConditions);
        irModel.getJobListByConditionsModel.jobName = $scope.searchConditions.jobName;
        irModel.getJobListByConditionsModel.jobCate = $scope.searchConditions.jobCate;
        irModel.getJobListByConditionsModel.jobSalary = $scope.searchConditions.jobSalary;
        irModel.getJobListByConditionsModel.workPosition = $scope.searchConditions.workPosition;
        irModel.getJobListByConditionsModel.education = $scope.searchConditions.education;
        irModel.getJobListByConditionsModel.workExpression = $scope.searchConditions.workExperience;
        irModel.getJobListByConditionsModel.worktype = $scope.searchConditions.worktype;
        irModel.getJobListByConditionsModel.pageNumber = pageNumber - 1;

        console.log(irModel.getJobListByConditionsModel);
        business_ir.getJobListByConditionsMethod(irModel.getJobListByConditionsModel).then(
            function (req) {

                console.log(req);
                $scope.jobObj.jobList = req.response.param.searchJobList;
                console.log($scope.jobObj.jobList.length);
                console.log($scope.jobObj.jobList[0].jobName);
                $scope.totalPage = req.response.param.totalPage;
                self.curPageNumber = req.response.param.pageNumber;
                //前台展示jobList
                //分页处理页码

                if ($scope.totalPage != undefined) {
                    var totalPageNumber = 0;
                    if ($scope.totalPage > 8) {
                        totalPageNumber = 8;
                    } else if (0 < $scope.totalPage <= 8) {
                        totalPageNumber = $scope.totalPage;
                    }
                    for (var i = 0; i < totalPageNumber; i++) {
                        if (self.curPageNumber == 0) {
                            if (i == 0) {
                                var tag = {'number': i + 1, 'clicked': true};
                                $scope.pagesTag.push(tag);
                            } else {
                                var tag = {'number': i + 1, 'clicked': false};
                                $scope.pagesTag.push(tag);
                            }
                        } else {
                            if (i == self.curPageNumber) {
                                var tag = {'number': i + 1, 'clicked': true};
                                $scope.pagesTag.push(tag);
                            } else {
                                var tag = {'number': i + 1, 'clicked': false};
                                $scope.pagesTag.push(tag);
                            }
                        }
                    }
                } else {
                    new $.zui.Messager('获取搜索工作列表出错了！', {
                        type: 'warning',
                        time: 3000
                    }).show();
                }
                $scope.$apply(function () {
                    $scope.jobObj.jobList = $scope.jobObj.jobList;
                    $scope.pagesTag = $scope.pagesTag;
                });

            }, function (ret) {
                console.log("获取搜索列表失败" + ret);
                new $.zui.Messager('请求失败，请检查网络设置后重试！', {
                    type: 'warning',
                    time: 3000
                }).show();
            }
        );
    }

    /* 获取三条最近浏览过的工作 */
    function getRecentlyViewedJobs() {
        irModel.getRecentlyViewedUrl.username = GlobalStorageService.getUsername();
        console.log(irModel.getRecentlyViewedUrl);
        business_ir.getRecentlyViewedMethod(irModel.getRecentlyViewedUrl).then(
            function (req) {

                console.log(req);
                $scope.recentlyViewJobs = req.response.param.recentlyViewJobs;

            }, function (ret) {
                console.log(ret);
            }
        );
    }
}
