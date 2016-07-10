<?php
require_once('php/class/basesite.class.php');
require_once('php/components.php');

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

            $html .= Component::get("MetaData");
            $html .= Component::get("inlineCSS","css/layout.css");

            $html .= $this->Styles() . $this->Scripts();

        $html .= "</head>";
            $html .= $this->htmlBody();
        $html .= "</html>";
        return $html;
    }

    protected function Styles()
    {
        $html = "<noscript>";
        $html .= "<link href='bundle/css/icons-fallback.css' rel='stylesheet'>";
        $html .= "</noscript>";
        return $html;
    }

    protected function Scripts()
    {
        $html = "<script src='bundle/js/async.js' async></script>";
        return $html;
    }

    protected function htmlBody()
    {
        $html = "";
        $html .= "<body class='flex'>";
        //$html .= "<div class='flex-row panel'>" . $this->SiteHeader() . "</div>";
        $html .= "<div class='flex-row panel'>" . Component::get("Banner") . "</div>";

        $html .= "<article class='flex-grow'>";
        $html .= "<div id='page' class='page baseline'>" . Component::get("Content") . "</div>";
        $html .= "</article>";

        //$html .= "<footer  class='flex-row'>" . $this->SiteFooter() . "</footer>";
        $html .= "<footer  class='flex-row'>" . Component::get("Footer") . "</footer>";
        /*DEBUG
        $html .= "<div class='flex-row'>";

        $html .= "<h2>Components:</h2>";
        $html .= "<ul>";
        $list = Component::getComponents();
        foreach ($list as $component)
            $html.="<li>".$component."</li>";
        $html .= "<ul>";

        $html .= "</div>";
        /*DEBUG END*/
        $html .= "</body>";
        return $html;
    }
}
?>