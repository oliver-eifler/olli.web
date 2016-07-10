<?php

/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 25.06.2016
 * Time: 15:06
 * Static Components for Layout
 */
class NoopComponent
{
    protected $name = "NoopComponent";

    public function __construct($name = null)
    {
        if (isset($name))
            $this->name = $name;
    }

    public function __invoke()
    {
        return "<p><em>Component '".$this->name."' not found</em></p>";
    }
}

class Component
{
    static protected $callbacks = array();

    static public function register($componentName, $callback)
    {
        if (!is_callable($callback)) {
            throw new Exception("Invalid callback!");
        }

        $componentName = strtolower($componentName);

        self::$callbacks[$componentName] = $callback;
    }
    static public function autoregister($path, $callback)
    {
        $path = remove_ext($path);
        $componentName = str_replace(DIRECTORY_SEPARATOR,"/",relativePath(ROOT_COMPONENTS,$path));
        self::register($componentName,$callback);
    }
    static public function getComponents() 
    {   $list = array(); 
        foreach (self::$callbacks as $key => $callback) {
            $list[]=$key;
        }
        return $list;
    }
    /*
    static public function get($componentName, $data = null)
    {
        $componentName = strtolower($componentName);
        if (isset(self::$callbacks[$componentName])) {
            $html = "";
            foreach (self::$callbacks[$componentName] as $callback) {
                // The callback is either a closure, or an object that defines __invoke()
                $html .= isset($data)?$callback($data):$callback();
            }
            return $html;
        }
        return "<p>Component '".$componentName."' not found</p>";
    }
    */
    static public function get($componentName,...$arguments)
    {
        $componentName = strtolower($componentName);
 
        if (!isset(self::$callbacks[$componentName])) {
            /* try to load component */
            $path = COMPONENTS.DIRECTORY_SEPARATOR.$componentName.".php";
            if (!file_exists($path)) {
                self::register($componentName,new NoopComponent($componentName));
            }
            else {
                require_once $path;
            }
        }
        $callback = self::$callbacks[$componentName];
        return $callback(...$arguments);
    }
}
