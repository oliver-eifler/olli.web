import {lib,doc,win,html} from './globals'
import ActionObserver from './page/action-observer.js';
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
}/*
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
var fontsizer = doc.createElement("div");
fontsizer.style.cssText = "position:absolute;width:1.5em;height:1em;left;-2em;top:-2em;transition:font-size 1ms linear";
html.getElementsByTagName("body")[0].appendChild(fontsizer);
var rect = fontsizer.getBoundingClientRect(),
    fontsize = rect.bottom-rect.top,
    linesize = rect.right-rect.left;




console.log(fontsize);
console.log(linesize);



function rythmn(element,linesize) {

    var rect=element.getBoundingClientRect()
    ,height=rect.bottom-rect.top
        , leftover = (height%linesize);
    element.style.marginBottom = ""+gaussRound(linesize-leftover)+"px";
}
var pics= html.querySelectorAll(".content > *");//html.getElementsByClassName("pic");
for (var i=0;i<pics.length;i++) {
    rythmn(pics[i],linesize);

}
fontsizer.addEventListener("transitionend",function(event) {
    var node = event.target;
    var rect = node.getBoundingClientRect(),
        fontsize = rect.bottom-rect.top,
        linesize = rect.right-rect.left;
        console.log("changed fontsize:" +fontsize+":"+linesize);
        var pics= html.querySelectorAll(".content > *");//html.getElementsByClassName("pic");
        for (var i=0;i<pics.length;i++) {
            rythmn(pics[i],linesize);

        }



},false);