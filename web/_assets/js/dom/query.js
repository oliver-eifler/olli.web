/**
 * Created by darkwolf on 08.05.2016.
 */
/*
 * query
 * Abstraction to querySelectorAll for increased 
 * performance and greater usability
 * @param {String} selector
 * @param {Element} context (optional)
 * @return {Array}
 */

    var simpleRe = /^(#?[\w-]+|\.[\w-.]+)$/,
        periodRe = /\./g,
        slice = [].slice,
        query = function(all,selector, context){
        context = context || document;
        if (!all)
            return context.querySelector(selector);
        // Redirect call to the more performant function 
        // if it's a simple selector and return an array
        // for easier usage
        if(simpleRe.test(selector)){
            switch(selector[0]){
                case '#':
                    return [document.getElementById(selector.substr(1))];
                case '.':
                    return slice.call(context.getElementsByClassName(selector.substr(1).replace(periodRe, ' ')));
                default:
                    return slice.call(context.getElementsByTagName(selector));
            }
        }
        // If not a simple selector, query the DOM as usual 
        // and return an array for easier usage
        return slice.call(context.querySelectorAll(selector));
    }
export var $ = query.bind(null,false);
export var $$ = query.bind(null,true);
