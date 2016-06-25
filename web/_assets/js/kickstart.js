/**
 * Created by darkwolf on 18.06.2016.
 * Load Async Script
 * => Load fallbacks if failed due content-blockers, Network
 */
!(function (win, doc, undefined) {
console.log("fallback;")
    var fallback = null,
        datasrc = "data-src";
        ref = doc.getElementById("kickstart"),
        script = doc.createElement("script");
    script.src = ref.getAttribute("data-js");
    script.async = true;
    script.onload = function () {
        clearTimeout(fallback);
    };
    script.onerror = noscript;
    ref.parentNode.insertBefore(script, ref.nextSibling);
    fallback = setTimeout(noscript, 8000);
    function ready( cb ){
        if( doc.body ){
            return cb();
        }
        setTimeout(function(){
            ready( cb );
        });
    }

    function noscript() {
        clearTimeout(fallback);
        //load CSS;
        var ss = doc.createElement("link");
        ss.rel = "stylesheet";
        ss.href = ref.getAttribute("data-fb");
        ss.media = "all";
        ref.parentNode.insertBefore(ss, ref.nextSibling);
        ready(function() {
            process("iframe");
            process("img");
            function process(selector) {
                var i, l, node,
                    nodes = doc.getElementsByTagName(selector);
                for (i = 0, l = nodes.length; i < l; i++) {
                    node = nodes[i];
                    if (node.attributes && typeof node.attributes[datasrc] != 'undefined') {
                        node.setAttribute("scr", node.getAttribute(datasrc));
                        node.removeAttribute(datasrc);
                        node.className = node.className;
                    }
                }
            }
        });
    };
})(this, document);