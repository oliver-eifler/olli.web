/**
 * Created by darkwolf on 18.04.2016.
 */
import {html,doc} from '../globals';
export default (function () {
    'use strict';
    var FontSizeObserver = {},
        listeners = {},
        fontnode,
        eventType,
        transitionStyle;
    //Find prefixed transitionend event and transition style
    var transitions = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'otransitionend'
    };
    for (var t in transitions) {
        if (html.style[t] !== undefined) {
            eventType = transitions[t];
            transitionStyle = t;
            break;
        }
    }

    function getNode() {
        if (!fontnode) {
            fontnode = doc.createElement("div");
            fontnode.style.cssText = "position:absolute;width:1em;height:1em;left;-2em;top:-2em;";
            if (transitionStyle)
                fontnode.style[transitionStyle] = "font-size 1ms linear";
            html.getElementsByTagName("body")[0].appendChild(fontnode);
        }
        return fontnode;
    }

    function getSize() {
        var rect = getNode().getBoundingClientRect();
        return rect.bottom - rect.top;
    }

    FontSizeObserver.bind = function (key, fn) {
        listeners[key] = {
            fn: fn
        };
    };
    FontSizeObserver.unbind = function (key) {
        if (listeners.hasOwnProperty(key)) {
            delete listeners[key];
        }
    };
    FontSizeObserver.disable = function () {
        eventType && fontnode && fontnode.removeEventListener(eventType, onEvent, false);
    };
    FontSizeObserver.enable = function () {
        eventType && fontnode && fontnode.addEventListener(eventType, onEvent, false);
    };
    function onEvent(event) {
        //if (event.target !== fontnode)
        //    return;
        var height = getSize(), fn, key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                fn = listeners[key].fn;
                if (fn) {
                    fn.call(fontnode, height);
                }
            }
        }
    }

    eventType && getNode().addEventListener(eventType, onEvent, false);
    /**
     * Expose 'FontSizeObserver'
     */
    FontSizeObserver.fontSize = getSize;
    return FontSizeObserver;

})();