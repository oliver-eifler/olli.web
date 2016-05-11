/**
 * Created by darkwolf on 26.03.2016.
 */
import {hasDataAttribute,setDataAttribute,getDataAttribute,removeDataAttribute} from '../dom/attribute.js'

export default function loadImage(imageContainer) {

    //var imageVersion = getImageVersion();

    if (!imageContainer || !imageContainer.children || hasDataAttribute(imageContainer,"img")) {
        return;
    }

    setDataAttribute(imageContainer,"img", "loading");
    var img = (function() {
        for (var nodes = imageContainer.children, n, i = 0, l = nodes.length; i < l; ++i)
            if (n = nodes[i], 1 === n.nodeType) return n;
        return null;
    })();
    if (img) {
        var imgSRC = getDataAttribute(img,"src");
        if (imgSRC) {
            var image = new Image();
            image.onload = function () {
                removeDataAttribute(img,"src");
                setDataAttribute(imageContainer,"img", "loaded");
            };
            imgage.src = imgSRC;
        }
    }
}

