<?php
/**
 * Olli's DSSC Framework
   for a Dynamic Site with near Static (prebuild) Content
 * PHP Part: Bootstrap
 * Date: 02.04.2016
 * Time: 21:40
 */
session_cache_limiter("public"); //This stop php default no-cache
/* the magic starts here */
define('ROOT', __DIR__);

require_once('php/config.php');
require_once('php/router.php');
?>

