/**
 * @title BeLazy.js
 * @module BeLazy
 * @overview This module offers a utility to lazy load whatever you want on whatever action.
 * @copyright 2014, SpilGames
 */
import {win,doc} from '../globals';

export default (function (navigator) {
    var windowHeight = win.innerHeight || doc.documentElement.clientHeight,
    // When resizing or scrolling, hundreds to thousands events can be send.
    // Instead of executing the listeners on every single event, we only
    // execute the logic every X miliseconds the configured values are
    // determined based on the research results from Ph.D. Steven C. Seow.
        resizeTimeout = null,
        scrollTimeout = null,
        resizeHandlerSet = false,
        scrollHandlerSet = false,
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

        isInViewport = function (el) {
            var rect = el.getBoundingClientRect();
            return !(rect.bottom < 0 || rect.top > windowHeight);
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
                    }
                }
            }

            if (listenersDone === listenerCount) {
                removeEventListener('scroll', onScrollHandler, win);
                removeEventListener('resize', resetWindowHeight, win);
                scrollHandlerSet = false;
                resizeHandlerSet = false;
                listenerCount = 0;
            }

            scrollTimeout = null;
        },

        onScrollHandler = function () {
            // Prevent massive js execution on fast/long scrolling.
            if (null === scrollTimeout) {
                scrollTimeout = win.setTimeout(function () {
                    updateListeners();
                }, 50);// Fairly unnoticable number.
            }
        },

        resetWindowHeight = function () {
            if (null === resizeTimeout) {
                resizeTimeout = win.setTimeout(function () {
                    windowHeight = win.innerHeight || doc.documentElement.clientHeight;
                    resizeTimeout = null;
                    // Check if something became visible after the resize.
                    onScrollHandler();
                }, 100);
            }
        };

    return function (element, listener) {
        listenerCount += 1;
        listeners[listenerCount] = {
            elem: element,
            onready: listener
        };

        if (false === resizeHandlerSet) {
            addEventListener('resize', resetWindowHeight, win);
            resizeHandlerSet = true;
        }

        if (false === scrollHandlerSet) {
            if (navigator.userAgent.match(/webkit/i) && navigator.userAgent.match(/mobile/i)) {
                // iPad, iPhone, Android etc.
                addEventListener('touchmove', onScrollHandler, win);
            } else {
                addEventListener('scroll', onScrollHandler, win);
            }

            scrollHandlerSet = true;
        }

        // Directly check if the element is visible once added.
        onScrollHandler();

        return element;
    };

})(win.navigator);