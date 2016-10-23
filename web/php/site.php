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
            if ($this->minify === true)
                $this->html = preg_replace('/\v(?:[\v\h]+)/', '', $this->html);
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
        $page = $this->pagedata;
        $json = array();
        $json['title'] = $page->title;
        $json['content'] = $page->html;

        header("Content-type: application/json; charset=utf-8");
        //sleep(10000);
        echo json_encode($json);
        return $this;
    }

    protected function HTML()
    {
        $page = $this->pagedata;
        $html = "<!DOCTYPE html><html class='no-js' lang='en'><head>";

        $html .= Component::get("MetaData");

        $html .= "<script id='kickstart'>" . file_get_contents("js/kickstart.js")."</script>";
        $html .= Component::get("inlineCSS","css/layout.css");

        $html .= "</head>";
            $html .= $this->htmlBody();
        $html .= "</html>";
        return $html;
    }


    protected function htmlBody()
    {
        $html = "";
        $html .= "<body class='flex'>";
        /* inline svg symbols (above the fold)*/
        //$html.= file_get_contents("./images/inline.svg");

        //$html .= "<div class='flex-row panel'>" . $this->SiteHeader() . "</div>";
        $html .= "<div class='flex-row panel'>" . Component::get("Banner") . "</div>";

        $html .= "<article class='flex-row'>";
        $html .= "<div id='page' class='page baseline'>" . Component::get("Content") . "</div>";
        $html .= "</article>";

        //$html .= "<footer  class='flex-row'>" . $this->SiteFooter() . "</footer>";
        $html .= "<footer  class='flex-row flex-foot'>" . Component::get("Footer") . "</footer>";
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
        //$html .= $this->Inline();
        $html .= "<script id='svgxuse' defer src='bundle/js/svgxuse.js'></script>";
         $html .= "</body>";
        return $html;
    }
}
?>