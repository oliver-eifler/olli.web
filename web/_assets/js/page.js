import {lib,doc,win,html} from './globals'
import ActionObserver from './page/action-observer.js';
import FontSizeObserver from './page/fontsize-observer.js';
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
function _$ (selector, el) {
     if (!el) {el = document;}
     return el.querySelector(selector);
};
function _$$ (selector, el) {
     if (!el) {el = document;}
     //return el.querySelectorAll(selector);
     // Note: the returned object is a NodeList.
     // If you'd like to convert it to a Array for convenience, use this instead:
     return Array.prototype.slice.call(el.querySelectorAll(selector));
};

/*PAGE SETUP*/
var lineSize = 1.5;
var contentchilds = _$$(".content > div",html); //UPDATE after every page change


function rythmn(element,baseline) {
    var rect=element.getBoundingClientRect()
        ,height=rect.bottom-rect.top
        ,leftover = (height%baseline);
    element.style.marginBottom = ""+gaussRound(baseline-leftover)+"px";
};
function adjustVerticalRythmn(baseline) {
    contentchilds.forEach(function(element){
        rythmn(element,baseline);
    });
};


adjustVerticalRythmn(FontSizeObserver.fontSize()*lineSize);
/*
var p1=XHR.get("images/faultier.jp").then(function(s){console.log("1 Loaded")}).catch(function(err){console.log("1 Error: "+err.message);}).then(function() {console.log("1 finished")});
var p2=XHR.get("images/pult.jpg");p2.then(function(s){console.log("2 Loaded")}).catch(function(err){console.log("2 Error: "+err.message);}).then(function() {console.log("2 finished")});
p2[0].abort();
var p3=XHR.get("images/welpe.jpg").then(function(s){console.log("3 Loaded")}).catch(function(err){console.log("4 Error: "+err.message);}).then(function() {console.log("3 finished")});
*/
ActionObserver.bind("ajax",function(event,element) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Ajax: "+this.href);
});
FontSizeObserver.bind("page",function(size){
    adjustVerticalRythmn(size*lineSize);
});