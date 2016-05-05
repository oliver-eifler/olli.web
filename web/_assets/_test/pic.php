<?php
$pic = $_REQUEST[ "file" ];
if ( ! isset( $pic ) ){
    echo '$file must be specified!';
    exit;
}
$lmodified = filemtime($pic);
if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && $lmodified > 0 && $_SERVER['HTTP_IF_MODIFIED_SINCE'] == $lmodified) {
    header('HTTP/1.1 304 Not Modified');
    exit();
}
$pic = "/".$pic;
if ($lmodified > 0) {
    header('Last-Modified: '. $lmodified);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'/>
    <meta name='format-detection' content='telephone=no'/>
    <style>
        body {
            position:relative;
            margin:0;
            padding:0;
            background-color:transparent;
            overflow:hidden;
        }
        img {width:100%;height:auto;opacity:0;transition:opacity 1s;
        }
        img[data-loaded] {
            opacity: 1;
        }


    </style>
</head>
<body>
<img src="<?= $pic ?>" onload="this.setAttribute('data-loaded','');">
</body>
</html>
