<?php
/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 25.06.2016
 * Time: 15:06
 * Components for Layout
 */
class Components
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
    public static function inlineCSS($path) 
    {
            $html = "<style>".file_get_contents($path)."</style>";
        return $html;
    }
    public static function printMainMenu($class="mm")
    {
        $html = "";
        $html .= "<div class='".$class."'>";
        $html .= "<ul class='".$class."-cat'>";
        $html .= "<li class='".$class."-item'><a class='".$class."-link' href='/home' data-observe='ajax'>Home</a></li>";
        $html .= "<li class='".$class."-item'><a class='".$class."-link' href='/articles' data-observe='ajax'>Articles</a></li>";
        $html .= "<li class='".$class."-item'><a class='".$class."-link' href='/gallery' data-observe='ajax'>Gallery</a></li>";
        $html .= "</ul>";
        $html .= "<ul class='".$class."-cat'>";
        $html .= "<li class='".$class."-item'><a class='".$class."-link' href='/about'>About</a></li>";
        $html .= "<li class='".$class."-item'><a class='".$class."-link' href='/contact'>Contact</a></li>";
        $html .= "</ul>";
        $html .= "</div>";


        return $html;
    }
    public static function printSocialMenu($class="sm")
    {
        $html = "";
        $html .= "<div class='".$class."'>";

        $html .= "<ul class='".$class."-cat'>";

        $html .= "<li class='".$class."-item'>";
        $html .= "<a href=\"#\" class='".$class."-link' title=\"Olli on GitHub\">";
        $html .= "<div data-icon-embed class='".$class."-icon icon-github' aria-hidden=\"true\"></div>";
        $html .= "<span class='".$class."-text noimg'>GitHub</span></a>";
        $html .= "</li>";

        $html .= "<li class='".$class."-item'>";
        $html .= "<a href=\"#\" class='".$class."-link' title=\"Olli on Codepen\">";
        $html .= "<div data-icon-embed class='".$class."-icon icon-codepen' aria-hidden=\"true\"></div>";
        $html .= "<span class='".$class."-text noimg'>CodePen</span></a>";

        $html .= "<li class='".$class."-item'>";
        $html .= "<a href=\"#\" class='".$class."-link' title=\"Olli on Twitter\">";
        $html .= "<div data-icon-embed class='".$class."-icon icon-twitter' aria-hidden=\"true\"></div>";
        $html .= "<span class='".$class."-text noimg'>Twitter</span></a>";
        $html .= "</li>";

        $html .= "<li class='".$class."-item'>";
        $html .= "<a href=\"#\" class='".$class."-link' title=\"Olli on Facebook\">";
        $html .= "<div data-icon-embed class='".$class."-icon icon-facebook' aria-hidden=\"true\"></div>";
        $html .= "<span class='".$class."-text noimg'>Facebook</span></a>";
        $html .= "</li>";

        $html .= "</ul>";

        $html .= "</div>";
        return $html;
    }
}