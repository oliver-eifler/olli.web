/**
 * Created by darkwolf on 02.04.2016.
 */
import {win} from './globals'
import promisedef from './polyfills/npo.js'
var name="Promise";
win[name] = win[name] || promisedef();
