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
<div class="flex-content content" role="main">
    <div class="content-width">
    <article class="bio">
        <p>
        <ul>
            <li>Mod_DEFLATE: <?=getenv("HTTP_MOD_DEFLATE")?></li>
            <li>Mod_Rewrite: <?=getenv("HTTP_MOD_REWRITE")?></li>
        </ul>


        </p>
        <div class="pic" style="padding-bottom:<?=1149*100/1920?>%;" data-alt="Picture: a nice pic of my dog">
            <img src="images/welpe.jpg">
            <noscript data-src="images/welpe.jpg">
                <img src="images/welpe.jpg">
            </noscript>
        </div>

        <h1>Oliver Jean Eifler</h1>
        <strong>Programmierer. Techniker. Künstler.</strong>
            <p>Erinnerungen, <a href='#'>Prophezeiungen</a>, Fantasiegespinste und <a href='#'>Liebe</a>, Vergangenheit, Zukunft und der Augenblick des Traums dazwischen -&nbsp;sie alle schaffen ein Land, das einen einzigen, unsterblichen Tag lang existiert.</p>
            <p>Das zu wissen, ist <a href='#'>Weisheit</a>. Das zu nutzen, ist <a href='#'><strong>'Kunst'</strong></a>.</p>
        <div class="sloth pic" style="padding-bottom:<?=840*100/560?>%;">
            <noscript data-src="images/faultier.jpg" data-alt="Faultier">
            <img src="images/faultier.jpg">
            </noscript>
        </div>

        <p>
            “Memory, prophecy, and fantasy—
            The past, the future, and
            The dreaming moment between—
            Are all in one country,
            Living one immortal day.

            To know that is Wisdom.

            To use it is the Art.”
        </p>
        <div class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div class="sloth pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1,99)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
    </article>
    </div>
</div>
<div class="'flex-footer footer">
    <div class="maxfooter">
    <footer>
        <i class="icon-invader"></i> made with care by <i class="icon-olli-small"></i> Olli.
    </footer>
    </div>
</div>
<script src='bundle/js/async.min.js' async='true'></script>
</body>
</html>