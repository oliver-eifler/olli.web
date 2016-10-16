/*! olli.web - v0.0.2 - 2016-10-16
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


/** @const */var DEBUG = true;
(function() {
    "use strict";
    var win = window;
    var doc = win.document;
    var dataAttr = "data-";
    function hasDataAttribute(node, name) {
        return typeof node.attributes[dataAttr + name] != "undefined";
    }
    function setDataAttribute(node, name, value) {
        return node.setAttribute(dataAttr + name, value);
    }
    function getDataAttribute(node, name) {
        return node.getAttribute(dataAttr + name);
    }
    function removeDataAttribute(node, name) {
        return node.removeAttribute(dataAttr + name);
    }
    var imgtmpl = "<!DOCTYPE html><html><head><style>html,body{margin:0;border:none;padding:0;background:transparent}img{width:100%;}</style></head>";
    imgtmpl += '<body><img src="{src}" onload="window.frameElement.callme();"></body></html>';
    function loadDataSrc(node) {
        if (!node || hasDataAttribute(node, "status")) {
            return;
        }
        setDataAttribute(node, "status", "loading");
        var src = getDataAttribute(node, "src"), type = node.contentWindow ? getDataAttribute(node, "type") : "";
        var loadDone = function() {
            removeDataAttribute(node, "src");
            setDataAttribute(node, "status", "loaded");
            if (doc.documentMode && doc.documentMode < 9) node.className = node.className;
        };
        if (src) {
            if (type == "img") {
                node["callme"] = loadDone;
                node.setAttribute("data-src", imgtmpl.replace("{src}", src));
                node.contentWindow.location = "javascript: window.frameElement.getAttribute('data-src');";
            } else {
                node.onload = loadDone;
                node.src = src;
            }
        }
    }
    var Sloth = function(navigator) {
        var windowHeight, onscroll = navigator.userAgent.match(/webkit/i) && navigator.userAgent.match(/mobile/i) ? "touchmove" : "scroll", onresize = "resize", resizeTimeout = null, scrollTimeout = null, resizeHandlerSet = false, scrollHandlerSet = false, listeners = {}, listenersDone = 0, listenerCount = 0, addEventListener = function() {
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
                        if (DEBUG) {
                            console.log("Element ", listener.elem);
                            console.log("Viewport ", windowHeight);
                            var rect = listener.elem.getBoundingClientRect();
                            console.log("ClientRect ", rect);
                            console.log("Parent ", listener.elem.parentNode.getBoundingClientRect());
                            console.log("rect.bottom >= 0:" + (rect.bottom >= 0) + " rect.top <= windowHeight:" + (rect.top <= windowHeight));
                        }
                        listener.onready(listener.elem);
                        listener = null;
                    }
                }
            }
            if (listenersDone === listenerCount) {
                removeEventListener(onscroll, onScrollHandler, win);
                removeEventListener(onresize, resetWindowHeight, win);
                scrollHandlerSet = false;
                resizeHandlerSet = false;
                listenerCount = 0;
            }
            scrollTimeout = null;
        }, onScrollHandler = function() {
            if (null === scrollTimeout) {
                scrollTimeout = win.setTimeout(function() {
                    updateListeners();
                }, 50);
            }
        }, resetWindowHeight = function() {
            updateHeight();
            onScrollHandler();
        };
        function add(element, listener) {
            listenerCount += 1;
            listeners[listenerCount] = {
                elem: element,
                onready: listener
            };
            if (false === resizeHandlerSet) {
                addEventListener(onresize, resetWindowHeight, win);
                resizeHandlerSet = true;
            }
            if (false === scrollHandlerSet) {
                updateHeight();
                addEventListener(onscroll, onScrollHandler, win);
                scrollHandlerSet = true;
            }
            onScrollHandler();
            return element;
        }
        function reset() {
            listenersDone = listenerCount = 0;
            removeEventListener(onscroll, onScrollHandler, win);
            removeEventListener(onresize, resetWindowHeight, win);
            scrollHandlerSet = false;
            resizeHandlerSet = false;
            cancelTimeout(scrollTimeout);
            resizeTimeout = scrollTimeout = null;
            listeners = {};
        }
        return {
            add: add,
            reset: reset
        };
    }(win.navigator);
    var isReady = doc.attachEvent ? doc.readyState === "complete" : doc.readyState !== "loading";
    var domContentLoaded = "DOMContentLoaded";
    var addeventlistener = "addEventListener";
    var listener;
    var fns = [];
    function async(fn) {
        setTimeout(function() {
            fn();
        }, 0);
    }
    function flush(f) {
        isReady = true;
        while (f = fns.shift()) async(f);
    }
    if (!isReady) {
        if (doc[addeventlistener]) {
            console.log("waiting...");
            doc[addeventlistener](domContentLoaded, listener = function() {
                doc.removeEventListener(domContentLoaded, listener);
                flush();
            }, false);
        } else {
            console.log("polling...");
            (function pollDomReady() {
                if (isReady) return;
                if (doc.readyState === "complete") {
                    return flush();
                }
                setTimeout(pollDomReady, 10);
            })();
        }
    }
    var ready = function(fn) {
        if (typeof fn != "function") return;
        if (isReady) return async(fn);
        fns.push(fn);
    };
    function updateSloth() {
        process("img");
        process("iframe");
        function process(selector) {
            var i, l, node, nodes = doc.getElementsByTagName(selector);
            for (i = 0, l = nodes.length; i < l; i++) {
                node = nodes[i];
                if (!hasDataAttribute(node, "sloth") && hasDataAttribute(node, "src")) {
                    setDataAttribute(node, "sloth", "true");
                    Sloth.add(node, loadDataSrc);
                }
            }
        }
    }
    ready(function() {
        console.log("Dom Ready");
        updateSloth();
    });
    olli.ready = ready;
    olli.sloth = Sloth;
    olli.updateSloth = updateSloth;
    olli.loadDataSrc = loadDataSrc;
})();