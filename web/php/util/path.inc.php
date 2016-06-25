<?php
function get_request_url()
{
    return get_request_scheme() . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
}

function get_request_scheme()
{
    return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
}
function remove_ext($path)
{
    $parts = pathinfo($path);
    if (isset($parts['extension']))
        $path = substr($path,0,strlen($path) - (strlen($parts["extension"]) + 1) );
    return $path;
}
function getExtension($path)
{
    $parts = pathinfo($path);
    if (isset($parts['extension']))
        return $parts["extension"];
    return "";
}
function path2cmd($path,&$cmd)
{
    $rc = false;
    if (file_exists($path)) {
          $cmd = pathinfo($path);
          if (!isset($cmd["filename"])) {
            $cmd["filename"] = substr($cmd["basename"],0,strlen($cmd["basename"]) - (strlen($cmd["extension"]) + 1) );
          }
          $cmd["path"] = $path;
          $rc = true;
    }
  return $rc;
}
function autoversion($path)
{
    if (file_exists($path))
    {
          $parts = pathinfo($path);
          if (!isset($parts["filename"])) {
            $parts["filename"] = substr($parts["basename"],0,strlen($parts["basename"]) - (isset($parts['extension'])?(strlen($parts["extension"]) + 1):0) );
          }
          $dir = ($parts["dirname"]=="."?"":$parts["dirname"]."/");
          $ver = filemtime($path);
          return $dir.$parts["filename"]."_".$ver.".".$parts["extension"];
    }
    return false;
}
?>