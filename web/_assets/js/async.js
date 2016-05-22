/**
 * Created by darkwolf on 12.03.2016.
 */
import {doc, win} from './globals'

import grunticon from './async/grunticon.js'
import {getIcons, embedIcons} from './async/grunticon.embed.js';

import loadDataSrc from './async/loaddatasrc.js'
import Sloth from './async/sloth.js'
import loadJS from './async/loadJS.js'
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


//LayzLoad Images data-src on Scroll using Sloth (Faultier)
function updateSloth() {
    process("img");
    process("iframe");

    function process(selector) {
        var i, l, node,
            nodes = doc.getElementsByTagName(selector);
        for (i = 0, l = nodes.length; i < l; i++) {
            node = nodes[i];
            if (!hasDataAttribute(node, "sloth") && hasDataAttribute(node, "src")) {
                setDataAttribute(node, "sloth", "true");
                Sloth.add(node, loadDataSrc);
            }
        }
    }
}
// wait until body is defined before injecting links/scripts. This ensures a non-blocking load in IE11.
grunticon(["css/icons-svg.css", "css/icons-png.css", "css/icons-fallback.css"], function (method, stylesheet) {
        ready(function () {

            method == "svg" && embedIcons(getIcons(stylesheet));
            updateSloth();
        });
    }
);
if (win.history && win.history.pushState) {
    var js = [];
    if (!win.Promise)
        js.push("js/promise.js");

    js.push("js/history.js");
    js.push("js/page.js");

    ready(function () {
        loadJS("bundle/" + js.join(","));
    });
}
grunticon.embedIcons = embedIcons;
grunticon.getIcons = getIcons;
grunticon.ready = ready;
grunticon.loadJS = loadJS;
grunticon.sloth = Sloth;
grunticon.updateSloth = updateSloth;
grunticon.loadDataSrc = loadDataSrc;

export default grunticon;
