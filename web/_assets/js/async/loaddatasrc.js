/**
 * Created by darkwolf on 26.03.2016.
 */
import {hasDataAttribute,setDataAttribute,getDataAttribute,removeDataAttribute} from '../dom/attribute.js'

export default function loadDataSrc(node) {

    //var imageVersion = getImageVersion();

    if (!node || hasDataAttribute(node,"status")) {
        return;
    }

    setDataAttribute(node,"status", "loading");
    var src = getDataAttribute(node,"src");
    if (src) {
        node.onload = function () {
            removeDataAttribute(node,"src");
            setDataAttribute(node,"status", "loaded");
            if (document.documentMode && document.documentMode < 9)
                node.className = node.className;
        };
        node.src = src;
    }
}

