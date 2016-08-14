<?php

/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 25.06.2016
 * Time: 15:06
 * Shared Components for Layout
 */
require_once("php/class/component.class.php");
require_once("php/class/pagedata.class.php");

Component::register("inlineCSS",
    function ($path) {
        $html = "<style>@namespace svg url('http://www.w3.org/2000/svg');" . file_get_contents($path) . "</style>";
        return $html;
    });
Component::register("Content",
    function() {
        return PageData::GetInstance()->html;
});

