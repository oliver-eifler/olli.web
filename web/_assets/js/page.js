import {lib,doc,win,html} from './globals'
import ActionObserver from './page/action-observer.js';
import FontSizeObserver from './page/fontsize-observer.js';
import ResizeObserver from './page/resize-observer.js';
import fastdom from "./page/fastdom.js";

import XHR from './page/better-xhr.js';

function gaussRound(num, decimalPlaces) {
    var d = decimalPlaces || 0,
        m = Math.pow(10, d),
        n = +(d ? num * m : num).toFixed(8),
        i = Math.floor(n), f = n - i,
        e = 1e-8,
        r = (f > 0.5 - e && f < 0.5 + e) ?
            ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}
function _$(selector, el) {
    if (!el) {
        el = document;
    }
    return el.querySelector(selector);
};
function _$$(selector, el) {
    if (!el) {
        el = document;
    }
    return Array.prototype.slice.call(el.querySelectorAll(selector));
};


function nextTopMargin(element) {
    var node = element.nextElementSibling,
        top = 0;
    if (node) {
        var styles = win.getComputedStyle(node);
        top = parseFloat(styles.marginTop) || 0;
    }
    return top;

}
function rythmnMargin(element, lineHeight) {
    fastdom.measure(function () {
        var rect = element.getBoundingClientRect()
            ,height = rect.bottom - rect.top
            ,leftover = height % lineHeight
        /* add siblings top margin to avoid margin collapse */
            ,m = leftover >= 0.05 ? (lineHeight - leftover) + nextTopMargin(element) : 0;
        fastdom.mutate(function () {
            element.style.marginBottom = "" + m + "px";
        });
    })
};
function adjustVerticalRythmn(parent) {
    var lineHeight = parseFloat(win.getComputedStyle(parent, ':after').height) || 24,
        childs = parent.children,
        i, node;
    for (i = 0; i < childs.length, node = childs[i]; i++) {
        if (node.hasAttribute("data-reflow")) {
            rythmnMargin(node, lineHeight);
        }
    }
};

/* Start Page */
/*PAGE SETUP*/
var content = _$(".content");
var contentWidth = content.clientWidth;

adjustVerticalRythmn(content);

/*
 var p1=XHR.get("images/faultier.jp").then(function(s){console.log("1 Loaded")}).catch(function(err){console.log("1 Error: "+err.message);}).then(function() {console.log("1 finished")});
 var p2=XHR.get("images/pult.jpg");p2.then(function(s){console.log("2 Loaded")}).catch(function(err){console.log("2 Error: "+err.message);}).then(function() {console.log("2 finished")});
 p2[0].abort();
 var p3=XHR.get("images/welpe.jpg").then(function(s){console.log("3 Loaded")}).catch(function(err){console.log("4 Error: "+err.message);}).then(function() {console.log("3 finished")});
 */
ActionObserver.bind("ajax", function (event, element) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Ajax: " + this.href);
});
FontSizeObserver.bind("page", function () {
    adjustVerticalRythmn(content);
});
ResizeObserver.bind("rythmn", function () {

    fastdom.measure(function () {
        var width = content.clientWidth;
        if (width != contentWidth) {
            adjustVerticalRythmn(content);
            contentWidth = width;
        }
    });
});

