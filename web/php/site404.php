<?php
require_once('php/class/basesite.class.php');
require_once('php/class/mixin.class.php');
require_once('php/layout/components.php');
/* Static Getter */
function getSite($path="") {
    return new Site404($path);
}

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
        return $this;
    }

    protected function HTML()
    {
        $page = $this->pagedata;
        $html = "<!DOCTYPE html><html lang='en'><head>";
        $html .= "<meta charset='UTF-8'>";
        $html .= "<meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'/>";
        $html .= "<meta name='format-detection' content='telephone=no'/>";
        $html .= "<title>Error: ".$page->title."</title>";
        $html .= "<link rel='icon' href='favicon.png'>";
        $html .= "<link rel='apple-touch-icon' href='favicon.png'>";

        $html .= Components::inlineCSS("css/blank.css");

        $html .= "</head>";
        $html .= "<body>";
        $html .= $page->html;
        $html .= "</body>";
        $html .= "</html>";
        return $html;
    }

}
?>