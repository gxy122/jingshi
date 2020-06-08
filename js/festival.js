function regCallbackVal(){
    //console.log("注册改变QRcode");
    $('a.closep').click();
    $('.livebox .tcbtn').hide();
    $('.livebox .lQRcode').show();
    ACT.fun.livebox();
    $("#bm_regbutton").attr({
        'disabled': false,
        'class': 'yl_x_bottom'
    }); //解绑点击按钮，勿删！

    ZY.util.QRcode = function(){
    };
}
function loginCallback(){
    //console.log("登录改变QRcode");
    $('a.closep').click();
    $('.livebox .tcbtn').hide();
    $('.livebox .lQRcode').show();
    ACT.fun.livebox();
}
var  d=$("body").children("div").eq(1);
//d.before('<a href = "javascript:void(0);" data-reg="false,regCallbackVal,loginCallback"  id="zcbtn" style = "display:none;" > 直播注册 </a>');

(function (win, $) {
    function activity() {
        this.activityType("this.init()");
        //this.setTopDiv();
    };
    activity.prototype = {
        init: function () {
            this.fun.new_addbanner.call(this);
        },
        init2: function () {
            this.fun.new_addbanner2.call(this);
        },
        activityType:function(run,run2){
            if(typeof(run2) !== "undefined"){
                var self = this,
                    arr = self.fun.arrremoval(self.data.actUrl2),
                    eLen = arr.length,
                    t = false;
                for (var i = 0; i < eLen; i++) {
                    //console.log(self.fun.urlHref(arr[i].toLowerCase()));
                    if (self.fun.urlHref(arr[i].toLowerCase()) > -1) {
                        t=true;
                        break;
                    }
                }
                if(!!t){
                    return new Function('return '+run2).call(self);
                }else{
                    return new Function('return '+run).call(self);
                }
            }else{
                return new Function('return '+run).call(this);
            }
        },

        // 页面顶部联系我们
        getTopDiv:function(){
            var hrefArr=window.document.getElementsByTagName("*");
            var issign=false;
            for(var i=0;i<hrefArr.length;i++){
                if(hrefArr[i].innerHTML.indexOf("/tranPage") > -1 || hrefArr[i].innerHTML.indexOf("欢迎来到中未") > -1 || hrefArr[i].innerHTML.indexOf("联系中未") > -1){
                    issign=true;
                }
            }
            return issign;
        },
        setTopDiv:function(){
            var self = this;
            var e = self.data.noTopDivUrl,
                eLen = e.length,
                isMatch=false;
            for (var i = 0; i < eLen; i++) {
                if (self.fun.urlHref(e[i].toLowerCase()) > -1) {
                    //console.log(self.fun.urlHref(e[i]))
                    isMatch=true;
                    break;
                }
            }
            if(!this.getTopDiv() && !isMatch){
                if(document.getElementById('abtds') == null){
                    var topDiv=document.createElement("div");
                    topDiv.innerHTML='<div style="background:#f6f6f6;" id="abtds"><div style="width:1100px; height:30px; line-height:30px; text-align:center; margin:0 auto; font-size:12px; color:#999;"><span style="float:left;">欢迎来到中未</span><a href="//www.zhongweijy.com/help2/bzzx.html?id=gywm" target="_blank" style="float:right; color:#999;">联系中未</a></div></div>'
                    var bodyFirstChild=document.body.firstChild;
                    document.body.insertBefore(topDiv,bodyFirstChild);
                }
            }
        },

        //数据部分
        data: {
            //不加顶部联系我们的url
            noTopDivUrl:[
                "zy.zhongweijy.com/wxq_aqgcs_sem_2020_pc/hdym/",
                "zy.zhongweijy.com/wxq_aqgcs_sem_2020_pc/zonghe/",
                "zy.zhongweijy.com/wxq_aqgcs_sem_2020_pc/bmsj/",
                "zy.zhongweijy.com/wxq_aqgcs_sem_2020_pc/cjcx/",
                "zy.zhongweijy.com/wxq_aqgcs_sem_2020_pc/wtk/",
            ],
            // 轮播banner
            lbhtml: "<li class='spring'><div class='wrapper' data-leyu style='cursor:pointer'></div></li>",
            // 没有轮播的banner
            wulbhtml: "<div class='spring'><div class='wrapper' data-leyu style='cursor:pointer'></div></div>",
            // 十周年活动打包
            sznhtml:
                    /*底部横幅*/
                    "<div class='tg_hd_tc tg_zn_hf' style='width:100%;height:156px;background:url(//www.zhongye.net/active/Ten_year_anniversary/images/hf_bg.png)no-repeat center;-webkit-background-size: 1925px 156px;background-size: 1925px 156px;box-sizing: border-box;position: fixed;left: 0;bottom:0;padding-top: 59px;z-index: 21;'><img style='width: 40px;height: 40px;position: absolute;top:-30px;left:calc(50% + 553px);cursor: pointer;' class='close_t' src='https://www.zhongye.net/active/Ten_year_anniversary/images/zn_close02.png' alt=''><a style='display: block;position: absolute;top: 59px;left:calc(50% + 334px);width: 265px;height: 80px;' href='javascript:void(0);' class='tg_zntc'></a></div>"+
                    /*右侧飘窗*/
                    "<div class='tg_hd_tc tg_zn_pc' style='position: fixed;z-index: 21;bottom:340px;right: 100px;'><img class='close_t' style='position: absolute;bottom: -29px;width: 26px;height: 26px;left:calc(50% - 26px/2);cursor: pointer;' src='https://www.zhongye.net/active/Ten_year_anniversary/images/zn_close02.png' alt=''><a class='tg_zntc' style='display: block;width: 100%;height: 100%;' href='javascript:void(0);'><img src='https://www.zhongye.net/active/Ten_year_anniversary/images/tg_pc_bg.png' alt=''></a></div>"+
                    /*弹窗(有乐语)*/
                    "<div class='tg_hd_tc tg_zn_tc tg_zn_tc01' style='width: 1059px;height: 469px;background:url(https://www.zhongye.net/active/Ten_year_anniversary/images/tg_tc_bg01.png)no-repeat center;position: fixed;top:calc(50% - 469px/2);left:calc(50% - 1059px/2);box-sizing: border-box;padding-top: 346px;padding-left: 496px;display: none;z-index: 21;'><img class='close_t' style='position:absolute;left:842px;top:21px;cursor: pointer;' src='https://www.zhongye.net/active/Ten_year_anniversary/images/zn_close02.png' alt=''><a href='javascript:void(0);' style='width: 392px;height: 76px;display: block;' class='ly_t'></a></div>"+
                    /*弹窗(无乐于)*/
                    "<div class='tg_hd_tc tg_zn_tc tg_zn_tc02' style='width: 1059px;height: 469px;background:url(https://www.zhongye.net/active/Ten_year_anniversary/images/tg_tc_bg02.png)no-repeat center;position: fixed;top:calc(50% - 469px/2);left:calc(50% - 1059px/2);box-sizing: border-box;padding-top: 346px;padding-left: 496px;z-index: 21;display: none;'><img class='close_t' style='position:absolute;left:842px;top:21px;cursor: pointer;' src='https://www.zhongye.net/active/Ten_year_anniversary/images/zn_close02.png' alt=''><form onsubmit='return false' style='font-size: 0;' id='tg_zn_form'><input type='hidden' name='intentionId' value='55'><input type='tel' style='display: inline-block;width: 273px;border: 0;box-sizing: border-box;height: 76px;line-height: 76px;padding-left: 38px;color: #fe614c;font-size:26px;background:transparent;-webkit-appearance: none;-moz-appearance: none;outline: none;vertical-align: top;' name='Telephone' placeholder='请输入手机号码' onblur='if(this.placeholder == \"\"){this.placeholder=\"请输入手机号码\";}' onfocus='if(this.placeholder == \"请输入手机号码\"){this.placeholder=\"\";}' autocomplete='off' /><a href='javascript:void(0);' style='display: inline-block;width: 144px;height: 76px;' onclick='javascript:ZY.util.onCheckPhone(\"#tg_zn_form\",\"恭喜成功领取优惠名额，稍后中业老师将第一时间联系你，请保持电话畅通，谢谢。\");'></a></form></div>",

            //直播注册框
            livebox:'<div class="livebox"><div class="lineIn"><a href="javascript:void(0);" class="upleyu">点击咨询活动详情</a><div class="tcbtn"><p><span>注册/登录后</span>立即进入直播间抽奖</p></div><div class="lQRcode" style="display: none;"><img src="http://www.zhongye.net/active/2019518/images/kyCode.png" width="100%" class="Codes"></div></div>',
            //mop:'<div class="mop" style="cursor: pointer;position: fixed;right:5px;top:50%;margin-top: -79px;"><img src="http://www.zhongye.net/active/2019518/images/mop.png"></div>',
            hfhtml: ['<div target="_blank" class = "hf_spring" style = "background: url(http://www.zhongye.net/active/2019518/images/hengfu.jpg) no-repeat center center;height: 100px;cursor:pointer"><div style="width:1200px;margin:0 auto;position: relative;"><a href="javascript:void(0)" style="display:block;width:238px;height: 68px;position: absolute;top:26px;right: 21px"><img src="http://www.zhongye.net/active/2019518/images/hengfua.png" onMouseOver="this.src=\'http://www.zhongye.net/active/2019518/images/hengfuah.png\'" onMouseOut="this.src=\'http://www.zhongye.net/active/2019518/images/hengfua.png\'"></a></div></div>'],
            hfhtml1: ['<div target="_blank" class = "hf_spring" style = "background: url(http://www.zhongye.net/active/2019518/images/hengfu.jpg) no-repeat center center;height: 100px;cursor:pointer" ></div>'],
            plan2_hfhtml:['<div target="_blank" class = "hf_spring" style = "background: url(http://www.zhongye.net/active/2018Double_12_img/plan2/hengfu/hengfu-btn.png) no-repeat center center;height: 100px;cursor:pointer" ></div>'],
            plan2_hfhtml1:['<div target="_blank" class = "hf_spring" style = "background: url(http://www.zhongye.net/active/2018Double_12_img/plan2/hengfu/hengfu.png) no-repeat center center;height: 100px;cursor:pointer" ></div>'],
            selectorDiv: ['.nav', '.header', '.nav2', '.head', '.banner', '.titLog'],
            //jsonp请求数据
            address: [
                "//tg.zhongye.net/jsonadmin/json/jsonData_zyxiaozhan_pc.js?v=" + new Date().getTime()
            ],
            // 参与活动url
            actUrl: [
                'zy.zhongweijy.com/wxq_aqgcs_sem_pc/xzhym/',
                'zy.zhongweijy.com/wxq_yjzjgcs_sem_pc/zh/',
                'zy.zhongweij.com/bj_ejjzs_sem_2019_pc/ceshi/',
                'zy.zhongweij.com/bj_yjjzs_sem_2020_pc/zh0226/',
                'zy.zhongweijy.com/wxq_xfgcs_sem_pc/zh/',
                'zy.zhongweijy.com/wxq_jlgcs_sem_pc/xin/',
                'zy.zhongweijy.com.cn/wxq_yjzjgcs_sem_pc/',
                'zy.zhongweijy.com/wxq_zckjs_sem_2020_pc/lgzonghe/',
                'zy.zhongweijy.com/wxq_flzyks_sem_pc/',
                'zy.zhongweijy.com/wxq_zjkjzc_sem_pc/zonghe/',
                'zy.zhongweijy.com/wxq_sws_sem_pc/leyu/',
                'zy.zhongweijy.com.cn/wxq_aqgcs_sem_2020_pc/hdym/',
                'zy.zhongweijy.com/wxq_ry_sem_2020_pc/xuexi/',
                'zy.zhongweijy.com/wxq_jszgzks_sem_2020_pc/js1/',
                'zy.zhongweijy.com/wxq_yjjzs_sem_pc/',
                'zy.zwzhongwei.com.cn/wxq_ejjzs_sem_pc_2020/',
                'zy.zhongweijy.com/wxq_kyggk_sem_pc/puyan/',
                'zy.zwzhongwei.com.cn/wxq_zcdqgcs_sem_2019_pc/new3/',
                'zy.zwzhongwei.com.cn/wxq_zcdqgcs_sem_pc/new2/',
                'zy.zhongweijy.net/wxq_kyggk_sem_2020_pc/kyzh2/',
                'zy.zhongweijy.com/wxq_zyyaos_sem_pc/leyu/',
                'zy.zhongweijy.com.cn/wxq_ejjzs_sem_2020_pc/zonghe_xg/',
                'zy.zhongweijy.cn/wxq_kyggk_sem_pc/zonghe/',
                'zy.zhongweijy.com/wxq_yasi_2020_sem_pc/xinxi/',
                'zy.zhongweijy.net/sfks/leyu01/',
                'zy.zhongweijy.com.cn/wxq_zjkjzc_sem1_pc2/',
                'zy.zhongweijy.net/wxq_zjkjzc_sem_2020_pc/zh2/',
                'zy.zhongweijy.com.cn/wxq_kyggk_sem_2020_pc/zonghe2020/',
                'zy.zhongweijy.com.cn/wxq_zyyaos_sem_pc/zonghe01/'
            ],

            wdhproject: [
                '//www.zhongye.net/active/2019518/parallel_sessions_wdh/wdh/',
            ],
            wdhproject2: [
                '//www.zhongye.net/active/plan2/wx2018Double_twelve/wxwdh/',
                '//bj.zhongye.net/active/plan2/bjms2018Double_twelve/bjmswdh/',
                '//www.zhongye.net/active/plan2/njms2018Double_twelve/njmswdh/',
                '//www.zhongye.net/active/plan2/shms2018Double_twelve/shmswdh/',
                '//www.zhongyekaoyan.com/active/plan2/ky2018Double_twelve/kywdh/',
                '//www.zhongyegongkao.com/active/plan2/gk2018Double_twelve/gkwdh/',
                '//jinrongjia.zhongye.net/active/plan2/jr2018Double_twelve/jrwdh/',
                '//www.zhongyemba.com/active/plan2/mba2018Double_twelve/mbawdh/',
                '//wx.zhongyemba.com/active/plan2/wxmba2018Double_twelve/wxmbawdh/'
            ],
            //不添加banner的页面
            nobannerUrl:[
                'www.zhongye.net/wxq_zjkjzc_sem_pc/leyu/',
                'www.zhongye.net/wxq_sws_sem_pc/2019peixun/',
                'www.zhongye.net/wxq_ejjzs_sem_pc/',
                'www.zhongyekaoyan.com/wxq_kyggk_sem_pc/puyan/',
                'www.zhongye.net/nj_jlgcs_sem_pc/',
                'www.zhongye.net/sh_jlgcs_sem_pc/'
            ]
        },
        //功能部分
        fun: {
            //注册和登录切换
            hover_tc_net: function (n) {
                var liLength = document.getElementById("tab_bm_").getElementsByTagName("li").length;
                for (var i = 1; i <= liLength; i++) {
                    document.getElementById('tab_bm_' + i).className = 'nor_tc';
                    document.getElementById('tab_bm_0' + i).className = 'undis_tc_net';
                }
                document.getElementById('tab_bm_0' + n).className = 'dis_tc_net';
                document.getElementById('tab_bm_' + n).className = 'nav_ys' + n + ' hovertab_bm';
            },
            //登录head标识
            postLogin: function (obj, isShow) {
                $.post("/AjaxControls/AjaxLoginPage.ashx?v=" + new Date().getTime(), obj, function (data) {
                    if (data != null && data.result == "ok") {
                        if (isShow) {
                            $("#loginwin").hide();
                            $("#logininfowin").show();
                            $("#l_username").html(data.username);
                        } else {
                            $("#logininfowin").hide();
                            $("#loginwin").show();
                        }
                    } else if (data != null && data.result != "nouser") {
                        $("#logininfowin").hide();
                        $("#loginwin").show();
                    }
                    return false;
                }, "json");
            },
            //登录判断
            postLoginButton: function (obj) {
                $.post("/AjaxControls/AjaxLoginPage.ashx", obj, function (data) {
                    if (data != null && data.result == "ok") {
                        alert('登录成功')
                        //window.location.href = '/huodong/xxr/'
                    } else if (data != null && data.result != null) {
                        alert(data.result);
                        return false;
                    }
                    return false;
                }, "json");
            },
            //登录检测
            isLogin: function (boolean, self) {
                var islogin = false;
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/AjaxControls/AjaxLoginPage.ashx?OperatingMode=confirmlogin",
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result == "ok") {
                            //window.location.href = '/huodong/xxr';
                            islogin = true;
                        } else if (data != null && data.result != "nouser") {
                            if (boolean) {
                                self.fun.reg(self);
                            }
                            islogin = false;
                        } else {
                            if (boolean) {
                                self.fun.reg(self);
                            }
                            islogin = false;
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                        return false;
                    }
                });
                return islogin;
            },
            //动态添加活动class
            add_css: function (self) {
                //console.log(self);
                var url = window.location.href
                $(".spring").css({
                    "height": self.data.hei + "px",
                    "backgroundImage": "url('https://www.zhongye.net/active/2019Double_twelve/images/PC-" + self.data.hei + ".jpg')",
                    "backgroundRepeat": "no-repeat",
                    "backgroundSize": "1920px " + self.data.hei + "px",
                    "backgroundPosition": "center center",
                    'cursor': 'pointer'
                });

                $(".spring").css({
                    "height": self.data.hei + "px",
                    "backgroundImage": "url('https://www.zhongye.net/active/2019Double_twelve/images/PC-" + self.data.hei + ".jpg')",
                    "backgroundRepeat": "no-repeat",
                    "backgroundSize": "1920px " + self.data.hei + "px",
                    "backgroundPosition": "center center",
                    'cursor': 'pointer'
                });
                // if (url.indexOf('parameter=leyu11') > -1) {
                //     $(".spring").css({
                //         "height": self.data.hei + "px",
                //         "backgroundImage": "url('www.zhongye.net/active/2019Double_Eleven/images/PC-" + self.data.hei + ".jpg)",
                //         "backgroundRepeat": "no-repeat",
                //         "backgroundSize": "1920px " + self.data.hei + "px",
                //         "backgroundPosition": "center center",
                //         'cursor': 'pointer'
                //     });
                // } else {
                //     $(".spring").css({
                //         "height": self.data.hei + "px",
                //         "backgroundImage": "url(//www.zhongye.net/active/2019Double_Eleven/images/PC-" + self.data.hei + ".jpg)",
                //         "backgroundRepeat": "no-repeat",
                //         "backgroundSize": "1920px " + self.data.hei + "px",
                //         "backgroundPosition": "center center",
                //         'cursor': 'pointer'
                //     });
                // }
                $(".spring .wrapper").css({
                    "width": "1050px",
                    "margin": "0 auto",
                    "position": "relative"
                });

            },
            add_css2: function (self) {
                //console.log(self);
                var url = window.location.href
                if (url.indexOf('parameter=leyu11') > -1) {
                    $(".spring").css({
                        "height": self.data.hei + "px",
                        "backgroundImage": "url(//www.zhongye.net/active/2018Double_12_img/plan2/banner/" + self.data.hei + "px.jpg)",
                        "backgroundRepeat": "no-repeat",
                        "backgroundSize": "1920px " + self.data.hei + "px",
                        "backgroundPosition": "center center",
                        'cursor': 'pointer'
                    });
                } else {
                    $(".spring").css({
                        "height": self.data.hei + "px",
                        "backgroundImage": "url(//www.zhongye.net/active/2018Double_12_img/plan2/banner-btn/" + self.data.hei + "px.jpg)",
                        "backgroundRepeat": "no-repeat",
                        "backgroundSize": "1920px " + self.data.hei + "px",
                        "backgroundPosition": "center center",
                        'cursor': 'pointer'
                    });
                }
                $(".spring .wrapper").css({
                    "width": "1050px",
                    "margin": "0 auto",
                    "position": "relative"
                });

            },
            //轮播执行代码
            springflex: function () {
                //首图切换
                var flexSlider = document.querySelector(".flexslider") || this.getByClassName("flexslider")[0], //兼容dom不存在报错
                    jqFlexSlider = this.getByClassName("", "jquery.flexslider-min.js")[0], //兼容JS不存在报错
                    loopCount = 0;
                jqFlexSlider && flexSlider && $('.flexslider').flexslider({ //只有都存在才会执行后边 flexslider 方法
                    directionNav: true,
                    pauseOnAction: false,
                    animationLoop: true,
                    slideshowSpeed: 5000,
                    after: function (slider) {
                        if (slider.currentSlide == 0) {
                            slider.pause();
                            setTimeout(function () {
                                slider.play();
                            }, 5000);
                        }
                    },
                    start: function (slider) {
                        loopCount++;
                        if (slider.currentSlide == 0 && loopCount == 1) {
                            slider.pause();
                            setTimeout(function () {
                                slider.play();
                            }, 5000);
                        }

                    }
                });
            },
            //轮播图兼容性
            getByClassName: function (ClassName, JsName) {
                if (JsName) {
                    var aEle = document.getElementsByTagName('script');
                    var arr = [];
                    for (var i = 0; i < aEle.length; i++) {
                        if (aEle[i].src.indexOf(JsName) > -1) {
                            arr.push(aEle[i]);
                        }
                    }
                    return arr;
                } else {
                    if (document.getElementsByClassName) {
                        return document.getElementsByClassName(ClassName);
                    } else {
                        var aEle = document.getElementsByTagName('*');
                        var arr = [];
                        for (var i = 0; i < aEle.length; i++) {
                            if (aEle[i].className == ClassName) {
                                arr.push(aEle[i]);
                            }
                        }
                        return arr;
                    }
                }
            },
            //跨域请求jsonp
            get_js: function (get_url, fn) {
                var script = null,
                    xhead = document.getElementsByTagName("head")[0];
                script = document.createElement("script");
                script.type = "text/javascript";
                script.src = get_url;
                var browser = navigator.appName,
                    b_version = navigator.appVersion,
                    version = b_version.split(";"),
                    trim_Version = version[1] ? version[1].replace(/[ ]/g, "") : null;

                if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0" || browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0" || browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0" || browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
                    if (typeof fn === "function") {
                        script.onreadystatechange = function () {
                            var r = script.readyState;
                            if (r === 'loaded' || r === 'complete') {
                                fn.call();
                            }
                        };
                    }
                    xhead.insertBefore(script);
                } else {
                    xhead.insertBefore(script, xhead.firstChild);
                    script.onload = script.onreadystatechange = function () {
                        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                            fn.call();
                        }
                        script.onload = script.onreadystatechange = null;
                    }
                }
            },
            wenjiancss: function (cssUrl) {
                var fileref = document.createElement("link"),
                    list = document.getElementsByTagName("head")[0].childNodes[0];
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", cssUrl);
                if (typeof fileref != "undefined") {
                    document.getElementsByTagName("head")[0].insertBefore(fileref, list);
                }
            },
            //添加统一横幅
            unified_banner: function (num, position, divHengfu, divAlert) {
                var n = $("body").children("div").eq(num);
                //console.log($("body").children(".container").children("div").length);
                //console.log($("body").children("div").length);
                var url = window.location.href;
                if (url.indexOf('www.zhongye.net/wxq_zcjzs_sem_pc/ejbaoming/') >-1 || url.indexOf('www.zhongyekaoyan.com/wxq_emba_sem_pc/')>-1 || url.indexOf('www.zhongyekaoyan.com/wxq_mpa_sem_pc/')>-1 || url.indexOf('www.zhongyekaoyan.com/wxq_mpacc_sem_pc/')>-1) {
                    n = $("body").children("div").eq(num + 5);
                }
                if(url.indexOf('www.zhongyekaoyan.com/wxq_kyggk_sem_pc/puyan/') >-1 || url.indexOf('www.zhongye.net/wxq_zjkjzc_sem_pc/2019new/') >-1){
                    n = $("body").children("div").eq(num-4);
                }

                if(url.indexOf('www.zhongye.net/wxq_zckjs_sem_pc/lgzonghe2') > -1){
                    n = $("body").children(".container").children("div").eq(num-4);
                }
                if(url.indexOf('pz.zhongye.net/wxzsjz/erji_jianzhushi/baoming/') > -1){
                    n = $("body").children("div").eq(num+8);
                }

                if(url.indexOf('www.zhongye.net/nj_aqgcs_sem_pc/new20190410/') > -1 ||
                    url.indexOf('www.zhongye.net/nj_zjgcs_sem_pc/sym/') > -1 ||
                    url.indexOf('www.zhongye.net/nj_yjxfgcs_sem_pc/sym/') > -1 ||
                    url.indexOf('www.zhongye.net/sh_aqgcs_sem_pc/new20190410/') > -1 ||
                    url.indexOf('www.zhongye.net/sh_zjgcs_sem_pc/sym/') > -1 ){
                    n = $("body").children("div").eq(num-6);
                }



                if (position === 'before') {
                    n.before(divHengfu);
                    n.before(divAlert);
                } else {
                    n.after(divHengfu);
                    n.after(divAlert);
                }
            },
            //添加轮播html
            add_html: function (self) {
                var child = $('body').children();
                var html = self.data.sznhtml;
                //无轮播添加banner
                child.eq(0).after(html);
                //self.fun.add_css();
                if(self.fun.urlHref('zy.zhongweijy.com/wxq_xfgcs_sem_pc/zh/')>-1){
                    $('.tg_zn_hf').remove();
                }
            },
            add_html2: function (self) {
                //console.log(self);
                var fle = $('.flexslider');
                if (fle.length > 0) {
                    var htm = self.data.lbhtml;
                    var heig = $('.flexslider ul.slides li').height();
                    //console.log(heig);
                    self.data.hei = heig;
                    //console.log(self.data.hei);
                    if (self.data.hei == 0) {
                        self.data.hei = 600;
                    }
                    var ul = $(".flexslider ul.slides");
                    var sp = $('.spring');
                    if (sp.length > 0) {
                        //console.log(sp);
                        sp.remove();
                        // var first = ul.prepend(htm);
                    }
                    var first = ul.prepend(htm);
                    //console.log(htm);
                    //console.log(self);
                    self.fun.add_css2.call(self, self);
                } else {
                    //console.log("执行到了")
                    var child = $('body').children();
                    self.data.hei = 600;
                    var html = self.data.wulbhtml;
                    //无轮播添加banner
                    child.eq(10).after(html);
                    for (var i = 0; i < self.data.selectorDiv.length; i++) {
                        if ($(self.data.selectorDiv[i]).length > 0) {
                            $('.spring').remove();
                            $(self.data.selectorDiv[i]).after(html);
                            break;
                        }
                    }
                    if(self.fun.urlHref('www.zhongye.net/wxq_flzyks_sem_pc/2019peixun/')>-1){
                        $('.spring').remove();
                        $('.ljfv').after(html);
                    }
                    if(self.fun.urlHref('www.zhongye.net/wxq_zckjs_sem_pc/peixunban/')>-1){
                        $('.spring').remove();
                        $('.header').after(html);
                    }

                    self.fun.add_css2.call(self, self);
                };

            },
            urlIsInArr: function(arr){
                var self=this;
                var len=arr.length;
                for(var i=0;i<len;i++){
                    if(self.fun.urlHref(arr[i])>-1){
                        return true;
                    }
                }
                return false;
            },
            //判断有没有乐语
            isleyu:function(){
                var tagName = document.getElementsByTagName('*'),
                    tagVal = false,
                    val = document.getElementById('leyuOnclick').getAttribute('onclick').indexOf("openChat('g=0')") > -1 ;
                //console.log(val);
                if(val){
                    tagVal = false;
                }else{
                    for (var i = 0; i < tagName.length; i++) {
                        if (tagName[i].outerHTML.indexOf("data-leyu") > -1) {
                            tagVal = true;
                            break;
                        }
                    }
                }
                return tagVal;
            },
            //获取url比较
            urlHref: function (e) {
                var str = location.href.toLowerCase(),
                    strLastLen = str.lastIndexOf("/"),
                    strIndexof = str.indexOf('//'),
                    strVal = str.substring(strIndexof + 2, strLastLen + 1),
                    len = str.indexOf('?'),
                    strArray = ['.html', '.htm'],
                    returnVal = -1,
                    strPar = -1,
                    s;
                if (len > -1) {
                    strVal = str.substring(strIndexof + 2, len);
                }
                for (var i = 0; i < strArray.length; i++) {
                    strPar = str.indexOf(strArray[i]);
                    s = str.substring(strIndexof + 2, strPar + strArray[i].length);
                    if (strPar > -1) {
                        break;
                    }
                }
                if (strPar > -1) {
                    if (len > -1) {
                        if (strVal == e) {
                            returnVal = 0;
                        } else {
                            returnVal = -1;
                        }
                    } else {
                        if (s == e) {
                            returnVal = 0;
                        } else {
                            returnVal = -1;
                        }
                    }
                } else {
                    if (strVal == e) {
                        returnVal = 0;
                    } else {
                        returnVal = -1;
                    }
                }
                return returnVal;
            },
            /* 单独对待一下网页轮播 */
            alongSlide: function () {
                jqFlexSlider && flexSlider && $('.flexslider').flexslider({ //只有都存在才会执行后边 flexslider 方法
                    directionNav: true,
                    pauseOnAction: false,
                    animationLoop: true,
                    slideshowSpeed: 5000,
                    after: function (slider) {
                        if (slider.currentSlide === 1) {
                            $("#mobile1").off('focus blur').on('focus blur', function (e) {
                                if (e.type === 'blur') {
                                    slider.play();
                                    console.log("play");
                                } else {
                                    slider.pause();
                                    console.log("stop");
                                }
                            });
                        }
                    },
                    start: function (slider) {
                        loopCount++;
                        if (slider.currentSlide === 0 && loopCount === 1) {
                            return;
                        }
                    }
                });
            },
            //jsonp请求后的回调
            arrremoval: function (array) {
                var temp = []; //一个新的临时数组
                for (var i = 0; i < array.length; i++) {
                    if (temp.indexOf(array[i]) == -1) {
                        temp.push(array[i]);
                    }
                }
                return temp;
            },
            //判断页面是否已经有某个js
            isHasJs:function(js_name){
                var script = document.getElementsByTagName("script"),
                    scrTrue = false;
                for (var i = 0; i < script.length; i++) {
                    if (script[i].src.indexOf(js_name) > -1) {
                        scrTrue = true;
                        return scrTrue;
                    }
                }
                return scrTrue;
            },
            //直播二维码
            livebox:function(){
                $('.livebox .tcbtn').hide();
                $('.livebox .lQRcode').show();
                var url = window.location.href;
                if (url.indexOf('www.zhongye.net') > -1 || url.indexOf('zhongyezikao.com') > -1 || url.indexOf('zhongyewaiyu.com') > -1 || url.indexOf('zhongyeyuyan.com') > -1)  {
                    $('.lQRcode .Codes').attr('src','http://www.zhongye.net/active/2019518/images/wxCode.png');
                }
                if (url.indexOf('jinrongjia.zhongye.net') > -1) {
                    $('.lQRcode .Codes').attr('src','http://www.zhongye.net/active/2019518/images/jrCode.png');
                }
                if (url.indexOf('www.zhongyegongkao.com') > -1) {
                    $('.lQRcode .Codes').attr('src','http://www.zhongye.net/active/2019518/images/gkCode.png');
                }
                if (url.indexOf('www.zhongyekaoyan.com') > -1 || url.indexOf('www.zhongyemba.com') > -1) {
                    $('.lQRcode .Codes').attr('src','http://www.zhongye.net/active/2019518/images/kyCode.png');
                }
                if (url.indexOf('bj.zhongye.net') > -1 || url.indexOf('www.ccedu24.com') > -1 || url.indexOf('www.zhongye.org.cn') > -1) {
                    $('.lQRcode .Codes').attr('src','http://www.zhongye.net/active/2019518/images/msCode.png');
                }
            },
            runAct: function(){
                var self = this;
                var arr = self.fun.arrremoval(self.data.actUrl);
                // console.log(arr)
                var e = arr,
                    eLen = e.length;
                var activity_timer = new Timer({
                    id: "",
                    server:1,
                    endtime: "2020/05/01 00:00:00", //活动开始时间
                    show: function (id, d, h, m, s, ms, nowtime) {
                        // 没到endtime时间，执行此处代码，没到活动时执行的代码
                        self.fun.springflex();
                    },
                    over: function (id, d, h, m, s, ms, nowtime) {
                        //过了endtime时间，执行此处代码；
                        if (new Date(nowtime) > new Date('2020/05/19 00:00:00')) { //活动结束时间
                            //活动结束后执行的代码

                        } else {
                            //过了开始时间，endtime，活动开始，执行的代码
                            for (var i = 0; i < eLen; i++) {
                                if (self.fun.urlHref(e[i].toLowerCase()) > -1) {
                                    self.fun.add_html(self);

                                    if(self.fun.isleyu()){
                                        $(".tg_zn_tc02").remove()
                                    }else{
                                        $(".tg_zn_tc01").remove()
                                    }

                                    $("body").on("click",".tg_zntc",function () {
                                        $(".tg_zn_tc").show();
                                    }).on("click",".close_t",function () {
                                        $(this).closest(".tg_hd_tc").hide();
                                    }).on("click",".ly_t",function () {
                                        $('#leyuOnclick')[0].click();
                                    });

                                    self.fun.pdurl(self);
                                    break;
                                }
                            }
                        }
                        self.fun.springflex();
                    }
                });
            },
            runAct2: function(){
                var self = this;
                var arr = self.fun.arrremoval(self.data.actUrl);
                // console.log(arr)
                var e = arr,
                    eLen = e.length;
                var activity_timer = new Timer({
                    id: "",
                    server: 1,
                    endtime: "2018/12/03 00:00:00", //活动开始时间
                    show: function (id, d, h, m, s, ms, nowtime) {
                        // 没到endtime时间，执行此处代码，没到活动时执行的代码
                        self.fun.springflex();
                    },
                    over: function (id, d, h, m, s, ms, nowtime) {
                        //过了endtime时间，执行此处代码；
                        if (new Date(nowtime) > new Date('2018/12/13 00:00:00')) { //活动结束时间
                            //活动结束后执行的代码

                        } else {
                            //过了开始时间，endtime，活动开始，执行的代码
                            for (var i = 0; i < eLen; i++) {
                                if (self.fun.urlHref(e[i].toLowerCase()) > -1) {
                                    if ($('.spring').length == 0) {
                                        var url = window.location.href;
                                        if (!self.fun.urlIsInArr.call(self,self.data.nobannerUrl)) {
                                            self.fun.add_html2(self);
                                        }
                                    }
                                    if ($('.hf_spring').length == 0) {
                                        //var index = parseInt(Math.random() * 4);//随机展示横幅
                                        var url = window.location.href;
                                        if (url.indexOf('parameter=leyu11') > -1) {
                                            self.fun.unified_banner(12, 'before', self.data.plan2_hfhtml1[0]);
                                        } else {
                                            self.fun.unified_banner(12, 'before', self.data.plan2_hfhtml[0]); // 添加统一横幅
                                        }
                                    }
                                    self.fun.pdurl2(self);
                                    break;
                                }
                            }
                        }
                        self.fun.springflex();
                    }
                });
            },
            callback: function () {
                var self = this;
                if(self.fun.isHasJs('/news_skin/js/timer.js')){
                    self.fun.runAct.call(self);
                }else{
                    self.fun.get_js("//www.zhongye.net/news_skin/js/timer.js?t=201711081508", function(){
                        self.fun.runAct.call(self);
                    });
                }
            },
            callback2: function () {
                var self = this;
                if(self.fun.isHasJs('/news_skin/js/timer.js')){
                    self.fun.runAct2.call(self);
                }else{
                    self.fun.get_js("//www.zhongye.net/news_skin/js/timer.js?t=201711081508", function(){
                        self.fun.runAct2.call(self);
                    });
                }
            },
            new_addbanner: function () {
                var self = this;
                var url = win.location.href;
                if(self.fun.isHasJs('tg.zhongye.net/jsonadmin/json/')){
                    var num = 0;
                    var getJson = setInterval(function () {
                        num++;
                        if(typeof(callbackJson) !== "undefined"){
                            clearInterval(getJson);
                            self.fun.callback.call(self);
                        }else{
                            num > 200 ?clearInterval(getJson):'';
                        }
                    }, 50);
                }else{
                    self.fun.get_js(self.data.address[0], function () {
                        self.fun.callback.call(self);
                    });
                }
            },
            new_addbanner2: function () {
                var self = this;
                var url = win.location.href;
                if(self.fun.isHasJs('tg.zhongye.net/jsonadmin/json/')){
                    var num = 0;
                    var getJson = setInterval(function () {
                        num++;
                        if(typeof(callbackJson) !== "undefined"){
                            clearInterval(getJson);
                            self.fun.callback2.call(self);
                        }else{
                            num > 200 ?clearInterval(getJson):'';
                        }
                    }, 50);
                }else{
                    self.fun.get_js(self.data.address[0], function () {
                        self.fun.callback2.call(self);
                    });
                }
            },
            pdurl: function (self) {
                var url = win.location.search;
                if(self.fun.isleyu()){
                    $('.spring,.hf_spring,.mop').on('click', function () {
                        $('#leyuOnclick')[0].click();
                    })
                }else{
                    $('.spring,.hf_spring,.mop').on('click', function () {
                        $('#RegOnclick')[0].click();
                    })
                }

                // if (url.indexOf("parameter=leyu11") > -1) {//活动主会场页面进入推广页
                //     $('.spring,.hf_spring,.mop').on('click', function () {
                //         $('#leyuOnclick')[0].click();
                //     })
                // } else {//推广页直接进入活动页
                //     var json = callbackJson;
                //     var eLen = json.DataObj;
                //     for (var i = 0; i < eLen.length; i++) {
                //         var o = eLen[i];
                //         if (self.fun.urlHref(o.url.toLowerCase()) > -1) {
                //             // console.log(o.url);
                //             var url = location.href;
                //             // console.log(LikeClass, url);
                //             var leyuId = o.leyuId;
                //             var leyuGroupId = o.leyuGroupId;
                //             $('.spring,.hf_spring').on('click', function () {
                //                 var LikeClass = $('#LikeClass').val();
                //                 var dqId = $('#daquid').val();
                //                 var href = self.data.wdhproject[0] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId
                //                 // if (url.indexOf('bj.zhongye.net') > -1 || url.indexOf('www.ccedu24.com') > -1 || url.indexOf('www.zhongye.org.cn') > -1) {
                //                 //     var href = self.data.wdhproject[1] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId
                //                 // } else if(url.indexOf('nj') > -1 && dqId == 3377){
                //                 // 	var href = self.data.wdhproject[2] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId
                //                 // } else if(url.indexOf('sh') > -1 && dqId == 3378){
                //                 // 	var href = self.data.wdhproject[3] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId
                //                 // } else{
                //                 // 	var href = self.data.wdhproject[0] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId
                //                 // }
                //                 var html = '<a target="_blank" href = "javascript:void(0);" id ="urlJump" style = "display:none;" > url跳转按钮 </a>'
                //                 $('body,html').append(html);
                //                 $('#urlJump').attr('href', href);
                //                 $('#urlJump')[0].click();
                //             })
                //         }
                //     }
                // }
            },
            pdurl2: function (self) {
                var url = win.location.search;
                if (url.indexOf("parameter=leyu11") > -1) {//活动主会场页面进入分页面
                    $('.spring,.hf_spring').on('click', function () {
                        $('#leyuOnclick')[0].click();
                    })
                } else {
                    var json = callbackJson;
                    var eLen = json.DataObj;
                    for (var i = 0; i < eLen.length; i++) {
                        var o = eLen[i];
                        if (self.fun.urlHref(o.url.toLowerCase()) > -1) {
                            // console.log(o.url);
                            var url = location.href;
                            // console.log(LikeClass, url);
                            var leyuId = o.leyuId;
                            var leyuGroupId = o.leyuGroupId;
                            var likeClass=o.likeClassId;
                            var daquid=o.daquId;
                            $('.spring,.hf_spring').on('click', function () {
                                if( url.indexOf('bj.zhongye.net') > -1 || url.indexOf('www.zhongye.org.cn') > -1 || url.indexOf('www.ccedu24.com') > -1 ){
                                    var href = self.data.wdhproject2[1] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('nj') > -1 && daquid == 3377 ) {
                                    var href = self.data.wdhproject2[2] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('sh') > -1 && daquid == 3378 ){
                                    var href = self.data.wdhproject2[3] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('www.zhongyekaoyan.com') > -1 ){
                                    var href = self.data.wdhproject2[4] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('www.zhongyegongkao.com') > -1 ){
                                    var href = self.data.wdhproject2[5] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('jinrongjia.zhongye.net') > -1 ){
                                    var href = self.data.wdhproject2[6] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('www.zhongyemba.com') > -1 ){
                                    var href = self.data.wdhproject2[7] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else if( url.indexOf('wx.zhongyemba.com') > -1 ){
                                    var href = self.data.wdhproject2[8] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }else{
                                    var href = self.data.wdhproject2[0] + '?lyid=' + leyuId + '&lyGroupId=' + leyuGroupId + '&LikeClass=' + likeClass + '&daquid=' + daquid;
                                }
                                var html = '<a target="_blank" href = "javascript:void(0);" id ="urlJump" style = "display:none;" > url跳转按钮 </a>'
                                $('body,html').append(html);
                                $('#urlJump').attr('href', href);
                                $('#urlJump')[0].click();
                            })
                        }
                    }
                }
            }
        }
    };
    win.ACT = new activity();
})(window, $)
