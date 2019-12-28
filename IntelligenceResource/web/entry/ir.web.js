/**
 * Created by Lucien on 2017/3/2.
 */

var AjaxUtilObj = require("web/common/ajax-util.js").sharedAjaxUtilInstance;
var ajaxConfig = require("web/common/ajax-config.js").ajaxConfigExternal;

angular.module('myweb', ['ngAnimate', 'myweb.controllers', 'myweb.services'])
    .run(function ($rootScope, $timeout, GlobalStorageService, $http) {
        if (window.login_mark) {
            GlobalStorageService.setLoginMark(true);
        }
        console.log("ng run");
    });
