/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */

import {win,doc} from '../globals';

export default function (href, media) {
    // Arguments explained:
    // `href` [REQUIRED] is the URL for your CSS file.
    // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
    // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
    // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
    var refs = (doc.body||doc.getElementsByTagName("head")[0] ).childNodes;
    var ref = refs[refs.length - 1];
    var ss = doc.createElement("link");

    var sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
    ss.media = "only x";

    // A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
    var onloadcssdefined = function (cb) {
        var resolvedHref = ss.href;
        var i = sheets.length;
        while (i--) {
            if (sheets[i].href === resolvedHref) {
                return cb();
            }
        }
        setTimeout(function () {
            onloadcssdefined(cb);
        });
    };

    function loadCB() {
        if (ss.addEventListener) {
            ss.removeEventListener("load", loadCB);
        }
        ss.media = media || "all";
    }

    // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
    if (ss.addEventListener) {
        ss.addEventListener("load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);

    ref.parentNode.insertBefore(ss, ref.nextSibling);
    return ss;
}
