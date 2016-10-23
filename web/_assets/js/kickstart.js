/**
 * Created by darkwolf on 18.06.2016.
 * feature detection
 */
import {doc, win, olli, html} from './globals'
import loadJS from './util/loadjs'
import loadimage from './sloth/loaddatasrc'
import sloth from './sloth/sloth'

//feature detection
!(function (undefined) {
    var s = (doc.body || html).style
        , classes = ["js"]
        ;
    if (s.msFlexWrap !== undefined || s.flexWrap !== undefined) {
        classes.push("flexwrap");
    }
    html.className = classes.join(" ");
})();
//global sloth add
win.lazy = function (node) {
    node.onload = node.onerror = function () {
    };
    //setTimeout(function(){sloth.add(node,loadimage);},0);
    sloth.add(node,loadimage);
}
if (win.history && win.history.pushState) {
    var js = [];
    if (!win.Promise)
        js.push("js/promise.js");

    //js.push("js/history.js");
    js.push("js/page.js");

    loadJS("bundle/" + js.join(","));
}
olli.sloth = sloth;
olli.loadJS = loadJS;
export default olli;