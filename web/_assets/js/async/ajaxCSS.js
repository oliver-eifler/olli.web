/**
 * Created by darkwolf on 03.04.2016.
 */
import {win,doc} from '../globals';

export default function ajaxCSS(href, cb, media) {
    var refs = (doc.body || doc.getElementsByTagName("head")[0] ).childNodes,
    ref = refs[refs.length - 1];
    if (!href || href=="")
        return;
    var ss = doc.createElement('style');
    cb = cb||function(){};
    function addcss(css){
        ss.setAttribute('type', 'text/css');
        ss.setAttribute('media', media || "all");
        ss.setAttribute('data-src', href);
        if (ss.styleSheet) {   // IE
            ss.styleSheet.cssText = css;
        } else {                // the world
            ss.appendChild(document.createTextNode(css));
        }
        ref.parentNode.insertBefore(ss, ref.nextSibling);
        cb();
    }
    var req = new XMLHttpRequest();
    req.open('GET', href);
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            var status = (req.status === 1223 ? 204 : req.status);

            if (status >= 200 && status < 300 || status === 304) {
                addcss(req.responseText);

            }
        }
    };
    // Make the request
    req.send();
    return ss;
}
