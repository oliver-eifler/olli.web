<?php
/******************************
* HTTP Compression Self-Test
* Source:   http://sammitch.ca
* Version:  1.0
* Date:     Jan 24, 2013
******************************/

// make sure cURL is available
if( ! function_exists('curl_init') ) {
  die('You must have the cURL extension installed/enabled.');
// make sure the script isn't being called via command line
} else if( php_sapi_name() == 'cli' ) {
	die('This script must be invoked via a web browser.');
}
check('http://'.$_SERVER["SERVER_NAME"].'/css/icons-fallback.min.css');
check('http://'.$_SERVER["SERVER_NAME"].'/css/icons-png.min.css');
check('http://'.$_SERVER["SERVER_NAME"].'/bundle/js/promise.js,js/page.js');
function check($uri)
{
	// prepare cURL
	$ch = curl_init($uri);
	curl_setopt_array($ch, array(
		CURLOPT_HEADER => TRUE,
		CURLOPT_NOBODY => FALSE,
		CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_FOLLOWLOCATION => TRUE/*,
		CURLOPT_HTTPHEADER => array ($accept_header)*/
	));
    curl_setopt($ch, CURLOPT_ENCODING, "gzip,deflate,compress");
	if( ! $return = curl_exec($ch) ) {
		die('curl_exec failed: ' . curl_error($ch));
	}
	// check returned headers
	$recv_enc = NULL;
	foreach( explode("\r\n",$return) as $ret_header ) {
		$h_arr = explode(':', $ret_header);
		if( $h_arr[0] == 'Content-Encoding' ) {
			$recv_enc = trim($h_arr[1]);
			break;
		}
	}
	// print results.
    $info = curl_getinfo($ch);
    $zip =  $info["size_download"];
    $unzip = mb_strlen($return,'8bit')-$info["header_size"];
	echo '<pre>';
    echo "url: ".$info["url"];
    echo "\n";
    echo $return."\n";
	if( ! (is_null($recv_enc) || $recv_enc == 'identity') ) {
		echo 'Received Content-Encoding: ' . $recv_enc;
	} else {
		echo 'Content was received uncompressed.';
	}
    echo "\n";
    echo "Received: ".$zip." + Header: ".$info["header_size"];
    echo "\n";
    echo "Content: ".$unzip;
    echo "\n";
    echo "Compressed: ".round((($unzip-$zip)/$unzip*100),3)."%";
	echo '</pre><hr>';
/*
he percentage decrease from 40 to 30 is:
  (40-30)/40 * 100 = 25%.
*/
}
?>