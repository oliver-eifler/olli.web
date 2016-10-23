<?php
require_once('php/class/basesite.class.php');
require_once('php/components.php');

class Site404 extends BaseSite
{

    protected function init($path)
    {
        $path ="pages/404.php";
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
        header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
        echo $this->HTML();
        return $this;
    }
    public function renderJSON()
    {
        header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
        return $this;
    }

    protected function HTML()
    {
        $page = $this->pagedata;
        $html = "<!DOCTYPE html><html lang='en'><head>";

        $html .= Component::get("MetaData");
        $html .= Component::get("inlineCSS","css/404.css");

        $html .= "</head>";
        $html .= "<body>";
        $html .= Component::get("Content");
        $html .= "</body>";
        $html .= "</html>";
        return $html;
    }

}
?>