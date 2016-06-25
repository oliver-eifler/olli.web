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
    public static function printDate(DateTime $dateTime) {
        return $dateTime->format("j F, Y");
    }


    public static function prettyDate(DateTime $dateTime, DateTime $reference = null)
    {
        // If not provided, set $reference to the current DateTime
        if (!$reference) {
            $reference = new DateTime(NULL, new DateTimeZone($dateTime->getTimezone()->getName()));
        }

        // Get the date corresponding to the $dateTime
        $date = $dateTime->format('Y/m/d');

        // Today
        if ($reference->format('Y/m/d') == $date) {
            return "Today";
        }

        $yesterday = clone $reference;
        $yesterday->modify('- 1 day');

        $tomorrow = clone $reference;
        $tomorrow->modify('+ 1 day');

        if ($yesterday->format('Y/m/d') == $date) {
            return 'Yesterday';
        } else if ($tomorrow->format('Y/m/d') == $date) {
            return 'Tomorrow';
        }

        $fmt = "j F";
        if ($dateTime->format("Y") != $reference->format("Y"))
            $fmt .= ", Y";
        return $dateTime->format($fmt);
    }

    public static function PageTime($created=0,$modified=0) {
        if (empty($created))
            return "";
        $c = new DateTime();
        $c->setTimestamp($created);
        $str = "published: <time datetime='".$c->format("c")."'>" . self::printDate($c)."</time>";

        if (!empty($modified)) {
            $m = new DateTime();
            $m->setTimestamp($modified);
            if ($c->format('Y/m/d') != $m->format('Y/m/d'))
                $str .= " - modified: <time datetime='".$m->format("c")."'>"  . self::printDate($m)."</time>";
        }
        return $str;




    }

}