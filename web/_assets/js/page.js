import history from './components/native.history'
import {doc, olli, History, win, html} from './globals'
import ActionObserver from './util/action-observer.js';
import XHR from './util/better-xhr.js';

function setHTML(target, html) {
    var node = target.cloneNode(false),
        fragment = doc.createDocumentFragment();
    fragment.appendChild(node);
    node.innerHTML = html;
    target.parentNode.replaceChild(fragment, target);
}
console.log("History enabled: " + history.enabled);

var oPageInfo={url:win.location.href,title:doc.title};

history.enabled && history.Adapter.bind(window,"statechange", function (event) {
    var state = history.getState(),
        url = state.url;
    if (url == oPageInfo.url)
        return;

    olli.sloth.reset();
    console.log("history state "+state);
    var xhr = XHR.get(url, {data: {json: 1}});
        xhr.then(function (pagedata) {
            console.log("ajax " + url + " loaded");
            // keep the link in the browser history
            var page = doc.getElementById("page");
            setHTML(page, pagedata.content);
            doc.title = oPageInfo.title = pagedata.title;
            oPageInfo.url = url;
            history.replaceState(null,oPageInfo.title,oPageInfo.url);//
        })
        .catch(function (err) {
            console.log("ajax " + url + " error: " + err.message);
            if (!err.message || err.message=="abort") {
                history.pushState(null,oPageInfo.title,oPageInfo.url);//
            }
            else {
                win.location = url;
            }
        })
        .then(function () {
            console.log("ajax " + url + " finished")
        });
}, false);

history.enabled && ActionObserver.bind("ajax", function (event, element) {
    event.stopPropagation();
    event.preventDefault();

    var url = this.href,
        title = this.attributes["title"] || null;
    history.pushState(null, title, url);


});
