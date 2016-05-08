/*global loadCSS:true*/
import {win,doc} from '../globals.js';
import loadCSS from '../async/ajaxCSS.js';

var grunticon=function(css, onload) {
    // expects a css array with 3 items representing CSS paths to datasvg, datapng, urlpng
    if (!css || css.length !== 3) {
        return;
    }

    var navigator = win.navigator;
    var Image = win.Image;

    onload = onload || function () {
        };

    // Thanks Modernizr & Erik Dahlstrom
    var svg = !!doc.createElementNS && !!doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(win.opera && navigator.userAgent.indexOf('Chrome') === -1) && navigator.userAgent.indexOf('Series40') === -1;

    var img = new Image();

    img.onerror = function () {
        loadCSS("bundle/"+css[2],onload);
    };

    img.onload = function () {
        var data = img.width === 1 && img.height === 1,
            href = css[data && svg ? 0 : data ? 1 : 2],
            method = "png";

        if (data && svg) {
            method = "svg";
        } else if (data) {
            method = "datapng";
        }
        var stylesheet=loadCSS("bundle/"+href, function () {
            doc.documentElement.className += " oi oi-" + method;
            stylesheet.setAttribute("data-oi-method",method);
            onload(method,stylesheet);
        });
    };

    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
};
grunticon.loadCSS = loadCSS;
export default grunticon;