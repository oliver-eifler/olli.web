<?php
require_once('php/class/basesite.class.php');
require_once('php/class/mixin.class.php');
require_once('php/layout/components.php');
/* Static Getter */
function getSite($path="") {
    return new Site($path);
}

class Site extends BaseSite
{

    protected function init($path)
    {
        $render = function($tpl){
            ob_start();
            include $tpl;
            $this->html = ob_get_contents();
            ob_end_clean();
        };

        $render = $render->bindTo($this->pagedata, $this->pagedata);
        $render($path);
        /*
        $page = $this->pagedata;
        include($path);
        */
        return $this;
    }
    public function renderHTML()
    {
        echo $this->HTML();
        return $this;
    }
    public function renderJSON()
    {
        return $this;
    }

    protected function HTML()
    {
        $page = $this->pagedata;
        $html = "<!DOCTYPE html><html lang='en'><head>";
        $html .= "<meta charset='UTF-8'>";
        $html .= "<meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'/>";
        $html .= "<meta name='format-detection' content='telephone=no'/>";
        $html .= "<title>" . $page->title . "</title>";
        $html .= "<link rel='icon' href='favicon.png'>";
        $html .= "<link rel='apple-touch-icon' href='favicon.png'>";
        $html .= $this->Styles() . $this->Scripts();
        $html .= "</head>";
        $html .= $this->htmlBody();
        $html .= "</html>";
        return $html;
    }

    protected function Styles()
    {
        $html = "<style>";
        $html .= file_get_contents("css/layout.css");
        $html .= "</style>";
        $html .= "<noscript>";
        $html .= "<link href='bundle/css/icons-fallback.css' rel='stylesheet'>";
        $html .= "</noscript>";
        //$html .= "<link rel='stylesheet' type='text/css' href='bundle/css/print.css' media='print'>";
        return $html;
    }

    protected function Scripts()
    {
        /*
        $html = "<script id='kickstart' data-js='bundle/js/asyncx.js' data-fb='bundle/css/icons-fallback.css'>";
        $html .= file_get_contents("js/kickstart.js");
        $html .= "</script>";
        */
        $html = "<script src='bundle/js/async.js' async></script>";
        return $html;
    }

    protected function htmlBody()
    {
        $html = "";
        $html .= "<body class='flex'>";
        $html .= "<div class='flex-row panel'>" . $this->SiteHeader() . "</div>";
        $html .= "<article class='flex-grow'>";
        $html .= "<div id='page' class='page baseline'>" . $this->SiteArticle() . "</div>";
        $html .= "</article>";
        $html .= "<footer  class='flex-row'>" . $this->SiteFooter() . "</footer>";
        $html .= "</body>";
        return $html;
    }

    protected function SiteArticle()
    {
        $page = $this->pagedata;
        return $page->html;
    }

    protected function SiteHeader()
    {
        $html = "";
        $html .= "<header>";
        $html .= "<a class=\"header\" href='/'>";
        $html .= "<div class=\"header-logo\" aria-hidden=\"true\">";
        $html .= "<div data-icon-embed class=\"icon-olli avatar\"></div>";
        $html .= "</div>";
        $html .= "<div class=\"header-text\">";
        $html .= "<h1>Oliver Jean Eifler</h1>";
        $html .= "<small>Programmierer Techniker Künstler</small>";
        $html .= "</div>";
        $html .= "</a>";
        $html .= "</header>";
        $html .= "<aside>";
        $html .= "<nav role=\"navigation\">";
        $html .= "<div class=\"navigation\">";

        $html .= Components::printMainMenu();

        $html .= Components::printSocialMenu();


        $html .= "</div>";
        $html .= "</nav>";
        $html .= "</aside>";
        return $html;
    }

    protected function SiteFooter()
    {
        $fromYear = 2015;
        $thisYear = (int)date('Y');
        $Year = $fromYear . (($fromYear != $thisYear) ? '-' . $thisYear : '');
        $html = "";
        $html .= "<div class='footer-container bumper'>";
        $html .= "<div class='footer'>";
        $html .= "<p class='text-smart licence'><small>";
        $html .= "Except as otherwise noted, the content of this page is licensed under the <a href='#'>Creative Commons Attribution 3.0 License</a>, and code samples are licensed under the <a href='#'>Apache 2.0 License</a>.";
        $html .= "</small></p>";
        $html .= "<p><i data-icon-embed class='icon-invader'></i> For internal use only</p>";
        $html .= "<p>" . $_SERVER['SERVER_NAME'] . " is created and maintained " . $Year . " with care* by <i data-icon-embed class='icon-cool'></i> <a href='http://www.oliver-eifler.info'>Oliver Jean Eifler</a></p>";
        $html .= "<p class='text-smart legende'><small>*Not recommended for or tested with IE 9- or any other legacy browser</small></p>";
        $html .= "</div>";
        $html .= "</div>";

        return $html;
    }

}
?>