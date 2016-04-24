/**
 * Olli Lib
 * This file is part of the Olli-Framework
 * Copyright (c) 2012-2015 Oliver Jean Eifler
 *
 * @version 0.0.1
 * @link http://www.oliver-eifler.info/
 * @author Oliver Jean Eifler <oliver.eifler@gmx.de>
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 *
 * window.onresize fix and resize:end event
 */
import {win,doc,html} from "../globals.js";
import {raf,caf} from "../page/raf-caf.js";

export default (function () {
    'use strict';
    var ResizeObserver = {},
        listeners = {},
        eventType = "resize",
        width = win.innerWidth,
        height = win.innerHeight,
        orientation = getOrientation(),
        timeoutid = null;

    function getOrientation() {
        return (win.orientation && win.orientation !== undefined) ? Math.abs(+win.orientation) % 180 : 0;
    }

    ResizeObserver.bind = function (key, fn) {
        listeners[key] = {
            fn: fn
        };
    };
    ResizeObserver.unbind = function (key) {
        if (listeners.hasOwnProperty(key)) {
            delete listeners[key];
        }
    };
    ResizeObserver.disable = function () {
        win.removeEventListener(eventType, onEvent, false);
    };
    ResizeObserver.enable = function () {
        win.addEventListener(eventType, onEvent, false);
    };
    ResizeObserver.size = function () {
        return {
            width: win.innerWidth,
            height: win.innerHeight
        }
    };
    function callbacks() {
        var key,fn;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                fn = listeners[key].fn;
                if (fn) {
                    fn.call(null, width, height);
                }
            }
        }
    }

    function onEvent(event) {
        var curWidth = win.innerWidth,
            curHeight = win.innerHeight;
        if (curWidth == width && curHeight == height) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        width = curWidth;
        height = curHeight;
        var curOrientation = getOrientation();
        if (curOrientation !== orientation) {
            clearTimeout(timeoutid);
            callbacks();
            return orientation = curOrientation;
        }
        //caf(timeoutid);
        //return timeoutid = raf(callbacks);
        clearTimeout(timeoutid);
        return timeoutid = setTimeout(callbacks,100)
    }

    win.addEventListener(eventType, callbacks, false);

    return ResizeObserver;
})();