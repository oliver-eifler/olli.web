<?php
$this->created = filectime(__FILE__);
$this->modified = filemtime(__FILE__);
$this->title = "Contact me";
$this->subtitle = "Kontaktformular.";
$this->description = "Um was geht's eigentlich";
function hallo() {
    echo "<h2>Hallo</h2>";

}


?>
    <div class="hero-container bumper">
        <div class="hero"><h1 class="text-smart"><span><?= $this->title ?></span></h1>
            <h3 class="text-smart hug"><span><?= $this->subtitle ?></span></h3>
            <p><?= $this->description ?></p>
            <?= Component::get("PageTime") ?>
        </div></div>
    <div class="content article">
        <?php hallo(); ?>
        <p><?= $this->request_uri ?></p>
        <p><?= $this->request_url ?></p>
    </div>