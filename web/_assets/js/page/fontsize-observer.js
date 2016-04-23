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
        transitionStyle,
        fontSize;
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
            fontnode.style.cssText = "position:absolute;width:1rem;height:1rem;left;-1rem;top:-1rem;";
            if (transitionStyle)
                fontnode.style[transitionStyle] = "font-size 1ms linear";
            html.getElementsByTagName("body")[0].appendChild(fontnode);
        }
        return fontnode;
    }

    function getSize() {
        //return getNode().clientHeight;
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
    FontSizeObserver.fontSize = function() {return fontSize;};

    function onEvent(event) {
        //if (event.target !== fontnode)
        //    return;
        fontSize = getSize();
        var fn, key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                fn = listeners[key].fn;
                if (fn) {
                    fn.call(null, fontSize);
                }
            }
        }
    }
    //Init
    fontSize = getSize();
    eventType && getNode().addEventListener(eventType, onEvent, false);
    /**
     * Expose 'FontSizeObserver'
     */
    return FontSizeObserver;

})();