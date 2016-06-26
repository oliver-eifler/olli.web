<?php
/*
   Olli PHP Framework
*/
require_once('php/class/registry.class.php');

class PageData extends _registry
{
    protected static $instance = NULL;
    public static function getInstance()
    {
        if (self::$instance === NULL)
        {
            self::$instance = new self();
        }
        return self::$instance;
    }
    protected function __construct() {}
    private function __clone() {}
}
?>