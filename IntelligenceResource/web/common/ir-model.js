/**
 * Created by Lucien on 2017/3/2.
 * 智力资源ajax请求model
 * 立即函数
 */
(function () {
    var irModel = function () {
        var self = this;

        /*  */
        self.example = {
            login_name: '',
            password: ''
        };

        /* 获取热门搜索类别 */
        self.getHotSearchModel = {};

        /* 获取多有的工作类别 */
        self.getJobCategoryModel = {

        };

        /* 根据工作条件搜索工作，可能包含多种工作条件结合搜索 */
        self.getJobListByConditionsModel = {
            jobName: '',
            jobSalary: '',
            workPosition: '',
            workExpression: '',
            education: '',
            worktype: '',
            jobCate: '',
            pageNumber: ''
        };

        /* 根据用户输入的搜索框内容进行搜索 */
        self.getJobListBySearchConditionModel = {
            searchCondition: ''
        }

        /* 根据用户选择的工作类别获取工作列表 */
        self.getJobListByJobCateModel = {
            jobCate: '',
            pageNumber: '',
            pageSize: '10'
        }

        /* 登录认证 */
        self.getLoginAuthModel = {
            account: '',
            password: ''
        };

        /* 用户注册 */
        self.registerUserModel = {
            account: '',
            password: ''
        };

        /* 修改密码 */
        self.modifyPasswordModel = {
            account: '',
            password: '',
            oldpsw:''
        };

        /* 修改个人信息 */
        self.modifyPersonalInforModel = {
            account: '',
            realname: '',
            gender: '',
            occupation: '',
            personalDesc: '',
            telphone:'',
            headPortrait: ''
        };

        /* 获取首页的推荐，热门，最新工作列表各十条 */
        self.getRecHotRecJobsModel = {
            jobsType: ''
        }

        /* 获取工作详情 */
        self.getJobDetailModel = {
            account:'',
            jobId: ''
        }

        /* 获取新闻公告列表 */
        self.getNewsListModel = {

        }

        /* 获取新闻公告详情 */
        self.getNewsDetailsModel = {
            newsId:''
        }

        /* 获取最有用的一条工作评价 */
        self.getMostUsefulJobAppraiseModel = {
            jobId: ''
        }

        /* 获取当前用户的推送信息列表 */
        self.getMessageListModel = {
            account:''
        }

        /* 阅读推送消息操作 */
        self.readMessageActionModel = {
            account:'',
            id:''
        }

        /* 上传附件简历 */
        self.uploadAttachmentModel = {
            userId:'',
            textFile:''
        }

        /* 保存附件路径 */
        self.saveAttachmentModel = {
            account:'',
            filePath:'',
            fileName:''
        }

        /* 投递简历操作 */
        self.sendResumeModel = {
            account:'',
            jobId:''
        }

        /* 点赞 */
        self.approveJobAppraiseModel = {
            appraiseId: ''
        }

        /* 获取三条最近浏览 */
        self.getRecentlyViewedModel = {
            username: ''
        }

        /* 获取公司的基本信息 */
        self.getCompanyBaseInforModel = {
            companyId: ''
        }

        /* 获取公司正在招聘的列表 */
        self.getRecuriteJobsModel = {
            companyId : ''
        }

        /* 获取公司问答中心问题列表 */
        self.getCompanyQuestionsModel = {
            companyId : ''
        }

        /* 获取问题详情 */
        self.getQuestionDetailModel = {
            questionId:''
        }

        /* 在公司页面的提问操作 */
        self.askQuestionActionModel = {
            comId:'',
            userId:'',
            quesContent:''
        }

        /* 获取问题的所有回复 */
        self.getReplyQuestionModel = {
            id:''
        }

        /* 获取个人信息 */
        self.getPersonalInforModel = {
            account:''
        }

        /* 回复操作 */
        self.replyActionModel = {
            replier:'',
            beReplier:'',
            beReplierAccount:'',
            replyContent:'',
            replyType:'',
            account:'',
            questionId:'',
            firCommentId:'',
            replierAccount:''
        }

        self.returnJson = [{}];
        self.returnHtml = '';
    };
    exports.irModel = new irModel();
}());
