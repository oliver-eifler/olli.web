/*! olli.web - v0.0.2 - 2016-10-24
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


/** @const */var DEBUG = true;
var olli = function() {
    "use strict";
    var win = window;
    var doc = win.document;
    var html = doc.documentElement;
    var olli$1 = win.olli || {};
    function loadjs(src, cb) {
        var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
        var ref = refs[refs.length - 1];
        var script = doc.createElement("script");
        script.src = src;
        script.async = true;
        if (cb && typeof cb === "function") {
            script.onload = cb;
        }
        ref.parentNode.insertBefore(script, ref.nextSibling);
        return script;
    }
    var status = "data-status";
    var datasource = "data-src";
    var loadimage = function(node, undefined) {
        if (!node || node.attributes[status] != undefined) {
            return;
        }
        node.setAttribute(status, "loading");
        var src = node.getAttribute(datasource);
        var loadDone = function() {
            node.onload = function() {};
            node.removeAttribute(datasource);
            node.setAttribute(status, "loaded");
            if (doc.documentMode && doc.documentMode < 9) node.className = node.className;
            console.log(node.src + " loaded");
        };
        if (src) {
            console.log(src + " loading");
            node.onload = loadDone;
            node.src = src;
        }
    };
    var sloth = function(navigator) {
        var windowHeight, onscroll = navigator.userAgent.match(/webkit/i) && navigator.userAgent.match(/mobile/i) ? "touchmove" : "scroll", onresize = "resize", timeout = null, handlersSet = false, listeners = {}, listenersDone = 0, listenerCount = 0, addEventListener = function() {
            var overwrite;
            if (win.addEventListener) {
                overwrite = function(type, listener, element) {
                    element.addEventListener(type, listener, false);
                };
            } else if (win.attachEvent) {
                overwrite = function(type, listener, element) {
                    element.attachEvent("on" + type, listener);
                };
            }
            return overwrite;
        }(), removeEventListener = function() {
            var overwrite;
            if (win.removeEventListener) {
                overwrite = function(type, listener, element) {
                    element.removeEventListener(type, listener, false);
                };
            } else if (win.detachEvent) {
                overwrite = function(type, listener, element) {
                    element.detachEvent("on" + type, listener);
                };
            }
            return overwrite;
        }(), updateHeight = function() {
            windowHeight = win.innerHeight || doc.documentElement.clientHeight;
        }, isInViewport = function(el) {
            var rect = el.getBoundingClientRect();
            return rect.bottom >= 0 && rect.top <= windowHeight;
        }, updateListeners = function() {
            if (listenerCount < 1) {
                return;
            }
            var listenerIndex, listener;
            for (listenerIndex in listeners) {
                if (listeners.hasOwnProperty(listenerIndex)) {
                    listener = listeners[listenerIndex];
                    if (!listener.handled && isInViewport(listener.elem)) {
                        listenersDone += 1;
                        listener.handled = true;
                        listener.onready(listener.elem);
                        listener = null;
                    }
                }
            }
            if (listenersDone === listenerCount) {
                removeEventListener(onscroll, onScrollHandler, win);
                removeEventListener(onresize, onResizeHandler, win);
                handlersSet = false;
                listenerCount = 0;
            }
            timeout = null;
        }, onScrollHandler = function() {
            if (null === timeout) {
                timeout = win.setTimeout(function() {
                    updateListeners();
                }, 50);
            }
        }, onResizeHandler = function() {
            updateHeight();
            onScrollHandler();
        };
        function add(element, listener) {
            listenerCount += 1;
            listeners[listenerCount] = {
                elem: element,
                onready: listener
            };
            if (false === handlersSet) {
                updateHeight();
                addEventListener(onresize, onResizeHandler, win);
                addEventListener(onscroll, onScrollHandler, win);
                handlersSet = true;
            }
            onScrollHandler();
            return element;
        }
        function reset() {
            listenersDone = listenerCount = 0;
            removeEventListener(onscroll, onScrollHandler, win);
            removeEventListener(onresize, onResizeHandler, win);
            win.clearTimeout(timeout);
            handlersSet = false;
            timeout = null;
            listeners = {};
        }
        return {
            add: add,
            reset: reset
        };
    }(win.navigator);
    !function(undefined) {
        var s = (doc.body || html).style, classes = [ "js" ];
        if (s.msFlexWrap !== undefined || s.flexWrap !== undefined) {
            classes.push("flexwrap");
        }
        html.className = classes.join(" ");
    }();
    win.lazy = function(node) {
        node.onload = node.onerror = function() {};
        sloth.add(node, loadimage);
    };
    if (win.history && win.history.pushState) {
        var js = [];
        if (!win.Promise) js.push("js/promise.js");
        js.push("js/page.js");
        loadjs("bundle/" + js.join(","));
    }
    olli$1.sloth = sloth;
    olli$1.loadJS = loadjs;
    return olli$1;
}();