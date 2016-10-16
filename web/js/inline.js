/*! olli.web - v0.0.2 - 2016-10-16
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


/** @const */var DEBUG = true;
(function(win, doc) {
    var loadCSS = function(href, cb, media) {
        var refs = doc.getElementsByTagName("head")[0].childNodes, ref = refs[refs.length - 1];
        if (!href || href == "") return;
        var ss = doc.createElement("style");
        function addcss(css) {
            ss.setAttribute("type", "text/css");
            ss.setAttribute("media", media || "all");
            ss.setAttribute("data-src", href);
            if (ss.styleSheet) {
                ss.styleSheet.cssText = css;
            } else {
                ss.appendChild(document.createTextNode(css));
            }
            ref.parentNode.insertBefore(ss, ref.nextSibling);
        }
        var req = new XMLHttpRequest();
        req.open("GET", href);
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                var status = req.status === 1223 ? 204 : req.status;
                if (status >= 200 && status < 300 || status === 304) {
                    addcss(req.responseText);
                }
            }
        };
        req.send();
    };
    win.loadCSS = loadCSS;
})(window, document);