<?php
$this->created = filectime(__FILE__);
$this->modified = filemtime(__FILE__);
$this->title = "About";
$this->subtitle = "About";
$this->description = "Um was geht's eigentlich";
?>
    <div class="hero bumper">
    <div class="hero-content"><h1 class="text-smart"><span><?= $this->title ?></span></h1>
        <h3 class="text-smart hug"><span><?= $this->subtitle ?></span></h3>
        <p><?= $this->description ?></p>
        <?= Component::get("PageTime") ?>
    </div></div>
    <div class="content article">
   </div>