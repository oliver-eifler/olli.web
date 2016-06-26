<?php
/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 15.05.2016
 * Time: 14:53
 * Template-parser ???
 */
/*
$string = new SimpleXMLElement("<?xml version='1.0' standalone='yes'?><olli-img src='blabla' width='4711'/>");
*/
require_once 'php/DiDom/loader.php';
$html = "<h1>Olli Tag Test</h1><olli-img data-reflow src='images/welpe.jpg' width='4711' data='cut'>Titel: <b>Welpe</b></olli-img>";
$html .= "<olli-img src='images/welpe.jpg' width='4711' data='cut'/>";
$html .= "<olli-img src='images/faultier.jpg' width='4711' data='cut'>Titel: <b>Just<br> Relaxing</b></olli-img><p><i>Does it work?</i></p>";
use DiDom\Document;

$document = new Document($html);
$images = $document->find('olli-img');
foreach ($images as $node)
    olliImg($node);
echo $document->format()->html();

exit();
function olliImg($node) {
    $attrs = $node->attributes();
    $desc = $node->innerHtml();

    $html = "<div><p>".print_r($attrs,true)."</p><img src='".$attrs['src']."'>";
    if (!empty($desc))
        $html .="<p>".$desc."</p>";
    $html.="</div>";
    $img = new Document($html);
    $node->replace($img->toElement());
}



/*
libxml_use_internal_errors(true);
try {
    $tag = simplexml_load_string("<olli-img src='blabla' width='4711' data='cut'>bal</olli-img>");
} catch(Exception $e) {
    $tag = FALSE;
}
if ($tag === FALSE) {
    echo "<p>somthing terrible wrong with: <pre>HTML</pre></p>";
    exit(0);
}
$inner =get_inner_html(dom_import_simplexml($tag));
echo "<code>".htmlentities($inner)."</code>";

echo "<br>";
print_r($tag->getName());
$attr = [];
foreach($tag->attributes() as $a => $b) {
    $attr[$a] = (string)$b;
}
echo "<br>";
print_r($attr);

echo "<br>";
print_r($attr['width']);
exit(0);

function get_inner_html( $node ) {
    $innerHTML= '';
    $children = $node->childNodes;
    foreach ($children as $child) {
        $innerHTML .= $child->ownerDocument->saveXML( $child );
    }

    return $innerHTML;
}
*/

?>