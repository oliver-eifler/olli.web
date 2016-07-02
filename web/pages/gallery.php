<?php
$this->created = filectime(__FILE__);
$this->modified = filemtime(__FILE__);
$this->title = "Gallery";
$this->subtitle = "Gallery";
$this->description = "Um was geht's eigentlich";
?>
    <div class="hero-container bumper">
        <div class="hero"><h1 class="text-smart"><span><?= $this->title ?></span></h1>
            <h3 class="text-smart hug"><span><?= $this->subtitle ?></span></h3>
            <p><?= $this->description ?></p>
            <p>
                <small><em><?= Mixin::PageTime($this->created, $this->modified) ?></em></small>
            </p>
        </div></div>
    <div class="content article">
    </div>