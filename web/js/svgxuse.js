/*! olli.web - v0.0.2 - 2016-10-24
* https://github.com/oliver-eifler/olli.web#readme
* Copyright (c) 2016 Oliver Jean Eifler; MIT License */


/** @const */var DEBUG = true;
(function() {
    if (window && window.addEventListener) {
        var c = Object.create(null), l, q, d = function() {
            clearTimeout(q);
            q = setTimeout(l, 100);
        }, n = function() {}, t = function() {
            var e;
            window.addEventListener("resize", d, !1);
            window.addEventListener("orientationchange", d, !1);
            window.MutationObserver ? (e = new MutationObserver(d), e.observe(document.documentElement, {
                childList: !0,
                subtree: !0,
                attributes: !0
            }), n = function() {
                try {
                    e.disconnect(), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange", d, !1);
                } catch (c) {}
            }) : (document.documentElement.addEventListener("DOMSubtreeModified", d, !1), n = function() {
                document.documentElement.removeEventListener("DOMSubtreeModified", d, !1);
                window.removeEventListener("resize", d, !1);
                window.removeEventListener("orientationchange", d, !1);
            });
        }, u = function(e) {
            var c, d = location.hostname;
            if (window.XMLHttpRequest) {
                c = new XMLHttpRequest();
                var m = document.createElement("a");
                m.href = e;
                e = m.hostname;
                c = void 0 === c.withCredentials && "" !== e && e !== d ? XDomainRequest || void 0 : XMLHttpRequest;
            }
            return c;
        };
        l = function() {
            function e() {
                --p;
                0 === p && (n(), t());
            }
            function d(b) {
                return function() {
                    !0 !== c[b.base] && b.useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + b.hash);
                };
            }
            function l(b) {
                return function() {
                    var c = document.body, a = document.createElement("x");
                    b.onload = null;
                    a.innerHTML = b.responseText;
                    if (a = a.getElementsByTagName("svg")[0]) a.setAttribute("aria-hidden", "true"), 
                    a.style.position = "absolute", a.style.width = 0, a.style.height = 0, a.style.overflow = "hidden", 
                    c.insertBefore(a, c.firstChild);
                    e();
                };
            }
            function m(a) {
                return function() {
                    a.onerror = null;
                    a.ontimeout = null;
                    e();
                };
            }
            var b, f, g, h, p = 0, a, k;
            n();
            k = document.getElementsByTagName("use");
            for (h = 0; h < k.length; h += 1) {
                try {
                    f = k[h].getBoundingClientRect();
                } catch (v) {
                    f = !1;
                }
                g = k[h].getAttributeNS("http://www.w3.org/1999/xlink", "href").split("#");
                b = g[0];
                g = g[1];
                a = f && 0 === f.left && 0 === f.right && 0 === f.top && 0 === f.bottom;
                f && 0 === f.width && 0 === f.height && !a ? b.length && (a = c[b], !0 !== a && setTimeout(d({
                    useEl: k[h],
                    base: b,
                    hash: g
                }), 0), void 0 === a && (g = u(b), void 0 !== g && (a = new g(), c[b] = a, a.onload = l(a), 
                a.onerror = m(a), a.ontimeout = m(a), a.open("GET", b), a.send(), p += 1))) : a ? b.length && c[b] && d({
                    useEl: k[h],
                    base: b,
                    hash: g
                })() : void 0 === c[b] ? c[b] = !0 : c[b].onload && (c[b].abort(), delete c[b].onload, 
                c[b] = !0);
            }
            k = "";
            p += 1;
            e();
        };
        window.addEventListener("load", function r() {
            window.removeEventListener("load", r, !1);
            q = setTimeout(l, 0);
        }, !1);
    }
})();