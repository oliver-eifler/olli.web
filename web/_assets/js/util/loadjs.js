/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
import {doc} from '../globals';
export default function loadjs(src, cb) {
    var refs = (doc.body||doc.getElementsByTagName("head")[0] ).childNodes;
    var ref = refs[refs.length - 1];
    var script = doc.createElement("script");
    script.src = src;
    script.async = true;
    if (cb && typeof(cb) === "function") {
        script.onload = cb;
    }
    ref.parentNode.insertBefore(script, ref.nextSibling);
    return script;
};
