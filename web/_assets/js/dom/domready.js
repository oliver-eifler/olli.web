/**
 * Created by darkwolf on 09.10.2016.
 */
import {doc, win} from '../globals'
var isReady = (doc.attachEvent ? doc.readyState === "complete" : doc.readyState !== "loading")
    , domContentLoaded = 'DOMContentLoaded'
    , addeventlistener = 'addEventListener'
    , listener
    , fns = [];
;
function async(fn){
    setTimeout(function(){
        fn()
    }, 0)
}
function flush(f) {
    isReady = true;
    while (f = fns.shift()) async(f);
}

if (!isReady) {
    if (doc[addeventlistener]) {
        console.log("waiting...");
        doc[addeventlistener](domContentLoaded, listener = function () {
            doc.removeEventListener(domContentLoaded, listener);
            flush();
        }, false);


    } else {
        //we simpply poll
        console.log("polling...");
        (function pollDomReady() {
            if (isReady)
                return;
            if (doc.readyState === "complete") {
                return flush();
            }
            setTimeout(pollDomReady, 10);
        })();
    }
}
export default function(fn) {
    if(typeof fn != "function") return;
    if(isReady) return async(fn);
    fns.push(fn)


}
