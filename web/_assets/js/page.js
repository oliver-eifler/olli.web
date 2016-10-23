import {doc,olli,win,html} from './globals'
import ActionObserver from './util/action-observer.js';
import XHR from './util/better-xhr.js';

function setHTML(target,html) {
    var node = target.cloneNode(false),
        fragment = doc.createDocumentFragment();
    fragment.appendChild(node);
    node.innerHTML = html;
    target.parentNode.replaceChild(fragment,target);
}
ActionObserver.bind("ajax", function (event, element) {
    event.stopPropagation();
    event.preventDefault();
    var url = this.href,error=false;
    console.log("Ajax: " + url);
    olli.sloth.reset();
    var xhr = XHR.get(url,{data:{json:1}})
        .then(function(pagedata) {
            console.log("ajax "+url+" loaded");
            var page = doc.getElementById("page");
            setHTML(page,pagedata.content);
//            page.innerHTML = pagedata.content;
            doc.title = pagedata.title;
        })
        .catch(function(err){
            console.log("ajax "+url+" error: "+err.message);
            win.location = url;
        })
        .then(function() {console.log("ajax "+url+" finished")});

    //win.location = this.href+"?json";
});
//var p1=XHR.get("images/faultier.jp").then(function(s){console.log("1 Loaded")}).catch(function(err){console.log("1 Error: "+err.message);}).then(function() {console.log("1 finished")});
