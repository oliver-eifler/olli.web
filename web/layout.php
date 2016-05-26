<?php
echo HTML();
exit;

function HTML()
{

    $html = "<!DOCTYPE html><html lang='en'><head>";
    $html .= "<meta charset='UTF-8'>";
    $html .= "<meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'/>";
    $html .= "<meta name='format-detection' content='telephone=no'/>";
    $html .= "<title>oliver-eifler.info</title>";
    $html .= Styles() . Scripts();
    $html .= "</head>";
    $html .= htmlBody();
    $html .= "</html>";
    return $html;
}

function Styles()
{
    $html = "<style>";
    $html .= file_get_contents("css/layout.css");
    $html .= "</style>";
    $html .= "<noscript>";
    $html .= "<link href='bundle/css/icons-nojs.css' rel='stylesheet'>";
    $html .= "</noscript>";
    $html .= "<link rel='stylesheet' type='text/css' href='bundle/css/print.css' media='print'>";
    return $html;
}

function Scripts()
{
    $html = "<script src='bundle/js/async.js' async></script>";
    return $html;
}

function htmlBody()
{
    $html = "";
    $html .= "<body class='flex'>";

    $html .= "<div class='flex-header panel'>" . SiteHeader() . "</div>";
    $html .= "<article class='flex-content'>" . SiteArticle() . "</article>";
    $html .= "<footer class='flex-footer'>" . SiteFooter() . "</footer>";

    $html .= "</body>";

    return $html;
}

function SiteArticle()
{
    $html = file_get_contents("pages/test.html");
    
    $html = preg_replace_callback('#{=(.*?)}#',
        "tmpleval", $html);
    
    return $html;
}
function tmpleval($matches) {
    $t="";
    $code = $matches[1];
    $t = eval("return (".$code.");");
    return $t;
}

function SiteHeader()
{
    $html = "";
    $html .= "<header>";
    $html .= "<a class=\"header\" href='#'>";
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
    $html .= "<div class=\"links\">";
    $html .= "<div class=\"links-cat\">";
    $html .= "<a href=\"#Home\" data-observe=\"ajax\">Home</a>";
    $html .= "<a href=\"#Articles\" data-observe=\"ajax\">Articles</a>";
    $html .= "<a href=\"#Misc\" data-observe=\"ajax\">Misc</a>";
    $html .= "</div>";
    $html .= "<div class=\"links-cat\">";
    $html .= "<a href=\"#About\">About</a>";
    $html .= "<a href=\"#Contact\">Contact</a>";
    $html .= "</div>";
    $html .= "</div>";
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
    $html .= "</div>";
    $html .= "</nav>";
    $html .= "</aside>";
    return $html;
}

function SiteFooter()
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


?>