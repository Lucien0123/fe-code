(function () {

    angular.module('myweb.services').factory('GlobalStorageService', GlobalStorageService);

    function GlobalStorageService() {
        var GlobalStorage = function () {
            var self = this;
            var username = '';   //当前登录帐号的用户名帐号
            /* 查找工作列表的条件 */
            var jobName = '';
            var jobSalary = '';
            var workPosition = '';
            var workExpression = '';
            var education = '';
            var companyName = '';
            var worktype = '';

            var searchCondition = '';   /* 查询条件，根据名字查找 */
            var jobId = '';   /* 当前查看工作的id */
            var job = {};     /* 当前查看的工作 */
            var jobCate = {}; /* 从主页进入时，当前所选择的工作类别 */

            var comId = '';   /* 当前查看的公司的id */
            var question = {};/* 当前查看的问题 */

            var news = {};    /* 当前查看的新闻 */

            var show = [];    /* 显示首页，公告，关于我们标签 */

            var messageList = [];

            var questionId = '';

            /* getter和setter方法 */
            self.setJobId = function (jobid) {
                jobId = jobid;
            }
            self.getJobId = function () {
                return jobId;
            }

            self.setUsername = function (user) {
                username = user;
            }
            self.getUsername = function () {
                return username;
            }

            self.setJobName = function (jobname) {
                jobName = jobname;
            }
            self.getJobName = function () {
                return jobName;
            }

            self.setJobSalary = function (jobsalary) {
                jobSalary = jobsalary;
            }
            self.getJobSalary = function () {
                return jobSalary;
            }

            self.setWorkPosition = function (workposition) {
                workPosition = workposition;
            }
            self.getWorkPosition = function () {
                return workPosition;
            }

            self.setWorkExpression = function (workexpression) {
                workExpression = workexpression;
            }
            self.getWorkExpression = function () {
                return workExpression;
            }

            self.setEducation = function (educationparam) {
                education = educationparam;
            }
            self.getEducation = function () {
                return education;
            }

            self.setCompanyName = function (companyname) {
                companyName = companyname;
            }
            self.getCompanyName = function () {
                return companyName;
            }

            self.setWorktype = function (worktypeparam) {
                worktype = worktypeparam;
            }
            self.getWorktype = function () {
                return worktype;
            }

            self.setSearchCondition = function (condition) {
                searchCondition = condition;
            }
            self.getSearchCondition = function () {
                return searchCondition;
            }

            self.setJobCate = function (cate) {
                jobCate = cate;
            }
            self.getJobCate = function () {
                return jobCate;
            }

            self.setComId = function (id) {
                comId = id;
            }
            self.getComId = function () {
                return comId;
            }

            self.setQuestion = function (q) {
                question = q;
            }
            self.getQuestion = function () {
                return question;
            }

            self.setJob = function (job1) {
                job = job1;
            }
            self.getJob = function () {
                return job;
            }

            self.setNews = function (newss) {
                news = newss;
            }
            self.getNews = function () {
                return news;
            }

            self.setShow = function (showw) {
                show = showw;
            }
            self.getShow = function () {
                return show;
            }

            self.setMessageList = function (list1) {
                messageList = list1;
            }
            self.getMessageList = function () {
                return messageList;
            }

            self.setQuestionId = function (qid) {
                questionId = qid;
            }
            self.getQuestionId = function () {
                return questionId;
            }

        };
        return new GlobalStorage();
    }
}());
