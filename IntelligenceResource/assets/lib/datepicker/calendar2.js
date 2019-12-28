(function () {
    var CalendarObj = function(){
        var t = 2013;//年 默认值没用到
        var n = 9;//月 默认值没用到
        var day = 1;//日 默认值没用到
        var week = 1;//星期几 默认值没用到
        var r = [];
        //var i = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        var s = ["日", "一", "二", "三", "四", "五", "六"];

        var self = this;
        var scheduleFun;
        self.setScheduleFun = function(fun){
            scheduleFun = fun;
        };

        self.draw = function(date){
            console.log(date);
            if(!date){
                date = new Date;
            }
            self.setSelectDay(date);
            drawCeil();
            drawScheduleList(date);
            setCeilOnclick();
        };

        self.setSelectDay = function(date){
            t = date.getFullYear();
            n = date.getMonth() + 1;
            day = date.getDate();
            week = date.getDay();
            $('#calendar_head_date_company').html(t+"年"+n+"月"+day+"日");
            //$('#calendar_head_date').date(null, Ycallback);
        };

        /**
         * 左滑动事件
         */
        self.onDragLeft = function(){
            if(n==12){
                t += 1;
                n = 1;
                day = 1;
            }else{
                n += 1;
                day = 1;
            }
            self.draw(new Date(t+"-"+n+"-"+day));
        };

        /**
         * 右滑动事件
         */
        self.onDragRight = function(){
            if(n==1){
                t -= 1;
                n = 12;
                day = 1;
            }else{
                n -= 1;
                day = 1;
            }
            self.draw(new Date(t+"-"+n+"-"+day));
        };

        /**
         * 向上滑动
         */
        self.onDragUp = function(){
            var selectRow = $("div[class='col today select']").parent();
            var selectDivRow = $(".full_date .row");//显示当前选择日期的标签
            var allRows = $("#calendar_content_company .row");
            $.each(allRows, function(i,v){
                if($(v).html()!=selectRow.html() && $(v).html()!=selectDivRow.html()){
                    $(v).addClass("rowDisplayNone");
                }
            });
        };

        /**
         * 向下滑动
         */
        self.onDragDown = function(){
            var displayRows = $("div [class='row rowDisplayNone']");
            $.each(displayRows, function(i, v){
                $(v).removeClass("rowDisplayNone");
            });
        };

        /**
         * 成功选择年月日回调
         * @param dateStr
         * @constructor
         */
        function Ycallback(dateStr){
            var result = new Date(dateStr);
            self.draw(result);
        }

        /**
         * 列出某天的日程列表
         * @param date
         */
        function drawScheduleList(date){
            //console.log(scheduleFun);
            //var dayStr = t+"年"+n+"月"+day+"日";
            if(scheduleFun){
                scheduleFun.getScheduleList(date);
            }
        }

        /**
         * "天"的点击事件
         */
        function setCeilOnclick(){
            $("div[class='col day']").on('click',function(){
                //console.log($(this).html())
                var dayStr = $(this).find(".solar_calendar").html();
                var selectDate = new Date(t+"-"+n+"-"+dayStr);
                self.draw(selectDate);
            });
        }

        /**
         * 绘制每天格子
         */
        function drawCeil() {
            //console.log("1 c() start");
            drawWeekHead();
            var e = countDaysPerMonth();
            var r = 0;
            var u = false;
            $("#calendar_content_company").empty();

            var row = '<div class="row">';
            while (!u) {
                if (s[r] == e[0].weekday) {
                    u = true
                } else {
                    row += '<div class="col blankday"></div>';
                    r++;
                }
            }

            var endBlankFlag = false;
            for (var c = 0; c < 42 - r; c++) {
                //console.log("c="+c);
                if (c >= e.length) {//拼结尾空格
                    if(!endBlankFlag){
                        //console.log("r="+r+";c="+c);
                        //console.log("(r+c)%7="+(r+c)%7);
                        if((r+c)%7 != 0){
                            row += '<div class="col blankday"></div>';
                            if(c==42-r-1){
                                row += "</div>";
                            }
                        }else{
                            endBlankFlag = true;
                            row += '</div>';
                        }
                    }
                } else {
                    var v = e[c].day;
                    if((r+c)/7!=0 && (r+c)%7 == 0){
                        //console.log("row row v="+v)
                        row += '</div><div class="row">';
                    }

                    //var m = g(new Date(t, n - 1, v)) ? '<div class="col today select"><div class="round">' : '<div class="col day"><div class="round">';
                    var m = v==day ? '<div class="col today select"><div class="round">' : '<div class="col day"><div class="round">';
                    var div_gongli = '<div class="solar_calendar">' + v + '</div>';
                    var div_nongli = '<div class="lunar_calendar">' + showCal(new Date(t+"-"+n+"-"+v)) + '</div>';

                    row += m;
                    row += div_gongli;
                    row += div_nongli;
                    row += '</div></div>';

                }
            }

            row += drawCurDiv();
            console.log(row)
            $("#calendar_content_company").append(row);
        }

        /**
         * 计算当前年月有多少天
         * @returns {Array}
         */
        function countDaysPerMonth() {
            var e = [];
            for (var r = 1; r < v(t, n) + 1; r++) {
                e.push({day: r, weekday: s[m(t, n, r)]})
            }
            return e;
        }

        /**
         * 绘制日程列表上边的当前日期
         * @returns {string}
         */
        function drawCurDiv(){
            var str = t+"年"+n+"月"+day+"日"+" "+"周"+s[week];
            var curStr = g(new Date(t, n - 1, day)) ? '(今天)':'';
            str += curStr;
            var html = '<div class="full_date">'
                +'<div class="row">'
                +'<div class="col col-60 time">'
                +str
                +'</div>'
                +'</div>'
                +'</div>';

            //console.log("html="+html);
            return html;
        }

        /**
         * 绘制周的头部汉字
         */
        function drawWeekHead() {
            $("#calendar_weekdays_company").empty();
            for (var e = 0; e < 7; e++) {
                $("#calendar_weekdays_company").append("<div class='col'>" + s[e].substring(0, 3) + "</div>");
            }
        }

        function v(e, t) {
            return (new Date(e, t, 0)).getDate();
        }

        function m(e, t, n) {
            return (new Date(e, t - 1, n)).getDay();
        }

        function g(e) {
            return y(new Date) == y(e);
        }

        function y(e) {
            return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
        }

    };
    exports.CalendarObj = new CalendarObj();

}());