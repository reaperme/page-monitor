~function(e){function t(e){var t=/(chrome)\/(\d+\.\d)/,r=/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/,n=/(opera)(?:.*version)?[ \/]([\w.]+)/,o=/(msie) ([\w.]+)/,a=/(mozilla)(?:.*? rv:([\w.]+))?/;e=e.toLowerCase();var i=t.exec(e)||n.exec(e)||o.exec(e)||e.indexOf("compatible")<0&&a.exec(e)||[];return r.exec(e)&&!/chrome/.test(e)&&(i[1]="safari",i[2]=RegExp.$1||RegExp.$2),{browser:i[1]||"unknown",version:i[2]||"0"}}function r(){for(var e=document.body.childNodes,t="",r=e.length-1;r>=0;r--)if(e[r].nodeType==document.COMMENT_NODE){t=e[r].textContent;break}return t}function n(e){if(!e||Array.isArray(e)&&!e.length)return!0;var t=!1;return Array.isArray(e)&&e.some(function(e,r){var n=new RegExp(e);if(n.test(i.href))return t=!0,!0}),t}function o(e,t){var r={};for(var n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);
for(var o in t)t.hasOwnProperty(o)&&(r[o]=t[o]);return r}var a=e.navigator,i=e.location,c=e.screen,u=e.document,s=e.BDWMMonitor||{};s.url="//log.waimai.baidu.com/static/exceptionjs.gif?",s.beforeReport=function(e,t){return t},s.init=function(e,o){s._conf={platform:o.platform,app:o.app,channel:o.channel,pageid:o.pageid||0,traceCode:""},o.url?s.url=o.url:null,o.beforeReport?s.beforeReport=o.beforeReport:null,n(o.pageWhiteList)&&e.forEach(function(e,t){s.use(e)});var i=function(){s._conf.traceCode=r()};window.addEventListener("DOMContentLoaded",function(){i(),window.removeEventListener("DOMContentLoaded",i)});var u=t(a.userAgent),d=c.width+"*"+c.height+"|"+c.availWidth+"*"+c.availHeight;"pc"===o.channel&&(s._conf.browser=u.browser+"|"+u.version),s._conf._screen=d},s._module={},s.define=function(e,t){
if(s._module[e])throw new Error(e+" Already defined");s._module[e]=t()},s.report=function(e,t){if(s.url&&e&&t){if(t=s.beforeReport(e,t),!t)throw new Error("Report data is empty");var r=s._conf;if(!r.app||!r.channel||!r.platform)throw new Error("Global report data fragmentary");t=o(r,t);var n=u.createElement("img"),a=s.url,i=[];for(var c in t)i.push(c+"="+encodeURIComponent(t[c]));var d="img_"+ +new Date;s[d]=n,n.onload=n.onerror=function(){s[d]=n=n.onload=n.onerror=null,delete s[d]},n.src=a+(a.indexOf("?")<0?"?":"&")+i.join("&")}},s.error=function(e){s.report("exception",e)},s.use=function(e){s._module[e]&&s._module[e].run()},e.BDWMMonitor=s}(window),function(e){var t=e.BDWMMonitor,r=window.location,n=window.performance||window.webkitPerformance||window.msPerformance||window.mozPerformance;t.define("net",function(){
var a=["script","link","xmlhttprequest"],i=["resource","measure"],c=500;return{run:function(){this.resourceHook(),this.initXhrHook()},resourceHook:function(){window.addEventListener("error",function(e){var n=e.srcElement||e.target;if(n instanceof HTMLElement){var o=n.tagName.toLowerCase();/script|link|img/.test(o)&&t.report("exception",{tag:"resource_error",url:n.src||n.href,purl:r.href,err_status:"404",err_msg:"Not Found"})}},!0),this.initPerfObserve(),this.resourceLoadAdapter(!0),this.resourceLoadAdapter(!1)},resourceLoadAdapter:function(t){var r=function(){},n=function(){},o="_resourceLoadSucc",a="_resourceLoadFail",i=t?o:a,c=t?r:n;if(e[i]){var u=e[i];e[i]=function(e){u(e),c(e)}}else e[i]=c},initjQueryObserve:function(){var e=this;(window.jQuery||window.Zepto)&&$(document).ajaxComplete(function(t,r,n){
var o=e.getLastEntryByUrl(n.url);o&&e.analyzePerfEntry(o)})},analyzePerfEntry:function(e){var r=e.duration;r>c&&t.report("resource",{tag:"resource_timing",p_lookup:e.domainLookupEnd-e.domainLookupStart,p_tcp:e.connectEnd-e.connectStart,p_ssl:e.secureConnectionStart>0?e.connectEnd-e.secureConnectionStart:0,p_ttfb:e.responseStart-e.requestStart,p_download:e.responseEnd-e.responseStart,p_to_download:r,p_to_connect:e.connectEnd-e.fetchStart,url:e.name})},initPerfObserve:function(){var e=this;if(window.PerformanceObserver){var t=new window.PerformanceObserver(function(t){for(var r=t.getEntriesByType("resource"),n=0;n<r.length;n++){var o=r[n];/log\.waimai\.baidu\.com/.test(o.name)||a.indexOf(o.initiatorType)!=-1&&e.analyzePerfEntry(o)}});t.observe({entryTypes:i})}},getLastEntryByUrl:function(e){var t=null;
return n.getEntries().some(function(r){if(r.name==o.resolvePath(e))return t=r,!0}),t},initXhrHook:function(){var e=this;window.XMLHttpRequest&&e.xhrHook(window.XMLHttpRequest),document.addEventListener("DOMContentLoaded",function(t){e.initjQueryAjaxHook(),e.initjQueryObserve()})},initjQueryAjaxHook:function(){(window.jQuery||window.Zepto)&&$(document).ajaxError(function(e,n,o,a){t.report("exception",{tag:"xhr",url:o.url,method:o.type,purl:r.href,err_status:n.status,err_txt:n.statusText})})},xhrHook:function(t){var r=t.prototype.open,n=t.prototype.send,o=this,a="";t.prototype.open=function(e,t){return this._track={method:e.toLowerCase(),url:t},a="xhr_"+ +new Date,r.apply(this,arguments)},t.prototype.send=function(){return this._trackName=a,e[a]=!0,o.registerComplete(this),n.apply(this,arguments);
}},registerComplete:function(e){var t=this;e.addEventListener?e.addEventListener("readystatechange",function(){4==e.readyState&&t.checkComplete(e)},!0):setTimeout(function(){var r=e.onload;e.onload=function(){return t.checkComplete(e),r.apply(e,arguments)};var n=e.onerror;e.onerror=function(){return t.checkComplete(e),n.apply(e,arguments)}},0)},checkComplete:function(n){n._track&&(e[n._trackName]&&n.status>=400&&t.report("exception",{tag:"xhr",url:n._track.url,method:n._track.method,purl:r.href,err_status:n.status,err_txt:n.statusText}),delete n._trackName,delete n._track,delete e[n._trackName])}}});var o={resolvePath:function(e){var t=/^(?:[\.]{1,2}\/?)*\/?\w+/,n=/^http(?:s)?:\/\//;if(!t.test(e)||n.test(e))return e;var o=r.href.split("/"),a=e.split("/"),i=0;return/^\.{1,2}$/.test(a[0])?(a.some(function(e){
".."==e&&i++}),o=o.slice(0,Math.max(3,o.length-i-1)),o.push(a[a.length-1])):/^\/.+/.test(e)?(o=[r.protocol+"//"+r.host],o.push(e.substr(1))):(o=o.slice(0,o.length-1),o.push(e)),o.join("/")}}}(window),function(e){var t=e.BDWMMonitor,r=window.location;t.define("exception",function(){return{run:function(){this.catchException()},catchException:function(){function e(e){var t=e.stack.replace(/\n/gi,"").split(/\bat\b/).slice(0,9).join("@").replace(/\?[^:]+/gi,""),r=e.toString();return t.indexOf(r)<0&&(t=r+"@"+t),t}window.onerror=function(n,o,a,i,c){var u=n;c&&c.stack&&(u=e(c)),t.report("exception",{tag:"js_error",err_txt:u,url:o,purl:r.href,ln:a,col:i,err_status:401})}}}})}(window),function(e){function t(e){var t=o.timing,r=t[e+"Start"]?t[e+"Start"]:0,n=t[e+"End"]?t[e+"End"]:0;return{start:r,end:n,
value:0<n-r?n-r:0}}function r(e,t,r){if(e.length===+e.length)for(var n=0;n<e.length;n++)t.call(r,n,e[n],e);else for(var o in e)e.hasOwnProperty(o)&&t.call(r,o,e[o],e)}var n=e.BDWMMonitor,o=window.performance||window.webkitPerformance||window.msPerformance||window.mozPerformance;n.define("perf",function(){var e={},a={};return{run:function(){this.domHook()},domHook:function(){var e=this,t=function(){"complete"==document.readyState&&setTimeout(function(){e.collectPerf(),document.removeEventListener("readystatechange",t)},100)};"complete"!==document.readyState&&document.addEventListener("readystatechange",t)},collectPerf:function(){o&&(this.collect(),n.report("perf",a))},collect:function(){if(o){var n=o.timing,i=t("navigation"),c=t("request"),u=t("response"),s=t("domainLookup"),d=t("connect"),p=t("loadEvent"),f=(t("unloadEvent"),
n.navigationStart);e.p_dns=n.domainLookupEnd,e.p_ct=n.connectEnd,e.p_st=n.responseStart,e.p_tt=n.responseEnd,e.p_dct=n.domComplete,e.p_olt=n.loadEventEnd,r(e,function(t,r){e[t]=Math.max(r-f,0)});var l={p_lookup:s.value,p_tcp:d.value,p_ssl:n.secureConnectionStart>0?n.connectEnd-n.secureConnectionStart:0,p_ttfb:u.start-c.start,p_download:u.value,p_to_download:u.end-i.start,p_to_connect:d.end-i.start,p_dom_ready:n.domComplete-n.domLoading,p_to_dom_ready:n.domComplete-n.navigationStart,p_dom_loaded:p.value,p_to_dom_loaded:p.end-i.start,p_net:c.start-i.start,p_srv:u.end-c.start,p_brw:p.end-n.domLoading};r(e,function(e,t){a[e]=t}),r(l,function(e,t){a[e]=t});var m=["network: "+l.p_net,"server: "+l.p_srv,"browser: "+l.p_brw];window.__perf=m.join("\n")}}}})}(window);