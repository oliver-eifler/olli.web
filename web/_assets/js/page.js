import {doc,olli,win,html} from './globals'
import fastdom from "./page/fastdom.js";
import XHR from './page/better-xhr.js';
import {$,$$} from './dom/query'
import ActionObserver from './page/action-observer.js';
import FontSizeObserver from './page/fontsize-observer.js';
import ResizeObserver from './page/resize-observer.js';

/* Page functions */
import prettyDate from './util/prettydate.js';
import adjustVerticalRythmn from "./page/verticalrythmn.js";
import adjustFontSize from "./page/fontsize.js";

/* Start Page */
/*PAGE SETUP*/
var content = $(".content");
var contentWidth = content.clientWidth;


$$("time").forEach(function(node) {
   if (node.hasAttributes('datetime')) {
       
       node.innerHTML = prettyDate(new Date(node.getAttribute('datetime')));
   }
    
    
    
    
}); 
/*!adjustFontSize() && */
adjustVerticalRythmn(content);

/*
 var p1=XHR.get("images/faultier.jp").then(function(s){console.log("1 Loaded")}).catch(function(err){console.log("1 Error: "+err.message);}).then(function() {console.log("1 finished")});
 var p2=XHR.get("images/pult.jpg");p2.then(function(s){console.log("2 Loaded")}).catch(function(err){console.log("2 Error: "+err.message);}).then(function() {console.log("2 finished")});
 p2[0].abort();
 var p3=XHR.get("images/welpe.jpg").then(function(s){console.log("3 Loaded")}).catch(function(err){console.log("4 Error: "+err.message);}).then(function() {console.log("3 finished")});
 */
/*
ActionObserver.bind("ajax", function (event, element) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Ajax: " + this.href);
});
*/
FontSizeObserver.bind("page", function () {
    adjustVerticalRythmn(content);
});
ResizeObserver.bind("rythmn", function () {
    /*!adjustFontSize() && */
    fastdom.measure(function () {
        var width = content.clientWidth;
        if (width != contentWidth) {
            adjustVerticalRythmn(content);
            contentWidth = width;
        }
    });
});

