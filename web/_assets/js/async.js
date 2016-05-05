/**
 * Created by darkwolf on 12.03.2016.
 */
import lib from 'olli'
import {doc, win} from './globals'
import grunticon from './async/grunticon.js'
import embedSVG from './async/grunticon.embed.js';

import loadImage from './async/loadimage.js'
import Sloth from './async/sloth.js'
import loadJS from './async/loadJS.js'
import findByClassName from './dom/findbyclassname.js'
import {hasDataAttribute, setDataAttribute} from './dom/attribute.js'

//Document.ready
function ready(fn) {
    // If DOM is already ready at exec time, depends on the browser.
    // From: https://github.com/mobify/mobifyjs/blob/526841be5509e28fc949038021799e4223479f8d/src/capture.js#L128
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        var created = false;
        document.addEventListener("readystatechange", function () {
            if (!created) {
                created = true;
                fn();
            }
        }, false);
    }
};


//LayzLoad Images on Scroll using Sloth (Faultier)
function updateSloth() {
    var i,
        images = findByClassName(doc, 'sloth');
    for (i = 0; i < images.length; i++) {
        var image = images[i];
        if (!hasDataAttribute(image, "sloth")) {
            setDataAttribute(image, "sloth", "true");
            Sloth(image, loadImage);
        }
    }
}
lib.ready = ready;
lib.grunticon = grunticon;
lib.embedSVG = embedSVG;
lib.sloth = Sloth;
lib.updateSloth = updateSloth;
lib.loadImage = loadImage;
// wait until body is defined before injecting links/scripts. This ensures a non-blocking load in IE11.
grunticon(["css/icons-svg.css", "css/icons-png.css", "css/icons-fallback.css"], function () {
        ready(function () {
            embedSVG();
            updateSloth();
        });
    }
);
if (win.history && win.history.pushState) {
    var js = [];
    if (!win.Promise)
        js.push("js/promise.js");

    js.push("js/page.js");

    ready(function () {
        loadJS("bundle/" + js.join(","));
    });
}
