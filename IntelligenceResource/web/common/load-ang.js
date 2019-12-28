/**
 * Created by Lucien on 2017/3/2.
 * 加载angular模块
 * 定义window范围内的变量
 */
(function () {

    /* 启动web，记载angular模块 */
    window.username = '';
    window.login_mark = '';
    //window.downAccessPath='http://127.0.0.1:8887/fileweb/download';
    window.downAccessPath='http://112.74.106.226:80/fileweb/download';
    window.goeasycode = 'BC-b36ef80fe7a846ae856493508a5c5c0e';

    /* 在登录之前作认证，通过访问指定接口，封装cookie, */
    function AuthLogin() {
        console.log("我在这里做了登录前的认证，防止通过接口直接获取数据");
        console.log("加载angular的模块");
        angular.bootstrap(document.body, ['myweb']);  //将页面加入到angular控制
    }
    AuthLogin();
})();
