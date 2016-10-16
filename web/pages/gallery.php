<?php
$this->created = filectime(__FILE__);
$this->modified = filemtime(__FILE__);
$this->title = "Gallery";
$this->subtitle = "Gallery";
$this->description = "Um was geht's eigentlich";
echo "<h1 class='text-smart'><span>Ollis' Gallery</span></h1>";
$files = glob("images/gallery/*.*");
$supported_file = array(
    'gif',
    'jpg',
    'jpeg',
    'png'
);
echo "<div class='p gallery'>";
foreach($files as $image)
{


    $ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
    if (in_array($ext, $supported_file)) {
        list($width, $height, $type, $attr) = getimagesize($image);
        $w = $width*200/$height;
        $h = $height/$width*100;
        echo "<a href='".$image."' class='gallery-item' style='width:".$w."px;flex-grow:".$w.";'>";
            echo "<div style='padding-bottom:".$h."%'></div>";
            echo "<img src='".$image ."' alt='".$image ."'>";
        echo "</a>";
    } else {
        continue;
    }

}
echo "<div class='gallery-last'></div>";
echo "</div>";
?>
