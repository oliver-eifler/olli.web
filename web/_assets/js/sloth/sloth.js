/**
 * @title BeLazy.js
 * @module BeLazy
 * @overview This module offers a utility to lazy load whatever you want on whatever action.
 * @copyright 2014, SpilGames
 */
import {win, doc} from '../globals';

export default (function (navigator) {
    var windowHeight,
        onscroll = (navigator.userAgent.match(/webkit/i) && navigator.userAgent.match(/mobile/i)) ? "touchmove" : "scroll",
        onresize = "resize",
    // When resizing or scrolling, hundreds to thousands events can be send.
    // Instead of executing the listeners on every single event, we only
    // execute the logic every X miliseconds the configured values are
    // determined based on the research results from Ph.D. Steven C. Seow.
        timeout = null,
        handlersSet = false,
        listeners = {},
        listenersDone = 0,
        listenerCount = 0,


        addEventListener = (function () {
            var overwrite;
            if (win.addEventListener) {
                overwrite = function (type, listener, element) {
                    element.addEventListener(type, listener, false);
                };
            } else if (win.attachEvent) {
                overwrite = function (type, listener, element) {
                    element.attachEvent('on' + type, listener);
                };
            }

            return overwrite;
        })(),

        removeEventListener = (function () {
            var overwrite;
            if (win.removeEventListener) {
                overwrite = function (type, listener, element) {
                    element.removeEventListener(type, listener, false);
                };
            } else if (win.detachEvent) {
                overwrite = function (type, listener, element) {
                    element.detachEvent('on' + type, listener);
                };
            }

            return overwrite;
        })(),
        updateHeight = function() {
            windowHeight = win.innerHeight || doc.documentElement.clientHeight;
        },

        isInViewport = function (el) {
            var rect = el.getBoundingClientRect();
            return (rect.bottom >= 0 && rect.top <= windowHeight);
        },
    /*
     function isElementOutViewport (el) {
     var rect = el.getBoundingClientRect();
     return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
     }
     */
        updateListeners = function () {
            if (listenerCount < 1) {
                return;
            }
            var listenerIndex,
                listener;

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
        },

        onScrollHandler = function () {
            // Prevent massive js execution on fast/long scrolling.
            if (null === timeout) {
                timeout = win.setTimeout(function () {
                    updateListeners();
                }, 50);// Fairly unnoticable number.
            }
        },

        onResizeHandler = function () {
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
            // Directly check if the element is visible once added.
            return element;
        };
        function reset() {
            listenersDone = listenerCount = 0;
            removeEventListener(onscroll, onScrollHandler, win);
            removeEventListener(onresize, onResizeHandler, win);
            win.clearTimeout(timeout);
            handlersSet = false;
            timeout = null;
            listeners = {};
        };
    return {add: add, reset: reset};

})(win.navigator);
