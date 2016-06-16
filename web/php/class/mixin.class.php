<?php

/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 16.06.2016
 * Time: 17:38
 * Mixins (small helpers) for Templates only static functions
 */
class Mixin
{
    protected static $instance = NULL;

    public static function getInstance()
    {
        if (self::$instance === NULL) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    protected function __construct()
    {
    }

    private function __clone()
    {
    }

    public static function HumanTime($time)
    {
        $now = new DateTime();
        $diff = $time->diff($now);
        $days = (int)$diff->format("%r%a");
        if ($days == 0)
            return "Today";
        if ($days == 1)
            return "Yesterday";
        $fmt = "l, F jS";
        if ($now->format("Y") != $time->format("Y"))
            $fmt .= " Y";
        return $time->format($fmt);
    }
    public static function PageTime($created="",$modified="") {
        if ($created == "")
            return "";
        if ($modified == "")
            return "created: ".self::HumanTime($created);
        $c = new DateTime($created);
        $m = new DateTime($modified);
        $diff = $c->diff($m);
        $days = (int)$diff->format("%r%a");
        $str = "created: ".self::HumanTime($c);
        if ($days > 0)
            $str .= " - modified: ".self::HumanTime($m);
        return $str;




    }


}