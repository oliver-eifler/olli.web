<?php
/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 10.07.2016
 * Time: 18:14
 */
require_once("php/util/path.inc.php");

define('PHP', relativePath(ROOT,__DIR__));
define('ROOT_PHP', ROOT.DIRECTORY_SEPARATOR.PHP);

define('COMPONENTS', PHP.DIRECTORY_SEPARATOR."components");
define('ROOT_COMPONENTS', ROOT.DIRECTORY_SEPARATOR.COMPONENTS);

define('CLASSES', PHP.DIRECTORY_SEPARATOR."class");