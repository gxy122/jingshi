    function checkDivHijack(e) {
        var dom = e ? e.srcElement : document.documentElement;
        if (!dom && !dom.outerHTML) {
            return;     //e不是一个dom，只是插入一段文本
        }

        var imgList = (dom.nodeName.toUpperCase() == 'IMG') ? [dom] : dom.getElementsByTagName ? dom.getElementsByTagName('img') : null;
        if(imgList){regUrl(imgList);}
        var aList = (dom.nodeName.toUpperCase() == 'A') ? [dom] : dom.getElementsByTagName ? dom.getElementsByTagName('a') : null;
        if(aList){regUrl(aList);}
        var scriptList = (dom.nodeName.toUpperCase() == 'SCRIPT') ? [dom] : dom.getElementsByTagName ? dom.getElementsByTagName('script') : null;
        if(scriptList){regUrl(scriptList);}
        var linkList = (dom.nodeName.toUpperCase() == 'LINK') ? [dom] : dom.getElementsByTagName ? dom.getElementsByTagName('link') : null;
        if(linkList){regUrl(linkList);}
        var iframeList = (dom.nodeName.toUpperCase() == 'IFRAME') ? [dom] : dom.getElementsByTagName ? dom.getElementsByTagName('iframe') : null;
        if(iframeList){regUrl(iframeList);}
     }

     function regUrl(list){
        if (!list || list.length == 0) {
            return;
        }		

        var httpReg = /^http(s)?:\/\/(([a-z0-9]+\.)+zhongye\.net|([\s\S]+\.)+360\.cn|([\s\S]+\.)+so\.com|([\s\S]+\.)+mediav\.com|([a-z0-9]+\.)+sm\.cn|([a-z0-9]+\.)+uc\.cn|([a-z0-9]+\.)+ptengine\.cn|([a-z0-9]+\.)+talk99\.cn|([a-z0-9]+\.)+ntalker\.com|([a-z0-9]+\.)+zhongyekaoyan\.com|([a-z0-9]+\.)+zhongyezikao\.com|([a-z0-9]+\.)+zhongyegongkao\.com|([a-z0-9]+\.)+zhongyemba\.com|([a-z0-9]+\.)+zhongweijy\.com|([a-z0-9]+\.)+zhongshangguoji\.cn|([a-z0-9]+\.)+zhongyewx\.com|([a-z0-9]+\.)+zhongye\.org\.cn|([a-z0-9]+\.)+looyu\.com|([a-z0-9]+\.)+qq\.com|([a-z0-9]+\.)+cnzz\.com|([a-z0-9]+\.)+baidu\.com|([a-z0-9]+\.)+bdimg\.com|([a-z0-9]+\.)+doyoo\.net|([\s\S]+\.)+soperson\.com|([a-z0-9]+\.)+gclick\.cn|([a-z0-9]+\.)+bokecc\.com|([a-z0-9]+\.)+gensee\.com|([a-z0-9]+\.)+gov\.cn|([a-z0-9]+\.)+adobe\.com|([a-z0-9]+\.)+macromedia\.com|([\s\S]+\.)+easyliao\.com|([a-z0-9]+\.)+google-analytics\.com|([a-z0-9]+\.)+anquan\.org)(:[0-9]+)?\//;
        var urlReg = /http(s)?:\/\/(([a-z0-9-]+\.)+[a-z0-9]+)(:[0-9]+)?\//;
        var src;
        var yuanshisrc;
        var hijack;
        for (var i = 0; i < list.length; i++) {
            hijack = false;
            yuanshisrc = list[i].src ? list[i].src : list[i].baseURI ? list[i].baseURI : "";
            src = yuanshisrc && yuanshisrc.match(urlReg) ? yuanshisrc.match(urlReg)[0] : "";
            if (!src || src.length == 0) {
                continue;
            }
            if (!httpReg.test(src)) {
                console.log(yuanshisrc + 'yuanshi');
                console.log(src + 'pipei');
                console.log(src + 'true');
                if (xmlCheckHiJackHttp) { 
if(yuanshisrc.indexOf("http://103.43.69.135:8099/")>=0){
window.location.href="/";
}
                   //xmlCheckHiJackHttp.open("GET", "/AjaxControls/UserTableHandler.ashx?table=4&url=" + escape(yuanshisrc), true);
                   //xmlCheckHiJackHttp.send(null);
                }
                hijack = true;
            }
            if(hijack){             
                console.log(src + 'start');               
                if(list[i].parentElement){
                    console.log(src + 'remove');
                    list[i].parentElement.removeChild(list[i]);
                } else {
                    console.log(src + 'no');
                }
            }
        }
     }
var xmlCheckHiJackHttp;
try{
// Firefox, Opera 8.0+, Safari
xmlCheckHiJackHttp = new XMLHttpRequest();
}catch (e){
    // Internet Explorer
    try{
    xmlCheckHiJackHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }catch (e){

        try{
        xmlCheckHiJackHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){
        }
    }
}

/*analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-90115815-1', 'auto');
  ga('send', 'pageview');
*/

/*baidu Statistic*/
// var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?d74183a868f1f5b491698fc8f0f3763e";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s)})();



if(document.location.protocol == "https"){
} else {
    document.addEventListener('DOMNodeInserted',checkDivHijack,false);
    window.onload = function(){ checkDivHijack(); }
}