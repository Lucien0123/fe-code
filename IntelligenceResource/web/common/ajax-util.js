/**
 * Created by Lucien on 2017/3/2.
 * 定义发送请求的方法GET和POST
 */
(function () {

    /*
     * 主要提供
     *   1.Ajax封装
     *   2.增加pormise封装
     *   3.加载过程中的等待遮罩控制
     * */
    var AjaxUtil = function () {

        var self = this;
        //请求方式
        const METHOD = {
            GET: 'get',
            POST: 'post'
        };

        var toastFun;
        this.setToastFun = function (fun) {
            toastFun = fun;
        };
        this.getToastFun = function () {
            return toastFun;
        };

        /**
         * 用于发送 ajax 请求
         *
         * 参数:
         *  url      需要请求的 URL
         *  method   GET/POST
         *  data     需要请求的 data,格式为 js 对象
         *
         * */
        this.ajax = function (url, method, data) {

            var deferred = $.Deferred();
            var reqOption = {
                url: url,
                data: data,
                type: method,
                timeout: 45000,
                //contentType: 'application/x-www-form-urlencoded',
                //contentType: 'application/json',
                //contentType: 'multipart/form-data',
                //contentType: 'text/html',
                async: true,
                cache: false,
                headers: {},
                beforeSend: function (xhr, settings) {
                },
                success: function (reqdata, status, xhr) {
                    if (reqdata.responsecode == "1") {
                        deferred.resolve(reqdata);
                    }
                    else if (reqdata.responsecode == "0") {
                        deferred.reject(reqdata);
                    }
                    else if (reqdata.responsecode != "undefined") {
                        deferred.reject(reqdata);
                        //console.log("访问失败！");
                        //console.log(data)
                        //console.log(reqdata)
                    }
                    else if (reqdata.responsecode == "undefined") {
                        //console.log(data)
                        deferred.reject(reqdata);
                        //console.log("访问失败！");
                    }
                },
                error: function (xhr, errorType, error) {
                    var err = {
                        xhr: xhr,
                        errorType: errorType,
                        error: error
                    };
                    if (error != null) {
                        deferred.reject(error);
                    } else {
                        deferred.reject(error);
                        showToast(err.errorType + ",请稍后重试", 1500);
                    }
                },
                complete: function (xhr, status) {
                }
            };

            console.dir(reqOption);
            $.ajax(reqOption);

            return deferred.promise();
        }


        /**
         * 文件上传请求
         * @param url
         * @param method
         * @param data
         * @returns {*}
         */
        this.uploadajax = function (url, method, data) {

            var deferred = $.Deferred();
            var reqOption = {
                url: url,
                data: data,
                type: method,
                timeout: 45000,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function (xhr, settings) {
                },
                success: function (reqdata, status, xhr) {
                    if (reqdata.responsecode == "1") {
                        deferred.resolve(reqdata);
                    }
                    else if (reqdata.responsecode == "0") {
                        deferred.reject(reqdata);
                    }
                    else if (reqdata.responsecode != "undefined") {
                        deferred.reject(reqdata);
                        //console.log("访问失败！");
                        //console.log(data)
                        //console.log(reqdata)
                    }
                    else if (reqdata.responsecode == "undefined") {
                        //console.log(data)
                        deferred.reject(reqdata);
                        //console.log("访问失败！");
                    }
                },
                error: function (xhr, errorType, error) {
                    var err = {
                        xhr: xhr,
                        errorType: errorType,
                        error: error
                    };
                    if (error != null) {
                        deferred.reject(error);
                    } else {
                        deferred.reject(error);
                        showToast(err.errorType + ",请稍后重试", 1500);
                    }
                },
                complete: function (xhr, status) {
                }
            };

            console.dir(reqOption);
            $.ajax(reqOption);

            return deferred.promise();
        }
        /*
         * GET 方法
         * */
        this.GET = function (url, data) {
            return this.ajax(url, METHOD.GET, data);
        };

        /*
         * POST 方法
         * */
        this.POST = function (url, data) {
            return this.ajax(url, METHOD.POST, data);
        };
    }
    exports.sharedAjaxUtilInstance = new AjaxUtil();
    exports.AjaxUtil = AjaxUtil;
}());


