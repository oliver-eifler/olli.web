<?php
/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 02.04.2016
 * Time: 21:40
 */
session_cache_limiter("public"); //This stop phpâ€™s default no-cache

require_once('php/util/path.inc.php');
$request_url = get_request_url();
$parts = parse_url($request_url);
$request_uri = strtolower($parts['path']);
$ext = getExtension($request_uri);
//allowed files
$mimeTypes = array(
    "png" => "image/png",
    "jpeg" => "image/jpeg",
    "jpg" => "image/jpg",
    "gif" => "image/gif",
    "js" => "text/javascript",
    "css" => "text/css"
);

if (isset($mimeTypes[$ext]) && file_exists("pages" . $request_uri)) {
    $file = "pages" . $request_uri;
    $mime = $mimeTypes[$ext];

    $modified = filemtime($file);
    $size = filesize($file);
    $offset = 60 * 60 * 24 * 30; // Cache for a Month
// fast exit, in case the browsers-cache is up2date
    if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && $modified > 0 && $_SERVER['HTTP_IF_MODIFIED_SINCE'] == $modified) {
        header('HTTP/1.1 304 Not Modified');
        exit();
    }
    header("Content-type: " . $mime);
    header('Content-Length: ' . $size);

    if ($modified > 0) {
        header('Last-Modified: ' . $modified);
    }


    echo file_get_contents($file);
    exit();
}

include 'layout.php';
?>

