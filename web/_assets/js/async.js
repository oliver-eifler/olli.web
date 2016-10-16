/**
 * Created by darkwolf on 12.03.2016.
 */
import {doc, win} from './globals'

import loadDataSrc from './async/loaddatasrc.js'
import Sloth from './async/sloth.js'
import loadJS from './async/loadJS.js'
import {hasDataAttribute, setDataAttribute} from './dom/attribute.js'
import ready from './dom/domready.js'
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
ready(function () {
    console.log("Dom Ready");
    updateSloth();
});
/*
 if (win.history && win.history.pushState) {
 var js = [];
 if (!win.Promise)
 js.push("js/promise.js");

 //js.push("js/history.js");
 js.push("js/page.js");

 ready(function () {
 loadJS("bundle/" + js.join(","));
 });
 }
 */
olli.ready = ready;
//grunticon.loadJS = loadJS;
olli.sloth = Sloth;
olli.updateSloth = updateSloth;
olli.loadDataSrc = loadDataSrc;
