<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=yes'/>
    <meta name='format-detection' content='telephone=no'/>
    <title>oliver-eifler.info</title>
    <style>
        <?php include('css/layout.min.css');?>
        .pic {
            position:relative;
            display:block;
            height:0;
            width:100%;
            background:#888;
            overflow:hidden;
        }
        .pic img {
            position:absolute;
            width:100%;
            height:auto;
            left:0;top:0;
            opacity: 1;
            transition: opacity 1s;
        }
        img[data-src] {
            opacity: 0;
        }


    </style>
    <script>/* initial script*/</script>
    <noscript><link href="css/icons-fallback.min.css" rel="stylesheet"></noscript>
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
                        <a href="#">Home</a>
                        <a href="#">Articles</a>
                        <a href="#">Misc</a>
                    </div>
                    <div class="links-cat">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
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

        <div class="lazy pic" style="padding-bottom:<?=1149*100/1920?>%;">
            <noscript data-src="images/welpe.jpg" data-alt="Welpe">
                <img src="images/welpe.jpg">
            </noscript>
        </div>

        <h1>Oliver Jean Eifler</h1>
        <strong>Programmierer. Techniker. Künstler.</strong>
            <p>Erinnerungen, Prophezeiungen, Fantasiegespinste und Liebe, Vergangenheit, Zukunft und der Augenblick des Traums dazwischen -&nbsp;sie alle schaffen ein Land, das einen einzigen, unsterblichen Tag lang existiert.</p>
            <p>Das zu wissen, ist Weisheit. Das zu nutzen, ist <strong>'Kunst'</strong>.</p>
        <div class="lazy pic" style="padding-bottom:<?=840*100/560?>%;">
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
        <div class="lazy pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1000,9999)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div class="lazy pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1000,9999)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div class="lazy pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1000,9999)?>" data-alt="Faultier">
                <img src="images/faultier.jpg">
            </noscript>
        </div>
        <div class="lazy pic" style="padding-bottom:<?=480*100/640?>%;">
            <noscript data-src="http://lorempixel.com/640/480/?v=<?=rand(1000,9999)?>" data-alt="Faultier">
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
<script src="js/async.js" async></script>
</body>
</html>