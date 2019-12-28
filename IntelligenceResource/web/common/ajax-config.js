/**
 * 此文件用于提供网络接口配置方案
 */
(function() {
    /* 外网地址 */
    var ajaxConfigExternal = {
        BASE_URL: 'http://112.74.106.226:80/IntelligenceRes',
        ALL_URL: 'http://112.74.106.226:80/IntelligenceRes',
        FILEWEB_URL:'http://112.74.106.226:80/fileweb',
        //FILEWEB_URL:'http://127.0.0.1:8887/fileweb',

        exampleurl:'/public/moa.nsf/GetTyInfor',
        getLoginAuthUrl:'/h5/CommonUser/commonuserlogin',
        registerUserUrl:'/h5/CommonUser/commonuserregister',

        /* 搜索工作页面 */
        getJobListByJobCateUrl:'/h5/searchJobList/getJobListByJobCate',  //根据工作类别获取工作列表
        getJobListByConditionsUrl:'/h5/searchJobList/getJobListByCondition',   /* 根据搜索条件过去工作类表页面 */
        getRecentlyViewedUrl:'/h5/searchJobList/getRecentlyViewed',   //获取三条当前用户最近浏览的工作

        //获取工作类别
        getJobCategoryUrl:'/h5/home/getJobCates',
        getHotSearchUrl: '/h5/home/getHotSearch',
        getRecommendJobsUrl:'/h5/home/getRecommendJobs',
        getHotJobsUrl:'/h5/home/getHotJobs',
        getRecentlyJobsUrl:'/h5/home/getRecentlyJobs',

        getJobDetailUrl:'/h5/jobdetail/getJobDetail',    /* 获取职位详情 */
        getMostUsefulJobAppraiseUrl:'/h5/jobdetail/getMostUsefulAppraise',    /* 获取最有用的一条工作评价 */

        /* 公司部分 */
        getCompanyBaseInforUrl:'/h5/parkcompany/getParkCompanyInfor',
        getRecuriteJobsUrl:'/h5/parkcompany/getRecruiteJobList',
        getCompanyQuestionsUrl:'/h5/parkcompany/getComQuestions',
        askQuestionActionUrl:'/h5/parkcompany/askQuestionAction',

        /* 问题回复页面 */
        getReplyQuestionUrl:'/h5/reply/getAllReply',
        replyActionUrl:'/h5/reply/replyAction',
        getQuestionDetailUrl:'/h5/reply/getQuestionDetail',

        /* 个人中心页面 */
        getPersonalInforUrl:'/h5/CommonUser/getPersonalInfor',
        modifyPersonalInforUrl:'/h5/CommonUser/modifyPersonalInfor',
        modifyPasswordUrl:'/h5/CommonUser/modifyPassword',
        uploadAttachmentUrl:'/upload',
        saveAttachmentUrl:'/h5/CommonUser/saveAttachment',
        getFileStreamUrl:'/h5/CommonUser/getFileStream',

        /* 新闻页面 */
        getNewsListUrl:'/h5/news/getNewsList',
        getNewsDetailsUrl:'/h5/news/getNewsDetails',

        /* 投递简历 */
        sendResumeUrl:'/h5/interview/sendResumeAction',

        /* 消息推送 */
        getMessageListUrl:'/h5/message/getNoReadMessageList',
        readMessageActionUrl:'/h5/message/readMessageAction',

        approveJobAppraiseUrl:'/h5/moreAppraise/approveJobAppraise'    /* 点赞评价 */
    };

    /* 内网地址 */
    var ajaxConfigInternal = {
        BASE_URL: 'http://112.74.106.226:80/IntelligenceRes',
        ALL_URL: 'http://112.74.106.226:80/IntelligenceRes',
        FILEWEB_URL:'HTTP://112.74.106.226:80/fileweb',
        //FILEWEB_URL:'http://127.0.0.1:8887/fileweb',

        AttachmentDownloadUrl:'http://127.0.0.1:/',

        exampleurl:'/public/moa.nsf/GetTyInfor',
        getLoginAuthUrl:'/CommonUser/commonuserlogin',
        registerUserUrl:'/CommonUser/commonuserregister',

        /* 搜索工作页面 */
        getJobListByJobCateUrl:'/h5/searchJobList/getJobListByJobCate',  //根据工作类别获取工作列表
        getJobListByConditionsUrl:'/h5/searchJobList/getJobListByCondition',   /* 根据搜索条件过去工作类表页面 */
        getRecentlyViewedUrl:'/h5/searchJobList/getRecentlyViewed',   //获取三条当前用户最近浏览的工作

        //获取工作类别
        getJobCategoryUrl:'/h5/home/getJobCates',
        getHotSearchUrl: '/h5/home/getHotSearch',
        getRecommendJobsUrl:'/h5/home/getRecommendJobs',
        getHotJobsUrl:'/h5/home/getHotJobs',
        getRecentlyJobsUrl:'/h5/home/getRecentlyJobs',

        /* 工作页面部分 */
        getJobDetailUrl:'/h5/jobdetail/getJobDetail',    /* 获取职位详情 */
        getMostUsefulJobAppraiseUrl:'/h5/jobdetail/getMostUsefulAppraise',    /* 获取最有用的一条工作评价 */

        /* 公司部分 */
        getCompanyBaseInforUrl:'/h5/parkcompany/getParkCompanyInfor',
        getRecuriteJobsUrl:'/h5/parkcompany/getRecruiteJobList',
        getCompanyQuestionsUrl:'/h5/parkcompany/getComQuestions',
        askQuestionActionUrl:'/h5/parkcompany/askQuestionAction',

        /* 问题回复页面 */
        getReplyQuestionUrl:'/h5/reply/getAllReply',
        replyActionUrl:'/h5/reply/replyAction',
        getQuestionDetailUrl:'/h5/reply/getQuestionDetail',

        /* 个人中心页面 */
        getPersonalInforUrl:'/h5/CommonUser/getPersonalInfor',
        modifyPersonalInforUrl:'/h5/CommonUser/modifyPersonalInfor',
        modifyPasswordUrl:'/h5/CommonUser/modifyPassword',
        uploadAttachmentUrl:'/upload',
        saveAttachmentUrl:'/h5/CommonUser/saveAttachment',
        getFileStreamUrl:'/h5/CommonUser/getFileStream',

        /* 新闻页面 */
        getNewsListUrl:'/h5/news/getNewsList',
        getNewsDetailsUrl:'/h5/news/getNewsDetails',

        /* 投递简历 */
        sendResumeUrl:'/h5/interview/sendResumeAction',

        /* 消息推送 */
        getMessageListUrl:'/h5/message/getNoReadMessageList',
        readMessageActionUrl:'/h5/message/readMessageAction',

        approveJobAppraiseUrl:'/h5/moreAppraise/approveJobAppraise'    /* 点赞评价 */
    };

    exports.ajaxConfigExternal = ajaxConfigExternal;
    exports.ajaxConfigInternal = ajaxConfigInternal;
}());