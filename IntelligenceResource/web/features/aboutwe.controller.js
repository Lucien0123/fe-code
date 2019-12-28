/**
 * Created by Lucien on 2017/3/2.
 */

var ajaxUtilObj = require("../common/ajax-util.js").sharedAjaxUtilInstance;
var business_ir = require("../common/bussiness-ir").bussiness_IR;
var irModel = require("../common/ir-model.js").irModel;
var ajaxConfig = require("../common/ajax-config.js").ajaxConfigExternal;

irModel = Object.create(irModel);

angular.module('myweb.controllers').controller('AboutweController', ['$scope', '$location', '$rootScope', 'GlobalStorageService', AboutweControllerCtrl]);

function AboutweControllerCtrl($scope, $location, $rootScope, GlobalStorageService) {
    //将变量定义在self中，仅能被本controller和对应的页面访问到
    var self = this;
    console.log("this is AboutweController");

}
