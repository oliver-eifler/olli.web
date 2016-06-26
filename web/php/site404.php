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
        $html .= "<title>Error: Not Found</title>";
        $html .= "<link rel='icon' href='favicon.png'>";
        $html .= "<link rel='apple-touch-icon' href='favicon.png'>";
        $html .= "</head>";
        $html .= "<body>";
        $html .= "<h1>404 Upps...</h1>";
        $html .= "<h2>Page not found</h2>";
        $html .= "<p>".print_r($page,true)."</p>";
        $html .= "<img src='https://http.cat/404' style='margin:0 auto'>";
        $html .= "</body>";
        $html .= "</html>";
        return $html;
    }


}
?>