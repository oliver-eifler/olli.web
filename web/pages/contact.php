<?php
$created = $page->created = filectime(__FILE__);
$modified = $page->modified = filemtime(__FILE__);

$title = $page->title = "Contact me";
$subtitle = $page->subtitle = "Kontaktformular.";
$description = $page->description = "Um was geht's eigentlich";
ob_start();
?>
    <div class="hero-container bumper">
        <div class="hero"><h1 class="text-smart"><span><?= $title ?></span></h1>
            <h3 class="text-smart hug"><span><?= $subtitle ?></span></h3>
            <p><?= $description ?></p>
            <p>
                <small><em><?= Mixin::PageTime($created, $modified) ?></em></small>
            </p>
        </div></div>
    <div class="content article">
    </div> <?php
$page->html = ob_get_contents();
ob_end_clean();
?>