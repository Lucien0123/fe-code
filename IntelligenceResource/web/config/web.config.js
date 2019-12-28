/**
 * Created by Lucien on 2017/3/2.
 * 配置路由
 */

angular.module('myweb', ['ngRoute', 'myweb.controllers', 'myweb.services'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
        when('/example', {
            templateUrl: 'web/features/example.html',
            cache:'false',
            controller: 'ExampleController'
        }).
        when('/homepage', {       //网站首页
            templateUrl: 'web/features/intelligence/detail/homepage.html',
            cache:'false',
            controller: 'HomePageController'
        }).
        when('/companypage', {    //公司首页
            templateUrl: 'web/features/intelligence/detail/companypage.html',
            cache:'false',
            controller: 'CompanyPageController'
        }).
        when('/jobdetails', {     //工作详情
            templateUrl: 'web/features/intelligence/detail/jobdetails.html',
            cache:'false',
            controller: 'JobDetailsController'
        }).
        when('/moreassess', {     //更多回复
            templateUrl: 'web/features/intelligence/detail/moreassess.html',
            cache:'false',
            controller: 'MoreAssessController'
        }).
        when('/replyCompanyQuestion', {//公司问答
            templateUrl: 'web/features/intelligence/detail/replyCompanyQuestion.html',
            cache:'false',
            controller: 'ReplyCompanyQuestionController'
        }).
        when('/searchjoblist', {  //搜索工作列表页
            templateUrl: 'web/features/intelligence/detail/searchjoblist.html',
            cache:'false',
            controller: 'SearchJobListController'
        }).
        when('/userlogin', {      //登录
            templateUrl: 'web/features/loginpage.html',
            cache:'false',
            controller: 'CommonLoginController'
        }).
        when('/modifypsw', {      //修改密码
            templateUrl: 'web/features/intelligence/detail/modifypasswordpage.html',
            cache:'false',
            controller: 'ModifyPasswordController'
        }).
        when('/registeruser', {   //注册用户
            templateUrl: 'web/features/registerpage.html',
            cache:'false',
            controller: 'RegisterUserController'
        }).
        when('/personalcenter', {   //个人中心
            templateUrl: 'web/features/intelligence/detail/personalcenterpage.html',
            cache:'false',
            controller: 'PersonalCenterController'
        }).
        when('/newscenter', {   //新闻公告中心
            templateUrl: 'web/features/intelligence/detail/newscenter.html',
            cache:'false',
            controller: 'NewsCenterController as viewModel'
        }).
        when('/newsdetails', {   //新闻公告详情
            templateUrl: 'web/features/intelligence/detail/newsdetails.html',
            cache:'false',
            controller: 'NewsDetailsController as viewModel'
        }).
        when('/aboutwe', {   //关于我们
            templateUrl: 'web/features/aboutwe.html',
            cache:'false',
            controller: 'AboutweController'
        }).
        when('/errorpage', {      //404错误页面
            template: 'this is 404 error',
            cache:'false',
            controller: 'ExampleController'
        }).
        otherwise({
            redirectTo: '/homepage'
        });
        console.log("ng config");
    }]);
