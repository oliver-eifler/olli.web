/**
 * Created by darkwolf on 26.03.2016.
 */
import {hasDataAttribute,setDataAttribute,getDataAttribute,removeDataAttribute} from '../dom/attribute.js'

export default function (imageContainer) {

    //var imageVersion = getImageVersion();

    if (!imageContainer || !imageContainer.children || hasDataAttribute(imageContainer,"img")) {
        return;
    }

    setDataAttribute(imageContainer,"img", "loading");
    var img = imageContainer.children[0];
    if (img) {
        var imgSRC = getDataAttribute(img,"src");
        if (imgSRC) {
            var imageElement = new Image();
            setDataAttribute(imageElement,"src","");
            imageContainer.appendChild(imageElement);
            imageElement.onload = function () {
                removeDataAttribute(imageElement,"src");
                setDataAttribute(imageContainer,"img", "loaded");
            };
            imageElement.src = imgSRC;
        }
    }
}

