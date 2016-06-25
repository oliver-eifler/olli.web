<?php
$title = $page->title = "Error";
$description = $page->description = "Page not found";
ob_start();
?>
    <div class="content article">
        <h1>Upps...Shit happens</h1>
    </div> <?php
$page->html = ob_get_contents();
ob_end_clean();
?>