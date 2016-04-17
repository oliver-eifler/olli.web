/**
 * Created by darkwolf on 12.03.2016.
 */
import {lib,doc,win} from './globals'
import grunticon from './async/grunticon.js'
import loadImage from './async/loadimage.js'
import Sloth from './async/sloth.js'
import loadJS from './async/loadJS.js'
import findByClassName from './dom/findbyclassname.js'
import {hasDataAttribute,setDataAttribute} from './dom/attribute.js'

//LayzLoad Images on Scroll using Sloth (Faultier)
function updateSloth() {
    var i,
        images = findByClassName(doc,'sloth');
    for (i = 0; i < images.length; i++) {
        var image = images[i];
        if (!hasDataAttribute(image,"sloth")) {
            setDataAttribute(image,"sloth", "true");
            Sloth(image, loadImage);
        }
    }
}

lib.grunticon = grunticon;
lib.updateSloth = updateSloth;
win["olli"] = lib;
// wait until body is defined before injecting links/scripts. This ensures a non-blocking load in IE11.
function ready( cb ){
    if( doc.body ){
        return cb();
    }
    setTimeout(function(){
        ready( cb );
    });
}

ready(function() {
    grunticon(["css/icons-svg.min.css", "css/icons-png.min.css", "css/icons-fallback.min.css"], updateSloth);
    if (win.history && win.history.pushState) {
        var js = [];
        if (!win.Promise)
            js.push("js/promise.min.js");

        js.push("js/page.min.js");

        loadJS("bundle/"+js.join(","));
    }
});
