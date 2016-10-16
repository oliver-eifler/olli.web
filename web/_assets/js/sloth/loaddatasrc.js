/**
 * Created by darkwolf on 26.03.2016.
 */
import {doc} from '../globals.js'
var status ="data-status";
var datasource = "data-src";
var source = "src";
export default function(node,undefined) {

    //var imageVersion = getImageVersion();

    if (!node || node.attributes[status] != undefined) {
        return;
    }

    node.setAttribute(status, "loading");
    var src = node.getAttribute(datasource);

    var loadDone=function() {
        node.removeAttribute(datasource);
        node.setAttribute(status, "loaded");
        if (doc.documentMode && doc.documentMode < 9)
            node.className = node.className;

    };
    if (src) {
            node.onload = loadDone;
            node.src = src;
    }

}

