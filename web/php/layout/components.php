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
    public static function printMainMenu()
    {
        $html = "";
        $html .= "<div class=\"links\">";
        $html .= "<div class=\"links-cat\">";
        $html .= "<a href='/home' data-observe='ajax'>Home</a>";
        $html .= "<a href='/articles' data-observe='ajax'>Articles</a>";
        $html .= "<a href='/gallery' data-observe='ajax'>Gallery</a>";
        $html .= "</div>";
        $html .= "<div class=\"links-cat\">";
        $html .= "<a href='/about'>About</a>";
        $html .= "<a href='/contact'>Contact</a>";
        $html .= "</div>";
        $html .= "</div>";


        return $html;
    }
    public static function printSocialMenu()
    {
        $html = "";
        $html .= "<div class=\"social\">";
 
        $html .= "<a href=\"#\" class=\"social-icon\" title=\"Olli on GitHub\">";
        $html .= "<div data-icon-embed class=\"icon-github\" aria-hidden=\"true\"></div>";
        $html .= "<span>GitHub</span></a>";

        $html .= "<a href=\"#\" class=\"social-icon\" title=\"Olli on Codepen\">";
        $html .= "<div data-icon-embed class=\"icon-codepen\" aria-hidden=\"true\"></div>";
        $html .= "<span>CodePen</span></a>";

        $html .= "<a href=\"#\" class=\"social-icon\" title=\"Olli on Twitter\">";
        $html .= "<div data-icon-embed class=\"icon-twitter\" aria-hidden=\"true\"></div>";
        $html .= "<span>Twitter</span></a>";

        $html .= "<a href=\"#\" class=\"social-icon\" title=\"Olli on Facebook\">";
        $html .= "<div data-icon-embed class=\"icon-facebook\" aria-hidden=\"true\"></div>";
        $html .= "<span>Facebook</span></a>";

        $html .= "</div>";
        return $html;
    }
}