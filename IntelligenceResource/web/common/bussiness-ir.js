/**
 * Created by Lucien on 2017/3/2.
 */

(function () {

    /* bussiness Intelligence resource */
    var ajaxUtilObj = require("./ajax-util.js").sharedAjaxUtilInstance;
    var ajaxConfig = require("./ajax-config.js").ajaxConfigExternal;

    var bussiness_IR = function () {

        var self = this;

        /**
         * 例子
         */
        self.getOverTodo = function (params) {

            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.exampleurl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        };

        /* 用户登录请求 */
        self.getLoginAuthMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getLoginAuthUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        };

        /* 用户注册请求 */
        self.registerUserMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.POST(ajaxConfig.BASE_URL + ajaxConfig.registerUserUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取热门搜索类别 */
        self.getHotSearchMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getHotSearchUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取所有的工作类别 */
        self.getJobCategoryMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getJobCategoryUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取推荐工作列表10条 */
        self.getRecommendJobsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getRecommendJobsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取热门工作列表10条 */
        self.getHotJobsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getHotJobsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }


        /* 获取最新工作列表10条 */
        self.getRecentlyJobsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getRecentlyJobsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取当前用户最近浏览过的三条工作 */
        self.getRecentlyViewedMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getRecentlyViewedUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 根据工作类别获取工作列表 */
        self.getJobListByJobCateMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getJobListByConditionsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 根据搜索条件查询工作列表 */
        self.getJobListByConditionsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getJobListByConditionsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 根据jobId获取工作的详情 */
        self.getJobDetailMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getJobDetailUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取最有用的一条工作评价 */
        self.getMostUsefulJobAppraiseMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getMostUsefulJobAppraiseUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 公司-获取公司的基本信息 */
        self.getCompanyBaseInforMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getCompanyBaseInforUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 公司-获取公司正在招聘的列表 */
        self.getRecuriteJobsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getRecuriteJobsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 公司-获取公司问答中心问题列表 */
        self.getCompanyQuestionsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getCompanyQuestionsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取问答页面所有回复 */
        self.getReplyQuestionMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getReplyQuestionUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取问题详情 */
        self.getQuestionDetailMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getQuestionDetailUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取个人信息 */
        self.getPersonalInforMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getPersonalInforUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }
        /* 修改个人信息 */
        self.modifyPersonalInforMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.modifyPersonalInforUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 修改密码 */
        self.modifyPasswordMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.modifyPasswordUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取新闻公告列表 */
        self.getNewsListMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getNewsListUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取新闻公告详情 */
        self.getNewsDetailsMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getNewsDetailsUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取当前登录用户的推送消息列表 */
        self.getMessageListMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.getMessageListUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 阅读推送消息操作 */
        self.readMessageActionMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.POST(ajaxConfig.BASE_URL + ajaxConfig.readMessageActionUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 回复问题操作 */
        self.replyActionMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.POST(ajaxConfig.BASE_URL + ajaxConfig.replyActionUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 获取文件流 */
        self.getFileStreamMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.uploadajax(ajaxConfig.BASE_URL + ajaxConfig.getFileStreamUrl, 'POST', params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }


        /* 上传附件操作 */
        self.uploadAttachmentMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.uploadajax(ajaxConfig.FILEWEB_URL + ajaxConfig.uploadAttachmentUrl, 'POST', params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 保存附件下载路径 */
        self.saveAttachmentMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.POST(ajaxConfig.BASE_URL + ajaxConfig.saveAttachmentUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 投递简历操作 */
        self.sendResumeMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.POST(ajaxConfig.BASE_URL + ajaxConfig.sendResumeUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 提问操作 */
        self.askQuestionActionMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.POST(ajaxConfig.BASE_URL + ajaxConfig.askQuestionActionUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }

        /* 点赞操作 */
        self.approveJobAppraiseMethod = function (params) {
            var deferred = $.Deferred();
            ajaxUtilObj.GET(ajaxConfig.BASE_URL + ajaxConfig.approveJobAppraiseUrl, params).then(function (result_data) {
                deferred.resolve(result_data);
            }, function (ret) {
                deferred.reject(ret);
            });

            return deferred.promise();
        }
    }

    exports.bussiness_IR = new bussiness_IR();

}());
