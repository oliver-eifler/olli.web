<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SVG ICONS</title>
    <style>
    div.figure {display:inline-block;border:1px solid #000;padding:1em;margin:1em;}
    div.figure p {text-align: center;width:200px;}
    </style>
</head>
<body>
<h1>Olli ICONS</h1>
<?php
foreach (glob("_assets/icons/source/*.svg") as $filename) {
    echo "<div class='figure'><p><img src='" . $filename . "'></p><p>" . $filename . "</p></div>";
}
?>
</body>
</html>