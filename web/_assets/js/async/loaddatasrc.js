/**
 * Created by darkwolf on 26.03.2016.
 */
import {doc} from '../globals.js'
import {hasDataAttribute,setDataAttribute,getDataAttribute,removeDataAttribute} from '../dom/attribute.js'
var imgtmpl = "<!DOCTYPE html><html><head><style>html,body{margin:0;border:none;padding:0;background:transparent}img{width:100%;}</style></head>";
imgtmpl+="<body><img src=\"{src}\" onload=\"window.frameElement.callme();\"></body></html>";
//var hasSrcDoc = !!("srcdoc" in document.createElement("iframe"));

export default function loadDataSrc(node) {

    //var imageVersion = getImageVersion();

    if (!node || hasDataAttribute(node,"status")) {
        return;
    }

    setDataAttribute(node,"status", "loading");
    var src = getDataAttribute(node,"src"),
        type = node.contentWindow?getDataAttribute(node,"type"):"";
    var loadDone=function() {
        removeDataAttribute(node,"src");
        setDataAttribute(node,"status", "loaded");
        if (doc.documentMode && doc.documentMode < 9)
            node.className = node.className;

    };
    if (src) {
        if (type == "img") {
            node["callme"] = loadDone;
            node.setAttribute("data-src",imgtmpl.replace("{src}",src));
            node.contentWindow.location = "javascript: window.frameElement.getAttribute('data-src');";
            /*    
            if (!hasSrcDoc) {
                node.contentWindow.location = "javascript: window.frameElement.getAttribute('srcdoc');";
           }
           */
        } else {
            node.onload = loadDone;
            /*function () {
             removeDataAttribute(node,"src");
             setDataAttribute(node,"status", "loaded");
             if (document.documentMode && document.documentMode < 9)
             node.className = node.className;
             };
             node["callme"] = function () {
             node.setAttribute("data-bla", "from iframe");
             }
             */
            node.src = src;
        }
    }
}

