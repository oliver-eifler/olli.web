import ActionObserver from './page/action-observer.js';
import XHR from './page/better-xhr.js';
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