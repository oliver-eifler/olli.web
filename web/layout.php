<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'/>
    <meta name='format-detection' content='telephone=no'/>
    <title>oliver-eifler.info</title>
    <style><?php include('css/layout.min.css');?></style>
    <noscript><link href="bundle/css/icons-fallback.min.css" rel="stylesheet"></noscript>
</head>
<body class="flex">
<div class="flex-header panel">
    <header>
        <a class="header" href='#'>
            <div class="header-logo">
            <span class="avatar">
            <i class="icon-olli"></i>
            <i class="icon-olli-s2"></i>
            <i class="icon-olli-s3"></i>
            <i class="icon-olli-s4"></i>
            </span>
            </div>
            <div class="header-text">
                <h1>Oliver Jean Eifler</h1>
                <small>Programmierer Techniker Künstler</small>
            </div>
        </a>
    </header>
    <aside>
        <nav role="navigation">
            <div class="navigation">
                <div class="links">
                    <div class="links-cat">
                        <a href="#Home" data-observe="ajax">Home</a>
                        <a href="#Articles" data-observe="ajax">Articles</a>
                        <a href="#Misc" data-observe="ajax">Misc</a>
                    </div>
                    <div class="links-cat">
                        <a href="#About">About</a>
                        <a href="#Contact">Contact</a>
                    </div>
                </div>
                <div class="social">
                    <a href="#" class="social-icon" title="Olli on GitHub"><i class="icon-github" aria-hidden="true"></i><span>GitHub</span></a>
                    <a href="#" class="social-icon" title="Olli on Codepen"><i class="icon-codepen" aria-hidden="true"></i><span>CodePen</span></a>
                    <a href="#" class="social-icon" title="Olli on Twitter"><i class="icon-twitter" aria-hidden="true"></i><span>Twitter</span></a>
                    <a href="#" class="social-icon" title="Olli on Facebook"><i class="icon-facebook" aria-hidden="true"></i><span>Facebook</span></a>
                </div>
            </div>

        </nav>
    </aside>
</div>
<article class="flex-content">
<div class="content-container baseline">
    <div class="hero-container bumper">
        <div class="hero">
            <div class="text-smart">
            <h1>Oliver Jean Eifler</h1>
        <h3 class="hug">Programmierer. Techniker. Künstler.</h3>
                </div>
        <p>Um was geht's eigentlich</p>
        </div>
    </div>
    <div class="content content-width">
        <div data-reflow class="pic" style="padding-bottom:<?=1149*100/1920?>%;" data-alt="Picture: a nice pic of my dog">
            <img src="images/welpe.jpg">
            <noscript data-src="images/welpe.jpg">
                <img src="images/welpe.jpg">
            </noscript>
        </div>
        <p>Erinnerungen, <a href='#'>Prophezeiungen</a>, Fantasiegespinste und <a href='#'>Liebe</a>, Vergangenheit, Zukunft und der Augenblick des Traums dazwischen -&nbsp;sie alle schaffen ein Land, das einen einzigen, unsterblichen Tag lang existiert.</p>
        <p>Das zu wissen, ist <a href='#'>Weisheit</a>. Das zu nutzen, ist <a href='#'><strong>'Kunst'</strong></a>.</p>
        <figure data-reflow style="background:#ff0;overflow:scroll;">
            <pre>
                <code>
                    function adjustVerticalRythmn() {
                    var size = FontSizeObserver.fontSize() * lineSize,
                    childs = content.children,
                    i,node;
                    for (i = 0; i < childs.length,node=childs[i]; i++) {
                    if (node.hasAttribute("data-reflow")) {
                    rythmnMargin(node, size);
                    }
                    }
                    return;
                    contentchilds.forEach(function (element) {
                    rythmnMargin(element, FontSizeObserver.fontSize() * lineSize);
                    });
                    };
                </code>
            </pre>
        </figure>

        <figure class='center' data-reflow style="display:block;max-width:560px;width:100%;">
            <div class="sloth pic" style="padding-bottom:<?=840*100/560?>%;">
                <noscript data-src="images/faultier.jpg" data-alt="Faultier">
                    <img src="images/faultier.jpg">
                </noscript>
            </div>
            <figcaption><cite>Depression</cite>. By: Darren Harris</figcaption>
        </figure>
        <p>
            Memory, prophecy, and fantasy—
            The past, the future, and
            The dreaming moment between—
            Are all in one country,
            Living one immortal day.
        </p>
        <p>To know that is Wisdom. To use it is the Art.</p>
        <div data-reflow class="sloth pic" style="padding-bottom:<?=250*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/250/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div data-reflow class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div data-reflow class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div data-reflow class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
    </div>
</div>
</article>
<?=SiteFooter();?>
<script src='bundle/js/async.min.js' async='true'></script>
</body>
</html>

<?php
function SiteFooter()
{
    $fromYear = 2015;
    $thisYear = (int)date('Y');
    $Year = $fromYear . (($fromYear != $thisYear) ? '-' . $thisYear : '');
    $html = "";
    $html .= "<footer class='flex-footer'>";
    $html .= "<div class='footer-container bumper'>";
    $html .= "<div class='footer'>";
    $html .= "<p class='text-smart licence'><small>";
    $html .= "Except as otherwise noted, the content of this page is licensed under the <a href='#'>Creative Commons Attribution 3.0 License</a>, and code samples are licensed under the <a href='#'>Apache 2.0 License</a>.";
    $html .= "</small></p>";
    $html .= "<p><i class='icon-invader'></i> For internal use only<br>";
    $html .= $_SERVER['SERVER_NAME'] . " is created and maintained ".$Year." with care* by <i class='icon-olli-small'></i> <a href='http://www.oliver-eifler.info'>Oliver Jean Eifler</a></p>";
    $html .= "<p class='legende'><small>*Not recommended for or tested with IE 9- or any other legacy browser</small></p>";
    $html .= "</div>";
    $html .= "</div>";
    $html .= "</footer>";

    return $html;
}


?>