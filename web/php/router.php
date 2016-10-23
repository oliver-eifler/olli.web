<?php
/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 26.06.2016
 * Time: 18:55
 * Here the magic happens
 */
require_once('php/util/path.inc.php');
require_once('php/class/pagedata.class.php');

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

$pagedata = PageData::getInstance();
$pagedata->request_url = $request_url;
$pagedata->request_uri = $request_uri;
$pagedata->request_json = (isset($_GET['json']) || (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'));

$path = remove_ext($request_uri);
if (empty($path) || $path == "/" || $path=="/index" || $path=="/start") {
    $path="/home"; //later: check short urls ;)
}
$pagedata->uri = $path;
$path = "pages".$path.".php";

$class = "site";
if ($pagedata->uri=="/404" || !file_exists($path))
    $class = "site404";
require_once("php/".$class.".php");
//ToDo: Check for AJAX Request
(new $class($path))->render();
exit;
