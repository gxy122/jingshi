/*
 PC端likeClass,dauqid,leyu基本模块功能
 Edition:v1.0 //2018-03-01
 author:闫亮

 --------------------------------------
 Edition:v2.0 //2018-04-20


 --------------------------------------

 */
;
(function (win, $) {
    function basic_module() {
        var self = this, ObjInitData = {
            "likeclass": "<input type=\"hidden\" id=\"LikeClass\" name=\"LikeClass\" value=\"0\">",
            "daquid": "<input type=\"hidden\" id=\"daquid\" name=\"daquid\" value=\"0\">",
            "leyuGroup": "<a href=\"javascript:void(0);\" onclick=\"javascript:doyoo.util.openChat('g=10076821');return false;\" id=\"leyuOnclick\" style=\"display:none;\">\u4E50\u8BED\u70B9\u51FB\u6309\u94AE</a>",
            "leyuUrl": "soperson.com/20002054/10089553.js",
            "leyooIdUrl": "<script type=\"text/javascript\" src=\"//gate.soperson.com/20002054/10098188.js\"></script>"
        };
        self.init.call(self, ObjInitData);
    }
    basic_module.prototype = {
        init: function (e) {
            var self = this;
            //self.fn.cookie.set("webUrl", win.location.href, 1);//设置为1天过期
            //self.render.InitAjax.apply(self, e);//Ajax请求json并执行对应方法  
            //IE8.0以下兼容bind
            if (!Function.prototype.bind) {
                Function.prototype.bind = function (oThis) {
                    if (typeof this !== "function") {
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    }
                    var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () { }, fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                    };
                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();
                    return fBound;
                };
            }
            //IE9.0一下兼容Object.keys
            if (!Object.keys) {
                Object.keys = function (o) {
                    if (o !== Object(o))
                        throw new TypeError('Object.keys called on a non-object');
                    var k = [], p;
                    for (p in o)
                        if (Object.prototype.hasOwnProperty.call(o, p))
                            k.push(p);
                    return k;
                };
            }
            self.render.requestJson.call(self, e); //跨域请求json
            self.fn.add_css(self.constant.css.regCss); //加载注册弹窗css和新注册弹窗css
            self.util.iframeTag.call(null, self); //自动加载底部iframe高度            
            self.util.postLogin({ OperatingMode: "confirmlogin" }, true); //页面加载完成检测是否登陆
        },
        constant: {
            "json": {
                //url: './json/Data_wx_pc.json'
                //url: "//tg.zhongye.net/jsonadmin/json.asp?leixing=wxpc&v=" + new Date().getTime()
                url: "//tg.zhongye.net/jsonadmin/json/jsonData_zyxiaozhan_pc.js?v=" + new Date().getTime()
            },
            "css": {
                regCss: '//www.zhongye.net/news_skin/css/bm_zhuce.css?v=' + new Date().getTime()
            },
            "htmlDom": {
                regClick: "<a href=\"javascript:void(0);\" onclick=\"javascript:ZY.util.reg();\" id=\"RegOnclick\" style=\"display:none;\">\u6CE8\u518C\u70B9\u51FB\u6309\u94AE</a>",
                regSign: "<a href=\"javascript:void(0);\" onclick=\"javascript:ZY.util.reg(true);\" id=\"RegOnSign\" style=\"display:none;\">\u767B\u5F55\u70B9\u51FB\u6309\u94AE</a>"
            },
            "bindarray": {
                0: ['data-leyu', 'leyuOnclick'],
                1: ['data-reg', 'RegOnclick'],
                2: ['data-regon', 'RegOnSign']
            },
            "MapVal": ['data-map']
        },
        fn: {
            add_css: function (cssUrl) {
                var fileref = document.createElement("link"), list = document.getElementsByTagName("head")[0].childNodes[0];
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                if (typeof cssUrl == "object") {
                    for (var i = 0; i < cssUrl.length; i++) {
                        var fileref = document.createElement("link"), list = document.getElementsByTagName("head")[0].childNodes[0];
                        fileref.setAttribute("rel", "stylesheet");
                        fileref.setAttribute("type", "text/css");
                        fileref.setAttribute("href", cssUrl[i]);
                        document.getElementsByTagName("head")[0].insertBefore(fileref, list);
                    }
                }
                else if (typeof cssUrl == "string") {
                    fileref.setAttribute("href", cssUrl);
                    document.getElementsByTagName("head")[0].insertBefore(fileref, list);
                }
            },
            add_js: function (get_url, func) {
                var scripts = null, xhead = document.getElementsByTagName("head")[0];
                scripts = document.createElement("script");
                scripts.type = "text/javascript";
                scripts.src = get_url;
                var browser = navigator.appName, b_version = navigator.appVersion, version = b_version.split(";"), trim_Version = version[1] ? version[1].replace(/[ ]/g, "") : null;
                if (browser == "Microsoft Internet Explorer") {
                    if (typeof func === "function") {
                        scripts.onreadystatechange = function () {
                            var r = scripts.readyState;
                            if (r === 'loaded' || r === 'complete') {
                                func.call(this, this);
                                scripts.onreadystatechange = null;
                            }
                        };
                    }
                    xhead.insertBefore(scripts, null);
                }
                else {
                    xhead.insertBefore(scripts, xhead.firstChild);
                    scripts.onload = scripts.onreadystatechange = function () {
                        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                            func.call(this, this);
                        }
                        scripts.onload = scripts.onreadystatechange = null;
                    };
                }
            },
            Ajax: function () {
                var self = this, ajaxData = {
                    type: arguments[0].type || "GET",
                    url: arguments[0].url || "",
                    async: arguments[0].async || "true",
                    data: arguments[0].data || null,
                    dataType: arguments[0].dataType || "text",
                    contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
                    beforeSend: arguments[0].beforeSend ||
                        function () { },
                    success: arguments[0].success ||
                        function () { },
                    error: arguments[0].error ||
                        function () { }
                };
                ajaxData.beforeSend();
                var xhr = self.createxmlHttpRequest(), responseTypeAware = 'responseType' in xhr; //ie没有此属性
                if (responseTypeAware) {
                    xhr.responseType = ajaxData.dataType;
                }
                xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
                xhr.setRequestHeader("Content-Type", ajaxData.contentType);
                xhr.send(self.convertData(ajaxData.data));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (responseTypeAware) {
                                ajaxData.success(xhr.response);
                            }
                            else {
                                ajaxData.success(self.evil(xhr.responseText));
                            }
                        }
                        else {
                            ajaxData.error();
                        }
                    }
                };
            },
            createxmlHttpRequest: function () {
                if (win['ActiveXObject']) {
                    var A = null;
                    try {
                        A = new ActiveXObject("Msxml2.XMLHTTP");
                    }
                    catch (e) {
                        try {
                            A = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        catch (oc) {
                            A = null;
                        }
                    }
                    return A;
                }
                else if (win['XMLHttpRequest']) {
                    return new XMLHttpRequest();
                }
            },
            convertData: function (data) {
                if (typeof data === 'object') {
                    var convertResult = "";
                    for (var c in data) {
                        convertResult += c + "=" + data[c] + "&";
                    }
                    convertResult = convertResult.substring(0, convertResult.length - 1);
                    return convertResult;
                }
                else {
                    return data;
                }
            },
            urlHref: function (e) {
                var str = location.href.toLowerCase(), adap = ['www.zhongye.net', 'pz.zhongye.net'];
                for (var k = 0; k < adap.length; k++) {
                    str.indexOf(adap[k]) > -1 ?
                        str = str.replace(adap[k], "www.zhongye.net") : '';
                }
                var strLastLen = str.lastIndexOf("/"), strIndexof = str.indexOf('//'), strVal = str.substring(strIndexof + 2, strLastLen + 1), len = str.indexOf('?'), strArray = ['.html', '.htm'], returnVal = -1, strPar = -1, s;
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
                        }
                        else {
                            returnVal = -1;
                        }
                    }
                    else {
                        if (s == e) {
                            returnVal = 0;
                        }
                        else {
                            returnVal = -1;
                        }
                    }
                }
                else {
                    if (strVal == e) {
                        returnVal = 0;
                    }
                    else {
                        returnVal = -1;
                    }
                }
                return returnVal;
            },
            // urlHref: function (e) {
            //     var str = location.href.toLowerCase(),
            //         strLastLen = str.lastIndexOf("/"),
            //         strIndexof = str.indexOf('//'),
            //         strVal = str.substring(strIndexof + 2, strLastLen + 1),
            //         len = str.indexOf('?'),
            //         strArray = ['.html', '.htm'],
            //         returnVal = -1,
            //         strPar = -1,
            //         s;
            //     if (len > -1) {
            //         strVal = str.substring(strIndexof + 2, len);
            //     }
            //     for (var i = 0; i < strArray.length; i++) {
            //         strPar = str.indexOf(strArray[i]);
            //         s = str.substring(strIndexof + 2, strPar + strArray[i].length);
            //         if (strPar > -1) {
            //             break;
            //         }
            //     }
            //     if (strPar > -1) {
            //         if (len > -1) {
            //             if (strVal == e) {
            //                 returnVal = 0;
            //             } else {
            //                 returnVal = -1;
            //             }
            //         } else {
            //             if (s == e) {
            //                 returnVal = 0;
            //             } else {
            //                 returnVal = -1;
            //             }
            //         }
            //     } else {
            //         if (strVal == e) {
            //             returnVal = 0;
            //         } else {
            //             returnVal = -1;
            //         }
            //     }
            //     return returnVal;
            // },
            parseDom: function (arg) {
                var objE = document.createElement("div"), domArray = '';
                for (var i = 0; i < arg.length; i++) {
                    domArray += "" + arg[i];
                }
                objE.innerHTML = domArray;
                return objE.childNodes;
            },
            evil: function (fn) {
                var Fn = Function;
                return new Fn('return ' + fn)();
            },
            leyooIdWrite: function (html) {
                document.writeln(html);
            },
            includeJs: function (path) {
                var a = document.createElement("script");
                a.type = "text/javascript";
                a.src = path;
                var head = document.getElementsByTagName("head")[0];
                head.appendChild(a);
                //下列方法会导致后续的函数调用失效，他会把加载完成后的JS删除掉
                // var head = document.getElementsByTagName("head")[0];
                // var script = document.createElement("script");
                // script.src = path;
                // var done = false;
                // script.onload = script.onreadystatechange = function () {
                //     if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                //         done = true;
                //         script.onload = script.onreadystatechange = null;
                //         head.removeChild(script);
                //     }
                // };
                // head.appendChild(script);
            },
            hover_tc_net: function (n) {
                var self = this, liLength = document.getElementById("tab_bm_").getElementsByTagName("li").length;
                for (var i = 1; i <= liLength; i++) {
                    self.g('tab_bm_' + i).className = 'nor_tc';
                    self.g('tab_bm_0' + i).className = 'undis_tc_net';
                }
                self.g('tab_bm_0' + n).className = 'dis_tc_net';
                self.g('tab_bm_' + n).className = 'nav_ys' + n + ' hovertab_bm';
            },
            g: function (o) {
                return document.getElementById(o);
            },
            cookie: {
                set: function (key, val, time, catalog) {
                    var date = new Date(); //获取当前时间
                    var expiresDays = time; //将date设置为n天以后的时间
                    var list = catalog == "1" ? " ;path=/" : "";
                    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
                    document.cookie = key + "=" + val + ";expires=" + date.toUTCString() + list; //设置cookie
                },
                get: function (key) {
                    /*获取cookie参数*/
                    var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
                    var arrCookie = getCookie.split(";"); //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
                    var tips; //声明变量tips
                    for (var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
                        var arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                        if (key == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                            tips = arr[1]; //将cookie的值赋给变量tips
                            break; //终止for循环遍历
                        }
                    }
                    return tips;
                },
                Deletes: function (keys) {
                    var dates = new Date(); //获取当前时间
                    dates.setTime(dates.getTime() - 10000); //将date设置为过去的时间
                    document.cookie = keys + "=v; expires =" + dates.toUTCString(); //设置cookie
                }
            },
            oUrl: function (urls, fn) {
                var s = window.location.search.substr(0), u = urls, v, code;
                u.indexOf('|') > -1 ?
                    (v = u.split("|")[0],
                        code = "<a href=\"" + v + "\" id=\"aWinBlank\" target=\"_blank\" style=\"display:none;\">\u65B0\u7A97\u53E3\u6A21\u62DF\u70B9\u51FB</a>",
                        basic_module.prototype.render.addHtml([code], basic_module.prototype),
                        fn.call(this, 'aWinBlank')) :
                    fn.call(this, u + s);
            },
            vUrl: function (urls, val) {
                var s = window.location.search.substr(0), url = urls;
                url.indexOf('?') > -1 && s.indexOf('?') > -1 ?
                    s = s.replace('?', '&') : s;
                var aTag = "<a href='" + url + s + "' target='_blank' id='newWindowBlank' style='display:none;'>新窗口打开</a>";
                $("body").prepend(aTag);
                setTimeout(function () {
                    val == true ? (document.getElementById('newWindowBlank').click(),
                        setTimeout(function () {
                            $('#newWindowBlank').remove();
                        }, 50)) : window.location.href = url + s;
                }, 100);
            }
        },
        util: {
            onCheckPhone: function (fromId, texts, url, state) {
                var self = this, sourceUrl = '', //来源url变量
                MOBILE_REG = /^[1][3-9][0-9]{9}$/, value = $(fromId + " input[name='Telephone']").val(), like_class = document.getElementById("LikeClass").value, daqu_id = document.getElementById("daquid").value, oUrlHref = null, JiaoYanMaVal = $(fromId + " input[name='JiaoYanMa']").val(), xueliVal = $(fromId + " input:text[name='XueLi']").val() || $(fromId + " input:radio[name='XueLi']:checked").val() || $(fromId + " select[name='XueLi']").val() || $(fromId + " input:hidden[name='XueLi']").val(), GongZuoNianXianVal = $(fromId + " input:text[name='GongZuoNianXian']").val() || $(fromId + " input:radio[name='GongZuoNianXian']:checked").val() || $(fromId + " select[name='GongZuoNianXian']").val() || $(fromId + " input:hidden[name='GongZuoNianXian']").val(), zhuanyeVal = $(fromId + " input:text[name='ZhuanYe']").val() || $(fromId + " input:radio[name='ZhuanYe']:checked").val() || $(fromId + " select[name='ZhuanYe']").val() || $(fromId + " input:hidden[name='ZhuanYe']").val(), LuQuFangXiangVal = $(fromId + " input:text[name='LuQuFangXiang']").val() || $(fromId + " input:radio[name='LuQuFangXiang']:checked").val() || $(fromId + " select[name='LuQuFangXiang']").val() || $(fromId + " input:hidden[name='LuQuFangXiang']").val(), ZhuanYeFangXiangVal = $(fromId + " input:text[name='ZhuanYeFangXiang']").val() || $(fromId + " input:radio[name='ZhuanYeFangXiang']:checked").val() || $(fromId + " select[name='ZhuanYeFangXiang']").val() || $(fromId + " input:hidden[name='ZhuanYeFangXiang']").val(), MuBiaoYuanXiaoVal = $(fromId + " input:text[name='MuBiaoYuanXiao']").val() || $(fromId + " input:radio[name='MuBiaoYuanXiao']:checked").val() || $(fromId + " select[name='MuBiaoYuanXiao']").val() || $(fromId + " input:hidden[name='MuBiaoYuanXiao']").val(), MuBiaoZhuanYeVal = $(fromId + " input:text[name='MuBiaoZhuanYe']").val() || $(fromId + " input:radio[name='MuBiaoZhuanYe']:checked").val() || $(fromId + " select[name='MuBiaoZhuanYe']").val() || $(fromId + " input:hidden[name='MuBiaoZhuanYe']").val(), GuanLiLeiZhuanYeVal = $(fromId + " input:text[name='GuanLiLeiZhuanYe']").val() || $(fromId + " input:radio[name='GuanLiLeiZhuanYe']:checked").val() || $(fromId + " select[name='GuanLiLeiZhuanYe']").val() || $(fromId + " input:hidden[name='GuanLiLeiZhuanYe']").val(), SuoZaiDiVal = $(fromId + " input:text[name='SuoZaiDi']").val() || $(fromId + " input:radio[name='SuoZaiDi']:checked").val() || $(fromId + " select[name='SuoZaiDi']").val() || $(fromId + " input:hidden[name='SuoZaiDi']").val(), realNameVal = $(fromId + " input:text[name='realName']").val() || $(fromId + " input:radio[name='realName']:checked").val() || $(fromId + " select[name='realName']").val() || $(fromId + " input:hidden[name='realName']").val(), cityVal = $(fromId + " input:text[name='city']").val() || $(fromId + " input:radio[name='city']:checked").val() || $(fromId + " select[name='city']").val() || $(fromId + " input:hidden[name='city']").val(), intentionIdVal = $(fromId + " input:hidden[name='intentionId']").val() || $(fromId + " input:text[name='intentionId']").val() || $(fromId + " input:radio[name='intentionId']:checked").val() || $(fromId + " select[name='intentionId']").val();
                typeof (xueliVal) == 'undefined' ? xueliVal = null : '';
                typeof (GongZuoNianXianVal) == 'undefined' ? GongZuoNianXianVal = null : '';
                typeof (zhuanyeVal) == 'undefined' ? zhuanyeVal = null : '';
                typeof (LuQuFangXiangVal) == 'undefined' ? LuQuFangXiangVal = null : '';
                typeof (ZhuanYeFangXiangVal) == 'undefined' ? ZhuanYeFangXiangVal = null : '';
                typeof (MuBiaoYuanXiaoVal) == 'undefined' ? MuBiaoYuanXiaoVal = null : '';
                typeof (MuBiaoZhuanYeVal) == 'undefined' ? MuBiaoZhuanYeVal = null : '';
                typeof (JiaoYanMaVal) == 'undefined' ? JiaoYanMaVal = null : '';
                typeof (GuanLiLeiZhuanYeVal) == 'undefined' ? GuanLiLeiZhuanYeVal = null : '';
                typeof (SuoZaiDiVal) == 'undefined' ? SuoZaiDiVal = null : '';
                typeof (realNameVal) == 'undefined' ? realNameVal = null : '';
                typeof (cityVal) == 'undefined' ? cityVal = null : '';
                typeof (intentionIdVal) == 'undefined' ? intentionIdVal = 0 : '';
                //获取来源url
                if (document.referrer.length > 0) {
                    sourceUrl = document.referrer;
                }
                try {
                    if (sourceUrl.length == 0 && opener.location.href.length > 0) {
                        sourceUrl = opener.location.href;
                    }
                }
                catch (e) { }
                //$(fromId + " input:checkbox[name='XueLi']:checked").val()||
                if (typeof (url) !== 'undefined' && url !== null) {
                    basic_module.prototype.fn.oUrl(url, function (e) {
                        oUrlHref = e;
                    });
                }
                if (MOBILE_REG.test(value)) {
                    self.regFilterObj.regFilterFn("filterRegUser", "注册失败，您已达注册上限！"); //cookie名字；超过5个注册提示语！
                    var event = arguments.callee.caller.arguments[0] || win.event, ele = event.target || event.srcElement, onclickVal = $(ele).closest('[onclick]').attr('onclick'), eleVal = ele.outerHTML;
                    $(ele).closest('[onclick]').removeAttr('onclick').attr('data-checkClick', 'false');
                    if (oUrlHref == "aWinBlank") {
                        $.ajaxSetup({ async: false });
                    }
                    $.post("/AjaxControls/AjaxLoginPage.ashx?times=" + new Date().getTime() + "&UserName=" + value, {
                        Telephone: value,
                        OperatingMode: "register",
                        RegCode: "",
                        Password: 123456,
                        Source: 3,
                        Email: "",
                        LikeClass: like_class,
                        daquid: daqu_id,
                        PageType: 1,
                        ts: 1,
                        city: cityVal,
                        XueLi: xueliVal,
                        GongZuoNianXian: GongZuoNianXianVal,
                        ZhuanYe: zhuanyeVal,
                        JiaoYanMa: JiaoYanMaVal,
                        LuQuFangXiang: LuQuFangXiangVal,
                        ZhuanYeFangXiang: ZhuanYeFangXiangVal,
                        MuBiaoYuanXiao: MuBiaoYuanXiaoVal,
                        MuBiaoZhuanYe: MuBiaoZhuanYeVal,
                        GuanLiLeiZhuanYe: GuanLiLeiZhuanYeVal,
                        SuoZaiDi: SuoZaiDiVal,
                        realName: realNameVal,
                        RawURL: sourceUrl,
                        intentionId: intentionIdVal,
                        jianjie: "\u5927\u533AID\uFF1A" + daqu_id + " | \u5F53\u524D\u6CE8\u518C\u70B9\u51FB\u4EE3\u7801\uFF1A" + encodeURI(eleVal) + " | \u6D4F\u89C8\u5668\u4FE1\u606F\uFF1A" + navigator.userAgent
                    }, function (data) {
                        if (data != null) {
                            if (data.success == "1") {
                                self.regFilterObj.regCallbackFilterFn("filterRegUser", 1); //cookie名字；cookie有效期天数！
                                win._agl && win._agl.push(['track', ['success', { t: 3 }]]); //信息流百度统计注册数据代码
                                self.ttUrl();
                                if (typeof (texts) !== 'undefined') {
                                    if (texts.replace(/\s+/g, "").length > 0) {
                                        if (texts !== 'null') {
                                            if (texts.indexOf('<div') > -1) { //如果当前提示文字是dom元素插入此段div到body下
                                                $('body').before(texts);
                                            }
                                            else if (texts.indexOf('data-js:') > -1) {
                                                var domString = texts.split('|')[0].substr(texts.indexOf('data-js:') + 8, texts.split('|')[0].length);
                                                new Function('return ' + domString)();
                                                if (texts.indexOf('|') > -1) {
                                                    new Function('return ' + texts.split('|')[1])();
                                                }
                                            }
                                            else {
                                                alert(texts);
                                            }
                                        }
                                    }
                                    else {
                                        alert("提交成功！");
                                    }
                                    if (typeof (url) !== 'undefined' && url !== null) {
                                        oUrlHref !== "aWinBlank" ?
                                            win.location.href = oUrlHref :
                                            document.getElementById(oUrlHref).click();
                                    }
                                }
                                else {
                                    alert("提交成功！");
                                }
                                self.QRcode(); //弹窗二维码
                            }
                            else if (data.result != null) {
                                if (data.success == "0") {
                                    if (typeof (state) !== 'undefined') {
                                        if (state.replace(/\s+/g, "").length > 0 && state.indexOf('true') > -1) {
                                            if (typeof (url) !== 'undefined' && url !== null) {
                                                oUrlHref !== "aWinBlank" ?
                                                    win.location.href = oUrlHref :
                                                    document.getElementById(oUrlHref).click();
                                            }
                                        }
                                        else {
                                            alert(data.result);
                                        }
                                    }
                                    else {
                                        if (typeof (texts) !== 'undefined') {
                                            if (typeof (texts.split('|')[2]) !== 'undefined') {
                                                var item = new Function('return ' + texts.split('|')[2])();
                                                new Function('return ' + item(data))();
                                            }
                                            else {
                                                alert(data.result);
                                            }
                                        }
                                        else {
                                            alert(data.result);
                                        }
                                    }
                                }
                                else {
                                    alert(data.result);
                                }
                            }
                        }
                        $(ele).closest('[data-checkClick]').removeAttr('data-checkClick').attr('onclick', onclickVal);
                        return false;
                    }, "json");
                }
                else {
                    alert("手机号格式不正确！");
                    $(fromId + " input[name='Telephone']").focus();
                    return false;
                }
            },
            QRcode: function () {
                var alertDom = "<style type=\"text/css\">.tbox100{overflow:hidden;width:490px;height:400px;position:fixed;margin-top:-200px;margin-left:-245px;top:50%;left:50%;background:#fff;z-index:999999999;}.wxhy100{padding:20px 0;text-align:center;font-size:22px;color:#fff;background:#c90000}.wxhy100 b{color:#ffabab;font-size:14px}.sht100{color:#c90000;font-size:20px;text-align:center;margin:18px 0}.xz360{overflow:hidden;width:360px;margin:auto}.ewmxz100{float:left;vertical-align:middle}.xzryfd{overflow:hidden;float:right;margin-top:14px}.xzryfd img{display:block;margin-bottom:15px;cursor:pointer}.wcbz100{text-align:center}.sm100{font-size:14px;color:#333333;text-align:center;margin:10px 0}.gban100{position:absolute;top:10px;right:15px;font-size:18px;cursor:pointer}</style><div class=\"tbox100\"><p class=\"wxhy100\">\u606D\u559C\u60A8\uFF0C\u5DF2\u6210\u4E3A\u4E2D\u4E1A\u7F51\u6821\u4F1A\u5458\uFF01<br/><b>\u4E2D\u4E1A\u8001\u5E08\u5C06\u4E3A\u60A8\u901A\u8BDD\u89E3\u7B54\u7591\u95EE\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5019\u6765\u7535</b></p><p class=\"sht100\">\u8BA9\u60A8\u968F\u65F6\u542C\u3001\u968F\u65F6\u770B\u3001\u968F\u65F6\u5B66</p><div class=\"xz360\"><img src=\"//www.zhongye.net/news_skin/images/zcalertimg/ewm.png\"class=\"ewmxz100\"/><div class=\"xzryfd\"><img src=\"//www.zhongye.net/news_skin/images/zcalertimg/android.png\"class=\"androidxz\"/><img src=\"//www.zhongye.net/news_skin/images/zcalertimg/iphone.png\"class=\"iphonexz\"/></div><img src=\"//www.zhongye.net/news_skin/images/zcalertimg/xx.png\"class=\"wcbz100\"/><p class=\"sm100\">\u626B\u7801\u4E0B\u8F7DAPP\uFF0C\u9650\u65F6\u514D\u8D39\u8BFE\u7A0B\u968F\u65F6\u5728\u7EBF\u8BD5\u542C</p><img src=\"//www.zhongye.net/news_skin/images/zcalertimg/gbpc.png\"class=\"gban100\"/></div></div><script type=\"text/javascript\">$(document).ready(function(){$(\".gban100\").on(\"click\",function(){$(\".tbox100\").hide()});$(\".androidxz\").on(\"click\",function(){window.location.href=\"//www.zhongye.net/app/zhongye.apk\"});$(\".iphonexz\").on(\"click\",function(){window.location.href=\"https://itunes.apple.com/cn/app/zhong-ye-wang-xiao/id1016198839?mt=8\"})});</script>";
                var uArray = [
                    'feed',
                    'kyggk',
                    'bj.',
                    'bj/',
                    'bj_',
                    'bjm.',
                    'nj.',
                    'nj/',
                    'nj_',
                    'sh.',
                    'sh/',
                    'sh_'
                ], uLen = uArray.length, src = location.href.toLowerCase(), uTrue = false;
                for (var u = 0; u < uLen; u++) {
                    var o = uArray[u];
                    //basic_module.prototype.fn.urlHref(o.toLowerCase())
                    if (src.indexOf(o.toLowerCase()) > -1) {
                        uTrue = true;
                    }
                }
                if (uTrue == false) {
                    $('body').append(alertDom);
                }
            },
            GetMsg: function (fromId, booleanVal) {
                var that = this, MOBILE_REG = /^[1][3-9][0-9]{9}$/, disabled = $(fromId + " input[name='GetJiaoYanMa']").attr("disabled"), value = $(fromId + " input[name='Telephone']").val(), dataVal = { Telephone: value, timestamp: new Date().getTime() };
                typeof (booleanVal) !== "undefined" ?
                    (booleanVal == true ?
                        dataVal = { Telephone: value, timestamp: new Date().getTime(), force: 1 } : "") : "";
                if (disabled) {
                    return false;
                }
                if (MOBILE_REG.test(value)) {
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: "/AjaxControls/SMSHandler.ashx?Type=SMSRegiester",
                        data: dataVal,
                        dataType: "json",
                        success: function (data) {
                            if (data.result == 'false') {
                                alert(data.Message);
                            }
                            else {
                                that.msgSettime(fromId);
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
                else {
                    alert("手机号格式不正确！");
                    $(fromId + " input[name='Telephone']").focus();
                    return false;
                }
            },
            msgSettime: function (fromId) {
                var countdown = 60, _generate_code = $(fromId + " input[name='GetJiaoYanMa']");
                ~(function () {
                    if (countdown <= 0) {
                        _generate_code.attr("disabled", false);
                        _generate_code.val("获取验证码");
                        countdown = 60;
                        return false;
                    }
                    else {
                        _generate_code.attr("disabled", true);
                        _generate_code.val("重新发送(" + countdown + ")");
                        countdown--;
                    }
                    setTimeout(arguments.callee, 1000);
                })();
            },
            GetMsgCheck: function (fromId) {
                var that = this, MOBILE_REG = /^[1][3-9][0-9]{9}$/, jiaoyanmaVal = $(fromId + " input[name='JiaoYanMa']").val(), telValue = $(fromId + " input[name='Telephone']").val(), dataVal = { Telephone: telValue, timestamp: new Date().getTime(), Code: jiaoyanmaVal }, returnVal = { result: null, IsUser: null };
                if (MOBILE_REG.test(telValue)) {
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: "/AjaxControls/SMSHandler.ashx?Type=SMSCheckCode",
                        data: dataVal,
                        dataType: "json",
                        success: function (data) {
                            if (data.result == 'false') {
                                returnVal.result = data.result;
                                returnVal.IsUser = data.IsUser;
                                alert(data.errMsg);
                            }
                            else {
                                returnVal.result = data.result;
                                returnVal.IsUser = data.IsUser;
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    return returnVal;
                }
                else {
                    alert("手机号格式不正确！");
                    $(fromId + " input[name='Telephone']").focus();
                    return false;
                }
            },
            ttUrl: function () {
                /*
                var str = win.location.href,
                    len = str.indexOf('?'),
                    strIndexof = str.indexOf('//'),
                    strLastLen = str.lastIndexOf("/"),
                    strVal = str.substring(strIndexof + 2, strLastLen + 1),
                    urlVal = {
                        'url': [
                            'www.zhongye.net/wxq_xfgcs_sem_pc/bx/'
                        ],
                        'ttid': [
                            "window._qha && (function(w,n){w[n]=typeof w[n]==='function'?w[n]:function(){(w[n].c=w[n].c||[]).push(arguments)}_qha('send',{et:31,order:[{id:'336135',orderType:'1'}]})})(window,'_qha');"
                        ]
                    },
                    urloutput = '';
                if (len > -1) {
                    strVal = str.substring(strIndexof + 2, len);
                }
                for (var i = 0; i <= urlVal.url.length; i++) {
                    if (strVal == urlVal.url[i]) {
                        urloutput = urlVal.ttid[i];
                        break;
                    }
                }
                new Function('return ' + urloutput)();
                */
            },
            iframeheights: function () {
                var event = arguments.callee.caller.arguments[0] || win.event;
                var ele = event.target || event.srcElement, idName = ele.getAttribute("id"), ifm = document.getElementById(idName), subWeb = win.frames[idName].document || ifm.contentWindow.document;
                if (ifm != null && subWeb != null) {
                    setTimeout(function () {
                        ifm.height = subWeb.body.scrollHeight;
                    }, 50);
                }
            },
            iframeTag: function (self) {
                var tagName = win.document.getElementsByTagName('iframe');
                for (var k = 0; k < tagName.length; k++) {
                    if (tagName[k].getAttribute('data-iframe') !== null) {
                        self.util.iframeId(tagName[k].getAttribute('id'));
                    }
                }
            },
            iframeId: function (idName) {
                var ifm = document.getElementById(idName), control = true;
                $(ifm).load(function () {
                    if (control) { //防止更改班型内容导致有缓存存在的问题
                        control = false;
                        ifm.contentWindow.location.href = ifm.src + "?number=" + new Date().getTime();
                    }
                    var subWeb = win.frames[idName].document || ifm.contentWindow.document;
                    if (ifm != null && subWeb != null) {
                        ifm.height = subWeb.body.scrollHeight;
                    }
                });
            },
            reg: function () {
                var self = this;
                if ($("#BmReg").length > 0 && $("#regfade").length > 0) {
                    $("#BmReg").remove();
                    $("#regfade").remove();
                }
                //当前点击是否是登录按钮
                var zhuceValArg = arguments[0], regCall = arguments[1], loginCall = arguments[2], beforeCall = arguments[3];
                if (typeof (beforeCall) !== "undefined") {
                    var event = arguments.callee.caller.arguments[0] || win.event, ele = event.target || event.srcElement;
                    beforeCall.call(null, self.isLogin(), $(ele));
                }
                else {
                    $('body').append("<div id=\"BmReg\"class=\"bm_xzc\"><a href=\"javascript:void(0);\"alt=\"close\"class=\"closep\"><img src=\"//www.zhongye.net/news_skin/images/kszhuce/cha.png\"class=\"btn_close\"title=\"Close Window\"alt=\"Close\"/></a><div class=\"xtc_nwd\">\u5341\u79D2\u949F\u52A0\u5165\u4E2D\u4E1A\uFF0C\u5206\u4EAB\u66F4\u591A\u8003\u8BD5\u8D44\u8BAF</div><div id=\"Bmquickdiv\"><div class=\"tc_net\"><div id=\"tab_bm_\"class=\"tab_bm_\"><ul><li id=\"tab_bm_1\"class=\"nav_ys1 hovertab_bm\"onclick=\"javascript:ZY.fn.hover_tc_net(1);\"><i></i>&nbsp;&nbsp;&nbsp;&nbsp;\u6CE8\u518C</li><li id=\"tab_bm_2\"class=\"nor_tc\"onclick=\"javascript:ZY.fn.hover_tc_net(2);\"><i></i>&nbsp;&nbsp;&nbsp;&nbsp;\u5DF2\u6709\u8D26\u53F7\u767B\u5F55</li></ul></div><div class=\"ctt_tc_net\"><div class=\"dis_tc_net\"id=\"tab_bm_01\"><div class=\"Bm_yl_tcxqhnr\"><ul><li><span><i>*</i>\u624B\u673A\u53F7\u7801</span><span><input type=\"text\"id=\"bm_username\"name=\"Telephone\"value=\"\"placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\"class=\"tc_tel\"/></span></li><li class=\"Bm_tc_tslidl\"><span><i>*</i><b>\u5BC6&#12288;&#12288;\u7801</b></span><span><input type=\"password\"id=\"bm_pwd\"name=\"Password\"value=\"\"placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801\"class=\"Bm_tc_pass Bm_pas_x\"/></span><dl><b class=\"tc_state\">\u5F31</b><b>\u4E2D</b><b>\u5F3A</b></dl></li><li><span><i>*</i>\u786E\u8BA4\u5BC6\u7801</span><span><input type=\"password\"id=\"BmConfirm\"name=\"BmConfirm\"value=\"\"placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u786E\u8BA4\u5BC6\u7801\"class=\"Bm_tc_pass\"/></span></li><li class=\"tc_tsli\"><div class=\"tc_xieyi\"><i></i><label><input name=\"checkbox\"type=\"checkbox\"value=\"checkbox\"checked=\"checked\"/>\u5DF2\u9605\u8BFB\u5E76\u540C\u610F</label>&nbsp;&nbsp;<a href=\"/items/service/\"target=\"_blank\">\u300A\u670D\u52A1\u534F\u8BAE\u300B</a><a href=\"/items/policy/\"target=\"_blank\">\u300A\u7528\u6237\u9690\u79C1\u653F\u7B56\u300B</a></div><input type=\"button\"value=\"\u6CE8\u518C\"id=\"bm_regbutton\"/></li></ul></div></div><div class=\"undis_tc_net\"id=\"tab_bm_02\"><div class=\"Bm_yl_tcxqhnr\"><ul><li><span><i>*</i>\u624B\u673A\u53F7\u7801</span><span><input type=\"text\"id=\"txtname\"name=\"username\"value=\"\"class=\"tc_tel\"placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\"/></span></li><li><span><i>*</i><b>\u5BC6&#12288;&#12288;\u7801</b></span><span><input type=\"password\"id=\"txtpass\"name=\"password\"value=\"\"class=\"Bm_tc_pass Bm_pas_x\"placeholder=\"\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801\"/></span></li><li class=\"tc_tsli2\"><dl class=\"tc_denglu\"><i></i><label><input name=\"autologin\"type=\"checkbox\"id=\"autologin\"value=\"auto\"checked=\"checked\">\u4E0B\u6B21\u81EA\u52A8\u767B\u5F55</label><b><a href=\"/forgotpassword.aspx\"target=\"_blank\">\u627E\u56DE\u5BC6\u7801\uFF1F</a></b></dl><input type=\"button\"value=\"\u767B\u5F55\"id=\"Bm_loginBtn\"/></li></ul></div></div></div></div></div><div class=\"yl_tcxok\"id=\"Bmsuccess\"><dl><img src=\"/news_skin/images/kszhuce/ok_yuan.jpg\"/></dl><span class=\"regOkFont\">\u606D\u559C\u60A8\uFF0C\u6CE8\u518C\u6210\u529F\uFF01</span><div class=\"yl_xtcanx\"><a href=\"javascript:void(0);\"class=\"yl_tc_xan1\"onclick=\"javascript:$(&#39;#regfade,.bm_xzc&#39;).fadeOut();ZY.util.postLogin({OperatingMode:'confirmlogin' }, true);\">\u505C\u7559\u5728\u5F53\u524D\u9875</a><a href=\"https://www.zhongye.net/usercenter/\"class=\"yl_tc_xan2\">\u5230\u4F1A\u5458\u4E2D\u5FC3\u542C\u8BFE</a></div></div></div>");
                    $('body').append('<div id="regfade"></div>');
                    $('#regfade').css({
                        'filter': 'alpha(opacity=80)',
                        'background': '#000',
                        'position': 'fixed',
                        'left': '0',
                        'top': '0',
                        'width': '100%',
                        'height': '100%',
                        'z-index': '9999',
                        'opacity': '.80'
                    }).fadeIn();
                    $("#Bmquickdiv").show();
                    $("#Bmsuccess").hide();
                    var popMargTop = ($('#BmReg').height() + 80) / 2;
                    var popMargLeft = ($('#BmReg').width() + 80) / 2;
                    $('#BmReg').css({
                        'width': '490px',
                        'margin-top': -popMargTop,
                        'margin-left': -popMargLeft
                    });
                    $('#BmReg').fadeIn();
                    zhuceValArg == true ? $('#tab_bm_2').click() : $('#tab_bm_1').click();
                    //是否登陆
                    if (self.isLogin()) {
                        $("#Bmquickdiv").hide();
                        $("#Bmsuccess").show();
                        $('#BmReg').fadeIn().css({
                            'width': '490px'
                        });
                    }
                    //点击关闭注册弹窗
                    $(document).on('click', 'a.closep', function () {
                        self.postLogin({ OperatingMode: "confirmlogin" }, true);
                        $('#regfade,.bm_xzc').fadeOut();
                        self.clearRegPar();
                        return false;
                    });
                    //点击退出登录处理事件
                    // $("#logonOut").click(function () {
                    //     self.postLogin({ OperatingMode: "logonOut" }, false);
                    // });
                    //点击登陆处理事件
                    var username_errinfo = false;
                    var password_errinfo = false;
                    var checkcode_errinfo = false;
                    $(document).off("click", '#Bm_loginBtn').on('click', '#Bm_loginBtn', function () {
                        self.ValidateUserName();
                        self.ValidatePassword();
                        if (!username_errinfo && !password_errinfo) {
                            self.postLoginButton({ OperatingMode: "login", UserName: $("#txtname").val(), Password: $("#txtpass").val(), CheckCode: "", autoLogin: $("#autologin").attr("checked") == null ? "" : "checked", time: new Date().getTime() }, loginCall);
                        }
                    });
                    //点击注册处理事件
                    $(document).off("click", '#bm_regbutton').on('click', '#bm_regbutton', function () {
                        var username = document.getElementById("bm_username").value;
                        var user = document.getElementById("bm_username").value.length;
                        var password = document.getElementById("bm_pwd").value;
                        var myreg = /^[1][3-9][0-9]{9}$/, sourceUrl = ''; //来源url变量
                        var con_password = document.getElementById("BmConfirm").value;
                        if (con_password !== password) {
                            alert("您两次输入的密码不正确!");
                            document.getElementById("BmConfirm").focus();
                            return false;
                        }
                        if (!user || user == null || user != 11 || user == 0) {
                            alert("请输入有效的手机号码!");
                            document.getElementById("bm_username").focus();
                            return false;
                        }
                        if (!myreg.test(username)) {
                            alert('请输入有效的手机号码！');
                            document.getElementById("bm_username").focus();
                            return false;
                        }
                        if (!password.length || password.length == null || password.length == 0) {
                            alert("请输入您的密码!");
                            document.getElementById("bm_pwd").focus();
                            return false;
                        }
                        if (password.indexOf(" ") != -1) {
                            alert("密码不允许有空格！");
                            return false;
                        }
                        self.regFilterObj.regFilterFn("filterRegUser", "注册失败，您已达注册上限！"); //cookie名字；超过5个注册提示语！
                        if ($("#bm_username").val().length > 0) {
                            $("#bm_regbutton").attr({
                                'disabled': true,
                                'class': 'grayscale'
                            });
                            //获取来源url
                            if (document.referrer.length > 0) {
                                sourceUrl = document.referrer;
                            }
                            try {
                                if (sourceUrl.length == 0 && opener.location.href.length > 0) {
                                    sourceUrl = opener.location.href;
                                }
                            }
                            catch (e) { }
                            var event = arguments.callee.caller.arguments[0] || win.event, ele = event.target || event.srcElement, eleVal = ele.outerHTML;
                            var likeClass = $("#LikeClass").val() == null ? 0 : $("#LikeClass").val(), daquId = $("#daquid").val() == null ? 0 : $("#daquid").val(), intentionIdReg = $("#intentionId").val() == null ? 0 : $("#intentionId").val();
                            $.ajaxSettings.async = false;
                            $.post("/AjaxControls/AjaxLoginPage.ashx", {
                                OperatingMode: "register",
                                UserName: $("#bm_username").val(),
                                RegCode: "",
                                Password: $("#bm_pwd").val(),
                                Email: "",
                                Telephone: $("#bm_username").val(),
                                LikeClass: likeClass,
                                daquid: daquId,
                                PageType: 1,
                                ts: 1,
                                RawURL: sourceUrl,
                                intentionId: intentionIdReg,
                                jianjie: "\u5927\u533AID\uFF1A" + daquId + " | \u5F53\u524D\u6CE8\u518C\u70B9\u51FB\u4EE3\u7801\uFF1A" + encodeURI(eleVal) + " | \u6D4F\u89C8\u5668\u4FE1\u606F\uFF1A" + navigator.userAgent
                            }, function (data) {
                                if (data != null) {
                                    if (data.success == "1") {
                                        self.regFilterObj.regCallbackFilterFn("filterRegUser", 1); //cookie名字；cookie有效期天数！
                                        win._agl && win._agl.push(['track', ['success', { t: 3 }]]); //信息流百度统计注册数据代码
                                        self.ttUrl();
                                        $("#bm_regbutton").attr({
                                            'disabled': false,
                                            'class': 'yl_x_bottom'
                                        });
                                        $("#Bmquickdiv").hide();
                                        $("#Bmsuccess").show();
                                        self.postLogin({ OperatingMode: "confirmlogin" }, true);
                                        if (typeof (regCall) !== 'undefined' && regCall !== '' && regCall !== null) {
                                            new Function('return ' + regCall(data, self))();
                                        }
                                        self.QRcode(); //弹窗二维码
                                    }
                                    else if (data.result != null) {
                                        alert(data.result);
                                        $("#bm_regbutton").attr({
                                            'disabled': false,
                                            'class': 'yl_x_bottom'
                                        });
                                        return false;
                                    }
                                }
                                return false;
                            }, "json");
                            $.ajaxSettings.async = true;
                        }
                    });
                    //密码强度检测 $('#bm_pwd').keyup
                    $(document).on('keyup', '#bm_pwd', function (e) {
                        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W)|^(?=.{8,})((?=.*[a-z])(?=.*[0-9])(?=.*\\W)).*$|((?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$)", "g");
                        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
                        if (false == enoughRegex.test($(this).val())) {
                            $(".Bm_tc_tslidl dl b").removeClass("tc_state");
                            $(".Bm_tc_tslidl dl b").eq(0).attr("class", "tc_state");
                        }
                        else if (strongRegex.test($(this).val())) {
                            $(".Bm_tc_tslidl dl b").removeClass("tc_state");
                            $(".Bm_tc_tslidl dl b").eq(2).attr("class", "tc_state");
                        }
                        else if (mediumRegex.test($(this).val())) {
                            $(".Bm_tc_tslidl dl b").removeClass("tc_state");
                            $(".Bm_tc_tslidl dl b").eq(1).attr("class", "tc_state");
                        }
                        else {
                            $(".Bm_tc_tslidl dl b").removeClass("tc_state");
                            $(".Bm_tc_tslidl dl b").eq(0).attr("class", "tc_state");
                        }
                    });
                }
            },
            isLogin: function () {
                var islogin = false;
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/AjaxControls/AjaxLoginPage.ashx?OperatingMode=confirmlogin",
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result == "ok") {
                            islogin = true;
                        }
                        else if (data != null && data.result != "nouser") {
                            islogin = false;
                        }
                        else {
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
            postLogin: function (obj, isShow) {
                $.ajax({
                    type: "POST",
                    url: "/AjaxControls/AjaxLoginPage.ashx?v=" + new Date().getTime(),
                    data: obj,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.result == "ok") {
                            if (isShow) {
                                $("#loginwin").hide();
                                $("#logininfowin").show();
                                $("#l_username").html(data.username);
                            }
                            else {
                                $("#logininfowin").hide();
                                $("#loginwin").show();
                            }
                        }
                        else if (data != null && data.result != "nouser") {
                            $("#logininfowin").hide();
                            $("#loginwin").show();
                        }
                        return false;
                    }
                });
                // $.post("/AjaxControls/AjaxLoginPage.ashx?v=" + new Date().getTime(), obj,
                //     function (data) {
                //         if (data != null && data.result == "ok") {
                //             if (isShow) {
                //                 $("#loginwin").hide();
                //                 $("#logininfowin").show();
                //                 $("#l_username").html(data.username);
                //             } else {
                //                 $("#logininfowin").hide();
                //                 $("#loginwin").show();
                //             }
                //         } else if (data != null && data.result != "nouser") {
                //             $("#logininfowin").hide();
                //             $("#loginwin").show();
                //         }
                //         return false;
                //     }, "json");
            },
            ValidateUserName: function () {
                var username = $('#txtname').val(), username_errinfo = false;
                if (username.length == 0) {
                    $('#txtname').css('background', "#F5F5F5");
                    username_errinfo = true;
                }
                else {
                    $('#txtname').css('background', "white");
                    username_errinfo = false;
                }
            },
            ValidatePassword: function () {
                var password = $('#txtpass').val(), password_errinfo = false;
                if (password.length == 0) {
                    $('#txtpass').css('background', "#F5F5F5");
                    password_errinfo = true;
                }
                else {
                    $('#txtpass').css('background', "white");
                    password_errinfo = false;
                }
            },
            postLoginButton: function (obj, loginCall) {
                $.ajaxSettings.async = false;
                $.post("/AjaxControls/AjaxLoginPage.ashx", obj, function (data) {
                    if (typeof (loginCall) !== 'undefined' && loginCall !== '') {
                        new Function('return ' + loginCall(data))();
                    }
                    else {
                        if (data != null && data.result == "ok") {
                            $('.regOkFont').html('登录成功！');
                            $('#Bmquickdiv').hide();
                            $('#Bmsuccess').show();
                        }
                        else if (data != null && data.result != null) {
                            alert(data.result);
                            return false;
                        }
                    }
                    return false;
                }, "json");
                $.ajaxSettings.async = true;
            },
            returnTop: function (number) {
                var v = $(document).scrollTop();
                v > 0 ? ($('html,body').animate({ scrollTop: 0 }, typeof (number) !== 'undefined' ? number : 300)) : '';
            },
            clearRegPar: function () {
                var RegOnclick = $('#RegOnclick'), RegOnSign = $('#RegOnSign');
                RegOnclick.attr('onclick') !== 'javascript:ZY.util.reg();' ?
                    RegOnclick.attr('onclick', 'javascript:ZY.util.reg();') : '';
                RegOnSign.attr('onclick') !== 'javascript:ZY.util.reg(true);' ?
                    RegOnSign.attr('onclick', 'javascript:ZY.util.reg(true);') : '';
            },
            custForm: function (num, term, obj, callback) {
                if (num !== null && term === true) {
                    $.ajaxSettings.async = false;
                    setTimeout(function () {
                        $.post("/AjaxControls/UserTableHandler.ashx?table=" + num + "&times=" + new Date().getTime(), obj, function (data) {
                            callback.call(this, data);
                        }, "json");
                    }, 50);
                    $.ajaxSettings.async = true;
                }
                else if (num == null && term === true) {
                    $.ajaxSettings.async = false;
                    setTimeout(function () {
                        $.post("/AjaxControls/AjaxLoginPage.ashx?times=" + new Date().getTime(), obj, function (data) {
                            callback.call(this, data);
                        }, "json");
                    }, 50);
                    $.ajaxSettings.async = true;
                }
            },
            regFilterObj: {
                regFilterFn: function (filterVal, strings) {
                    var self = this;
                    if (self.filterRegUrl() > 0) {
                        var filterRegUser = basic_module.prototype.fn.cookie.get(filterVal);
                        if (filterRegUser) {
                            if (filterRegUser >= 5) {
                                self.writeLog(); //写入日志
                                alert(strings);
                                throw strings;
                            }
                        }
                        else {
                            basic_module.prototype.fn.cookie.set(filterVal, 0, 1);
                        }
                    }
                },
                regCallbackFilterFn: function (filterVal, day) {
                    var self = this;
                    if (self.filterRegUrl() > 0) {
                        var filterRegUser = basic_module.prototype.fn.cookie.get(filterVal);
                        basic_module.prototype.fn.cookie.set(filterVal, parseInt(filterRegUser) + 1, parseInt(day));
                    }
                },
                filterRegUrl: function () {
                    var str = win.location.href, len = str.indexOf('?'), strIndexof = str.indexOf('//'), strLastLen = str.lastIndexOf("/"), strVal = str.substring(strIndexof + 2, strLastLen + 1), urlVal = {
                        'url': [
                            'zy.zhongweijy.cn/wxq_kyggk_sem_pc/zonghe/condition/',
                            'zy.zhongweijy.cn/wxq_kyggk_sem_pc/zonghe/',
                            'zy.zhongweijy.net/wxq_kyggk_sem_2020_pc/kytk/',
                            'zy.zhongweijy.net/wxq_kyggk_sem_2020_pc/kyzh/',
                            'zy.zhongweijy.net/wxq_kyggk_sem_2020_pc/kyzh2/',
                            'zy.zhongweijy.net/wxq_kyggk_sem_2020_pc/kymba/',
                            'zy.zhongweijy.com.cn/wxq_kyggk_sem_2020_pc/px/',
                            'zy.zhongweijy.com.cn/wxq_kyggk_sem_2020_pc/zonghe01/',
                            'zy.zhongweijy.com.cn/wxq_kyggk_sem_2020_pc/zonghe_03/',
                            'zy.zhongweijy.com.cn/wxq_kyggk_sem_2020_pc/zonghe_04/',
                            'zy.zhongweijy.com.cn/wxq_kyggk_sem_2020_pc/zonghe2020/'
                        ]
                    }, urloutput = -1;
                    if (len > -1) {
                        strVal = str.substring(strIndexof + 2, len);
                    }
                    for (var i = 0; i < urlVal.url.length; i++) {
                        if (strVal.toLowerCase() == urlVal.url[i]) {
                            urloutput = 1;
                            break;
                        }
                    }
                    return urloutput;
                },
                writeLog: function () {
                    var ipVal = "", getSourceUrl = "", locaVal = "";
                    locaVal = win.location.href;
                    //获取来源url
                    if (document.referrer.length > 0) {
                        getSourceUrl = document.referrer;
                    }
                    try {
                        if (getSourceUrl.length == 0 && opener.location.href.length > 0) {
                            getSourceUrl = opener.location.href;
                        }
                    }
                    catch (e) { }
                    $.ajax({
                        url: 'https://tgapi.zhongye.net/filter/getIp.asp?t=' + new Date().getTime(),
                        type: 'GET',
                        dataType: "jsonp",
                        success: function (data) {
                            ipVal = data.ip; //ip
                            var objStr;
                            objStr = {
                                "ipVal": ipVal,
                                "getSourceUrl": getSourceUrl,
                                "locaVal": locaVal
                            };
                            $.ajax({
                                url: 'https://tgapi.zhongye.net/filter/setInfo.asp?t=' + new Date().getTime(),
                                data: objStr,
                                type: 'GET',
                                dataType: "jsonp",
                                success: function (data) {
                                    console.log(data.result);
                                }
                            });
                        }
                    });
                }
            }
        },
        render: {
            // InitAjax: function (ObjInitData) {//放弃此种方法
            //     var self = this;
            //     self.fn.Ajax({
            //         type: "GET",
            //         async: true,
            //         url: `${self.constant.json.url}?v=${new Date().getTime()}`,
            //         dataType: "json",
            //         data: {
            //             "v": new Date().getTime()
            //         },
            //         beforeSend: function () { },
            //         success: function (e) {
            //             var eObj = e['DataObj'], eLen = eObj.length, i = 0;
            //             for (; i < eLen; i++) {
            //                 var o = eObj[i];
            //                 if (self.fn.urlHref(o.url.toLowerCase()) > -1) {
            //                     ObjInitData = {
            //                         likeclass: `<input type="hidden" id="LikeClass" name="LikeClass" value="${o.likeClassId}">`,
            //                         daquid: `<input type="hidden" id="daquid" name="daquid" value="${o.daquId}">`,
            //                         leyuGroup: `<a href="javascript:void(0);" onclick="javascript:doyoo.util.openChat('g=${o.leyuGroupId ? o.leyuGroupId : null}');return false;" id="leyuOnclick" style="display:none;">乐语点击按钮</a>`,
            //                         leyuUrl: `soperson.com/20002054/${o.leyuId ? o.leyuId : null}.js`
            //                     };
            //                     //self.fn.includeJs(ObjInitData.curr.leyuUrl);//添加到head底部(乐语不支持异步，故此放弃)
            //                     self.render.addHtml([ObjInitData.likeclass, ObjInitData.daquid, ObjInitData.leyuGroup, self.constant.htmlDom.regClick, self.constant.htmlDom.regSign], self);//添加到body头部
            //                     self.render.bindClickFn(self);//绑定乐语和注册模拟点击
            //                     self.render.testLeyuid(ObjInitData.leyuUrl);//检测页面是否存在乐语JS 
            //                 }
            //             }
            //         }
            //     });
            // },
            requestJson: function (ObjInitData) {
                var self = this;
                self.fn.add_js(self.constant.json.url, function () {
                    var e = callbackJson, eObj = e['DataObj'], eLen = eObj.length, i = 0, match = false;
                    self.render.bindMap(self.constant.MapVal); //MapVal锚点跳转
                    self.render.bindClickFn(self); //绑定乐语和注册模拟点击                    
                    //self.render.addHtml([ObjInitData.likeclass, ObjInitData.daquid, ObjInitData.leyuGroup, self.constant.htmlDom.regClick, self.constant.htmlDom.regSign], self);//默认参数先行添加到body头部
                    for (; i < eLen; i++) {
                        var o = eObj[i];
                        if (self.fn.urlHref(o.url.toLowerCase()) > -1) {
                            match = true;
                            ObjInitData = {
                                likeclass: "<input type=\"hidden\" id=\"LikeClass\" name=\"LikeClass\" value=\"" + o.likeClassId + "\">",
                                daquid: "<input type=\"hidden\" id=\"daquid\" name=\"daquid\" value=\"" + o.daquId + "\">",
                                leyuGroup: "<a href=\"javascript:void(0);\" onclick=\"javascript:doyoo.util.openChat('g=" + (o.leyuGroupId ? o.leyuGroupId : null) + "');return false;\" id=\"leyuOnclick\" style=\"display:none;\">\u4E50\u8BED\u70B9\u51FB\u6309\u94AE</a>",
                                leyuUrl: "soperson.com/20002054/" + (o.leyuId ? o.leyuId : null) + ".js",
                                leyooIdUrl: "<script type=\"text/javascript\" src=\"//gate.soperson.com/20002054/" + (o.leyuId ? o.leyuId : null) + ".js\"></script>"
                            };
                            //self.fn.includeJs(ObjInitData.curr.leyuUrl);//添加到head底部(乐语不支持异步，故此放弃)   
                            //self.fn.leyooIdWrite(ObjInitData.leyooIdUrl);//动态输出乐语(无效)
                            //self.leyooIdUrl = ObjInitData.leyooIdUrl;
                            //self.render.testLeyuid(ObjInitData.leyuUrl);//检测页面是否存在乐语JS  
                            self.render.addHtml([ObjInitData.likeclass, ObjInitData.daquid, ObjInitData.leyuGroup, self.constant.htmlDom.regClick, self.constant.htmlDom.regSign], self); //实际参数添加到body头部
                            self.render.addLeyuIframe(self.render.testLeyuid('soperson.com/20002054/'), self.render.testLeyuid(ObjInitData.leyuUrl), o.leyuId, o.leyuGroupId, ObjInitData.leyooIdUrl, self); //自动添加乐语代码
                            break;
                        }
                    }
                    match == false ? (console.log('没有匹配到此URL地址！')) : '';
                });
            },
            addLeyuIframe: function (booleanNum, booleanVal, leyuId, leyuGroupId, leyooIdUrl, self) {
                var that = this;
                if (booleanNum == true && booleanVal == null) {
                    console.log('乐语ID检测不通过，请检查乐语是否错误！');
                }
                else if (booleanNum == null && leyuId == 0) {
                    console.log('当前页面没有乐语功能！');
                }
                else if (booleanNum == null && leyuId !== 0) {
                    var leyuUrl = "//v.soperson.com/20002054/" + leyuId + ".js";
                    that.fnVal(leyuUrl);
                }
            },
            fnVal: function (leyuUrl) {
                var ele = document.createElement('script');
                ele.setAttribute("type", 'text/javascript');
                ele.setAttribute("id", 'looyu_probe');
                ele.setAttribute("src", document.location.protocol + leyuUrl);
                ele.setAttribute("charset", "utf-8");
                document.body.appendChild(ele);
                // var str = `<iframe id="leyuIframeId" name="leyuIframeId" style="display:none;"></iframe>`,
                //     jsVal = `javascript:window.frames['leyuIframeId'].doyoo.util.openChat('g=${leyuGroupId}');return false`;
                // $('body').prepend(str);
                // win.frames['leyuIframeId'].document.writeln(leyooIdUrl);
                // var doc = ( document.getElementById('leyuIframeId') as HTMLIFrameElement ).contentWindow;//获取框架里页面的window            
                // self.fn.add_js(leyuUrl, function () {            
                //         var num = 0;
                //         var doyooUtil = setInterval(function () {
                //             num++;                           
                //             if (Object.prototype.toString.call(doc.document.body) !== "[object Null]") {
                //                 clearInterval(doyooUtil);
                //                 $('body').prepend(doc.document.body.innerHTML);
                //                 $('#leyuIframeId').remove();
                //             } else {
                //                 num > 200 ? (clearInterval(doyooUtil),alert('您的网络过慢，请尝试刷新页面！')) : '';
                //             }
                //         }, 50);    
                // });
            },
            addHtml: function (ArraySrc, self) {
                var doc = document.body || document.documentElement, arglen = ArraySrc.length, first = doc.firstChild; //得到页面的第一个元素                               
                for (var i = 0; i < arglen; i++) {
                    var vid = self.fn.parseDom(ArraySrc)[i].getAttribute("id"), docVid = document.getElementById(vid);
                    if (docVid) { //检测当前页面是否存在dom,有的话就先删除（这里作用是删除掉跨域请求前生成的默认dom）
                        docVid.parentNode.removeChild(docVid);
                        doc = document.body || document.documentElement,
                            arglen = ArraySrc.length,
                            first = doc.firstChild; //得到页面的第一个元素                   
                        doc.insertBefore(self.fn.parseDom(ArraySrc)[i], first);
                    }
                    else {
                        doc.insertBefore(self.fn.parseDom(ArraySrc)[i], first);
                    }
                }
            },
            bindClick: function (ArrayVal) {
                var tagName = win.document.getElementsByTagName('*');
                for (var k = 0; k < tagName.length; k++) {
                    if (tagName[k].getAttribute(ArrayVal[0]) !== null) {
                        tagName[k].onclick = function () {
                            var evt = arguments.callee.arguments[0] || win.event; //获取event对象
                            if (evt.preventDefault) {
                                evt.preventDefault(); //非IE浏览器
                            }
                            else {
                                evt.returnValue = false; //在早期的IE版本中
                            }
                            evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
                            if (ArrayVal[0] == "data-reg" || ArrayVal[0] == "data-regon") {
                                var attrVal = $(this).attr('data-reg') || $(this).attr('data-regon');
                                attrVal !== null && typeof (attrVal) !== 'undefined' && attrVal !== '' ?
                                    $('#' + ArrayVal[1]).attr('onclick', 'javascript:ZY.util.reg(' + attrVal + ');') : '';
                            }
                            document.getElementById(ArrayVal[1]).onclick();
                        };
                    }
                }
            },
            bindClickFn: function (t) {
                for (var j = 0; j < Object.keys(t.constant.bindarray).length; j++) {
                    t.render.bindClick(t.constant.bindarray[j]); //绑定乐语和注册模拟点击
                }
            },
            testLeyuid: function (e) {
                var tagName = win.document.getElementsByTagName('script'), value = null;
                for (var k = 0; k < tagName.length; k++) {
                    if (tagName[k].outerHTML.indexOf(e) > -1) {
                        value = true;
                        break;
                    }
                }
                //value == null ? (console.log('乐语ID检测不通过，请检查乐语是否错误！')) : '';
                return value;
            },
            bindMap: function (MapVal) {
                var self = this, tagName = win.document.getElementsByTagName('*');
                for (var k = 0; k < tagName.length; k++) {
                    if (tagName[k].getAttribute(MapVal[0]) !== null) {
                        var mapValText = tagName[k].getAttribute(MapVal[0]).split(','), mapId = mapValText[0], mapNum = mapValText[1];
                        tagName[k].onclick = function (mapId, mapNum) {
                            var mao = $('#' + mapId);
                            if (mao.length > 0) { //判断集合是否存在   
                                var pos = mao.offset().top;
                                $("html,body").animate({ scrollTop: pos - 10 - (typeof (mapNum) !== 'undefined' ? mapNum : 0) }, 300);
                            }
                        }.bind(this, mapId, mapNum);
                        // tagName[k].onclick = function () {
                        //     var evt = evt || win.event; //获取event对象
                        //     if (evt.preventDefault) {
                        //         evt.preventDefault(); //非IE浏览器
                        //     }
                        //     else {
                        //         evt.returnValue = false; //在早期的IE版本中
                        //     }
                        //     event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
                        // };
                    }
                }
            },
            onMap: function (id) {
                var mao = $('#' + id);
                if (mao.length > 0) { //判断对象是否存在   
                    var pos = mao.offset().top;
                    $("html,body").animate({ scrollTop: pos - 10 }, 300);
                }
            }
        }
    };
    win.ZY = new basic_module();
    win.console = win.console || (function () {
        var c = {};
        c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
            = c.clear = c.exception = c.trace = c.assert = function () { };
        return c;
    })();
})(window, $);
