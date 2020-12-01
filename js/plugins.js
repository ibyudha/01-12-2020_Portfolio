! function (t, e, n) {
  function i(e, n) {
    this.el = e, this.$el = t(e), this.settings = t.extend({}, r, n), this._defaults = r, this._name = s, this._slides = [], this.currentIndex = 0, this.init()
  }
  var s = "kenburnsy",
    r = {
      fullscreen: !1,
      duration: 9e3,
      fadeInDuration: 1500,
      height: null
    },
    o = {
      zoomOut: function (e, n) {
        t(e).velocity({
          rotateZ: "3deg",
          scale: "1.1"
        }, 0).velocity({
          translateZ: 0,
          rotateZ: "0deg",
          scale: "1"
        }, n)
      },
      zoomIn: function (e, n) {
        t(e).velocity({
          rotateZ: "0deg",
          scale: "1"
        }, 0).velocity({
          translateZ: 0,
          rotateZ: "3deg",
          scale: "1.1"
        }, n)
      }
    },
    a = function (e) {
      var n = function (t) {
        function n() {
          s(), setTimeout(function () {
            t.resolve(r)
          })
        }

        function i() {
          s(), t.rejectWith(r)
        }

        function s() {
          r.onload = null, r.onerror = null, r.onabort = null
        }
        var r = new Image;
        r.onload = n, r.onerror = i, r.onabort = i, r.src = e
      };
      return t.Deferred(n).promise()
    };
  Object.keys || (Object.keys = function (t) {
    if (t !== Object(t)) throw new TypeError("Object.keys called on a non-object");
    var e, n = [];
    for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
    return n
  }), t.extend(i.prototype, {
    init: function () {
      var e, n = this.settings,
        i = this;
      e = this.$el.children().map(function (t, e) {
        return e.src
      }), this.$el.addClass(function () {
        var t = [s];
        return n.fullscreen && t.push("fullscreen"), t.join(" ")
      }), t.when.apply(t, t.map(e, a)).done(function () {
        var t = Array.prototype.slice.call(arguments);
        i.buildScene(t)
      })
    },
    reveal: function (e) {
      var n = this._slides[e],
        i = this.$el;
      t(n).velocity({
        opacity: 0
      }, 0, function () {
        t(this).appendTo(i)
      }).velocity({
        opacity: 1,
        translateZ: 0
      }, {
        duration: this.settings.fadeInDuration,
        queue: !1
      })
    },
    animate: function (t) {
      var e = Object.keys(o),
        n = o[e[Math.floor(e.length * Math.random())]],
        i = this.settings.duration,
        s = this._slides[t];
      n(s, i)
    },
    show: function (t) {
      this.reveal(t), this.animate(t)
    },
    next: function () {
      this.currentIndex = 0 === this.currentIndex ? this._slides.length - 1 : this.currentIndex - 1, this.show(this.currentIndex)
    },
    addSlides: function (e) {
      var i = this.el;
      return t.map(e.reverse(), function (t) {
        var e = n.createElement("div");
        return e.style.backgroundImage = "url(" + t.src + ")", e.className = "slide", i.appendChild(e), e
      })
    },
    buildScene: function (t) {
      var e = this,
        n = this.settings;
      this.el.innerHTML = "", this._slides = this.addSlides(t), this.currentIndex = t.length - 1, n.fullscreen || (this.el.style.height = this.settings.height || t[this.currentIndex].height + "px"), this.animate(this.currentIndex), setInterval(function () {
        e.next()
      }, n.duration - n.fadeInDuration)
    }
  }), t.fn[s] = function (e) {
    return this.each(function () {
      t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new i(this, e))
    }), this
  }
}(jQuery, window, document);


/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
! function (e) {
  function t(e) {
    var t = e.length,
      r = $.type(e);
    return "function" === r || $.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
  }
  if (!e.jQuery) {
    var $ = function (e, t) {
      return new $.fn.init(e, t)
    };
    $.isWindow = function (e) {
      return null != e && e == e.window
    }, $.type = function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? a[o.call(e)] || "object" : typeof e
    }, $.isArray = Array.isArray || function (e) {
      return "array" === $.type(e)
    }, $.isPlainObject = function (e) {
      var t;
      if (!e || "object" !== $.type(e) || e.nodeType || $.isWindow(e)) return !1;
      try {
        if (e.constructor && !n.call(e, "constructor") && !n.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (r) {
        return !1
      }
      for (t in e);
      return void 0 === t || n.call(e, t)
    }, $.each = function (e, r, a) {
      var n, o = 0,
        i = e.length,
        s = t(e);
      if (a) {
        if (s)
          for (; i > o && (n = r.apply(e[o], a), n !== !1); o++);
        else
          for (o in e)
            if (n = r.apply(e[o], a), n === !1) break
      } else if (s)
        for (; i > o && (n = r.call(e[o], o, e[o]), n !== !1); o++);
      else
        for (o in e)
          if (n = r.call(e[o], o, e[o]), n === !1) break;
      return e
    }, $.data = function (e, t, a) {
      if (void 0 === a) {
        var n = e[$.expando],
          o = n && r[n];
        if (void 0 === t) return o;
        if (o && t in o) return o[t]
      } else if (void 0 !== t) {
        var n = e[$.expando] || (e[$.expando] = ++$.uuid);
        return r[n] = r[n] || {}, r[n][t] = a, a
      }
    }, $.removeData = function (e, t) {
      var a = e[$.expando],
        n = a && r[a];
      n && $.each(t, function (e, t) {
        delete n[t]
      })
    }, $.extend = function () {
      var e, t, r, a, n, o, i = arguments[0] || {},
        s = 1,
        l = arguments.length,
        u = !1;
      for ("boolean" == typeof i && (u = i, i = arguments[s] || {}, s++), "object" != typeof i && "function" !== $.type(i) && (i = {}), s === l && (i = this, s--); l > s; s++)
        if (null != (n = arguments[s]))
          for (a in n) e = i[a], r = n[a], i !== r && (u && r && ($.isPlainObject(r) || (t = $.isArray(r))) ? (t ? (t = !1, o = e && $.isArray(e) ? e : []) : o = e && $.isPlainObject(e) ? e : {}, i[a] = $.extend(u, o, r)) : void 0 !== r && (i[a] = r));
      return i
    }, $.queue = function (e, r, a) {
      function n(e, r) {
        var a = r || [];
        return null != e && (t(Object(e)) ? ! function (e, t) {
          for (var r = +t.length, a = 0, n = e.length; r > a;) e[n++] = t[a++];
          if (r !== r)
            for (; void 0 !== t[a];) e[n++] = t[a++];
          return e.length = n, e
        }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a
      }
      if (e) {
        r = (r || "fx") + "queue";
        var o = $.data(e, r);
        return a ? (!o || $.isArray(a) ? o = $.data(e, r, n(a)) : o.push(a), o) : o || []
      }
    }, $.dequeue = function (e, t) {
      $.each(e.nodeType ? [e] : e, function (e, r) {
        t = t || "fx";
        var a = $.queue(r, t),
          n = a.shift();
        "inprogress" === n && (n = a.shift()), n && ("fx" === t && a.unshift("inprogress"), n.call(r, function () {
          $.dequeue(r, t)
        }))
      })
    }, $.fn = $.prototype = {
      init: function (e) {
        if (e.nodeType) return this[0] = e, this;
        throw new Error("Not a DOM node.")
      },
      offset: function () {
        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
          top: 0,
          left: 0
        };
        return {
          top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
          left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
        }
      },
      position: function () {
        function e() {
          for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
          return e || document
        }
        var t = this[0],
          e = e.apply(t),
          r = this.offset(),
          a = /^(?:body|html)$/i.test(e.nodeName) ? {
            top: 0,
            left: 0
          } : $(e).offset();
        return r.top -= parseFloat(t.style.marginTop) || 0, r.left -= parseFloat(t.style.marginLeft) || 0, e.style && (a.top += parseFloat(e.style.borderTopWidth) || 0, a.left += parseFloat(e.style.borderLeftWidth) || 0), {
          top: r.top - a.top,
          left: r.left - a.left
        }
      }
    };
    var r = {};
    $.expando = "velocity" + (new Date).getTime(), $.uuid = 0;
    for (var a = {}, n = a.hasOwnProperty, o = a.toString, i = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < i.length; s++) a["[object " + i[s] + "]"] = i[s].toLowerCase();
    $.fn.init.prototype = $.fn, e.Velocity = {
      Utilities: $
    }
  }
}(window),
function (e) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function () {
  return function (e, t, r, a) {
    function n(e) {
      for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
        var n = e[t];
        n && a.push(n)
      }
      return a
    }

    function o(e) {
      return g.isWrapped(e) ? e = [].slice.call(e) : g.isNode(e) && (e = [e]), e
    }

    function i(e) {
      var t = $.data(e, "velocity");
      return null === t ? a : t
    }

    function s(e) {
      return function (t) {
        return Math.round(t * e) * (1 / e)
      }
    }

    function l(e, r, a, n) {
      function o(e, t) {
        return 1 - 3 * t + 3 * e
      }

      function i(e, t) {
        return 3 * t - 6 * e
      }

      function s(e) {
        return 3 * e
      }

      function l(e, t, r) {
        return ((o(t, r) * e + i(t, r)) * e + s(t)) * e
      }

      function u(e, t, r) {
        return 3 * o(t, r) * e * e + 2 * i(t, r) * e + s(t)
      }

      function c(t, r) {
        for (var n = 0; m > n; ++n) {
          var o = u(r, e, a);
          if (0 === o) return r;
          var i = l(r, e, a) - t;
          r -= i / o
        }
        return r
      }

      function p() {
        for (var t = 0; b > t; ++t) w[t] = l(t * x, e, a)
      }

      function f(t, r, n) {
        var o, i, s = 0;
        do i = r + (n - r) / 2, o = l(i, e, a) - t, o > 0 ? n = i : r = i; while (Math.abs(o) > h && ++s < v);
        return i
      }

      function d(t) {
        for (var r = 0, n = 1, o = b - 1; n != o && w[n] <= t; ++n) r += x;
        --n;
        var i = (t - w[n]) / (w[n + 1] - w[n]),
          s = r + i * x,
          l = u(s, e, a);
        return l >= y ? c(t, s) : 0 == l ? s : f(t, r, r + x)
      }

      function g() {
        V = !0, (e != r || a != n) && p()
      }
      var m = 4,
        y = .001,
        h = 1e-7,
        v = 10,
        b = 11,
        x = 1 / (b - 1),
        S = "Float32Array" in t;
      if (4 !== arguments.length) return !1;
      for (var P = 0; 4 > P; ++P)
        if ("number" != typeof arguments[P] || isNaN(arguments[P]) || !isFinite(arguments[P])) return !1;
      e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);
      var w = S ? new Float32Array(b) : new Array(b),
        V = !1,
        C = function (t) {
          return V || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n)
        };
      C.getControlPoints = function () {
        return [{
          x: e,
          y: r
        }, {
          x: a,
          y: n
        }]
      };
      var T = "generateBezier(" + [e, r, a, n] + ")";
      return C.toString = function () {
        return T
      }, C
    }

    function u(e, t) {
      var r = e;
      return g.isString(e) ? v.Easings[e] || (r = !1) : r = g.isArray(e) && 1 === e.length ? s.apply(null, e) : g.isArray(e) && 2 === e.length ? b.apply(null, e.concat([t])) : g.isArray(e) && 4 === e.length ? l.apply(null, e) : !1, r === !1 && (r = v.Easings[v.defaults.easing] ? v.defaults.easing : h), r
    }

    function c(e) {
      if (e) {
        var t = (new Date).getTime(),
          r = v.State.calls.length;
        r > 1e4 && (v.State.calls = n(v.State.calls));
        for (var o = 0; r > o; o++)
          if (v.State.calls[o]) {
            var s = v.State.calls[o],
              l = s[0],
              u = s[2],
              f = s[3],
              d = !!f,
              m = null;
            f || (f = v.State.calls[o][3] = t - 16);
            for (var y = Math.min((t - f) / u.duration, 1), h = 0, b = l.length; b > h; h++) {
              var S = l[h],
                w = S.element;
              if (i(w)) {
                var V = !1;
                if (u.display !== a && null !== u.display && "none" !== u.display) {
                  if ("flex" === u.display) {
                    var C = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                    $.each(C, function (e, t) {
                      x.setPropertyValue(w, "display", t)
                    })
                  }
                  x.setPropertyValue(w, "display", u.display)
                }
                u.visibility !== a && "hidden" !== u.visibility && x.setPropertyValue(w, "visibility", u.visibility);
                for (var T in S)
                  if ("element" !== T) {
                    var k = S[T],
                      A, F = g.isString(k.easing) ? v.Easings[k.easing] : k.easing;
                    if (1 === y) A = k.endValue;
                    else {
                      var E = k.endValue - k.startValue;
                      if (A = k.startValue + E * F(y, u, E), !d && A === k.currentValue) continue
                    }
                    if (k.currentValue = A, "tween" === T) m = A;
                    else {
                      if (x.Hooks.registered[T]) {
                        var j = x.Hooks.getRoot(T),
                          H = i(w).rootPropertyValueCache[j];
                        H && (k.rootPropertyValue = H)
                      }
                      var N = x.setPropertyValue(w, T, k.currentValue + (0 === parseFloat(A) ? "" : k.unitType), k.rootPropertyValue, k.scrollData);
                      x.Hooks.registered[T] && (i(w).rootPropertyValueCache[j] = x.Normalizations.registered[j] ? x.Normalizations.registered[j]("extract", null, N[1]) : N[1]), "transform" === N[0] && (V = !0)
                    }
                  } u.mobileHA && i(w).transformCache.translate3d === a && (i(w).transformCache.translate3d = "(0px, 0px, 0px)", V = !0), V && x.flushTransformCache(w)
              }
            }
            u.display !== a && "none" !== u.display && (v.State.calls[o][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (v.State.calls[o][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], y, Math.max(0, f + u.duration - t), f, m), 1 === y && p(o)
          }
      }
      v.State.isTicking && P(c)
    }

    function p(e, t) {
      if (!v.State.calls[e]) return !1;
      for (var r = v.State.calls[e][0], n = v.State.calls[e][1], o = v.State.calls[e][2], s = v.State.calls[e][4], l = !1, u = 0, c = r.length; c > u; u++) {
        var p = r[u].element;
        if (t || o.loop || ("none" === o.display && x.setPropertyValue(p, "display", o.display), "hidden" === o.visibility && x.setPropertyValue(p, "visibility", o.visibility)), o.loop !== !0 && ($.queue(p)[1] === a || !/\.velocityQueueEntryFlag/i.test($.queue(p)[1])) && i(p)) {
          i(p).isAnimating = !1, i(p).rootPropertyValueCache = {};
          var f = !1;
          $.each(x.Lists.transforms3D, function (e, t) {
            var r = /^scale/.test(t) ? 1 : 0,
              n = i(p).transformCache[t];
            i(p).transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (f = !0, delete i(p).transformCache[t])
          }), o.mobileHA && (f = !0, delete i(p).transformCache.translate3d), f && x.flushTransformCache(p), x.Values.removeClass(p, "velocity-animating")
        }
        if (!t && o.complete && !o.loop && u === c - 1) try {
          o.complete.call(n, n)
        } catch (d) {
          setTimeout(function () {
            throw d
          }, 1)
        }
        s && o.loop !== !0 && s(n), i(p) && o.loop === !0 && !t && ($.each(i(p).tweensContainer, function (e, t) {
          /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
        }), v(p, "reverse", {
          loop: !0,
          delay: o.delay
        })), o.queue !== !1 && $.dequeue(p, o.queue)
      }
      v.State.calls[e] = !1;
      for (var g = 0, m = v.State.calls.length; m > g; g++)
        if (v.State.calls[g] !== !1) {
          l = !0;
          break
        } l === !1 && (v.State.isTicking = !1, delete v.State.calls, v.State.calls = [])
    }
    var f = function () {
        if (r.documentMode) return r.documentMode;
        for (var e = 7; e > 4; e--) {
          var t = r.createElement("div");
          if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
        }
        return a
      }(),
      d = function () {
        var e = 0;
        return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
          var r = (new Date).getTime(),
            a;
          return a = Math.max(0, 16 - (r - e)), e = r + a, setTimeout(function () {
            t(r + a)
          }, a)
        }
      }(),
      g = {
        isString: function (e) {
          return "string" == typeof e
        },
        isArray: Array.isArray || function (e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        },
        isFunction: function (e) {
          return "[object Function]" === Object.prototype.toString.call(e)
        },
        isNode: function (e) {
          return e && e.nodeType
        },
        isNodeList: function (e) {
          return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== a && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
        },
        isWrapped: function (e) {
          return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
        },
        isSVG: function (e) {
          return t.SVGElement && e instanceof t.SVGElement
        },
        isEmptyObject: function (e) {
          for (var t in e) return !1;
          return !0
        }
      },
      $, m = !1;
    if (e.fn && e.fn.jquery ? ($ = e, m = !0) : $ = t.Velocity.Utilities, 8 >= f && !m) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    if (7 >= f) return void(jQuery.fn.velocity = jQuery.fn.animate);
    var y = 400,
      h = "swing",
      v = {
        State: {
          isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
          isAndroid: /Android/i.test(navigator.userAgent),
          isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
          isChrome: t.chrome,
          isFirefox: /Firefox/i.test(navigator.userAgent),
          prefixElement: r.createElement("div"),
          prefixMatches: {},
          scrollAnchor: null,
          scrollPropertyLeft: null,
          scrollPropertyTop: null,
          isTicking: !1,
          calls: []
        },
        CSS: {},
        Utilities: $,
        Redirects: {},
        Easings: {},
        Promise: t.Promise,
        defaults: {
          queue: "",
          duration: y,
          easing: h,
          begin: a,
          complete: a,
          progress: a,
          display: a,
          visibility: a,
          loop: !1,
          delay: !1,
          mobileHA: !0,
          _cacheValues: !0
        },
        init: function (e) {
          $.data(e, "velocity", {
            isSVG: g.isSVG(e),
            isAnimating: !1,
            computedStyle: null,
            tweensContainer: null,
            rootPropertyValueCache: {},
            transformCache: {}
          })
        },
        hook: null,
        mock: !1,
        version: {
          major: 1,
          minor: 2,
          patch: 2
        },
        debug: !1
      };
    t.pageYOffset !== a ? (v.State.scrollAnchor = t, v.State.scrollPropertyLeft = "pageXOffset", v.State.scrollPropertyTop = "pageYOffset") : (v.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, v.State.scrollPropertyLeft = "scrollLeft", v.State.scrollPropertyTop = "scrollTop");
    var b = function () {
      function e(e) {
        return -e.tension * e.x - e.friction * e.v
      }

      function t(t, r, a) {
        var n = {
          x: t.x + a.dx * r,
          v: t.v + a.dv * r,
          tension: t.tension,
          friction: t.friction
        };
        return {
          dx: n.v,
          dv: e(n)
        }
      }

      function r(r, a) {
        var n = {
            dx: r.v,
            dv: e(r)
          },
          o = t(r, .5 * a, n),
          i = t(r, .5 * a, o),
          s = t(r, a, i),
          l = 1 / 6 * (n.dx + 2 * (o.dx + i.dx) + s.dx),
          u = 1 / 6 * (n.dv + 2 * (o.dv + i.dv) + s.dv);
        return r.x = r.x + l * a, r.v = r.v + u * a, r
      }
      return function a(e, t, n) {
        var o = {
            x: -1,
            v: 0,
            tension: null,
            friction: null
          },
          i = [0],
          s = 0,
          l = 1e-4,
          u = .016,
          c, p, f;
        for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, n = n || null, o.tension = e, o.friction = t, c = null !== n, c ? (s = a(e, t), p = s / n * u) : p = u;;)
          if (f = r(f || o, p), i.push(1 + f.x), s += 16, !(Math.abs(f.x) > l && Math.abs(f.v) > l)) break;
        return c ? function (e) {
          return i[e * (i.length - 1) | 0]
        } : s
      }
    }();
    v.Easings = {
      linear: function (e) {
        return e
      },
      swing: function (e) {
        return .5 - Math.cos(e * Math.PI) / 2
      },
      spring: function (e) {
        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
      }
    }, $.each([
      ["ease", [.25, .1, .25, 1]],
      ["ease-in", [.42, 0, 1, 1]],
      ["ease-out", [0, 0, .58, 1]],
      ["ease-in-out", [.42, 0, .58, 1]],
      ["easeInSine", [.47, 0, .745, .715]],
      ["easeOutSine", [.39, .575, .565, 1]],
      ["easeInOutSine", [.445, .05, .55, .95]],
      ["easeInQuad", [.55, .085, .68, .53]],
      ["easeOutQuad", [.25, .46, .45, .94]],
      ["easeInOutQuad", [.455, .03, .515, .955]],
      ["easeInCubic", [.55, .055, .675, .19]],
      ["easeOutCubic", [.215, .61, .355, 1]],
      ["easeInOutCubic", [.645, .045, .355, 1]],
      ["easeInQuart", [.895, .03, .685, .22]],
      ["easeOutQuart", [.165, .84, .44, 1]],
      ["easeInOutQuart", [.77, 0, .175, 1]],
      ["easeInQuint", [.755, .05, .855, .06]],
      ["easeOutQuint", [.23, 1, .32, 1]],
      ["easeInOutQuint", [.86, 0, .07, 1]],
      ["easeInExpo", [.95, .05, .795, .035]],
      ["easeOutExpo", [.19, 1, .22, 1]],
      ["easeInOutExpo", [1, 0, 0, 1]],
      ["easeInCirc", [.6, .04, .98, .335]],
      ["easeOutCirc", [.075, .82, .165, 1]],
      ["easeInOutCirc", [.785, .135, .15, .86]]
    ], function (e, t) {
      v.Easings[t[0]] = l.apply(null, t[1])
    });
    var x = v.CSS = {
      RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,
        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
      },
      Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
      },
      Hooks: {
        templates: {
          textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
          boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
          clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
          backgroundPosition: ["X Y", "0% 0%"],
          transformOrigin: ["X Y Z", "50% 50% 0px"],
          perspectiveOrigin: ["X Y", "50% 50%"]
        },
        registered: {},
        register: function () {
          for (var e = 0; e < x.Lists.colors.length; e++) {
            var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
            x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t]
          }
          var r, a, n;
          if (f)
            for (r in x.Hooks.templates) {
              a = x.Hooks.templates[r], n = a[0].split(" ");
              var o = a[1].match(x.RegEx.valueSplit);
              "Color" === n[0] && (n.push(n.shift()), o.push(o.shift()), x.Hooks.templates[r] = [n.join(" "), o.join(" ")])
            }
          for (r in x.Hooks.templates) {
            a = x.Hooks.templates[r], n = a[0].split(" ");
            for (var e in n) {
              var i = r + n[e],
                s = e;
              x.Hooks.registered[i] = [r, s]
            }
          }
        },
        getRoot: function (e) {
          var t = x.Hooks.registered[e];
          return t ? t[0] : e
        },
        cleanRootPropertyValue: function (e, t) {
          return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]), x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]), t
        },
        extractValue: function (e, t) {
          var r = x.Hooks.registered[e];
          if (r) {
            var a = r[0],
              n = r[1];
            return t = x.Hooks.cleanRootPropertyValue(a, t), t.toString().match(x.RegEx.valueSplit)[n]
          }
          return t
        },
        injectValue: function (e, t, r) {
          var a = x.Hooks.registered[e];
          if (a) {
            var n = a[0],
              o = a[1],
              i, s;
            return r = x.Hooks.cleanRootPropertyValue(n, r), i = r.toString().match(x.RegEx.valueSplit), i[o] = t, s = i.join(" ")
          }
          return r
        }
      },
      Normalizations: {
        registered: {
          clip: function (e, t, r) {
            switch (e) {
              case "name":
                return "clip";
              case "extract":
                var a;
                return x.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(x.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
              case "inject":
                return "rect(" + r + ")"
            }
          },
          blur: function (e, t, r) {
            switch (e) {
              case "name":
                return v.State.isFirefox ? "filter" : "-webkit-filter";
              case "extract":
                var a = parseFloat(r);
                if (!a && 0 !== a) {
                  var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                  a = n ? n[1] : 0
                }
                return a;
              case "inject":
                return parseFloat(r) ? "blur(" + r + ")" : "none"
            }
          },
          opacity: function (e, t, r) {
            if (8 >= f) switch (e) {
              case "name":
                return "filter";
              case "extract":
                var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                return r = a ? a[1] / 100 : 1;
              case "inject":
                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
            } else switch (e) {
              case "name":
                return "opacity";
              case "extract":
                return r;
              case "inject":
                return r
            }
          }
        },
        register: function () {
          9 >= f || v.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
          for (var e = 0; e < x.Lists.transformsBase.length; e++) ! function () {
            var t = x.Lists.transformsBase[e];
            x.Normalizations.registered[t] = function (e, r, n) {
              switch (e) {
                case "name":
                  return "transform";
                case "extract":
                  return i(r) === a || i(r).transformCache[t] === a ? /^scale/i.test(t) ? 1 : 0 : i(r).transformCache[t].replace(/[()]/g, "");
                case "inject":
                  var o = !1;
                  switch (t.substr(0, t.length - 1)) {
                    case "translate":
                      o = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                      break;
                    case "scal":
                    case "scale":
                      v.State.isAndroid && i(r).transformCache[t] === a && 1 > n && (n = 1), o = !/(\d)$/i.test(n);
                      break;
                    case "skew":
                      o = !/(deg|\d)$/i.test(n);
                      break;
                    case "rotate":
                      o = !/(deg|\d)$/i.test(n)
                  }
                  return o || (i(r).transformCache[t] = "(" + n + ")"), i(r).transformCache[t]
              }
            }
          }();
          for (var e = 0; e < x.Lists.colors.length; e++) ! function () {
            var t = x.Lists.colors[e];
            x.Normalizations.registered[t] = function (e, r, n) {
              switch (e) {
                case "name":
                  return t;
                case "extract":
                  var o;
                  if (x.RegEx.wrappedValueAlreadyExtracted.test(n)) o = n;
                  else {
                    var i, s = {
                      black: "rgb(0, 0, 0)",
                      blue: "rgb(0, 0, 255)",
                      gray: "rgb(128, 128, 128)",
                      green: "rgb(0, 128, 0)",
                      red: "rgb(255, 0, 0)",
                      white: "rgb(255, 255, 255)"
                    };
                    /^[A-z]+$/i.test(n) ? i = s[n] !== a ? s[n] : s.black : x.RegEx.isHex.test(n) ? i = "rgb(" + x.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (i = s.black), o = (i || n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                  }
                  return 8 >= f || 3 !== o.split(" ").length || (o += " 1"), o;
                case "inject":
                  return 8 >= f ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
              }
            }
          }()
        }
      },
      Names: {
        camelCase: function (e) {
          return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase()
          })
        },
        SVGAttribute: function (e) {
          var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
          return (f || v.State.isAndroid && !v.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
        },
        prefixCheck: function (e) {
          if (v.State.prefixMatches[e]) return [v.State.prefixMatches[e], !0];
          for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; a > r; r++) {
            var n;
            if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                return e.toUpperCase()
              }), g.isString(v.State.prefixElement.style[n])) return v.State.prefixMatches[e] = n, [n, !0]
          }
          return [e, !1]
        }
      },
      Values: {
        hexToRgb: function (e) {
          var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
            a;
          return e = e.replace(t, function (e, t, r, a) {
            return t + t + r + r + a + a
          }), a = r.exec(e), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
        },
        isCSSNullValue: function (e) {
          return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
        },
        getUnitType: function (e) {
          return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
        },
        getDisplayType: function (e) {
          var t = e && e.tagName.toString().toLowerCase();
          return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
        },
        addClass: function (e, t) {
          e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
        },
        removeClass: function (e, t) {
          e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
        }
      },
      getPropertyValue: function (e, r, n, o) {
        function s(e, r) {
          function n() {
            u && x.setPropertyValue(e, "display", "none")
          }
          var l = 0;
          if (8 >= f) l = $.css(e, r);
          else {
            var u = !1;
            if (/^(width|height)$/.test(r) && 0 === x.getPropertyValue(e, "display") && (u = !0, x.setPropertyValue(e, "display", x.Values.getDisplayType(e))), !o) {
              if ("height" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var c = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                return n(), c
              }
              if ("width" === r && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                var p = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);
                return n(), p
              }
            }
            var d;
            d = i(e) === a ? t.getComputedStyle(e, null) : i(e).computedStyle ? i(e).computedStyle : i(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), l = 9 === f && "filter" === r ? d.getPropertyValue(r) : d[r], ("" === l || null === l) && (l = e.style[r]), n()
          }
          if ("auto" === l && /^(top|right|bottom|left)$/i.test(r)) {
            var g = s(e, "position");
            ("fixed" === g || "absolute" === g && /top|left/i.test(r)) && (l = $(e).position()[r] + "px")
          }
          return l
        }
        var l;
        if (x.Hooks.registered[r]) {
          var u = r,
            c = x.Hooks.getRoot(u);
          n === a && (n = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])), x.Normalizations.registered[c] && (n = x.Normalizations.registered[c]("extract", e, n)), l = x.Hooks.extractValue(u, n)
        } else if (x.Normalizations.registered[r]) {
          var p, d;
          p = x.Normalizations.registered[r]("name", e), "transform" !== p && (d = s(e, x.Names.prefixCheck(p)[0]), x.Values.isCSSNullValue(d) && x.Hooks.templates[r] && (d = x.Hooks.templates[r][1])), l = x.Normalizations.registered[r]("extract", e, d)
        }
        if (!/^[\d-]/.test(l))
          if (i(e) && i(e).isSVG && x.Names.SVGAttribute(r))
            if (/^(height|width)$/i.test(r)) try {
              l = e.getBBox()[r]
            } catch (g) {
              l = 0
            } else l = e.getAttribute(r);
            else l = s(e, x.Names.prefixCheck(r)[0]);
        return x.Values.isCSSNullValue(l) && (l = 0), v.debug >= 2 && console.log("Get " + r + ": " + l), l
      },
      setPropertyValue: function (e, r, a, n, o) {
        var s = r;
        if ("scroll" === r) o.container ? o.container["scroll" + o.direction] = a : "Left" === o.direction ? t.scrollTo(a, o.alternateValue) : t.scrollTo(o.alternateValue, a);
        else if (x.Normalizations.registered[r] && "transform" === x.Normalizations.registered[r]("name", e)) x.Normalizations.registered[r]("inject", e, a), s = "transform", a = i(e).transformCache[r];
        else {
          if (x.Hooks.registered[r]) {
            var l = r,
              u = x.Hooks.getRoot(r);
            n = n || x.getPropertyValue(e, u), a = x.Hooks.injectValue(l, a, n), r = u
          }
          if (x.Normalizations.registered[r] && (a = x.Normalizations.registered[r]("inject", e, a), r = x.Normalizations.registered[r]("name", e)), s = x.Names.prefixCheck(r)[0], 8 >= f) try {
            e.style[s] = a
          } catch (c) {
            v.debug && console.log("Browser does not support [" + a + "] for [" + s + "]")
          } else i(e) && i(e).isSVG && x.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a;
          v.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a)
        }
        return [s, a]
      },
      flushTransformCache: function (e) {
        function t(t) {
          return parseFloat(x.getPropertyValue(e, t))
        }
        var r = "";
        if ((f || v.State.isAndroid && !v.State.isChrome) && i(e).isSVG) {
          var a = {
            translate: [t("translateX"), t("translateY")],
            skewX: [t("skewX")],
            skewY: [t("skewY")],
            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
            rotate: [t("rotateZ"), 0, 0]
          };
          $.each(i(e).transformCache, function (e) {
            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), a[e] && (r += e + "(" + a[e].join(" ") + ") ", delete a[e])
          })
        } else {
          var n, o;
          $.each(i(e).transformCache, function (t) {
            return n = i(e).transformCache[t], "transformPerspective" === t ? (o = n, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void(r += t + n + " "))
          }), o && (r = "perspective" + o + " " + r)
        }
        x.setPropertyValue(e, "transform", r)
      }
    };
    x.Hooks.register(), x.Normalizations.register(), v.hook = function (e, t, r) {
      var n = a;
      return e = o(e), $.each(e, function (e, o) {
        if (i(o) === a && v.init(o), r === a) n === a && (n = v.CSS.getPropertyValue(o, t));
        else {
          var s = v.CSS.setPropertyValue(o, t, r);
          "transform" === s[0] && v.CSS.flushTransformCache(o), n = s
        }
      }), n
    };
    var S = function () {
      function e() {
        return l ? T.promise || null : f
      }

      function n() {
        function e(e) {
          function p(e, t) {
            var r = a,
              i = a,
              s = a;
            return g.isArray(e) ? (r = e[0], !g.isArray(e[1]) && /^[\d-]/.test(e[1]) || g.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? s = e[1] : (g.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || g.isArray(e[1])) && (i = t ? e[1] : u(e[1], o.duration), e[2] !== a && (s = e[2]))) : r = e, t || (i = i || o.easing), g.isFunction(r) && (r = r.call(n, w, P)), g.isFunction(s) && (s = s.call(n, w, P)), [r || 0, i, s]
          }

          function f(e, t) {
            var r, a;
            return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
              return r = e, ""
            }), r || (r = x.Values.getUnitType(e)), [a, r]
          }

          function d() {
            var e = {
                myParent: n.parentNode || r.body,
                position: x.getPropertyValue(n, "position"),
                fontSize: x.getPropertyValue(n, "fontSize")
              },
              a = e.position === N.lastPosition && e.myParent === N.lastParent,
              o = e.fontSize === N.lastFontSize;
            N.lastParent = e.myParent, N.lastPosition = e.position, N.lastFontSize = e.fontSize;
            var s = 100,
              l = {};
            if (o && a) l.emToPx = N.lastEmToPx, l.percentToPxWidth = N.lastPercentToPxWidth, l.percentToPxHeight = N.lastPercentToPxHeight;
            else {
              var u = i(n).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
              v.init(u), e.myParent.appendChild(u), $.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                v.CSS.setPropertyValue(u, t, "hidden")
              }), v.CSS.setPropertyValue(u, "position", e.position), v.CSS.setPropertyValue(u, "fontSize", e.fontSize), v.CSS.setPropertyValue(u, "boxSizing", "content-box"), $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                v.CSS.setPropertyValue(u, t, s + "%")
              }), v.CSS.setPropertyValue(u, "paddingLeft", s + "em"), l.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(u, "width", null, !0)) || 1) / s, l.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(u, "height", null, !0)) || 1) / s, l.emToPx = N.lastEmToPx = (parseFloat(x.getPropertyValue(u, "paddingLeft")) || 1) / s, e.myParent.removeChild(u)
            }
            return null === N.remToPx && (N.remToPx = parseFloat(x.getPropertyValue(r.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(t.innerWidth) / 100, N.vhToPx = parseFloat(t.innerHeight) / 100), l.remToPx = N.remToPx, l.vwToPx = N.vwToPx, l.vhToPx = N.vhToPx, v.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(l), n), l
          }
          if (o.begin && 0 === w) try {
            o.begin.call(m, m)
          } catch (y) {
            setTimeout(function () {
              throw y
            }, 1)
          }
          if ("scroll" === k) {
            var S = /^x$/i.test(o.axis) ? "Left" : "Top",
              V = parseFloat(o.offset) || 0,
              C, A, F;
            o.container ? g.isWrapped(o.container) || g.isNode(o.container) ? (o.container = o.container[0] || o.container, C = o.container["scroll" + S], F = C + $(n).position()[S.toLowerCase()] + V) : o.container = null : (C = v.State.scrollAnchor[v.State["scrollProperty" + S]], A = v.State.scrollAnchor[v.State["scrollProperty" + ("Left" === S ? "Top" : "Left")]], F = $(n).offset()[S.toLowerCase()] + V), s = {
              scroll: {
                rootPropertyValue: !1,
                startValue: C,
                currentValue: C,
                endValue: F,
                unitType: "",
                easing: o.easing,
                scrollData: {
                  container: o.container,
                  direction: S,
                  alternateValue: A
                }
              },
              element: n
            }, v.debug && console.log("tweensContainer (scroll): ", s.scroll, n)
          } else if ("reverse" === k) {
            if (!i(n).tweensContainer) return void $.dequeue(n, o.queue);
            "none" === i(n).opts.display && (i(n).opts.display = "auto"), "hidden" === i(n).opts.visibility && (i(n).opts.visibility = "visible"), i(n).opts.loop = !1, i(n).opts.begin = null, i(n).opts.complete = null, b.easing || delete o.easing, b.duration || delete o.duration, o = $.extend({}, i(n).opts, o);
            var E = $.extend(!0, {}, i(n).tweensContainer);
            for (var j in E)
              if ("element" !== j) {
                var H = E[j].startValue;
                E[j].startValue = E[j].currentValue = E[j].endValue, E[j].endValue = H, g.isEmptyObject(b) || (E[j].easing = o.easing), v.debug && console.log("reverse tweensContainer (" + j + "): " + JSON.stringify(E[j]), n)
              } s = E
          } else if ("start" === k) {
            var E;
            i(n).tweensContainer && i(n).isAnimating === !0 && (E = i(n).tweensContainer), $.each(h, function (e, t) {
              if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(e)) {
                var r = p(t, !0),
                  n = r[0],
                  o = r[1],
                  i = r[2];
                if (x.RegEx.isHex.test(n)) {
                  for (var s = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(n), u = i ? x.Values.hexToRgb(i) : a, c = 0; c < s.length; c++) {
                    var f = [l[c]];
                    o && f.push(o), u !== a && f.push(u[c]), h[e + s[c]] = f
                  }
                  delete h[e]
                }
              }
            });
            for (var R in h) {
              var O = p(h[R]),
                z = O[0],
                q = O[1],
                M = O[2];
              R = x.Names.camelCase(R);
              var I = x.Hooks.getRoot(R),
                B = !1;
              if (i(n).isSVG || "tween" === I || x.Names.prefixCheck(I)[1] !== !1 || x.Normalizations.registered[I] !== a) {
                (o.display !== a && null !== o.display && "none" !== o.display || o.visibility !== a && "hidden" !== o.visibility) && /opacity|filter/.test(R) && !M && 0 !== z && (M = 0), o._cacheValues && E && E[R] ? (M === a && (M = E[R].endValue + E[R].unitType), B = i(n).rootPropertyValueCache[I]) : x.Hooks.registered[R] ? M === a ? (B = x.getPropertyValue(n, I), M = x.getPropertyValue(n, R, B)) : B = x.Hooks.templates[I][1] : M === a && (M = x.getPropertyValue(n, R));
                var W, G, D, X = !1;
                if (W = f(R, M), M = W[0], D = W[1], W = f(R, z), z = W[0].replace(/^([+-\/*])=/, function (e, t) {
                    return X = t, ""
                  }), G = W[1], M = parseFloat(M) || 0, z = parseFloat(z) || 0, "%" === G && (/^(fontSize|lineHeight)$/.test(R) ? (z /= 100, G = "em") : /^scale/.test(R) ? (z /= 100, G = "") : /(Red|Green|Blue)$/i.test(R) && (z = z / 100 * 255, G = "")), /[\/*]/.test(X)) G = D;
                else if (D !== G && 0 !== M)
                  if (0 === z) G = D;
                  else {
                    l = l || d();
                    var Y = /margin|padding|left|right|width|text|word|letter/i.test(R) || /X$/.test(R) || "x" === R ? "x" : "y";
                    switch (D) {
                      case "%":
                        M *= "x" === Y ? l.percentToPxWidth : l.percentToPxHeight;
                        break;
                      case "px":
                        break;
                      default:
                        M *= l[D + "ToPx"]
                    }
                    switch (G) {
                      case "%":
                        M *= 1 / ("x" === Y ? l.percentToPxWidth : l.percentToPxHeight);
                        break;
                      case "px":
                        break;
                      default:
                        M *= 1 / l[G + "ToPx"]
                    }
                  } switch (X) {
                  case "+":
                    z = M + z;
                    break;
                  case "-":
                    z = M - z;
                    break;
                  case "*":
                    z = M * z;
                    break;
                  case "/":
                    z = M / z
                }
                s[R] = {
                  rootPropertyValue: B,
                  startValue: M,
                  currentValue: M,
                  endValue: z,
                  unitType: G,
                  easing: q
                }, v.debug && console.log("tweensContainer (" + R + "): " + JSON.stringify(s[R]), n)
              } else v.debug && console.log("Skipping [" + I + "] due to a lack of browser support.")
            }
            s.element = n
          }
          s.element && (x.Values.addClass(n, "velocity-animating"), L.push(s), "" === o.queue && (i(n).tweensContainer = s, i(n).opts = o), i(n).isAnimating = !0, w === P - 1 ? (v.State.calls.push([L, m, o, null, T.resolver]), v.State.isTicking === !1 && (v.State.isTicking = !0, c())) : w++)
        }
        var n = this,
          o = $.extend({}, v.defaults, b),
          s = {},
          l;
        switch (i(n) === a && v.init(n), parseFloat(o.delay) && o.queue !== !1 && $.queue(n, o.queue, function (e) {
          v.velocityQueueEntryFlag = !0, i(n).delayTimer = {
            setTimeout: setTimeout(e, parseFloat(o.delay)),
            next: e
          }
        }), o.duration.toString().toLowerCase()) {
          case "fast":
            o.duration = 200;
            break;
          case "normal":
            o.duration = y;
            break;
          case "slow":
            o.duration = 600;
            break;
          default:
            o.duration = parseFloat(o.duration) || 1
        }
        v.mock !== !1 && (v.mock === !0 ? o.duration = o.delay = 1 : (o.duration *= parseFloat(v.mock) || 1, o.delay *= parseFloat(v.mock) || 1)), o.easing = u(o.easing, o.duration), o.begin && !g.isFunction(o.begin) && (o.begin = null), o.progress && !g.isFunction(o.progress) && (o.progress = null), o.complete && !g.isFunction(o.complete) && (o.complete = null), o.display !== a && null !== o.display && (o.display = o.display.toString().toLowerCase(), "auto" === o.display && (o.display = v.CSS.Values.getDisplayType(n))), o.visibility !== a && null !== o.visibility && (o.visibility = o.visibility.toString().toLowerCase()), o.mobileHA = o.mobileHA && v.State.isMobile && !v.State.isGingerbread, o.queue === !1 ? o.delay ? setTimeout(e, o.delay) : e() : $.queue(n, o.queue, function (t, r) {
          return r === !0 ? (T.promise && T.resolver(m), !0) : (v.velocityQueueEntryFlag = !0, void e(t))
        }), "" !== o.queue && "fx" !== o.queue || "inprogress" === $.queue(n)[0] || $.dequeue(n)
      }
      var s = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || g.isString(arguments[0].properties)),
        l, f, d, m, h, b;
      if (g.isWrapped(this) ? (l = !1, d = 0, m = this, f = this) : (l = !0, d = 1, m = s ? arguments[0].elements || arguments[0].e : arguments[0]), m = o(m)) {
        s ? (h = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (h = arguments[d], b = arguments[d + 1]);
        var P = m.length,
          w = 0;
        if (!/^(stop|finish)$/i.test(h) && !$.isPlainObject(b)) {
          var V = d + 1;
          b = {};
          for (var C = V; C < arguments.length; C++) g.isArray(arguments[C]) || !/^(fast|normal|slow)$/i.test(arguments[C]) && !/^\d/.test(arguments[C]) ? g.isString(arguments[C]) || g.isArray(arguments[C]) ? b.easing = arguments[C] : g.isFunction(arguments[C]) && (b.complete = arguments[C]) : b.duration = arguments[C]
        }
        var T = {
          promise: null,
          resolver: null,
          rejecter: null
        };
        l && v.Promise && (T.promise = new v.Promise(function (e, t) {
          T.resolver = e, T.rejecter = t
        }));
        var k;
        switch (h) {
          case "scroll":
            k = "scroll";
            break;
          case "reverse":
            k = "reverse";
            break;
          case "finish":
          case "stop":
            $.each(m, function (e, t) {
              i(t) && i(t).delayTimer && (clearTimeout(i(t).delayTimer.setTimeout), i(t).delayTimer.next && i(t).delayTimer.next(), delete i(t).delayTimer)
            });
            var A = [];
            return $.each(v.State.calls, function (e, t) {
              t && $.each(t[1], function (r, n) {
                var o = b === a ? "" : b;
                return o === !0 || t[2].queue === o || b === a && t[2].queue === !1 ? void $.each(m, function (r, a) {
                  a === n && ((b === !0 || g.isString(b)) && ($.each($.queue(a, g.isString(b) ? b : ""), function (e, t) {
                    g.isFunction(t) && t(null, !0)
                  }), $.queue(a, g.isString(b) ? b : "", [])), "stop" === h ? (i(a) && i(a).tweensContainer && o !== !1 && $.each(i(a).tweensContainer, function (e, t) {
                    t.endValue = t.currentValue
                  }), A.push(e)) : "finish" === h && (t[2].duration = 1))
                }) : !0
              })
            }), "stop" === h && ($.each(A, function (e, t) {
              p(t, !0)
            }), T.promise && T.resolver(m)), e();
          default:
            if (!$.isPlainObject(h) || g.isEmptyObject(h)) {
              if (g.isString(h) && v.Redirects[h]) {
                var F = $.extend({}, b),
                  E = F.duration,
                  j = F.delay || 0;
                return F.backwards === !0 && (m = $.extend(!0, [], m).reverse()), $.each(m, function (e, t) {
                  parseFloat(F.stagger) ? F.delay = j + parseFloat(F.stagger) * e : g.isFunction(F.stagger) && (F.delay = j + F.stagger.call(t, e, P)), F.drag && (F.duration = parseFloat(E) || (/^(callout|transition)/.test(h) ? 1e3 : y), F.duration = Math.max(F.duration * (F.backwards ? 1 - e / P : (e + 1) / P), .75 * F.duration, 200)), v.Redirects[h].call(t, t, F || {}, e, P, m, T.promise ? T : a)
                }), e()
              }
              var H = "Velocity: First argument (" + h + ") was not a property map, a known action, or a registered redirect. Aborting.";
              return T.promise ? T.rejecter(new Error(H)) : console.log(H), e()
            }
            k = "start"
        }
        var N = {
            lastParent: null,
            lastPosition: null,
            lastFontSize: null,
            lastPercentToPxWidth: null,
            lastPercentToPxHeight: null,
            lastEmToPx: null,
            remToPx: null,
            vwToPx: null,
            vhToPx: null
          },
          L = [];
        $.each(m, function (e, t) {
          g.isNode(t) && n.call(t)
        });
        var F = $.extend({}, v.defaults, b),
          R;
        if (F.loop = parseInt(F.loop), R = 2 * F.loop - 1, F.loop)
          for (var O = 0; R > O; O++) {
            var z = {
              delay: F.delay,
              progress: F.progress
            };
            O === R - 1 && (z.display = F.display, z.visibility = F.visibility, z.complete = F.complete), S(m, "reverse", z)
          }
        return e()
      }
    };
    v = $.extend(S, v), v.animate = S;
    var P = t.requestAnimationFrame || d;
    return v.State.isMobile || r.hidden === a || r.addEventListener("visibilitychange", function () {
      r.hidden ? (P = function (e) {
        return setTimeout(function () {
          e(!0)
        }, 16)
      }, c()) : P = t.requestAnimationFrame || d
    }), e.Velocity = v, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = v.defaults), $.each(["Down", "Up"], function (e, t) {
      v.Redirects["slide" + t] = function (e, r, n, o, i, s) {
        var l = $.extend({}, r),
          u = l.begin,
          c = l.complete,
          p = {
            height: "",
            marginTop: "",
            marginBottom: "",
            paddingTop: "",
            paddingBottom: ""
          },
          f = {};
        l.display === a && (l.display = "Down" === t ? "inline" === v.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function () {
          u && u.call(i, i);
          for (var r in p) {
            f[r] = e.style[r];
            var a = v.CSS.getPropertyValue(e, r);
            p[r] = "Down" === t ? [a, 0] : [0, a]
          }
          f.overflow = e.style.overflow, e.style.overflow = "hidden"
        }, l.complete = function () {
          for (var t in f) e.style[t] = f[t];
          c && c.call(i, i), s && s.resolver(i)
        }, v(e, p, l)
      }
    }), $.each(["In", "Out"], function (e, t) {
      v.Redirects["fade" + t] = function (e, r, n, o, i, s) {
        var l = $.extend({}, r),
          u = {
            opacity: "In" === t ? 1 : 0
          },
          c = l.complete;
        l.complete = n !== o - 1 ? l.begin = null : function () {
          c && c.call(i, i), s && s.resolver(i)
        }, l.display === a && (l.display = "In" === t ? "auto" : "none"), v(this, u, l)
      }
    }), v
  }(window.jQuery || window.Zepto || window, window, document)
});


/*
	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized
	
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/
(function (e) {
  e(document).ready(function () {
    e("body").append('<div id="supersized-loader"></div><ul id="supersized"></ul>')
  });
  e.supersized = function (t) {
    var n = "#supersized",
      r = this;
    r.$el = e(n);
    r.el = n;
    vars = e.supersized.vars;
    r.$el.data("supersized", r);
    api = r.$el.data("supersized");
    r.init = function () {
      e.supersized.vars = e.extend(e.supersized.vars, e.supersized.themeVars);
      e.supersized.vars.options = e.extend({}, e.supersized.defaultOptions, e.supersized.themeOptions, t);
      r.options = e.supersized.vars.options;
      r._build()
    };
    r._build = function () {
      var t = 0,
        n = "",
        i = "",
        s, o = "",
        u;
      while (t <= r.options.slides.length - 1) {
        switch (r.options.slide_links) {
          case "num":
            s = t;
            break;
          case "name":
            s = r.options.slides[t].title;
            break;
          case "blank":
            s = ""
        }
        n = n + '<li class="slide-' + t + '"></li>';
        if (t == r.options.start_slide - 1) {
          r.options.slide_links && (i = i + '<li class="slide-link-' + t + ' current-slide"><a>' + s + "</a></li>");
          if (r.options.thumb_links) {
            r.options.slides[t].thumb ? u = r.options.slides[t].thumb : u = r.options.slides[t].image;
            o = o + '<li class="thumb' + t + ' current-thumb"><img src="' + u + '"/></li>'
          }
        } else {
          r.options.slide_links && (i = i + '<li class="slide-link-' + t + '" ><a>' + s + "</a></li>");
          if (r.options.thumb_links) {
            r.options.slides[t].thumb ? u = r.options.slides[t].thumb : u = r.options.slides[t].image;
            o = o + '<li class="thumb' + t + '"><img src="' + u + '"/></li>'
          }
        }
        t++
      }
      r.options.slide_links && e(vars.slide_list).html(i);
      r.options.thumb_links && vars.thumb_tray.length && e(vars.thumb_tray).append('<ul id="' + vars.thumb_list.replace("#", "") + '">' + o + "</ul>");
      e(r.el).append(n);
      if (r.options.thumbnail_navigation) {
        vars.current_slide - 1 < 0 ? prevThumb = r.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
        e(vars.prev_thumb).show().html(e("<img/>").attr("src", r.options.slides[prevThumb].image));
        vars.current_slide == r.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
        e(vars.next_thumb).show().html(e("<img/>").attr("src", r.options.slides[nextThumb].image))
      }
      r._start()
    };
    r._start = function () {
      r.options.start_slide ? vars.current_slide = r.options.start_slide - 1 : vars.current_slide = Math.floor(Math.random() * r.options.slides.length);
      var t = r.options.new_window ? ' target="_blank"' : "";
      r.options.performance == 3 ? r.$el.addClass("speed") : (r.options.performance == 1 || r.options.performance == 2) && r.$el.addClass("quality");
      if (r.options.random) {
        arr = r.options.slides;
        for (var n, i, s = arr.length; s; n = parseInt(Math.random() * s), i = arr[--s], arr[s] = arr[n], arr[n] = i);
        r.options.slides = arr
      }
      if (r.options.slides.length > 1) {
        if (r.options.slides.length > 2) {
          vars.current_slide - 1 < 0 ? loadPrev = r.options.slides.length - 1 : loadPrev = vars.current_slide - 1;
          var o = r.options.slides[loadPrev].url ? "href='" + r.options.slides[loadPrev].url + "'" : "",
            u = e('<img src="' + r.options.slides[loadPrev].image + '"/>'),
            a = r.el + " li:eq(" + loadPrev + ")";
          u.appendTo(a).wrap("<a " + o + t + "></a>").parent().parent().addClass("image-loading prevslide");
          u.load(function () {
            e(this).data("origWidth", e(this).width()).data("origHeight", e(this).height());
            r.resizeNow()
          })
        }
      } else r.options.slideshow = 0;
      o = api.getField("url") ? "href='" + api.getField("url") + "'" : "";
      var f = e('<img src="' + api.getField("image") + '"/>'),
        l = r.el + " li:eq(" + vars.current_slide + ")";
      f.appendTo(l).wrap("<a " + o + t + "></a>").parent().parent().addClass("image-loading activeslide");
      f.load(function () {
        r._origDim(e(this));
        r.resizeNow();
        r.launch();
        typeof theme != "undefined" && typeof theme._init == "function" && theme._init()
      });
      if (r.options.slides.length > 1) {
        vars.current_slide == r.options.slides.length - 1 ? loadNext = 0 : loadNext = vars.current_slide + 1;
        o = r.options.slides[loadNext].url ? "href='" + r.options.slides[loadNext].url + "'" : "";
        var c = e('<img src="' + r.options.slides[loadNext].image + '"/>'),
          h = r.el + " li:eq(" + loadNext + ")";
        c.appendTo(h).wrap("<a " + o + t + "></a>").parent().parent().addClass("image-loading");
        c.load(function () {
          e(this).data("origWidth", e(this).width()).data("origHeight", e(this).height());
          r.resizeNow()
        })
      }
      r.$el.css("visibility", "hidden");
      e(".load-item").hide()
    };
    r.launch = function () {
      r.$el.css("visibility", "visible");
      e("#supersized-loader").remove();
      typeof theme != "undefined" && typeof theme.beforeAnimation == "function" && theme.beforeAnimation("next");
      e(".load-item").show();
      r.options.keyboard_nav && e(document.documentElement).keyup(function (e) {
        if (vars.in_animation) return !1;
        if (e.keyCode == 37 || e.keyCode == 40) {
          clearInterval(vars.slideshow_interval);
          r.prevSlide()
        } else if (e.keyCode == 39 || e.keyCode == 38) {
          clearInterval(vars.slideshow_interval);
          r.nextSlide()
        } else if (e.keyCode == 32 && !vars.hover_pause) {
          clearInterval(vars.slideshow_interval);
          r.playToggle()
        }
      });
      r.options.slideshow && r.options.pause_hover && e(r.el).hover(function () {
        if (vars.in_animation) return !1;
        vars.hover_pause = !0;
        if (!vars.is_paused) {
          vars.hover_pause = "resume";
          r.playToggle()
        }
      }, function () {
        if (vars.hover_pause == "resume") {
          r.playToggle();
          vars.hover_pause = !1
        }
      });
      r.options.slide_links && e(vars.slide_list + "> li").click(function () {
        index = e(vars.slide_list + "> li").index(this);
        targetSlide = index + 1;
        r.goTo(targetSlide);
        return !1
      });
      r.options.thumb_links && e(vars.thumb_list + "> li").click(function () {
        index = e(vars.thumb_list + "> li").index(this);
        targetSlide = index + 1;
        api.goTo(targetSlide);
        return !1
      });
      if (r.options.slideshow && r.options.slides.length > 1) {
        r.options.autoplay && r.options.slides.length > 1 ? vars.slideshow_interval = setInterval(r.nextSlide, r.options.slide_interval) : vars.is_paused = !0;
        e(".load-item img").bind("contextmenu mousedown", function () {
          return !1
        })
      }
      e(window).resize(function () {
        r.resizeNow()
      })
    };
    r.resizeNow = function () {
      return r.$el.each(function () {
        e("img", r.el).each(function () {
          function o(e) {
            if (e) {
              if (thisSlide.width() < n || thisSlide.width() < r.options.min_width)
                if (thisSlide.width() * t >= r.options.min_height) {
                  thisSlide.width(r.options.min_width);
                  thisSlide.height(thisSlide.width() * t)
                } else u()
            } else if (r.options.min_height >= i && !r.options.fit_landscape) {
              if (n * t >= r.options.min_height || n * t >= r.options.min_height && t <= 1) {
                thisSlide.width(n);
                thisSlide.height(n * t)
              } else if (t > 1) {
                thisSlide.height(r.options.min_height);
                thisSlide.width(thisSlide.height() / t)
              } else if (thisSlide.width() < n) {
                thisSlide.width(n);
                thisSlide.height(thisSlide.width() * t)
              }
            } else {
              thisSlide.width(n);
              thisSlide.height(n * t)
            }
          }

          function u(e) {
            if (e) {
              if (thisSlide.height() < i)
                if (thisSlide.height() / t >= r.options.min_width) {
                  thisSlide.height(r.options.min_height);
                  thisSlide.width(thisSlide.height() / t)
                } else o(!0)
            } else if (r.options.min_width >= n) {
              if (i / t >= r.options.min_width || t > 1) {
                thisSlide.height(i);
                thisSlide.width(i / t)
              } else if (t <= 1) {
                thisSlide.width(r.options.min_width);
                thisSlide.height(thisSlide.width() * t)
              }
            } else {
              thisSlide.height(i);
              thisSlide.width(i / t)
            }
          }
          thisSlide = e(this);
          var t = (thisSlide.data("origHeight") / thisSlide.data("origWidth")).toFixed(2),
            n = r.$el.width(),
            i = r.$el.height(),
            s;
          r.options.fit_always ? i / n > t ? o() : u() : i <= r.options.min_height && n <= r.options.min_width ? i / n > t ? r.options.fit_landscape && t < 1 ? o(!0) : u(!0) : r.options.fit_portrait && t >= 1 ? u(!0) : o(!0) : n <= r.options.min_width ? i / n > t ? r.options.fit_landscape && t < 1 ? o(!0) : u() : r.options.fit_portrait && t >= 1 ? u() : o(!0) : i <= r.options.min_height ? i / n > t ? r.options.fit_landscape && t < 1 ? o() : u(!0) : r.options.fit_portrait && t >= 1 ? u(!0) : o() : i / n > t ? r.options.fit_landscape && t < 1 ? o() : u() : r.options.fit_portrait && t >= 1 ? u() : o();
          thisSlide.parents("li").hasClass("image-loading") && e(".image-loading").removeClass("image-loading");
          r.options.horizontal_center && e(this).css("left", (n - e(this).width()) / 2);
          r.options.vertical_center && e(this).css("top", (i - e(this).height()) / 2)
        });
        r.options.image_protect && e("img", r.el).bind("contextmenu mousedown", function () {
          return !1
        });
        return !1
      })
    };
    r.nextSlide = function () {
      if (vars.in_animation || !api.options.slideshow) return !1;
      vars.in_animation = !0;
      clearInterval(vars.slideshow_interval);
      var t = r.options.slides,
        n = r.$el.find(".activeslide");
      e(".prevslide").removeClass("prevslide");
      n.removeClass("activeslide").addClass("prevslide");
      vars.current_slide + 1 == r.options.slides.length ? vars.current_slide = 0 : vars.current_slide++;
      var i = e(r.el + " li:eq(" + vars.current_slide + ")"),
        s = r.$el.find(".prevslide");
      r.options.performance == 1 && r.$el.removeClass("quality").addClass("speed");
      loadSlide = !1;
      vars.current_slide == r.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;
      var o = r.el + " li:eq(" + loadSlide + ")";
      if (!e(o).html()) {
        var u = r.options.new_window ? ' target="_blank"' : "";
        imageLink = r.options.slides[loadSlide].url ? "href='" + r.options.slides[loadSlide].url + "'" : "";
        var a = e('<img src="' + r.options.slides[loadSlide].image + '"/>');
        a.appendTo(o).wrap("<a " + imageLink + u + "></a>").parent().parent().addClass("image-loading").css("visibility", "hidden");
        a.load(function () {
          r._origDim(e(this));
          r.resizeNow()
        })
      }
      if (r.options.thumbnail_navigation == 1) {
        vars.current_slide - 1 < 0 ? prevThumb = r.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
        e(vars.prev_thumb).html(e("<img/>").attr("src", r.options.slides[prevThumb].image));
        nextThumb = loadSlide;
        e(vars.next_thumb).html(e("<img/>").attr("src", r.options.slides[nextThumb].image))
      }
      typeof theme != "undefined" && typeof theme.beforeAnimation == "function" && theme.beforeAnimation("next");
      if (r.options.slide_links) {
        e(".current-slide").removeClass("current-slide");
        e(vars.slide_list + "> li").eq(vars.current_slide).addClass("current-slide")
      }
      i.css("visibility", "hidden").addClass("activeslide");
      switch (r.options.transition) {
        case 0:
        case "none":
          i.css("visibility", "visible");
          vars.in_animation = !1;
          r.afterAnimation();
          break;
        case 1:
        case "fade":
          i.css({
            opacity: 0,
            visibility: "visible"
          }).animate({
            opacity: 1,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 2:
        case "slideTop":
          i.css({
            top: -r.$el.height(),
            visibility: "visible"
          }).animate({
            top: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 3:
        case "slideRight":
          i.css({
            left: r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 4:
        case "slideBottom":
          i.css({
            top: r.$el.height(),
            visibility: "visible"
          }).animate({
            top: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 5:
        case "slideLeft":
          i.css({
            left: -r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 6:
        case "carouselRight":
          i.css({
            left: r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          n.animate({
            left: -r.$el.width(),
            avoidTransforms: !1
          }, r.options.transition_speed);
          break;
        case 7:
        case "carouselLeft":
          i.css({
            left: -r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          n.animate({
            left: r.$el.width(),
            avoidTransforms: !1
          }, r.options.transition_speed)
      }
      return !1
    };
    r.prevSlide = function () {
      if (vars.in_animation || !api.options.slideshow) return !1;
      vars.in_animation = !0;
      clearInterval(vars.slideshow_interval);
      var t = r.options.slides,
        n = r.$el.find(".activeslide");
      e(".prevslide").removeClass("prevslide");
      n.removeClass("activeslide").addClass("prevslide");
      vars.current_slide == 0 ? vars.current_slide = r.options.slides.length - 1 : vars.current_slide--;
      var i = e(r.el + " li:eq(" + vars.current_slide + ")"),
        s = r.$el.find(".prevslide");
      r.options.performance == 1 && r.$el.removeClass("quality").addClass("speed");
      loadSlide = vars.current_slide;
      var o = r.el + " li:eq(" + loadSlide + ")";
      if (!e(o).html()) {
        var u = r.options.new_window ? ' target="_blank"' : "";
        imageLink = r.options.slides[loadSlide].url ? "href='" + r.options.slides[loadSlide].url + "'" : "";
        var a = e('<img src="' + r.options.slides[loadSlide].image + '"/>');
        a.appendTo(o).wrap("<a " + imageLink + u + "></a>").parent().parent().addClass("image-loading").css("visibility", "hidden");
        a.load(function () {
          r._origDim(e(this));
          r.resizeNow()
        })
      }
      if (r.options.thumbnail_navigation == 1) {
        loadSlide == 0 ? prevThumb = r.options.slides.length - 1 : prevThumb = loadSlide - 1;
        e(vars.prev_thumb).html(e("<img/>").attr("src", r.options.slides[prevThumb].image));
        vars.current_slide == r.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
        e(vars.next_thumb).html(e("<img/>").attr("src", r.options.slides[nextThumb].image))
      }
      typeof theme != "undefined" && typeof theme.beforeAnimation == "function" && theme.beforeAnimation("prev");
      if (r.options.slide_links) {
        e(".current-slide").removeClass("current-slide");
        e(vars.slide_list + "> li").eq(vars.current_slide).addClass("current-slide")
      }
      i.css("visibility", "hidden").addClass("activeslide");
      switch (r.options.transition) {
        case 0:
        case "none":
          i.css("visibility", "visible");
          vars.in_animation = !1;
          r.afterAnimation();
          break;
        case 1:
        case "fade":
          i.css({
            opacity: 0,
            visibility: "visible"
          }).animate({
            opacity: 1,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 2:
        case "slideTop":
          i.css({
            top: r.$el.height(),
            visibility: "visible"
          }).animate({
            top: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 3:
        case "slideRight":
          i.css({
            left: -r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 4:
        case "slideBottom":
          i.css({
            top: -r.$el.height(),
            visibility: "visible"
          }).animate({
            top: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 5:
        case "slideLeft":
          i.css({
            left: r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          break;
        case 6:
        case "carouselRight":
          i.css({
            left: -r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          n.css({
            left: 0
          }).animate({
            left: r.$el.width(),
            avoidTransforms: !1
          }, r.options.transition_speed);
          break;
        case 7:
        case "carouselLeft":
          i.css({
            left: r.$el.width(),
            visibility: "visible"
          }).animate({
            left: 0,
            avoidTransforms: !1
          }, r.options.transition_speed, function () {
            r.afterAnimation()
          });
          n.css({
            left: 0
          }).animate({
            left: -r.$el.width(),
            avoidTransforms: !1
          }, r.options.transition_speed)
      }
      return !1
    };
    r.playToggle = function () {
      if (vars.in_animation || !api.options.slideshow) return !1;
      if (vars.is_paused) {
        vars.is_paused = !1;
        typeof theme != "undefined" && typeof theme.playToggle == "function" && theme.playToggle("play");
        vars.slideshow_interval = setInterval(r.nextSlide, r.options.slide_interval)
      } else {
        vars.is_paused = !0;
        typeof theme != "undefined" && typeof theme.playToggle == "function" && theme.playToggle("pause");
        clearInterval(vars.slideshow_interval)
      }
      return !1
    };
    r.goTo = function (t) {
      if (vars.in_animation || !api.options.slideshow) return !1;
      var n = r.options.slides.length;
      t < 0 ? t = n : t > n && (t = 1);
      t = n - t + 1;
      clearInterval(vars.slideshow_interval);
      typeof theme != "undefined" && typeof theme.goTo == "function" && theme.goTo();
      if (vars.current_slide == n - t) {
        vars.is_paused || (vars.slideshow_interval = setInterval(r.nextSlide, r.options.slide_interval));
        return !1
      }
      if (n - t > vars.current_slide) {
        vars.current_slide = n - t - 1;
        vars.update_images = "next";
        r._placeSlide(vars.update_images)
      } else if (n - t < vars.current_slide) {
        vars.current_slide = n - t + 1;
        vars.update_images = "prev";
        r._placeSlide(vars.update_images)
      }
      if (r.options.slide_links) {
        e(vars.slide_list + "> .current-slide").removeClass("current-slide");
        e(vars.slide_list + "> li").eq(n - t).addClass("current-slide")
      }
      if (r.options.thumb_links) {
        e(vars.thumb_list + "> .current-thumb").removeClass("current-thumb");
        e(vars.thumb_list + "> li").eq(n - t).addClass("current-thumb")
      }
    };
    r._placeSlide = function (t) {
      var n = r.options.new_window ? ' target="_blank"' : "";
      loadSlide = !1;
      if (t == "next") {
        vars.current_slide == r.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;
        var i = r.el + " li:eq(" + loadSlide + ")";
        if (!e(i).html()) {
          var n = r.options.new_window ? ' target="_blank"' : "";
          imageLink = r.options.slides[loadSlide].url ? "href='" + r.options.slides[loadSlide].url + "'" : "";
          var s = e('<img src="' + r.options.slides[loadSlide].image + '"/>');
          s.appendTo(i).wrap("<a " + imageLink + n + "></a>").parent().parent().addClass("image-loading").css("visibility", "hidden");
          s.load(function () {
            r._origDim(e(this));
            r.resizeNow()
          })
        }
        r.nextSlide()
      } else if (t == "prev") {
        vars.current_slide - 1 < 0 ? loadSlide = r.options.slides.length - 1 : loadSlide = vars.current_slide - 1;
        var i = r.el + " li:eq(" + loadSlide + ")";
        if (!e(i).html()) {
          var n = r.options.new_window ? ' target="_blank"' : "";
          imageLink = r.options.slides[loadSlide].url ? "href='" + r.options.slides[loadSlide].url + "'" : "";
          var s = e('<img src="' + r.options.slides[loadSlide].image + '"/>');
          s.appendTo(i).wrap("<a " + imageLink + n + "></a>").parent().parent().addClass("image-loading").css("visibility", "hidden");
          s.load(function () {
            r._origDim(e(this));
            r.resizeNow()
          })
        }
        r.prevSlide()
      }
    };
    r._origDim = function (e) {
      e.data("origWidth", e.width()).data("origHeight", e.height())
    };
    r.afterAnimation = function () {
      r.options.performance == 1 && r.$el.removeClass("speed").addClass("quality");
      if (vars.update_images) {
        vars.current_slide - 1 < 0 ? setPrev = r.options.slides.length - 1 : setPrev = vars.current_slide - 1;
        vars.update_images = !1;
        e(".prevslide").removeClass("prevslide");
        e(r.el + " li:eq(" + setPrev + ")").addClass("prevslide")
      }
      vars.in_animation = !1;
      if (!vars.is_paused && r.options.slideshow) {
        vars.slideshow_interval = setInterval(r.nextSlide, r.options.slide_interval);
        r.options.stop_loop && vars.current_slide == r.options.slides.length - 1 && r.playToggle()
      }
      typeof theme != "undefined" && typeof theme.afterAnimation == "function" && theme.afterAnimation();
      return !1
    };
    r.getField = function (e) {
      return r.options.slides[vars.current_slide][e]
    };
    r.init()
  };
  e.supersized.vars = {
    thumb_tray: "#thumb-tray",
    thumb_list: "#thumb-list",
    slide_list: "#slide-list",
    current_slide: 0,
    in_animation: !1,
    is_paused: !1,
    hover_pause: !1,
    slideshow_interval: !1,
    update_images: !1,
    options: {}
  };
  e.supersized.defaultOptions = {
    slideshow: 1,
    autoplay: 1,
    start_slide: 1,
    stop_loop: 0,
    random: 0,
    slide_interval: 5e3,
    transition: 1,
    transition_speed: 750,
    new_window: 1,
    pause_hover: 0,
    keyboard_nav: 1,
    performance: 1,
    image_protect: 1,
    fit_always: 0,
    fit_landscape: 0,
    fit_portrait: 1,
    min_width: 0,
    min_height: 0,
    horizontal_center: 1,
    vertical_center: 1,
    slide_links: 1,
    thumb_links: 1,
    thumbnail_navigation: 0
  };
  e.fn.supersized = function (t) {
    return this.each(function () {
      new e.supersized(t)
    })
  }
})(jQuery);


/*
 *  Vide - v0.4.1
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
! function (a, b) {
  "function" == typeof define && define.amd ? define(["jquery"], b) : b("object" == typeof exports ? require("jquery") : a.jQuery)
}(this, function (a) {
  "use strict";

  function b(a) {
    var b, c, d, e, f, g, h, i = {};
    for (f = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), h = 0, g = f.length; g > h && (c = f[h], -1 === c.search(/^(http|https|ftp):\/\//) && -1 !== c.search(":")); h++) b = c.indexOf(":"), d = c.substring(0, b), e = c.substring(b + 1), e || (e = void 0), "string" == typeof e && (e = "true" === e || ("false" === e ? !1 : e)), "string" == typeof e && (e = isNaN(e) ? e : +e), i[d] = e;
    return null == d && null == e ? a : i
  }

  function c(a) {
    a = "" + a;
    var b, c, d, e = a.split(/\s+/),
      f = "50%",
      g = "50%";
    for (d = 0, b = e.length; b > d; d++) c = e[d], "left" === c ? f = "0%" : "right" === c ? f = "100%" : "top" === c ? g = "0%" : "bottom" === c ? g = "100%" : "center" === c ? 0 === d ? f = "50%" : g = "50%" : 0 === d ? f = c : g = c;
    return {
      x: f,
      y: g
    }
  }

  function d(b, c) {
    var d = function () {
      c(this.src)
    };
    a('<img src="' + b + '.gif">').load(d), a('<img src="' + b + '.jpg">').load(d), a('<img src="' + b + '.jpeg">').load(d), a('<img src="' + b + '.png">').load(d)
  }

  function e(c, d, e) {
    if (this.$element = a(c), "string" == typeof d && (d = b(d)), e ? "string" == typeof e && (e = b(e)) : e = {}, "string" == typeof d) d = d.replace(/\.\w*$/, "");
    else if ("object" == typeof d)
      for (var f in d) d.hasOwnProperty(f) && (d[f] = d[f].replace(/\.\w*$/, ""));
    this.settings = a.extend({}, g, e), this.path = d;
    try {
      this.init()
    } catch (i) {
      if (i.message !== h) throw i
    }
  }
  var f = "vide",
    g = {
      volume: 1,
      playbackRate: 1,
      muted: !0,
      loop: !0,
      autoplay: !0,
      position: "50% 50%",
      posterType: "detect",
      resizing: !0,
      bgColor: "transparent"
    },
    h = "Not implemented";
  e.prototype.init = function () {
    var b, e, g = this,
      i = g.path,
      j = i,
      k = "",
      l = g.$element,
      m = g.settings,
      n = c(m.position),
      o = m.posterType;
    e = g.$wrapper = a("<div>").css({
      position: "absolute",
      "z-index": -1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      overflow: "hidden",
      "-webkit-background-size": "cover",
      "-moz-background-size": "cover",
      "-o-background-size": "cover",
      "background-size": "cover",
      "background-color": m.bgColor,
      "background-repeat": "no-repeat",
      "background-position": n.x + " " + n.y
    }), "object" == typeof i && (i.poster ? j = i.poster : i.mp4 ? j = i.mp4 : i.webm ? j = i.webm : i.ogv && (j = i.ogv)), "detect" === o ? d(j, function (a) {
      e.css("background-image", "url(" + a + ")")
    }) : "none" !== o && e.css("background-image", "url(" + j + "." + o + ")"), "static" === l.css("position") && l.css("position", "relative"), l.prepend(e), "object" == typeof i ? (i.mp4 && (k += '<source src="' + i.mp4 + '.mp4" type="video/mp4">'), i.webm && (k += '<source src="' + i.webm + '.webm" type="video/webm">'), i.ogv && (k += '<source src="' + i.ogv + '.ogv" type="video/ogg">'), b = g.$video = a("<video>" + k + "</video>")) : b = g.$video = a('<video><source src="' + i + '.mp4" type="video/mp4"><source src="' + i + '.webm" type="video/webm"><source src="' + i + '.ogv" type="video/ogg"></video>');
    try {
      b.prop({
        autoplay: m.autoplay,
        loop: m.loop,
        volume: m.volume,
        muted: m.muted,
        defaultMuted: m.muted,
        playbackRate: m.playbackRate,
        defaultPlaybackRate: m.playbackRate
      })
    } catch (p) {
      throw new Error(h)
    }
    b.css({
      margin: "auto",
      position: "absolute",
      "z-index": -1,
      top: n.y,
      left: n.x,
      "-webkit-transform": "translate(-" + n.x + ", -" + n.y + ")",
      "-ms-transform": "translate(-" + n.x + ", -" + n.y + ")",
      "-moz-transform": "translate(-" + n.x + ", -" + n.y + ")",
      transform: "translate(-" + n.x + ", -" + n.y + ")",
      visibility: "hidden",
      opacity: 0
    }).one("canplaythrough." + f, function () {
      g.resize()
    }).one("playing." + f, function () {
      b.css({
        visibility: "visible",
        opacity: 1
      }), e.css("background-image", "none")
    }), l.on("resize." + f, function () {
      m.resizing && g.resize()
    }), e.append(b)
  }, e.prototype.getVideoObject = function () {
    return this.$video[0]
  }, e.prototype.resize = function () {
    if (this.$video) {
      var a = this.$wrapper,
        b = this.$video,
        c = b[0],
        d = c.videoHeight,
        e = c.videoWidth,
        f = a.height(),
        g = a.width();
      g / e > f / d ? b.css({
        width: g + 2,
        height: "auto"
      }) : b.css({
        width: "auto",
        height: f + 2
      })
    }
  }, e.prototype.destroy = function () {
    delete a[f].lookup[this.index], this.$video && this.$video.off(f), this.$element.off(f).removeData(f), this.$wrapper.remove()
  }, a[f] = {
    lookup: []
  }, a.fn[f] = function (b, c) {
    var d;
    return this.each(function () {
      d = a.data(this, f), d && d.destroy(), d = new e(this, b, c), d.index = a[f].lookup.push(d) - 1, a.data(this, f, d)
    }), this
  }, a(document).ready(function () {
    var b = a(window);
    b.on("resize." + f, function () {
      for (var b, c = a[f].lookup.length, d = 0; c > d; d++) b = a[f].lookup[d], b && b.settings.resizing && b.resize()
    }), b.on("unload." + f, function () {
      return !1
    }), a(document).find("[data-" + f + "-bg]").each(function (b, c) {
      var d = a(c),
        e = d.data(f + "-options"),
        g = d.data(f + "-bg");
      d[f](g, e)
    })
  })
});


/*jquery.mb.YTPlayer 08-12-2015
 _ jquery.mb.components 
 _ email: matteo@open-lab.com 
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi); 
 _ blog: http://pupunzi.open-lab.com 
 _ Open Lab s.r.l., Florence - Italy 
 */
function onYouTubeIframeAPIReady() {
  ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(a) {
  return a.replace(/([A-Z])/g, function (a) {
    return "-" + a.toLowerCase()
  })
}

function setUnit(a, b) {
  return "string" != typeof a || a.match(/^[\-0-9\.]+jQuery/) ? "" + a + b : a
}

function setFilter(a, b, c) {
  var d = uncamel(b),
    e = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
  a[e + "filter"] = a[e + "filter"] || "", c = setUnit(c > jQuery.CSS.filters[b].max ? jQuery.CSS.filters[b].max : c, jQuery.CSS.filters[b].unit), a[e + "filter"] += d + "(" + c + ") ", delete a[b]
}
var ytp = ytp || {},
  getYTPVideoID = function (a) {
    var b, c;
    return a.indexOf("youtu.be") > 0 ? (b = a.substr(a.lastIndexOf("/") + 1, a.length), c = b.indexOf("?list=") > 0 ? b.substr(b.lastIndexOf("="), b.length) : null, b = c ? b.substr(0, b.lastIndexOf("?")) : b) : a.indexOf("http") > -1 ? (b = a.match(/[\\?&]v=([^&#]*)/)[1], c = a.indexOf("list=") > 0 ? a.match(/[\\?&]list=([^&#]*)/)[1] : null) : (b = a.length > 15 ? null : a, c = b ? null : a), {
      videoID: b,
      playlistID: c
    }
  };
! function (jQuery, ytp) {
  jQuery.mbYTPlayer = {
    name: "jquery.mb.YTPlayer",
    version: "2.9.7",
    build: "5748",
    author: "Matteo Bicocchi",
    apiKey: "",
    defaults: {
      containment: "body",
      ratio: "auto",
      videoURL: null,
      playlistURL: null,
      startAt: 0,
      stopAt: 0,
      autoPlay: !0,
      vol: 50,
      addRaster: !1,
      opacity: 1,
      quality: "default",
      mute: !1,
      loop: !0,
      showControls: !0,
      showAnnotations: !1,
      showYTLogo: !0,
      stopMovieOnBlur: !0,
      realfullscreen: !0,
      gaTrack: !0,
      optimizeDisplay: !0,
      onReady: function (a) {}
    },
    controls: {
      play: "P",
      pause: "p",
      mute: "M",
      unmute: "A",
      onlyYT: "O",
      showSite: "R",
      ytLogo: "Y"
    },
    locationProtocol: "https:",
    buildPlayer: function (options) {
      return this.each(function () {
        var YTPlayer = this,
          $YTPlayer = jQuery(YTPlayer);
        YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filtersEnabled = !0, YTPlayer.filters = {
          grayscale: {
            value: 0,
            unit: "%"
          },
          hue_rotate: {
            value: 0,
            unit: "deg"
          },
          invert: {
            value: 0,
            unit: "%"
          },
          opacity: {
            value: 0,
            unit: "%"
          },
          saturate: {
            value: 0,
            unit: "%"
          },
          sepia: {
            value: 0,
            unit: "%"
          },
          brightness: {
            value: 0,
            unit: "%"
          },
          contrast: {
            value: 0,
            unit: "%"
          },
          blur: {
            value: 0,
            unit: "px"
          }
        }, $YTPlayer.addClass("mb_YTPlayer");
        var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
        "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options, property)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
        var isIframe = function () {
          var a = !1;
          try {
            self.location.href != top.location.href && (a = !0)
          } catch (b) {
            a = !0
          }
          return a
        };
        YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
        var playerID = "mbYTP_" + YTPlayer.id;
        YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
        var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1,
          playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1;
        YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
        var playerVars = {
          autoplay: 0,
          modestbranding: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          version: 3,
          playerapiid: playerID,
          origin: "*",
          allowfullscreen: !0,
          wmode: "transparent",
          iv_load_policy: YTPlayer.opt.showAnnotations
        };
        document.createElement("video").canPlayType && jQuery.extend(playerVars, {
          html5: 1
        }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1);
        var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox"),
          overlay = jQuery("<div/>").css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }).addClass("YTPOverlay");
        if (YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = "body" == YTPlayer.opt.containment.get(0).tagName.toLowerCase(), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
          var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
          if (YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide(), jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return void $YTPlayer.remove();
          var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
          if (wrapper.css({
              position: "absolute",
              zIndex: 0,
              minWidth: "100%",
              minHeight: "100%",
              left: 0,
              top: 0,
              overflow: "hidden",
              opacity: 0
            }), playerBox.css({
              position: "absolute",
              zIndex: 0,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              overflow: "hidden"
            }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
              "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
            }), YTPlayer.isBackground ? (jQuery("body").css({
              boxSizing: "border-box"
            }), wrapper.css({
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0
            }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({
              position: "relative"
            }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({
              opacity: 1
            }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
              YTPlayer.controlBar && YTPlayer.controlBar.addClass("visible")
            }).on("mouseleave", function () {
              YTPlayer.controlBar && YTPlayer.controlBar.removeClass("visible")
            }), ytp.YTAPIReady) setTimeout(function () {
            jQuery(document).trigger("YTAPIReady")
          }, 100);
          else {
            jQuery("#YTAPI").remove();
            var tag = jQuery("<script></script>").attr({
              src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
              id: "YTAPI"
            });
            jQuery("head").prepend(tag)
          }
          jQuery(document).on("YTAPIReady", function () {
            YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
              if (!YTPlayer.isInit) {
                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                  if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                    YTPlayer.opt.containment.css({
                      maxWidth: "100%"
                    });
                    var h = .6 * YTPlayer.opt.containment.outerWidth();
                    YTPlayer.opt.containment.css({
                      maxHeight: h
                    })
                  }
                  return void new YT.Player(playerID, {
                    videoId: YTPlayer.videoID.toString(),
                    height: "100%",
                    width: "100%",
                    events: {
                      onReady: function (a) {
                        YTPlayer.player = a.target, playerBox.css({
                          opacity: 1
                        }), YTPlayer.wrapper.css({
                          opacity: 1
                        })
                      }
                    }
                  })
                }
                new YT.Player(playerID, {
                  videoId: YTPlayer.videoID.toString(),
                  playerVars: playerVars,
                  events: {
                    onReady: function (a) {
                      YTPlayer.player = a.target, YTPlayer.isReady || (YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), $(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).on("resize.YTP", function () {
                        $YTPlayer.optimizeDisplay()
                      }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                    },
                    onStateChange: function (event) {
                      if ("function" == typeof event.target.getPlayerState) {
                        var state = event.target.getPlayerState();
                        if (YTPlayer.state != state) {
                          if (YTPlayer.preventTrigger) return void(YTPlayer.preventTrigger = !1);
                          YTPlayer.state = state;
                          var eventType;
                          switch (state) {
                            case -1:
                              eventType = "YTPUnstarted";
                              break;
                            case 0:
                              eventType = "YTPEnd";
                              break;
                            case 1:
                              eventType = "YTPPlay", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                              break;
                            case 2:
                              eventType = "YTPPause", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                              break;
                            case 3:
                              YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                              break;
                            case 5:
                              eventType = "YTPCued"
                          }
                          var YTPEvent = jQuery.Event(eventType);
                          YTPEvent.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                        }
                      }
                    },
                    onPlaybackQualityChange: function (a) {
                      var b = a.target.getPlaybackQuality(),
                        c = jQuery.Event("YTPQualityChange");
                      c.quality = b, jQuery(YTPlayer).trigger(c)
                    },
                    onError: function (a) {
                      150 == a.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == a.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, a)
                    }
                  }
                })
              }
            }))
          })
        }
      })
    },
    getDataFromAPI: function (a) {
      if (a.videoData = jQuery.mbStorage.get("YTPlayer_data_" + a.videoID), jQuery(a).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
          if (a.hasData && a.isPlayer && !a.opt.autoPlay) {
            var b = a.videoData.thumb_max || a.videoData.thumb_high || a.videoData.thumb_medium;
            a.opt.containment.css({
              background: "rgba(0,0,0,0.5) url(" + b + ") center center",
              backgroundSize: "cover"
            }), a.opt.backgroundUrl = b
          }
        }), a.videoData) setTimeout(function () {
        a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.dataReceived = !0, jQuery(a).trigger("YTPChanged");
        var b = jQuery.Event("YTPData");
        b.prop = {};
        for (var c in a.videoData) b.prop[c] = a.videoData[c];
        jQuery(a).trigger(b)
      }, 500), a.hasData = !0;
      else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + a.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (b) {
        function c(b) {
          a.videoData = {}, a.videoData.id = a.videoID, a.videoData.channelTitle = b.channelTitle, a.videoData.title = b.title, a.videoData.description = b.description.length < 400 ? b.description : b.description.substring(0, 400) + " ...", a.videoData.aspectratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.opt.ratio = a.videoData.aspectratio, a.videoData.thumb_max = b.thumbnails.maxres ? b.thumbnails.maxres.url : null, a.videoData.thumb_high = b.thumbnails.high ? b.thumbnails.high.url : null, a.videoData.thumb_medium = b.thumbnails.medium ? b.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + a.videoID, a.videoData)
        }
        a.dataReceived = !0, jQuery(a).trigger("YTPChanged"), c(b.items[0].snippet), a.hasData = !0;
        var d = jQuery.Event("YTPData");
        d.prop = {};
        for (var e in a.videoData) d.prop[e] = a.videoData[e];
        jQuery(a).trigger(d)
      });
      else {
        if (setTimeout(function () {
            jQuery(a).trigger("YTPChanged")
          }, 50), a.isPlayer && !a.opt.autoPlay) {
          var b = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + a.videoID + "/hqdefault.jpg";
          a.opt.containment.css({
            background: "rgba(0,0,0,0.5) url(" + b + ") center center",
            backgroundSize: "cover"
          }), a.opt.backgroundUrl = b
        }
        a.videoData = null, a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio
      }
      a.isPlayer && !a.opt.autoPlay && (a.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(a).append(a.loading), a.loading.fadeIn())
    },
    removeStoredData: function () {
      jQuery.mbStorage.remove()
    },
    getVideoData: function () {
      var a = this.get(0);
      return a.videoData
    },
    getVideoID: function () {
      var a = this.get(0);
      return a.videoID || !1
    },
    setVideoQuality: function (a) {
      var b = this.get(0);
      jQuery.browser.chrome || b.player.setPlaybackQuality(a)
    },
    playlist: function (a, b, c) {
      var d = this,
        e = d.get(0);
      return e.isPlayList = !0, b && (a = jQuery.shuffle(a)), e.videoID || (e.videos = a, e.videoCounter = 0, e.videoLength = a.length, jQuery(e).data("property", a[0]), jQuery(e).mb_YTPlayer()), "function" == typeof c && jQuery(e).one("YTPChanged", function () {
        c(e)
      }), jQuery(e).on("YTPEnd", function () {
        jQuery(e).playNext()
      }), d
    },
    playNext: function () {
      var a = this.get(0);
      return a.videoCounter++, a.videoCounter >= a.videoLength && (a.videoCounter = 0), jQuery(a).changeMovie(a.videos[a.videoCounter]), this
    },
    playPrev: function () {
      var a = this.get(0);
      return a.videoCounter--, a.videoCounter < 0 && (a.videoCounter = a.videoLength - 1), jQuery(a).changeMovie(a.videos[a.videoCounter]), this
    },
    changeMovie: function (a) {
      var b = this.get(0);
      b.opt.startAt = 0, b.opt.stopAt = 0, b.opt.mute = !0, b.hasData = !1, b.hasChanged = !0, b.player.LoopTime = void 0, a && jQuery.extend(b.opt, b.defaultOpt, a), b.videoID = getYTPVideoID(b.opt.videoURL).videoID, "true" == b.opt.loop && (b.opt.loop = 9999), jQuery(b.playerEl).CSSAnimate({
        opacity: 0
      }, 200, function () {
        var a = jQuery.Event("YTPChangeMovie");
        return a.time = b.player.time, a.videoId = b.videoID, jQuery(b).trigger(a), jQuery(b).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + b.videoID), 1, b.opt.quality), jQuery.mbYTPlayer.checkForState(b), jQuery(b).optimizeDisplay(), jQuery.mbYTPlayer.getDataFromAPI(b), this
      })
    },
    getPlayer: function () {
      return jQuery(this).get(0).player
    },
    playerDestroy: function () {
      var a = this.get(0);
      ytp.YTAPIReady = !1, ytp.backgroundIsInited = !1, a.isInit = !1, a.videoID = null;
      var b = a.wrapper;
      return b.remove(), jQuery("#controlBar_" + a.id).remove(), clearInterval(a.checkForStartAt), clearInterval(a.getState), this
    },
    fullscreen: function (real) {
      function hideMouse() {
        YTPlayer.overlay.css({
          cursor: "none"
        })
      }

      function RunPrefixMethod(a, b) {
        for (var c, d, e = ["webkit", "moz", "ms", "o", ""], f = 0; f < e.length && !a[c];) {
          if (c = b, "" == e[f] && (c = c.substr(0, 1).toLowerCase() + c.substr(1)), c = e[f] + c, d = typeof a[c], "undefined" != d) return e = [e[f]], "function" == d ? a[c]() : a[c];
          f++
        }
      }

      function launchFullscreen(a) {
        RunPrefixMethod(a, "RequestFullScreen")
      }

      function cancelFullscreen() {
        (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
      }
      var YTPlayer = this.get(0);
      "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
      var controls = jQuery("#controlBar_" + YTPlayer.id),
        fullScreenBtn = controls.find(".mb_OnlyYT"),
        videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
      if (real) {
        var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
        jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
          var a = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
          a ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("fullscreen"), videoWrapper.CSSAnimate({
            opacity: YTPlayer.opt.opacity
          }, 500), videoWrapper.css({
            zIndex: 0
          }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
        })
      }
      return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), YTPlayer.overlay.css({
        cursor: "auto"
      }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
        opacity: YTPlayer.opt.opacity
      }, 500), videoWrapper.css({
        zIndex: 0
      })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (a) {
        YTPlayer.overlay.css({
          cursor: "auto"
        }), clearTimeout(YTPlayer.hideCursor), jQuery(a.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
      }), hideMouse(), real ? (videoWrapper.css({
        opacity: 0
      }), videoWrapper.addClass("fullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
        videoWrapper.CSSAnimate({
          opacity: 1
        }, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
      }, 500)) : videoWrapper.css({
        zIndex: 1e4
      }).CSSAnimate({
        opacity: 1
      }, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
    },
    toggleLoops: function () {
      var a = this.get(0),
        b = a.opt;
      return 1 == b.loop ? b.loop = 0 : (b.startAt ? a.player.seekTo(b.startAt) : a.player.playVideo(), b.loop = 1), this
    },
    play: function () {
      var a = this.get(0);
      if (a.isReady) return a.player.playVideo(), a.wrapper.CSSAnimate({
        opacity: a.isAlone ? 1 : a.opt.opacity
      }, 2e3), jQuery(a.playerEl).CSSAnimate({
        opacity: 1
      }, 1e3), jQuery(a).css("background-image", "none"), this
    },
    togglePlay: function (a) {
      var b = this.get(0);
      return 1 == b.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof a && a(b.state), this
    },
    stop: function () {
      var a = this.get(0),
        b = jQuery("#controlBar_" + a.id),
        c = b.find(".mb_YTPPlaypause");
      return c.html(jQuery.mbYTPlayer.controls.play), a.player.stopVideo(), this
    },
    pause: function () {
      var a = this.get(0);
      return a.player.pauseVideo(), this
    },
    seekTo: function (a) {
      var b = this.get(0);
      return b.player.seekTo(a, !0), this
    },
    setVolume: function (a) {
      var b = this.get(0);
      return a || b.opt.vol || 0 != b.player.getVolume() ? !a && b.player.getVolume() > 0 || a && b.opt.vol == a ? b.isMute ? jQuery(b).YTPUnmute() : jQuery(b).YTPMute() : (b.opt.vol = a, b.player.setVolume(b.opt.vol), b.volumeBar && b.volumeBar.length && b.volumeBar.updateSliderVal(a)) : jQuery(b).YTPUnmute(), this
    },
    mute: function () {
      var a = this.get(0);
      if (!a.isMute) {
        a.player.mute(), a.isMute = !0, a.player.setVolume(0), a.volumeBar && a.volumeBar.length && a.volumeBar.width() > 10 && a.volumeBar.updateSliderVal(0);
        var b = jQuery("#controlBar_" + a.id),
          c = b.find(".mb_YTPMuteUnmute");
        c.html(jQuery.mbYTPlayer.controls.unmute), jQuery(a).addClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.addClass("muted");
        var d = jQuery.Event("YTPMuted");
        return d.time = a.player.time, a.canTrigger && jQuery(a).trigger(d), this
      }
    },
    unmute: function () {
      var a = this.get(0);
      if (a.isMute) {
        a.player.unMute(), a.isMute = !1, a.player.setVolume(a.opt.vol), a.volumeBar && a.volumeBar.length && a.volumeBar.updateSliderVal(a.opt.vol > 10 ? a.opt.vol : 10);
        var b = jQuery("#controlBar_" + a.id),
          c = b.find(".mb_YTPMuteUnmute");
        c.html(jQuery.mbYTPlayer.controls.mute), jQuery(a).removeClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.removeClass("muted");
        var d = jQuery.Event("YTPUnmuted");
        return d.time = a.player.time, a.canTrigger && jQuery(a).trigger(d), this
      }
    },
    applyFilter: function (a, b) {
      var c = this.get(0);
      return c.filters[a].value = b, c.filtersEnabled && this.YTPEnableFilters(), this
    },
    applyFilters: function (a) {
      var b = this.get(0);
      return this.on("YTPReady", function () {
        for (var c in a) b.filters[c].value = a[c], jQuery(b).YTPApplyFilter(c, a[c]);
        jQuery(b).trigger("YTPFiltersApplied")
      }), this
    },
    toggleFilter: function (a, b) {
      return this.each(function () {
        var c = this;
        c.filters[a].value ? c.filters[a].value = 0 : c.filters[a].value = b, c.filtersEnabled && jQuery(this).YTPEnableFilters()
      })
    },
    toggleFilters: function (a) {
      return this.each(function () {
        var b = this;
        b.filtersEnabled ? (jQuery(b).trigger("YTPDisableFilters"), jQuery(b).YTPDisableFilters()) : (jQuery(b).YTPEnableFilters(), jQuery(b).trigger("YTPEnableFilters")), "function" == typeof a && a(b.filtersEnabled)
      })
    },
    disableFilters: function () {
      return this.each(function () {
        var a = this,
          b = jQuery(a.playerEl);
        b.css("-webkit-filter", ""), b.css("filter", ""), a.filtersEnabled = !1
      })
    },
    enableFilters: function () {
      return this.each(function () {
        var a = this,
          b = jQuery(a.playerEl),
          c = "";
        for (var d in a.filters) a.filters[d].value && (c += d.replace("_", "-") + "(" + a.filters[d].value + a.filters[d].unit + ") ");
        b.css("-webkit-filter", c), b.css("filter", c), a.filtersEnabled = !0
      })
    },
    removeFilter: function (a, b) {
      return this.each(function () {
        "function" == typeof a && (b = a, a = null);
        var c = this;
        if (a) jQuery(this).YTPApplyFilter(a, 0), "function" == typeof b && b(a);
        else
          for (var d in c.filters) jQuery(this).YTPApplyFilter(d, 0), "function" == typeof b && b(d)
      })
    },
    manageProgress: function () {
      var a = this.get(0),
        b = jQuery("#controlBar_" + a.id),
        c = b.find(".mb_YTPProgress"),
        d = b.find(".mb_YTPLoaded"),
        e = b.find(".mb_YTPseekbar"),
        f = c.outerWidth(),
        g = Math.floor(a.player.getCurrentTime()),
        h = Math.floor(a.player.getDuration()),
        i = g * f / h,
        j = 0,
        k = 100 * a.player.getVideoLoadedFraction();
      return d.css({
        left: j,
        width: k + "%"
      }), e.css({
        left: 0,
        width: i
      }), {
        totalTime: h,
        currentTime: g
      }
    },
    buildControls: function (YTPlayer) {
      var data = YTPlayer.opt;
      if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
        YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
          whiteSpace: "noWrap",
          position: YTPlayer.isBackground ? "fixed" : "absolute",
          zIndex: YTPlayer.isBackground ? 1e4 : 1e3
        }).hide();
        var buttonBar = jQuery("<div/>").addClass("buttonBar"),
          playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
            1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
          }),
          MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
            0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
          }),
          volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
            display: "inline-block"
          });
        YTPlayer.volumeBar = volumeBar;
        var idx = jQuery("<span/>").addClass("mb_YTPTime"),
          vURL = data.videoURL ? data.videoURL : "";
        vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
        var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
            window.open(vURL, "viewOnYT")
          }),
          onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
            jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
          }),
          progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (a) {
            timeBar.css({
              width: a.clientX - timeBar.offset().left
            }), YTPlayer.timeW = a.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({
              width: 0
            });
            var b = Math.floor(YTPlayer.player.getDuration());
            YTPlayer["goto"] = timeBar.outerWidth() * b / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({
              width: 0
            })
          }),
          loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
          timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
        progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
          initialval: YTPlayer.opt.vol,
          scale: 100,
          orientation: "h",
          callback: function (a) {
            0 == a.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(a.value), YTPlayer.isMute || (YTPlayer.opt.vol = a.value)
          }
        })
      }
    },
    checkForState: function (YTPlayer) {
      var interval = YTPlayer.opt.showControls ? 100 : 400;
      return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
        var prog = jQuery(YTPlayer).YTPManageProgress(),
          $YTPlayer = jQuery(YTPlayer),
          data = YTPlayer.opt,
          startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1,
          stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
        if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.player.time != prog.currentTime) {
          var YTPEvent = jQuery.Event("YTPTime");
          YTPEvent.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPEvent)
        }
        if (YTPlayer.player.time = prog.currentTime, 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
          if (YTPlayer.isEnded) return;
          if (YTPlayer.isEnded = !0, setTimeout(function () {
              YTPlayer.isEnded = !1
            }, 1e3), YTPlayer.isPlayList) {
            if (!data.loop || data.loop > 0 && YTPlayer.player.LoopTime === data.loop - 1) {
              YTPlayer.player.LoopTime = void 0, clearInterval(YTPlayer.getState);
              var YTPEnd = jQuery.Event("YTPEnd");
              return YTPEnd.time = YTPlayer.player.time, void jQuery(YTPlayer).trigger(YTPEnd)
            }
          } else if (!data.loop || data.loop > 0 && YTPlayer.player.LoopTime === data.loop - 1) return YTPlayer.player.LoopTime = void 0, YTPlayer.preventTrigger = !0, $(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({
            opacity: 0
          }, 1e3, function () {
            var a = jQuery.Event("YTPEnd");
            a.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(a), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({
              background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
              backgroundSize: "cover"
            })
          });
          YTPlayer.player.LoopTime = YTPlayer.player.LoopTime ? ++YTPlayer.player.LoopTime : 1, startAt = startAt || 1, YTPlayer.player.pauseVideo(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
        }
      }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
    },
    checkForStart: function (a) {
      var b = jQuery(a);
      if (!jQuery.contains(document, a)) return void jQuery(a).YTPPlayerDestroy();
      if (jQuery.browser.chrome && (a.opt.quality = "default"), jQuery(a).muteYTPVolume(), jQuery("#controlBar_" + a.id).remove(), a.opt.showControls && jQuery.mbYTPlayer.buildControls(a), a.opt.addRaster) {
        var c = "dot" == a.opt.addRaster ? "raster-dot" : "raster";
        a.overlay.addClass(a.isRetina ? c + " retina" : c)
      } else a.overlay.removeClass(function (a, b) {
        var c = b.split(" "),
          d = [];
        return jQuery.each(c, function (a, b) {
          /raster.*/.test(b) && d.push(b)
        }), d.push("retina"), d.join(" ")
      });
      a.checkForStartAt = setInterval(function () {
        jQuery(a).YTPMute();
        var c = a.opt.startAt ? a.opt.startAt : 1,
          d = a.player.getVideoLoadedFraction() > c / a.player.getDuration();
        if (a.player.getDuration() > 0 && a.player.getCurrentTime() >= c && d) {
          clearInterval(a.checkForStartAt), a.isReady = !0, "function" == typeof a.opt.onReady && a.opt.onReady(a);
          var e = jQuery.Event("YTPReady");
          if (e.time = a.player.time, jQuery(a).trigger(e), a.opt.mute || jQuery(a).YTPUnmute(), a.canTrigger = !0, a.opt.autoPlay) {
            b.YTPPlay();
            var f = jQuery.Event("YTPStart");
            f.time = a.player.time, jQuery(a).trigger(f), b.css("background-image", "none"), jQuery(a.playerEl).CSSAnimate({
              opacity: 1
            }, 1e3), a.wrapper.CSSAnimate({
              opacity: a.isAlone ? 1 : a.opt.opacity
            }, 1e3)
          } else a.player.pauseVideo(), a.isPlayer || (jQuery(a.playerEl).CSSAnimate({
            opacity: 1
          }, 1e3), a.wrapper.CSSAnimate({
            opacity: a.isAlone ? 1 : a.opt.opacity
          }, 1e3));
          a.isPlayer && !a.opt.autoPlay && (a.loading.html("Ready"), setTimeout(function () {
            a.loading.fadeOut()
          }, 100)), a.controlBar && a.controlBar.slideDown(1e3)
        } else c >= 0 && a.player.seekTo(c, !0)
      }, 1e3)
    },
    formatTime: function (a) {
      var b = Math.floor(a / 60),
        c = Math.floor(a - 60 * b);
      return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c)
    }
  }, jQuery.fn.toggleVolume = function () {
    var a = this.get(0);
    if (a) return a.player.isMuted() ? (jQuery(a).YTPUnmute(), !0) : (jQuery(a).YTPMute(), !1)
  }, jQuery.fn.optimizeDisplay = function () {
    var a = this.get(0),
      b = a.opt,
      c = jQuery(a.playerEl),
      d = {},
      e = a.wrapper;
    d.width = e.outerWidth(), d.height = e.outerHeight();
    var f = 24,
      g = 100,
      h = {};
    b.optimizeDisplay ? (h.width = d.width + d.width * f / 100, h.height = "16/9" == b.ratio ? Math.ceil(9 * d.width / 16) : Math.ceil(3 * d.width / 4), h.marginTop = -((h.height - d.height) / 2), h.marginLeft = -(d.width * (f / 2) / 100), h.height < d.height && (h.height = d.height + d.height * f / 100, h.width = "16/9" == b.ratio ? Math.floor(16 * d.height / 9) : Math.floor(4 * d.height / 3), h.marginTop = -(d.height * (f / 2) / 100), h.marginLeft = -((h.width - d.width) / 2)), h.width += g, h.height += g, h.marginTop -= g / 2, h.marginLeft -= g / 2) : (h.width = "100%", h.height = "100%", h.marginTop = 0, h.marginLeft = 0), c.css({
      width: h.width,
      height: h.height,
      marginTop: h.marginTop,
      marginLeft: h.marginLeft
    })
  }, jQuery.shuffle = function (a) {
    for (var b = a.slice(), c = b.length, d = c; d--;) {
      var e = parseInt(Math.random() * c),
        f = b[d];
      b[d] = b[e], b[e] = f
    }
    return b
  }, jQuery.fn.unselectable = function () {
    return this.each(function () {
      jQuery(this).css({
        "-moz-user-select": "none",
        "-webkit-user-select": "none",
        "user-select": "none"
      }).attr("unselectable", "on")
    })
  }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
  var a = document.body || document.documentElement,
    b = a.style;
  return void 0 !== b.transition || void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.MsTransition || void 0 !== b.OTransition
}(), jQuery.CSS = {
  name: "mb.CSSAnimate",
  author: "Matteo Bicocchi",
  version: "2.0.0",
  transitionEnd: "transitionEnd",
  sfx: "",
  filters: {
    blur: {
      min: 0,
      max: 100,
      unit: "px"
    },
    brightness: {
      min: 0,
      max: 400,
      unit: "%"
    },
    contrast: {
      min: 0,
      max: 400,
      unit: "%"
    },
    grayscale: {
      min: 0,
      max: 100,
      unit: "%"
    },
    hueRotate: {
      min: 0,
      max: 360,
      unit: "deg"
    },
    invert: {
      min: 0,
      max: 100,
      unit: "%"
    },
    saturate: {
      min: 0,
      max: 400,
      unit: "%"
    },
    sepia: {
      min: 0,
      max: 100,
      unit: "%"
    }
  },
  normalizeCss: function (a) {
    var b = jQuery.extend(!0, {}, a);
    jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
    for (var c in b) {
      "transform" === c && (b[jQuery.CSS.sfx + "transform"] = b[c], delete b[c]), "transform-origin" === c && (b[jQuery.CSS.sfx + "transform-origin"] = a[c], delete b[c]), "filter" !== c || jQuery.browser.mozilla || (b[jQuery.CSS.sfx + "filter"] = a[c], delete b[c]), "blur" === c && setFilter(b, "blur", a[c]), "brightness" === c && setFilter(b, "brightness", a[c]), "contrast" === c && setFilter(b, "contrast", a[c]), "grayscale" === c && setFilter(b, "grayscale", a[c]), "hueRotate" === c && setFilter(b, "hueRotate", a[c]), "invert" === c && setFilter(b, "invert", a[c]), "saturate" === c && setFilter(b, "saturate", a[c]), "sepia" === c && setFilter(b, "sepia", a[c]);
      var d = "";
      "x" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateX(" + setUnit(a[c], "px") + ")", delete b[c]), "y" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateY(" + setUnit(a[c], "px") + ")", delete b[c]), "z" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateZ(" + setUnit(a[c], "px") + ")", delete b[c]), "rotate" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotate(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateX(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateY(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateZ(" + setUnit(a[c], "deg") + ")", delete b[c]), "scale" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scale(" + setUnit(a[c], "") + ")", delete b[c]), "scaleX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleX(" + setUnit(a[c], "") + ")", delete b[c]), "scaleY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleY(" + setUnit(a[c], "") + ")", delete b[c]), "scaleZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleZ(" + setUnit(a[c], "") + ")", delete b[c]), "skew" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skew(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewX(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewY(" + setUnit(a[c], "deg") + ")", delete b[c]), "perspective" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " perspective(" + setUnit(a[c], "px") + ")", delete b[c])
    }
    return b
  },
  getProp: function (a) {
    var b = [];
    for (var c in a) b.indexOf(c) < 0 && b.push(uncamel(c));
    return b.join(",")
  },
  animate: function (a, b, c, d, e) {
    return this.each(function () {
      function f() {
        g.called = !0, g.CSSAIsRunning = !1, h.off(jQuery.CSS.transitionEnd + "." + g.id), clearTimeout(g.timeout), h.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof e && e.apply(g), "function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)
      }
      var g = this,
        h = jQuery(this);
      g.id = g.id || "CSSA_" + (new Date).getTime();
      var i = i || {
        type: "noEvent"
      };
      if (g.CSSAIsRunning && g.eventType == i.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(g.CSSqueue = function () {
        h.CSSAnimate(a, b, c, d, e)
      });
      if (g.CSSqueue = null, g.eventType = i.type, 0 !== h.length && a) {
        if (a = jQuery.normalizeCss(a), g.CSSAIsRunning = !0, "function" == typeof b && (e = b, b = jQuery.fx.speeds._default), "function" == typeof c && (d = c, c = 0), "string" == typeof c && (e = c, c = 0), "function" == typeof d && (e = d, d = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof b)
          for (var j in jQuery.fx.speeds) {
            if (b == j) {
              b = jQuery.fx.speeds[j];
              break
            }
            b = jQuery.fx.speeds._default
          }
        if (b || (b = jQuery.fx.speeds._default), "string" == typeof e && (d = e, e = null), !jQuery.support.CSStransition) {
          for (var k in a) {
            if ("transform" === k && delete a[k], "filter" === k && delete a[k], "transform-origin" === k && delete a[k], "auto" === a[k] && delete a[k], "x" === k) {
              var l = a[k],
                m = "left";
              a[m] = l, delete a[k]
            }
            if ("y" === k) {
              var l = a[k],
                m = "top";
              a[m] = l, delete a[k]
            }("-ms-transform" === k || "-ms-filter" === k) && delete a[k]
          }
          return void h.delay(c).animate(a, b, e)
        }
        var n = {
          "default": "ease",
          "in": "ease-in",
          out: "ease-out",
          "in-out": "ease-in-out",
          snap: "cubic-bezier(0,1,.5,1)",
          easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
          easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
          easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
          easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
          easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
          easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
          easeOutExpo: "cubic-bezier(.19,1,.22,1)",
          easeInOutExpo: "cubic-bezier(1,0,0,1)",
          easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
          easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
          easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
          easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
          easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
          easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
          easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
          easeOutQuint: "cubic-bezier(.23,1,.32,1)",
          easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
          easeInSine: "cubic-bezier(.47,0,.745,.715)",
          easeOutSine: "cubic-bezier(.39,.575,.565,1)",
          easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
          easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
          easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
          easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        };
        n[d] && (d = n[d]), h.off(jQuery.CSS.transitionEnd + "." + g.id);
        var o = jQuery.CSS.getProp(a),
          p = {};
        jQuery.extend(p, a), p[jQuery.CSS.sfx + "transition-property"] = o, p[jQuery.CSS.sfx + "transition-duration"] = b + "ms", p[jQuery.CSS.sfx + "transition-delay"] = c + "ms", p[jQuery.CSS.sfx + "transition-timing-function"] = d, setTimeout(function () {
          h.one(jQuery.CSS.transitionEnd + "." + g.id, f), h.css(p)
        }, 1), g.timeout = setTimeout(function () {
          return g.called || !e ? (g.called = !1, void(g.CSSAIsRunning = !1)) : (h.css(jQuery.CSS.sfx + "transition", ""), e.apply(g), g.CSSAIsRunning = !1, void("function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)))
        }, b + c + 10)
      }
    })
  }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (a) {
  return this.each(function () {
    var b = jQuery(this),
      c = jQuery.normalizeCss(a);
    b.css(c)
  })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
  jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;
  if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
  else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
  else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
  else if (-1 != nAgt.indexOf("Trident")) {
    jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
    var start = nAgt.indexOf("rv:") + 3,
      end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end)
  } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), ! function (a) {
  /iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());
  var b = "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1;
  a.simpleSlider = {
    defaults: {
      initialval: 0,
      scale: 100,
      orientation: "h",
      readonly: !1,
      callback: !1
    },
    events: {
      start: b ? "touchstart" : "mousedown",
      end: b ? "touchend" : "mouseup",
      move: b ? "touchmove" : "mousemove"
    },
    init: function (c) {
      return this.each(function () {
        var d = this,
          e = a(d);
        e.addClass("simpleSlider"), d.opt = {}, a.extend(d.opt, a.simpleSlider.defaults, c), a.extend(d.opt, e.data());
        var f = "h" == d.opt.orientation ? "horizontal" : "vertical",
          g = a("<div/>").addClass("level").addClass(f);
        e.prepend(g), d.level = g, e.css({
          cursor: "default"
        }), "auto" == d.opt.scale && (d.opt.scale = a(d).outerWidth()), e.updateSliderVal(), d.opt.readonly || (e.on(a.simpleSlider.events.start, function (a) {
          b && (a = a.changedTouches[0]), d.canSlide = !0, e.updateSliderVal(a), e.css({
            cursor: "col-resize"
          }), a.preventDefault(), a.stopPropagation()
        }), a(document).on(a.simpleSlider.events.move, function (c) {
          b && (c = c.changedTouches[0]), d.canSlide && (a(document).css({
            cursor: "default"
          }), e.updateSliderVal(c), c.preventDefault(), c.stopPropagation())
        }).on(a.simpleSlider.events.end, function () {
          a(document).css({
            cursor: "auto"
          }), d.canSlide = !1, e.css({
            cursor: "auto"
          })
        }))
      })
    },
    updateSliderVal: function (b) {
      function c(a, b) {
        return Math.floor(100 * a / b)
      }
      var d = this,
        e = d.get(0);
      e.opt.initialval = "number" == typeof e.opt.initialval ? e.opt.initialval : e.opt.initialval(e);
      var f = a(e).outerWidth(),
        g = a(e).outerHeight();
      e.x = "object" == typeof b ? b.clientX + document.body.scrollLeft - d.offset().left : "number" == typeof b ? b * f / e.opt.scale : e.opt.initialval * f / e.opt.scale, e.y = "object" == typeof b ? b.clientY + document.body.scrollTop - d.offset().top : "number" == typeof b ? (e.opt.scale - e.opt.initialval - b) * g / e.opt.scale : e.opt.initialval * g / e.opt.scale, e.y = d.outerHeight() - e.y, e.scaleX = e.x * e.opt.scale / f, e.scaleY = e.y * e.opt.scale / g, e.outOfRangeX = e.scaleX > e.opt.scale ? e.scaleX - e.opt.scale : e.scaleX < 0 ? e.scaleX : 0, e.outOfRangeY = e.scaleY > e.opt.scale ? e.scaleY - e.opt.scale : e.scaleY < 0 ? e.scaleY : 0, e.outOfRange = "h" == e.opt.orientation ? e.outOfRangeX : e.outOfRangeY, e.value = "undefined" != typeof b ? "h" == e.opt.orientation ? e.x >= d.outerWidth() ? e.opt.scale : e.x <= 0 ? 0 : e.scaleX : e.y >= d.outerHeight() ? e.opt.scale : e.y <= 0 ? 0 : e.scaleY : "h" == e.opt.orientation ? e.scaleX : e.scaleY, "h" == e.opt.orientation ? e.level.width(c(e.x, f) + "%") : e.level.height(c(e.y, g)), "function" == typeof e.opt.callback && e.opt.callback(e)
    }
  }, a.fn.simpleSlider = a.simpleSlider.init, a.fn.updateSliderVal = a.simpleSlider.updateSliderVal
}(jQuery), ! function (a) {
  a.mbCookie = {
    set: function (a, b, c, d) {
      b = JSON.stringify(b), c || (c = 7), d = d ? "; domain=" + d : "";
      var e, f = new Date;
      f.setTime(f.getTime() + 864e5 * c), e = "; expires=" + f.toGMTString(), document.cookie = a + "=" + b + e + "; path=/" + d
    },
    get: function (a) {
      for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d];
          " " == e.charAt(0);) e = e.substring(1, e.length);
        if (0 == e.indexOf(b)) return JSON.parse(e.substring(b.length, e.length))
      }
      return null
    },
    remove: function (b) {
      a.mbCookie.set(b, "", -1)
    }
  }, a.mbStorage = {
    set: function (a, b) {
      b = JSON.stringify(b), localStorage.setItem(a, b)
    },
    get: function (a) {
      return localStorage[a] ? JSON.parse(localStorage[a]) : null
    },
    remove: function (a) {
      a ? localStorage.removeItem(a) : localStorage.clear()
    }
  }
}(jQuery);


/*
 * jQuery FlexSlider v2.5.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function ($) {
  $.flexslider = function (e, t) {
    var a = $(e);
    a.vars = $.extend({}, $.flexslider.defaults, t);
    var n = a.vars.namespace,
      i = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      s = ("ontouchstart" in window || i || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch,
      r = "click touchend MSPointerUp keyup",
      o = "",
      l, c = "vertical" === a.vars.direction,
      d = a.vars.reverse,
      u = a.vars.itemWidth > 0,
      v = "fade" === a.vars.animation,
      p = "" !== a.vars.asNavFor,
      m = {},
      f = !0;
    $.data(e, "flexslider", a), m = {
      init: function () {
        a.animating = !1, a.currentSlide = parseInt(a.vars.startAt ? a.vars.startAt : 0, 10), isNaN(a.currentSlide) && (a.currentSlide = 0), a.animatingTo = a.currentSlide, a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last, a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" ")), a.slides = $(a.vars.selector, a), a.container = $(a.containerSelector, a), a.count = a.slides.length, a.syncExists = $(a.vars.sync).length > 0, "slide" === a.vars.animation && (a.vars.animation = "swing"), a.prop = c ? "top" : "marginLeft", a.args = {}, a.manualPause = !1, a.stopped = !1, a.started = !1, a.startTimeout = null, a.transitions = !a.vars.video && !v && a.vars.useCSS && function () {
          var e = document.createElement("div"),
            t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
          for (var n in t)
            if (void 0 !== e.style[t[n]]) return a.pfx = t[n].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0;
          return !1
        }(), a.ensureAnimationEnd = "", "" !== a.vars.controlsContainer && (a.controlsContainer = $(a.vars.controlsContainer).length > 0 && $(a.vars.controlsContainer)), "" !== a.vars.manualControls && (a.manualControls = $(a.vars.manualControls).length > 0 && $(a.vars.manualControls)), "" !== a.vars.customDirectionNav && (a.customDirectionNav = 2 === $(a.vars.customDirectionNav).length && $(a.vars.customDirectionNav)), a.vars.randomize && (a.slides.sort(function () {
          return Math.round(Math.random()) - .5
        }), a.container.empty().append(a.slides)), a.doMath(), a.setup("init"), a.vars.controlNav && m.controlNav.setup(), a.vars.directionNav && m.directionNav.setup(), a.vars.keyboard && (1 === $(a.containerSelector).length || a.vars.multipleKeyboard) && $(document).bind("keyup", function (e) {
          var t = e.keyCode;
          if (!a.animating && (39 === t || 37 === t)) {
            var n = 39 === t ? a.getTarget("next") : 37 === t ? a.getTarget("prev") : !1;
            a.flexAnimate(n, a.vars.pauseOnAction)
          }
        }), a.vars.mousewheel && a.bind("mousewheel", function (e, t, n, i) {
          e.preventDefault();
          var s = a.getTarget(0 > t ? "next" : "prev");
          a.flexAnimate(s, a.vars.pauseOnAction)
        }), a.vars.pausePlay && m.pausePlay.setup(), a.vars.slideshow && a.vars.pauseInvisible && m.pauseInvisible.init(), a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function () {
          a.manualPlay || a.manualPause || a.pause()
        }, function () {
          a.manualPause || a.manualPlay || a.stopped || a.play()
        }), a.vars.pauseInvisible && m.pauseInvisible.isHidden() || (a.vars.initDelay > 0 ? a.startTimeout = setTimeout(a.play, a.vars.initDelay) : a.play())), p && m.asNav.setup(), s && a.vars.touch && m.touch(), (!v || v && a.vars.smoothHeight) && $(window).bind("resize orientationchange focus", m.resize), a.find("img").attr("draggable", "false"), setTimeout(function () {
          a.vars.start(a)
        }, 200)
      },
      asNav: {
        setup: function () {
          a.asNav = !0, a.animatingTo = Math.floor(a.currentSlide / a.move), a.currentItem = a.currentSlide, a.slides.removeClass(n + "active-slide").eq(a.currentItem).addClass(n + "active-slide"), i ? (e._slider = a, a.slides.each(function () {
            var e = this;
            e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function (e) {
              e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
            }, !1), e.addEventListener("MSGestureTap", function (e) {
              e.preventDefault();
              var t = $(this),
                n = t.index();
              $(a.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (a.direction = a.currentItem < n ? "next" : "prev", a.flexAnimate(n, a.vars.pauseOnAction, !1, !0, !0))
            })
          })) : a.slides.on(r, function (e) {
            e.preventDefault();
            var t = $(this),
              i = t.index(),
              s = t.offset().left - $(a).scrollLeft();
            0 >= s && t.hasClass(n + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : $(a.vars.asNavFor).data("flexslider").animating || t.hasClass(n + "active-slide") || (a.direction = a.currentItem < i ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction, !1, !0, !0))
          })
        }
      },
      controlNav: {
        setup: function () {
          a.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
        },
        setupPaging: function () {
          var e = "thumbnails" === a.vars.controlNav ? "control-thumbs" : "control-paging",
            t = 1,
            i, s;
          if (a.controlNavScaffold = $('<ol class="' + n + "control-nav " + n + e + '"></ol>'), a.pagingCount > 1)
            for (var l = 0; l < a.pagingCount; l++) {
              if (s = a.slides.eq(l), i = "thumbnails" === a.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"/>' : "<a>" + t + "</a>", "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions) {
                var c = s.attr("data-thumbcaption");
                "" !== c && void 0 !== c && (i += '<span class="' + n + 'caption">' + c + "</span>")
              }
              a.controlNavScaffold.append("<li>" + i + "</li>"), t++
            }
          a.controlsContainer ? $(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), a.controlNavScaffold.delegate("a, img", r, function (e) {
            if (e.preventDefault(), "" === o || o === e.type) {
              var t = $(this),
                i = a.controlNav.index(t);
              t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction))
            }
            "" === o && (o = e.type), m.setToClearWatchedEvent()
          })
        },
        setupManual: function () {
          a.controlNav = a.manualControls, m.controlNav.active(), a.controlNav.bind(r, function (e) {
            if (e.preventDefault(), "" === o || o === e.type) {
              var t = $(this),
                i = a.controlNav.index(t);
              t.hasClass(n + "active") || (a.direction = i > a.currentSlide ? "next" : "prev", a.flexAnimate(i, a.vars.pauseOnAction))
            }
            "" === o && (o = e.type), m.setToClearWatchedEvent()
          })
        },
        set: function () {
          var e = "thumbnails" === a.vars.controlNav ? "img" : "a";
          a.controlNav = $("." + n + "control-nav li " + e, a.controlsContainer ? a.controlsContainer : a)
        },
        active: function () {
          a.controlNav.removeClass(n + "active").eq(a.animatingTo).addClass(n + "active")
        },
        update: function (e, t) {
          a.pagingCount > 1 && "add" === e ? a.controlNavScaffold.append($("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(t).closest("li").remove(), m.controlNav.set(), a.pagingCount > 1 && a.pagingCount !== a.controlNav.length ? a.update(t, e) : m.controlNav.active()
        }
      },
      directionNav: {
        setup: function () {
          var e = $('<ul class="' + n + 'direction-nav"><li class="' + n + 'nav-prev"><a class="' + n + 'prev" href="#">' + a.vars.prevText + '</a></li><li class="' + n + 'nav-next"><a class="' + n + 'next" href="#">' + a.vars.nextText + "</a></li></ul>");
          a.customDirectionNav ? a.directionNav = a.customDirectionNav : a.controlsContainer ? ($(a.controlsContainer).append(e), a.directionNav = $("." + n + "direction-nav li a", a.controlsContainer)) : (a.append(e), a.directionNav = $("." + n + "direction-nav li a", a)), m.directionNav.update(), a.directionNav.bind(r, function (e) {
            e.preventDefault();
            var t;
            ("" === o || o === e.type) && (t = a.getTarget($(this).hasClass(n + "next") ? "next" : "prev"), a.flexAnimate(t, a.vars.pauseOnAction)), "" === o && (o = e.type), m.setToClearWatchedEvent()
          })
        },
        update: function () {
          var e = n + "disabled";
          1 === a.pagingCount ? a.directionNav.addClass(e).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(e).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(e).filter("." + n + "prev").addClass(e).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(e).filter("." + n + "next").addClass(e).attr("tabindex", "-1") : a.directionNav.removeClass(e).removeAttr("tabindex")
        }
      },
      pausePlay: {
        setup: function () {
          var e = $('<div class="' + n + 'pauseplay"><a></a></div>');
          a.controlsContainer ? (a.controlsContainer.append(e), a.pausePlay = $("." + n + "pauseplay a", a.controlsContainer)) : (a.append(e), a.pausePlay = $("." + n + "pauseplay a", a)), m.pausePlay.update(a.vars.slideshow ? n + "pause" : n + "play"), a.pausePlay.bind(r, function (e) {
            e.preventDefault(), ("" === o || o === e.type) && ($(this).hasClass(n + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())), "" === o && (o = e.type), m.setToClearWatchedEvent()
          })
        },
        update: function (e) {
          "play" === e ? a.pausePlay.removeClass(n + "pause").addClass(n + "play").html(a.vars.playText) : a.pausePlay.removeClass(n + "play").addClass(n + "pause").html(a.vars.pauseText)
        }
      },
      touch: function () {
        function t(t) {
          t.stopPropagation(), a.animating ? t.preventDefault() : (a.pause(), e._gesture.addPointer(t.pointerId), w = 0, p = c ? a.h : a.w, f = Number(new Date), l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p)
        }

        function n(t) {
          t.stopPropagation();
          var a = t.target._slider;
          if (a) {
            var n = -t.translationX,
              i = -t.translationY;
            return w += c ? i : n, m = w, y = c ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i), t.detail === t.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
              e._gesture.stop()
            }) : void((!y || Number(new Date) - f > 500) && (t.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m = w / (0 === a.currentSlide && 0 > w || a.currentSlide === a.last && w > 0 ? Math.abs(w) / p + 2 : 1)), a.setProps(l + m, "setTouch"))))
          }
        }

        function s(e) {
          e.stopPropagation();
          var t = e.target._slider;
          if (t) {
            if (t.animatingTo === t.currentSlide && !y && null !== m) {
              var a = d ? -m : m,
                n = t.getTarget(a > 0 ? "next" : "prev");
              t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > p / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : v || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
            }
            r = null, o = null, m = null, l = null, w = 0
          }
        }
        var r, o, l, p, m, f, g, h, S, y = !1,
          x = 0,
          b = 0,
          w = 0;
        i ? (e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", t, !1), e._slider = a, e.addEventListener("MSGestureChange", n, !1), e.addEventListener("MSGestureEnd", s, !1)) : (g = function (t) {
          a.animating ? t.preventDefault() : (window.navigator.msPointerEnabled || 1 === t.touches.length) && (a.pause(), p = c ? a.h : a.w, f = Number(new Date), x = t.touches[0].pageX, b = t.touches[0].pageY, l = u && d && a.animatingTo === a.last ? 0 : u && d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : u && a.currentSlide === a.last ? a.limit : u ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : d ? (a.last - a.currentSlide + a.cloneOffset) * p : (a.currentSlide + a.cloneOffset) * p, r = c ? b : x, o = c ? x : b, e.addEventListener("touchmove", h, !1), e.addEventListener("touchend", S, !1))
        }, h = function (e) {
          x = e.touches[0].pageX, b = e.touches[0].pageY, m = c ? r - b : r - x, y = c ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o);
          var t = 500;
          (!y || Number(new Date) - f > t) && (e.preventDefault(), !v && a.transitions && (a.vars.animationLoop || (m /= 0 === a.currentSlide && 0 > m || a.currentSlide === a.last && m > 0 ? Math.abs(m) / p + 2 : 1), a.setProps(l + m, "setTouch")))
        }, S = function (t) {
          if (e.removeEventListener("touchmove", h, !1), a.animatingTo === a.currentSlide && !y && null !== m) {
            var n = d ? -m : m,
              i = a.getTarget(n > 0 ? "next" : "prev");
            a.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(n) > 50 || Math.abs(n) > p / 2) ? a.flexAnimate(i, a.vars.pauseOnAction) : v || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0)
          }
          e.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null
        }, e.addEventListener("touchstart", g, !1))
      },
      resize: function () {
        !a.animating && a.is(":visible") && (u || a.doMath(), v ? m.smoothHeight() : u ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : c ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (a.vars.smoothHeight && m.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
      },
      smoothHeight: function (e) {
        if (!c || v) {
          var t = v ? a : a.viewport;
          e ? t.animate({
            height: a.slides.eq(a.animatingTo).height()
          }, e) : t.height(a.slides.eq(a.animatingTo).height())
        }
      },
      sync: function (e) {
        var t = $(a.vars.sync).data("flexslider"),
          n = a.animatingTo;
        switch (e) {
          case "animate":
            t.flexAnimate(n, a.vars.pauseOnAction, !1, !0);
            break;
          case "play":
            t.playing || t.asNav || t.play();
            break;
          case "pause":
            t.pause()
        }
      },
      uniqueID: function (e) {
        return e.filter("[id]").add(e.find("[id]")).each(function () {
          var e = $(this);
          e.attr("id", e.attr("id") + "_clone")
        }), e
      },
      pauseInvisible: {
        visProp: null,
        init: function () {
          var e = m.pauseInvisible.getHiddenProp();
          if (e) {
            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(t, function () {
              m.pauseInvisible.isHidden() ? a.startTimeout ? clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : a.vars.initDelay > 0 ? setTimeout(a.play, a.vars.initDelay) : a.play()
            })
          }
        },
        isHidden: function () {
          var e = m.pauseInvisible.getHiddenProp();
          return e ? document[e] : !1
        },
        getHiddenProp: function () {
          var e = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";
          for (var t = 0; t < e.length; t++)
            if (e[t] + "Hidden" in document) return e[t] + "Hidden";
          return null
        }
      },
      setToClearWatchedEvent: function () {
        clearTimeout(l), l = setTimeout(function () {
          o = ""
        }, 3e3)
      }
    }, a.flexAnimate = function (e, t, i, r, o) {
      if (a.vars.animationLoop || e === a.currentSlide || (a.direction = e > a.currentSlide ? "next" : "prev"), p && 1 === a.pagingCount && (a.direction = a.currentItem < e ? "next" : "prev"), !a.animating && (a.canAdvance(e, o) || i) && a.is(":visible")) {
        if (p && r) {
          var l = $(a.vars.asNavFor).data("flexslider");
          if (a.atEnd = 0 === e || e === a.count - 1, l.flexAnimate(e, !0, !1, !0, o), a.direction = a.currentItem < e ? "next" : "prev", l.direction = a.direction, Math.ceil((e + 1) / a.visible) - 1 === a.currentSlide || 0 === e) return a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), !1;
          a.currentItem = e, a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), e = Math.floor(e / a.visible)
        }
        if (a.animating = !0, a.animatingTo = e, t && a.pause(), a.vars.before(a), a.syncExists && !o && m.sync("animate"), a.vars.controlNav && m.controlNav.active(), u || a.slides.removeClass(n + "active-slide").eq(e).addClass(n + "active-slide"), a.atEnd = 0 === e || e === a.last, a.vars.directionNav && m.directionNav.update(), e === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause()), v) s ? (a.slides.eq(a.currentSlide).css({
          opacity: 0,
          zIndex: 1
        }), a.slides.eq(e).css({
          opacity: 1,
          zIndex: 2
        }), a.wrapup(f)) : (a.slides.eq(a.currentSlide).css({
          zIndex: 1
        }).animate({
          opacity: 0
        }, a.vars.animationSpeed, a.vars.easing), a.slides.eq(e).css({
          zIndex: 2
        }).animate({
          opacity: 1
        }, a.vars.animationSpeed, a.vars.easing, a.wrapup));
        else {
          var f = c ? a.slides.filter(":first").height() : a.computedW,
            g, h, S;
          u ? (g = a.vars.itemMargin, S = (a.itemW + g) * a.move * a.animatingTo, h = S > a.limit && 1 !== a.visible ? a.limit : S) : h = 0 === a.currentSlide && e === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? d ? (a.count + a.cloneOffset) * f : 0 : a.currentSlide === a.last && 0 === e && a.vars.animationLoop && "prev" !== a.direction ? d ? 0 : (a.count + 1) * f : d ? (a.count - 1 - e + a.cloneOffset) * f : (e + a.cloneOffset) * f, a.setProps(h, "", a.vars.animationSpeed), a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function () {
            clearTimeout(a.ensureAnimationEnd), a.wrapup(f)
          }), clearTimeout(a.ensureAnimationEnd), a.ensureAnimationEnd = setTimeout(function () {
            a.wrapup(f)
          }, a.vars.animationSpeed + 100)) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function () {
            a.wrapup(f)
          })
        }
        a.vars.smoothHeight && m.smoothHeight(a.vars.animationSpeed)
      }
    }, a.wrapup = function (e) {
      v || u || (0 === a.currentSlide && a.animatingTo === a.last && a.vars.animationLoop ? a.setProps(e, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(e, "jumpStart")), a.animating = !1, a.currentSlide = a.animatingTo, a.vars.after(a)
    }, a.animateSlides = function () {
      !a.animating && f && a.flexAnimate(a.getTarget("next"))
    }, a.pause = function () {
      clearInterval(a.animatedSlides), a.animatedSlides = null, a.playing = !1, a.vars.pausePlay && m.pausePlay.update("play"), a.syncExists && m.sync("pause")
    }, a.play = function () {
      a.playing && clearInterval(a.animatedSlides), a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed), a.started = a.playing = !0, a.vars.pausePlay && m.pausePlay.update("pause"), a.syncExists && m.sync("play")
    }, a.stop = function () {
      a.pause(), a.stopped = !0
    }, a.canAdvance = function (e, t) {
      var n = p ? a.pagingCount - 1 : a.last;
      return t ? !0 : p && a.currentItem === a.count - 1 && 0 === e && "prev" === a.direction ? !0 : p && 0 === a.currentItem && e === a.pagingCount - 1 && "next" !== a.direction ? !1 : e !== a.currentSlide || p ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && e === n && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === n && 0 === e && "next" === a.direction ? !1 : !0 : !1
    }, a.getTarget = function (e) {
      return a.direction = e, "next" === e ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
    }, a.setProps = function (e, t, n) {
      var i = function () {
        var n = e ? e : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo,
          i = function () {
            if (u) return "setTouch" === t ? e : d && a.animatingTo === a.last ? 0 : d ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : n;
            switch (t) {
              case "setTotal":
                return d ? (a.count - 1 - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e;
              case "setTouch":
                return d ? e : e;
              case "jumpEnd":
                return d ? e : a.count * e;
              case "jumpStart":
                return d ? a.count * e : e;
              default:
                return e
            }
          }();
        return -1 * i + "px"
      }();
      a.transitions && (i = c ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", n = void 0 !== n ? n / 1e3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", n), a.container.css("transition-duration", n)), a.args[a.prop] = i, (a.transitions || void 0 === n) && a.container.css(a.args), a.container.css("transform", i)
    }, a.setup = function (e) {
      if (v) a.slides.css({
        width: "100%",
        "float": "left",
        marginRight: "-100%",
        position: "relative"
      }), "init" === e && (s ? a.slides.css({
        opacity: 0,
        display: "block",
        webkitTransition: "opacity " + a.vars.animationSpeed / 1e3 + "s ease",
        zIndex: 1
      }).eq(a.currentSlide).css({
        opacity: 1,
        zIndex: 2
      }) : 0 == a.vars.fadeFirstSlide ? a.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(a.currentSlide).css({
        zIndex: 2
      }).css({
        opacity: 1
      }) : a.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(a.currentSlide).css({
        zIndex: 2
      }).animate({
        opacity: 1
      }, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && m.smoothHeight();
      else {
        var t, i;
        "init" === e && (a.viewport = $('<div class="' + n + 'viewport"></div>').css({
          overflow: "hidden",
          position: "relative"
        }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, d && (i = $.makeArray(a.slides).reverse(), a.slides = $(i), a.container.empty().append(a.slides))), a.vars.animationLoop && !u && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== e && a.container.find(".clone").remove(), a.container.append(m.uniqueID(a.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(a.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), a.newSlides = $(a.vars.selector, a), t = d ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset, c && !u ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
          a.newSlides.css({
            display: "block"
          }), a.doMath(), a.viewport.height(a.h), a.setProps(t * a.h, "init")
        }, "init" === e ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(t * a.computedW, "init"), setTimeout(function () {
          a.doMath(), a.newSlides.css({
            width: a.computedW,
            "float": "left",
            display: "block"
          }), a.vars.smoothHeight && m.smoothHeight()
        }, "init" === e ? 100 : 0))
      }
      u || a.slides.removeClass(n + "active-slide").eq(a.currentSlide).addClass(n + "active-slide"), a.vars.init(a)
    }, a.doMath = function () {
      var e = a.slides.first(),
        t = a.vars.itemMargin,
        n = a.vars.minItems,
        i = a.vars.maxItems;
      a.w = void 0 === a.viewport ? a.width() : a.viewport.width(), a.h = e.height(), a.boxPadding = e.outerWidth() - e.width(), u ? (a.itemT = a.vars.itemWidth + t, a.minW = n ? n * a.itemT : a.w, a.maxW = i ? i * a.itemT - t : a.w, a.itemW = a.minW > a.w ? (a.w - t * (n - 1)) / n : a.maxW < a.w ? (a.w - t * (i - 1)) / i : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = a.vars.move > 0 && a.vars.move < a.visible ? a.vars.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + t * (a.count - 1) : (a.itemW + t) * a.count - a.w - t) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1), a.computedW = a.itemW - a.boxPadding
    }, a.update = function (e, t) {
      a.doMath(), u || (e < a.currentSlide ? a.currentSlide += 1 : e <= a.currentSlide && 0 !== e && (a.currentSlide -= 1), a.animatingTo = a.currentSlide), a.vars.controlNav && !a.manualControls && ("add" === t && !u || a.pagingCount > a.controlNav.length ? m.controlNav.update("add") : ("remove" === t && !u || a.pagingCount < a.controlNav.length) && (u && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), m.controlNav.update("remove", a.last))), a.vars.directionNav && m.directionNav.update()
    }, a.addSlide = function (e, t) {
      var n = $(e);
      a.count += 1, a.last = a.count - 1, c && d ? void 0 !== t ? a.slides.eq(a.count - t).after(n) : a.container.prepend(n) : void 0 !== t ? a.slides.eq(t).before(n) : a.container.append(n), a.update(t, "add"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.added(a)
    }, a.removeSlide = function (e) {
      var t = isNaN(e) ? a.slides.index($(e)) : e;
      a.count -= 1, a.last = a.count - 1, isNaN(e) ? $(e, a.slides).remove() : c && d ? a.slides.eq(a.last).remove() : a.slides.eq(e).remove(), a.doMath(), a.update(t, "remove"), a.slides = $(a.vars.selector + ":not(.clone)", a), a.setup(), a.vars.removed(a)
    }, m.init()
  }, $(window).blur(function (e) {
    focused = !1
  }).focus(function (e) {
    focused = !0
  }), $.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 7e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    fadeFirstSlide: !0,
    thumbCaptions: !1,
    pauseOnAction: !0,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "Previous",
    nextText: "Next",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    customDirectionNav: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function () {},
    before: function () {},
    after: function () {},
    end: function () {},
    added: function () {},
    removed: function () {},
    init: function () {}
  }, $.fn.flexslider = function (e) {
    if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function () {
      var t = $(this),
        a = e.selector ? e.selector : ".slides > li",
        n = t.find(a);
      1 === n.length && e.allowOneSlide === !0 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e)
    });
    var t = $(this).data("flexslider");
    switch (e) {
      case "play":
        t.play();
        break;
      case "pause":
        t.pause();
        break;
      case "stop":
        t.stop();
        break;
      case "next":
        t.flexAnimate(t.getTarget("next"), !0);
        break;
      case "prev":
      case "previous":
        t.flexAnimate(t.getTarget("prev"), !0);
        break;
      default:
        "number" == typeof e && t.flexAnimate(e, !0)
    }
  }
}(jQuery);


/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */
"function" !== typeof Object.create && (Object.create = function (f) {
  function g() {}
  g.prototype = f;
  return new g
});
(function (f, g, k) {
  var l = {
    init: function (a, b) {
      this.$elem = f(b);
      this.options = f.extend({}, f.fn.owlCarousel.options, this.$elem.data(), a);
      this.userOptions = a;
      this.loadContent()
    },
    loadContent: function () {
      function a(a) {
        var d, e = "";
        if ("function" === typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]);
        else {
          for (d in a.owl) a.owl.hasOwnProperty(d) && (e += a.owl[d].item);
          b.$elem.html(e)
        }
        b.logIn()
      }
      var b = this,
        e;
      "function" === typeof b.options.beforeInit && b.options.beforeInit.apply(this, [b.$elem]);
      "string" === typeof b.options.jsonPath ?
        (e = b.options.jsonPath, f.getJSON(e, a)) : b.logIn()
    },
    logIn: function () {
      this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
      this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
      this.$elem.css({
        opacity: 0
      });
      this.orignalItems = this.options.items;
      this.checkBrowser();
      this.wrapperWidth = 0;
      this.checkVisible = null;
      this.setVars()
    },
    setVars: function () {
      if (0 === this.$elem.children().length) return !1;
      this.baseClass();
      this.eventTypes();
      this.$userItems = this.$elem.children();
      this.itemsAmount = this.$userItems.length;
      this.wrapItems();
      this.$owlItems = this.$elem.find(".owl-item");
      this.$owlWrapper = this.$elem.find(".owl-wrapper");
      this.playDirection = "next";
      this.prevItem = 0;
      this.prevArr = [0];
      this.currentItem = 0;
      this.customEvents();
      this.onStartup()
    },
    onStartup: function () {
      this.updateItems();
      this.calculateAll();
      this.buildControls();
      this.updateControls();
      this.response();
      this.moveEvents();
      this.stopOnHover();
      this.owlStatus();
      !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
      !0 === this.options.autoPlay &&
        (this.options.autoPlay = 5E3);
      this.play();
      this.$elem.find(".owl-wrapper").css("display", "block");
      this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
      this.onstartup = !1;
      this.eachMoveUpdate();
      "function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
    },
    eachMoveUpdate: function () {
      !0 === this.options.lazyLoad && this.lazyLoad();
      !0 === this.options.autoHeight && this.autoHeight();
      this.onVisibleItems();
      "function" === typeof this.options.afterAction && this.options.afterAction.apply(this,
        [this.$elem])
    },
    updateVars: function () {
      "function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
      this.watchVisibility();
      this.updateItems();
      this.calculateAll();
      this.updatePosition();
      this.updateControls();
      this.eachMoveUpdate();
      "function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
    },
    reload: function () {
      var a = this;
      g.setTimeout(function () {
        a.updateVars()
      }, 0)
    },
    watchVisibility: function () {
      var a = this;
      if (!1 === a.$elem.is(":visible")) a.$elem.css({
          opacity: 0
        }),
        g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible);
      else return !1;
      a.checkVisible = g.setInterval(function () {
        a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
          opacity: 1
        }, 200), g.clearInterval(a.checkVisible))
      }, 500)
    },
    wrapItems: function () {
      this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
      this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
      this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
      this.$elem.css("display", "block")
    },
    baseClass: function () {
      var a = this.$elem.hasClass(this.options.baseClass),
        b = this.$elem.hasClass(this.options.theme);
      a || this.$elem.addClass(this.options.baseClass);
      b || this.$elem.addClass(this.options.theme)
    },
    updateItems: function () {
      var a, b;
      if (!1 === this.options.responsive) return !1;
      if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
      a = f(this.options.responsiveBaseWidth).width();
      a > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
      if (!1 !== this.options.itemsCustom)
        for (this.options.itemsCustom.sort(function (a, b) {
            return a[0] - b[0]
          }), b = 0; b < this.options.itemsCustom.length; b += 1) this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]);
      else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
        a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
      this.options.items > this.itemsAmount &&
        !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
    },
    response: function () {
      var a = this,
        b, e;
      if (!0 !== a.options.responsive) return !1;
      e = f(g).width();
      a.resizer = function () {
        f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), g.clearTimeout(b), b = g.setTimeout(function () {
          e = f(g).width();
          a.updateVars()
        }, a.options.responsiveRefreshRate))
      };
      f(g).resize(a.resizer)
    },
    updatePosition: function () {
      this.jumpTo(this.currentItem);
      !1 !== this.options.autoPlay && this.checkAp()
    },
    appendItemsSizes: function () {
      var a =
        this,
        b = 0,
        e = a.itemsAmount - a.options.items;
      a.$owlItems.each(function (c) {
        var d = f(this);
        d.css({
          width: a.itemWidth
        }).data("owl-item", Number(c));
        if (0 === c % a.options.items || c === e) c > e || (b += 1);
        d.data("owl-roundPages", b)
      })
    },
    appendWrapperSizes: function () {
      this.$owlWrapper.css({
        width: this.$owlItems.length * this.itemWidth * 2,
        left: 0
      });
      this.appendItemsSizes()
    },
    calculateAll: function () {
      this.calculateWidth();
      this.appendWrapperSizes();
      this.loops();
      this.max()
    },
    calculateWidth: function () {
      this.itemWidth = Math.round(this.$elem.width() /
        this.options.items)
    },
    max: function () {
      var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
      this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a);
      return a
    },
    min: function () {
      return 0
    },
    loops: function () {
      var a = 0,
        b = 0,
        e, c;
      this.positionsInArray = [0];
      this.pagesInArray = [];
      for (e = 0; e < this.itemsAmount; e += 1) b += this.itemWidth, this.positionsInArray.push(-b), !0 === this.options.scrollPerPage && (c = f(this.$owlItems[e]),
        c = c.data("owl-roundPages"), c !== a && (this.pagesInArray[a] = this.positionsInArray[e], a = c))
    },
    buildControls: function () {
      if (!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = f('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
      !0 === this.options.pagination && this.buildPagination();
      !0 === this.options.navigation && this.buildButtons()
    },
    buildButtons: function () {
      var a = this,
        b = f('<div class="owl-buttons"/>');
      a.owlControls.append(b);
      a.buttonPrev =
        f("<div/>", {
          "class": "owl-prev",
          html: a.options.navigationText[0] || ""
        });
      a.buttonNext = f("<div/>", {
        "class": "owl-next",
        html: a.options.navigationText[1] || ""
      });
      b.append(a.buttonPrev).append(a.buttonNext);
      b.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (a) {
        a.preventDefault()
      });
      b.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (b) {
        b.preventDefault();
        f(this).hasClass("owl-next") ? a.next() : a.prev()
      })
    },
    buildPagination: function () {
      var a = this;
      a.paginationWrapper =
        f('<div class="owl-pagination"/>');
      a.owlControls.append(a.paginationWrapper);
      a.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (b) {
        b.preventDefault();
        Number(f(this).data("owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("owl-page")), !0)
      })
    },
    updatePagination: function () {
      var a, b, e, c, d, g;
      if (!1 === this.options.pagination) return !1;
      this.paginationWrapper.html("");
      a = 0;
      b = this.itemsAmount - this.itemsAmount % this.options.items;
      for (c = 0; c < this.itemsAmount; c += 1) 0 === c % this.options.items &&
        (a += 1, b === c && (e = this.itemsAmount - this.options.items), d = f("<div/>", {
          "class": "owl-page"
        }), g = f("<span></span>", {
          text: !0 === this.options.paginationNumbers ? a : "",
          "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
        }), d.append(g), d.data("owl-page", b === c ? e : c), d.data("owl-roundPages", a), this.paginationWrapper.append(d));
      this.checkPagination()
    },
    checkPagination: function () {
      var a = this;
      if (!1 === a.options.pagination) return !1;
      a.paginationWrapper.find(".owl-page").each(function () {
        f(this).data("owl-roundPages") ===
          f(a.$owlItems[a.currentItem]).data("owl-roundPages") && (a.paginationWrapper.find(".owl-page").removeClass("active"), f(this).addClass("active"))
      })
    },
    checkNavigation: function () {
      if (!1 === this.options.navigation) return !1;
      !1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem ===
        this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
    },
    updateControls: function () {
      this.updatePagination();
      this.checkNavigation();
      this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
    },
    destroyControls: function () {
      this.owlControls && this.owlControls.remove()
    },
    next: function (a) {
      if (this.isTransition) return !1;
      this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
      if (this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
        if (!0 === this.options.rewindNav) this.currentItem = 0, a = "rewind";
        else return this.currentItem = this.maximumItem, !1;
      this.goTo(this.currentItem, a)
    },
    prev: function (a) {
      if (this.isTransition) return !1;
      this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ?
        this.options.items : 1);
      if (0 > this.currentItem)
        if (!0 === this.options.rewindNav) this.currentItem = this.maximumItem, a = "rewind";
        else return this.currentItem = 0, !1;
      this.goTo(this.currentItem, a)
    },
    goTo: function (a, b, e) {
      var c = this;
      if (c.isTransition) return !1;
      "function" === typeof c.options.beforeMove && c.options.beforeMove.apply(this, [c.$elem]);
      a >= c.maximumItem ? a = c.maximumItem : 0 >= a && (a = 0);
      c.currentItem = c.owl.currentItem = a;
      if (!1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d) return c.swapSpeed(0),
        !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), c.afterGo(), c.singleItemTransition(), !1;
      a = c.positionsInArray[a];
      !0 === c.browser.support3d ? (c.isCss3Finish = !1, !0 === b ? (c.swapSpeed("paginationSpeed"), g.setTimeout(function () {
        c.isCss3Finish = !0
      }, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), g.setTimeout(function () {
        c.isCss3Finish = !0
      }, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function () {
          c.isCss3Finish = !0
        },
        c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed);
      c.afterGo()
    },
    jumpTo: function (a) {
      "function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
      a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0);
      this.swapSpeed(0);
      !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1);
      this.currentItem =
        this.owl.currentItem = a;
      this.afterGo()
    },
    afterGo: function () {
      this.prevArr.push(this.currentItem);
      this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
      this.prevArr.shift(0);
      this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
      "function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
    },
    stop: function () {
      this.apStatus = "stop";
      g.clearInterval(this.autoPlayInterval)
    },
    checkAp: function () {
      "stop" !== this.apStatus && this.play()
    },
    play: function () {
      var a = this;
      a.apStatus = "play";
      if (!1 === a.options.autoPlay) return !1;
      g.clearInterval(a.autoPlayInterval);
      a.autoPlayInterval = g.setInterval(function () {
        a.next(!0)
      }, a.options.autoPlay)
    },
    swapSpeed: function (a) {
      "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !== typeof a && this.$owlWrapper.css(this.addCssSpeed(a))
    },
    addCssSpeed: function (a) {
      return {
        "-webkit-transition": "all " + a + "ms ease",
        "-moz-transition": "all " + a + "ms ease",
        "-o-transition": "all " + a + "ms ease",
        transition: "all " + a + "ms ease"
      }
    },
    removeTransition: function () {
      return {
        "-webkit-transition": "",
        "-moz-transition": "",
        "-o-transition": "",
        transition: ""
      }
    },
    doTranslate: function (a) {
      return {
        "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
        "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
        "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
        "-ms-transform": "translate3d(" +
          a + "px, 0px, 0px)",
        transform: "translate3d(" + a + "px, 0px,0px)"
      }
    },
    transition3d: function (a) {
      this.$owlWrapper.css(this.doTranslate(a))
    },
    css2move: function (a) {
      this.$owlWrapper.css({
        left: a
      })
    },
    css2slide: function (a, b) {
      var e = this;
      e.isCssFinish = !1;
      e.$owlWrapper.stop(!0, !0).animate({
        left: a
      }, {
        duration: b || e.options.slideSpeed,
        complete: function () {
          e.isCssFinish = !0
        }
      })
    },
    checkBrowser: function () {
      var a = k.createElement("div");
      a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
      a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
      this.browser = {
        support3d: null !== a && 1 === a.length,
        isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints
      }
    },
    moveEvents: function () {
      if (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents()
    },
    eventTypes: function () {
      var a = ["s", "e", "x"];
      this.ev_types = {};
      !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] :
        !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
      this.ev_types.start = a[0];
      this.ev_types.move = a[1];
      this.ev_types.end = a[2]
    },
    disabledEvents: function () {
      this.$elem.on("dragstart.owl", function (a) {
        a.preventDefault()
      });
      this.$elem.on("mousedown.disableTextSelect", function (a) {
        return f(a.target).is("input, textarea, select, option")
      })
    },
    gestures: function () {
      function a(a) {
        if (void 0 !== a.touches) return {
          x: a.touches[0].pageX,
          y: a.touches[0].pageY
        };
        if (void 0 === a.touches) {
          if (void 0 !== a.pageX) return {
            x: a.pageX,
            y: a.pageY
          };
          if (void 0 === a.pageX) return {
            x: a.clientX,
            y: a.clientY
          }
        }
      }

      function b(a) {
        "on" === a ? (f(k).on(d.ev_types.move, e), f(k).on(d.ev_types.end, c)) : "off" === a && (f(k).off(d.ev_types.move), f(k).off(d.ev_types.end))
      }

      function e(b) {
        b = b.originalEvent || b || g.event;
        d.newPosX = a(b).x - h.offsetX;
        d.newPosY = a(b).y - h.offsetY;
        d.newRelativeX = d.newPosX - h.relativePos;
        "function" === typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, d.options.startDragging.apply(d, [d.$elem]));
        (8 < d.newRelativeX || -8 > d.newRelativeX) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, h.sliding = !0);
        (10 < d.newPosY || -10 > d.newPosY) && !1 === h.sliding && f(k).off("touchmove.owl");
        d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5);
        !0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX)
      }

      function c(a) {
        a = a.originalEvent || a || g.event;
        var c;
        a.target = a.target || a.srcElement;
        h.dragging = !1;
        !0 !== d.browser.isTouch && d.$owlWrapper.removeClass("grabbing");
        d.dragDirection = 0 > d.newRelativeX ? d.owl.dragDirection = "left" : d.owl.dragDirection = "right";
        0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function (a) {
            a.stopImmediatePropagation();
            a.stopPropagation();
            a.preventDefault();
            f(a.target).off("click.disable")
          }),
          a = f._data(a.target, "events").click, c = a.pop(), a.splice(0, 0, c)));
        b("off")
      }
      var d = this,
        h = {
          offsetX: 0,
          offsetY: 0,
          baseElWidth: 0,
          relativePos: 0,
          position: null,
          minSwipe: null,
          maxSwipe: null,
          sliding: null,
          dargging: null,
          targetElement: null
        };
      d.isCssFinish = !0;
      d.$elem.on(d.ev_types.start, ".owl-wrapper", function (c) {
        c = c.originalEvent || c || g.event;
        var e;
        if (3 === c.which) return !1;
        if (!(d.itemsAmount <= d.options.items)) {
          if (!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
          !1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval);
          !0 === d.browser.isTouch || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing");
          d.newPosX = 0;
          d.newRelativeX = 0;
          f(this).css(d.removeTransition());
          e = f(this).position();
          h.relativePos = e.left;
          h.offsetX = a(c).x - e.left;
          h.offsetY = a(c).y - e.top;
          b("on");
          h.sliding = !1;
          h.targetElement = c.target || c.srcElement
        }
      })
    },
    getNewPosition: function () {
      var a = this.closestItem();
      a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem =
        a = 0);
      return a
    },
    closestItem: function () {
      var a = this,
        b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray,
        e = a.newPosX,
        c = null;
      f.each(b, function (d, g) {
        e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], a.currentItem = f.inArray(c, a.positionsInArray)) :
          (c = b[d + 1], a.currentItem = d + 1))
      });
      return a.currentItem
    },
    moveDirection: function () {
      var a;
      0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev");
      return a
    },
    customEvents: function () {
      var a = this;
      a.$elem.on("owl.next", function () {
        a.next()
      });
      a.$elem.on("owl.prev", function () {
        a.prev()
      });
      a.$elem.on("owl.play", function (b, e) {
        a.options.autoPlay = e;
        a.play();
        a.hoverStatus = "play"
      });
      a.$elem.on("owl.stop", function () {
        a.stop();
        a.hoverStatus = "stop"
      });
      a.$elem.on("owl.goTo", function (b, e) {
        a.goTo(e)
      });
      a.$elem.on("owl.jumpTo", function (b, e) {
        a.jumpTo(e)
      })
    },
    stopOnHover: function () {
      var a = this;
      !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function () {
        a.stop()
      }), a.$elem.on("mouseout", function () {
        "stop" !== a.hoverStatus && a.play()
      }))
    },
    lazyLoad: function () {
      var a, b, e, c, d;
      if (!1 === this.options.lazyLoad) return !1;
      for (a = 0; a < this.itemsAmount; a += 1) b = f(this.$owlItems[a]), "loaded" !== b.data("owl-loaded") && (e = b.data("owl-item"), c = b.find(".lazyOwl"), "string" !== typeof c.data("src") ?
        b.data("owl-loaded", "loaded") : (void 0 === b.data("owl-loaded") && (c.hide(), b.addClass("loading").data("owl-loaded", "checked")), (d = !0 === this.options.lazyFollow ? e >= this.currentItem : !0) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)))
    },
    lazyPreload: function (a, b) {
      function e() {
        a.data("owl-loaded", "loaded").removeClass("loading");
        b.removeAttr("data-src");
        "fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show();
        "function" === typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this,
          [d.$elem])
      }

      function c() {
        f += 1;
        d.completeImg(b.get(0)) || !0 === k ? e() : 100 >= f ? g.setTimeout(c, 100) : e()
      }
      var d = this,
        f = 0,
        k;
      "DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), k = !0) : b[0].src = b.data("src");
      c()
    },
    autoHeight: function () {
      function a() {
        var a = f(e.$owlItems[e.currentItem]).height();
        e.wrapperOuter.css("height", a + "px");
        e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function () {
          e.wrapperOuter.addClass("autoHeight")
        }, 0)
      }

      function b() {
        d += 1;
        e.completeImg(c.get(0)) ? a() : 100 >= d ? g.setTimeout(b,
          100) : e.wrapperOuter.css("height", "")
      }
      var e = this,
        c = f(e.$owlItems[e.currentItem]).find("img"),
        d;
      void 0 !== c.get(0) ? (d = 0, b()) : a()
    },
    completeImg: function (a) {
      return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0
    },
    onVisibleItems: function () {
      var a;
      !0 === this.options.addClassActive && this.$owlItems.removeClass("active");
      this.visibleItems = [];
      for (a = this.currentItem; a < this.currentItem + this.options.items; a += 1) this.visibleItems.push(a), !0 === this.options.addClassActive && f(this.$owlItems[a]).addClass("active");
      this.owl.visibleItems = this.visibleItems
    },
    transitionTypes: function (a) {
      this.outClass = "owl-" + a + "-out";
      this.inClass = "owl-" + a + "-in"
    },
    singleItemTransition: function () {
      var a = this,
        b = a.outClass,
        e = a.inClass,
        c = a.$owlItems.eq(a.currentItem),
        d = a.$owlItems.eq(a.prevItem),
        f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
        g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
      a.isTransition = !0;
      a.$owlWrapper.addClass("owl-origin").css({
        "-webkit-transform-origin": g + "px",
        "-moz-perspective-origin": g +
          "px",
        "perspective-origin": g + "px"
      });
      d.css({
        position: "relative",
        left: f + "px"
      }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
        a.endPrev = !0;
        d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
        a.clearTransStyle(d, b)
      });
      c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
        a.endCurrent = !0;
        c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
        a.clearTransStyle(c, e)
      })
    },
    clearTransStyle: function (a,
      b) {
      a.css({
        position: "",
        left: ""
      }).removeClass(b);
      this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
    },
    owlStatus: function () {
      this.owl = {
        userOptions: this.userOptions,
        baseElement: this.$elem,
        userItems: this.$userItems,
        owlItems: this.$owlItems,
        currentItem: this.currentItem,
        prevItem: this.prevItem,
        visibleItems: this.visibleItems,
        isTouch: this.browser.isTouch,
        browser: this.browser,
        dragDirection: this.dragDirection
      }
    },
    clearEvents: function () {
      this.$elem.off(".owl owl mousedown.disableTextSelect");
      f(k).off(".owl owl");
      f(g).off("resize", this.resizer)
    },
    unWrap: function () {
      0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
      this.clearEvents();
      this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
    },
    destroy: function () {
      this.stop();
      g.clearInterval(this.checkVisible);
      this.unWrap();
      this.$elem.removeData()
    },
    reinit: function (a) {
      a = f.extend({}, this.userOptions,
        a);
      this.unWrap();
      this.init(a, this.$elem)
    },
    addItem: function (a, b) {
      var e;
      if (!a) return !1;
      if (0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), !1;
      this.unWrap();
      e = void 0 === b || -1 === b ? -1 : b;
      e >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a);
      this.setVars()
    },
    removeItem: function (a) {
      if (0 === this.$elem.children().length) return !1;
      a = void 0 === a || -1 === a ? -1 : a;
      this.unWrap();
      this.$userItems.eq(a).remove();
      this.setVars()
    }
  };
  f.fn.owlCarousel = function (a) {
    return this.each(function () {
      if (!0 ===
        f(this).data("owl-init")) return !1;
      f(this).data("owl-init", !0);
      var b = Object.create(l);
      b.init(a, this);
      f.data(this, "owlCarousel", b)
    })
  };
  f.fn.owlCarousel.options = {
    items: 5,
    itemsCustom: !1,
    itemsDesktop: [1199, 4],
    itemsDesktopSmall: [979, 3],
    itemsTablet: [768, 2],
    itemsTabletSmall: !1,
    itemsMobile: [479, 1],
    singleItem: !1,
    itemsScaleUp: !1,
    slideSpeed: 200,
    paginationSpeed: 800,
    rewindSpeed: 1E3,
    autoPlay: !1,
    stopOnHover: !1,
    navigation: !1,
    navigationText: ["prev", "next"],
    rewindNav: !0,
    scrollPerPage: !1,
    pagination: !0,
    paginationNumbers: !1,
    responsive: !0,
    responsiveRefreshRate: 200,
    responsiveBaseWidth: g,
    baseClass: "owl-carousel",
    theme: "owl-theme",
    lazyLoad: !1,
    lazyFollow: !0,
    lazyEffect: "fade",
    autoHeight: !1,
    jsonPath: !1,
    jsonSuccess: !1,
    dragBeforeAnimFinish: !0,
    mouseDrag: !0,
    touchDrag: !0,
    addClassActive: !1,
    transitionStyle: !1,
    beforeUpdate: !1,
    afterUpdate: !1,
    beforeInit: !1,
    afterInit: !1,
    beforeMove: !1,
    afterMove: !1,
    afterAction: !1,
    startDragging: !1,
    afterLazyLoad: !1
  }
})(jQuery, window, document);


/* countdown */
! function (e) {
  e.fn.countdown = function (t, s) {
    function n() {
      eventDate = Date.parse(i.date) / 1e3, currentDate = Math.floor(e.now() / 1e3), eventDate <= currentDate && (s.call(this), clearInterval(interval)), seconds = eventDate - currentDate, days = Math.floor(seconds / 86400), seconds -= 60 * days * 60 * 24, hours = Math.floor(seconds / 3600), seconds -= 60 * hours * 60, minutes = Math.floor(seconds / 60), seconds -= 60 * minutes, thisEl.find(".timeRefDays").text(1 == days ? "BORN" : "BORN"), thisEl.find(".timeRefHours").text(1 == hours ? "hour" : "hours"), thisEl.find(".timeRefMinutes").text(1 == minutes ? "minute" : "minutes"), thisEl.find(".timeRefSeconds").text(1 == seconds ? "second" : "seconds"), "on" == i.format && (days = String(days).length >= 2 ? days : "0" + days, hours = String(hours).length >= 2 ? hours : "0" + hours, minutes = String(minutes).length >= 2 ? minutes : "0" + minutes, seconds = String(seconds).length >= 2 ? seconds : "0" + seconds), isNaN(eventDate) ? (alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00"), clearInterval(interval)) : (thisEl.find(".days").text(days), thisEl.find(".hours").text(hours), thisEl.find(".minutes").text(minutes), thisEl.find(".seconds").text(seconds))
    }
    thisEl = e(this);
    var i = {
      date: null,
      format: null
    };
    t && e.extend(i, t), n(), interval = setInterval(n, 1e3)
  }
}(jQuery);


/* frame */
(function () {
  var t, n = function (t, n) {
      return function () {
        return t.apply(n, arguments)
      }
    },
    i = function (t, n) {
      function i() {
        this.constructor = t
      }
      for (var o in n) e.call(n, o) && (t[o] = n[o]);
      return i.prototype = n.prototype, t.prototype = new i, t.__super__ = n.prototype, t
    },
    e = {}.hasOwnProperty;
  t = t || {},
    function () {
      return t.BaseApp = function () {
        function t() {
          this.onResize = n(this.onResize, this), $(window).on("resize", this.onResize), this.onResize()
        }
        return t.prototype.getWidth = function () {
          return this.width
        }, t.prototype.getHeight = function () {
          return this.height
        }, t.prototype.onResize = function () {
          return this.width = $(window).width(), this.height = $(window).height()
        }, t
      }(), $(t.BaseApp.get)
    }(),
    function () {
      return t.Main = function () {
        function e() {}
        var o, r;
        return r = null, o = function (t) {
          function e() {
            this.initTop = n(this.initTop, this), this.touchPhotoShow = n(this.touchPhotoShow, this), e.__super__.constructor.call(this), $("body").hasClass("page-top") && this.initTop(), $("body").hasClass("#site-wrapper")
          }
          return i(e, t), e.prototype.initTop = function () {
            return this.opening()
          }, e.prototype.opening = function () {
            return $("#site-wrapper").addClass("site-opening"), setTimeout(function () {
              return $("#site-wrapper").removeClass("site-opening")
            }, 800)
          }, e.prototype.onResize = function () {
            return e.__super__.onResize.call(this), $("body").hasClass("page-top") ? $("#bg-layer").height(this.getHeight()) : $("#bg-layer").height()
          }, e
        }(t.BaseApp), e.get = function () {
          return null !== r ? r : r = new o
        }, e
      }(), $(t.Main.get)
    }()
}).call(this);
/*
 * @name		    Shuffle Letters
 * @author		Martin Angelov
 * @version 	    1.1
 * @url			http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license		MIT License
 */
! function (t) {
  function e(t, e) {
    var e = e || "";
    if (!e.length) {
      var r = {
        lowerLetter: "abcdefghijklmnopqrstuvwxyz0123456789",
        upperLetter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        symbol: ",.?/\\(^)![]{}*&^%$#'\"",
        numeric: "0123456789",
        all: function () {
          return lowerLetter + upperLetter + symbol + numeric
        }
      };
      e = "lowerLetter" == t ? r.lowerLetter : "upperLetter" == t ? r.upperLetter : "symbol" == t ? r.symbol : "numeric" == t ? r.numeric : polls.all()
    }
    var n = e.split("");
    return n[Math.floor(Math.random() * n.length)]
  }
  t.fn.shuffleLetters = function (r) {
    var n = t.extend({
      step: 8,
      fps: 25,
      text: "",
      pool: "",
      callback: function () {}
    }, r);
    return this.each(function () {
      var r = t(this),
        a = "";
      if (r.data("animated")) return !0;
      r.data("animated", !0), a = n.text ? n.text.split("") : r.text().split("");
      for (var l = [], o = [], i = 0; i < a.length; i++) {
        var u = a[i];
        " " != u ? (l[i] = /[a-z]/.test(u) ? "lowerLetter" : /[A-Z]/.test(u) ? "upperLetter" : "numeric", o.push(i)) : l[i] = "space"
      }
      r.html(""),
        function p(t) {
          var i, u = o.length,
            s = a.slice(0);
          if (t > u) return r.data("animated", !1), void n.callback(r);
          for (i = Math.max(t, 0); u > i; i++) s[o[i]] = i < t + n.step ? e(l[o[i]], n.pool) : "";
          r.text(s.join("")), setTimeout(function () {
            p(t + 1)
          }, 1e3 / n.fps)
        }(-n.step)
    })
  }
}(jQuery);


/* menu */
jQuery(function (e) {
  e("body").html(), !0, e("#main-menu-caller").on("click", function () {
    $menuCaller = e(this), $mainMenu = e("#main-menu"), $mainMenu.hasClass("activated") ? $mainMenu.find("a").fadeOut("fast", function () {
      $mainMenu.removeClass("activated"), $menuCaller.removeClass("lines-close")
    }) : e("#ui-layer").each(function () {
      $mainMenu.addClass("activated"), $menuCaller.addClass("lines-close"), setTimeout(function () {
        $mainMenu.find("a").each(function (n, i) {
          e(i).css({
            display: "inline-block"
          }).shuffleLetters();
          var a;
          e(i).mouseenter(function () {
            a = setTimeout(function () {
              e(i).css({
                height: e(i).height() + "px",
                display: "inline-block"
              }), setTimeout(function () {
                e(i).css({
                  height: "",
                  display: "inline-block"
                })
              }, 1e3)
            }, 50)
          }), e(i).mouseleave(function () {
            clearTimeout(a)
          })
        })
      }, 350)
    })
  }), e(".menu").on("click", function (n) {
    n.stopPropagation(), n.preventDefault(), e("#main-menu").removeClass("activated"), e("#main-menu-caller").removeClass("lines-close")
  })
});


/* contact form */
$(document).ready(function () {
  $("form#form").submit(function () {
    $("form#form .error").remove();
    var s = !1;
    if ($(".requiredField").each(function () {
        if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass("inputError"), s = !0;
        else if ($(this).hasClass("email")) {
          var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass("inputError"), s = !0)
        }
      }), !s) {
      $("form#form input.submit").fadeOut("normal", function () {
        $(this).parent().append("")
      });
      var r = $(this).serialize();
      $.post($(this).attr("action"), r, function () {
        $("form#form").slideUp("fast", function () {
          $(this).before('<div class="success">Your email was sent successfully.</div>')
        })
      })
    }
    return !1
  })
});


/* newsletter form */
$(document).ready(function () {
  $("form#subscribe").submit(function () {
    $("form#subscribe .subscribe-error").remove();
    var s = !1;
    if ($(".subscribe-requiredField").each(function () {
        if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter your Email</span>'), $(this).addClass("inputError"), s = !0;
        else if ($(this).hasClass("subscribe-email")) {
          var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter a valid Email</span>'), $(this).addClass("inputError"), s = !0)
        }
      }), !s) {
      $("form#subscribe input.submit").fadeOut("normal", function () {
        $(this).parent().append("")
      });
      var r = $(this).serialize();
      $.post($(this).attr("action"), r, function () {
        $("form#subscribe").slideUp("fast", function () {
          $(this).before('<div class="subscribe-success">Thank you for subscribing.</div>')
        })
      })
    }
    return !1
  })
});


/* newsletter form field */
(function (window) {
  'use strict';

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)")
  }
  var hasClass, addClass, removeClass;
  if ('classList' in document.documentElement) {
    hasClass = function (elem, c) {
      return elem.classList.contains(c)
    };
    addClass = function (elem, c) {
      elem.classList.add(c)
    };
    removeClass = function (elem, c) {
      elem.classList.remove(c)
    }
  } else {
    hasClass = function (elem, c) {
      return classReg(c).test(elem.className)
    };
    addClass = function (elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c
      }
    };
    removeClass = function (elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ')
    }
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c)
  }
  var classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
  if (typeof define === 'function' && define.amd) {
    define(classie)
  } else {
    window.classie = classie
  }
})(window);
(function () {
  if (!String.prototype.trim) {
    (function () {
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      String.prototype.trim = function () {
        return this.replace(rtrim, '')
      }
    })()
  } [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
    if (inputEl.value.trim() !== '') {
      classie.add(inputEl.parentNode, 'input--filled')
    }
    inputEl.addEventListener('focus', onInputFocus);
    inputEl.addEventListener('blur', onInputBlur)
  });

  function onInputFocus(ev) {
    classie.add(ev.target.parentNode, 'input--filled')
  }

  function onInputBlur(ev) {
    if (ev.target.value.trim() === '') {
      classie.remove(ev.target.parentNode, 'input--filled')
    }
  }
})();


/*! Magnific Popup - v1.0.0 - 2015-01-03
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2015 Dmitry Semenov; */
! function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (e) {
  var t, n, i, o, r, a, s = "Close",
    l = "BeforeClose",
    c = "AfterClose",
    d = "BeforeAppend",
    u = "MarkupParse",
    p = "Open",
    f = "Change",
    m = "mfp",
    g = "." + m,
    h = "mfp-ready",
    v = "mfp-removing",
    C = "mfp-prevent-close",
    y = function () {},
    w = !!window.jQuery,
    b = e(window),
    I = function (e, n) {
      t.ev.on(m + e + g, n)
    },
    x = function (t, n, i, o) {
      var r = document.createElement("div");
      return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
    },
    k = function (n, i) {
      t.ev.triggerHandler(m + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
    },
    T = function (n) {
      return n === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = n), t.currTemplate.closeBtn
    },
    E = function () {
      e.magnificPopup.instance || (t = new y, t.init(), e.magnificPopup.instance = t)
    },
    _ = function () {
      var e = document.createElement("p").style,
        t = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== e.transition) return !0;
      for (; t.length;)
        if (t.pop() + "Transition" in e) return !0;
      return !1
    };
  y.prototype = {
    constructor: y,
    init: function () {
      var n = navigator.appVersion;
      t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = _(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
    },
    open: function (n) {
      var o;
      if (n.isObj === !1) {
        t.items = n.items.toArray(), t.index = 0;
        var a, s = n.items;
        for (o = 0; o < s.length; o++)
          if (a = s[o], a.parsed && (a = a.el[0]), a === n.el[0]) {
            t.index = o;
            break
          }
      } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
      if (t.isOpen) return void t.updateItemHTML();
      t.types = [], r = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = x("bg").on("click" + g, function () {
        t.close()
      }), t.wrap = x("wrap").attr("tabindex", -1).on("click" + g, function (e) {
        t._checkIfClose(e.target) && t.close()
      }), t.container = x("container", t.wrap)), t.contentContainer = x("content"), t.st.preloader && (t.preloader = x("preloader", t.container, t.st.tLoading));
      var l = e.magnificPopup.modules;
      for (o = 0; o < l.length; o++) {
        var c = l[o];
        c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
      }
      k("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (I(u, function (e, t, n, i) {
        n.close_replaceWith = T(i.type)
      }), r += " mfp-close-btn-in") : t.wrap.append(T())), t.st.alignTop && (r += " mfp-align-top"), t.wrap.css(t.fixedContentPos ? {
        overflow: t.st.overflowY,
        overflowX: "hidden",
        overflowY: t.st.overflowY
      } : {
        top: b.scrollTop(),
        position: "absolute"
      }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
        height: i.height(),
        position: "absolute"
      }), t.st.enableEscapeKey && i.on("keyup" + g, function (e) {
        27 === e.keyCode && t.close()
      }), b.on("resize" + g, function () {
        t.updateSize()
      }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
      var d = t.wH = b.height(),
        f = {};
      if (t.fixedContentPos && t._hasScrollBar(d)) {
        var m = t._getScrollbarSize();
        m && (f.marginRight = m)
      }
      t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
      var v = t.st.mainClass;
      return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), k("BuildControls"), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function () {
        t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), i.on("focusin" + g, t._onFocusIn)
      }, 16), t.isOpen = !0, t.updateSize(d), k(p), n
    },
    close: function () {
      t.isOpen && (k(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function () {
        t._close()
      }, t.st.removalDelay)) : t._close())
    },
    _close: function () {
      k(s);
      var n = v + " " + h + " ";
      if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
        var o = {
          marginRight: ""
        };
        t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
      }
      i.off("keyup" + g + " focusin" + g), t.ev.off(g), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl, t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, k(c)
    },
    updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth,
          i = window.innerHeight * n;
        t.wrap.css("height", i), t.wH = i
      } else t.wH = e || b.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), k("Resize")
    },
    updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
      var i = n.type;
      if (k("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
        var r = t.st[i] ? t.st[i].markup : !1;
        k("FirstMarkupParse", r), t.currTemplate[i] = r ? e(r) : !0
      }
      o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
      var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
      t.appendContent(a, i), n.preloaded = !0, k(f, n), o = n.type, t.container.prepend(t.contentContainer), k("AfterChange")
    },
    appendContent: function (e, n) {
      t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(T()) : t.content = e : t.content = "", k(d), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
    },
    parseEl: function (n) {
      var i, o = t.items[n];
      if (o.tagName ? o = {
          el: e(o)
        } : (i = o.type, o = {
          data: o,
          src: o.src
        }), o.el) {
        for (var r = t.types, a = 0; a < r.length; a++)
          if (o.el.hasClass("mfp-" + r[a])) {
            i = r[a];
            break
          } o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
      }
      return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, k("ElementParse", o), t.items[n]
    },
    addGroup: function (e, n) {
      var i = function (i) {
        i.mfpEl = this, t._openClick(i, e, n)
      };
      n || (n = {});
      var o = "click.magnificPopup";
      n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
    },
    _openClick: function (n, i, o) {
      var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
      if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
        var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
        if (a)
          if (e.isFunction(a)) {
            if (!a.call(t)) return !0
          } else if (b.width() < a) return !0;
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
      }
    },
    updateStatus: function (e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
        var o = {
          status: e,
          text: i
        };
        k("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function (e) {
          e.stopImmediatePropagation()
        }), t.container.addClass("mfp-s-" + e), n = e
      }
    },
    _checkIfClose: function (n) {
      if (!e(n).hasClass(C)) {
        var i = t.st.closeOnContentClick,
          o = t.st.closeOnBgClick;
        if (i && o) return !0;
        if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0
        } else if (o && e.contains(document, n)) return !0;
        return !1
      }
    },
    _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e)
    },
    _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
    },
    _hasScrollBar: function (e) {
      return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || b.height())
    },
    _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
    },
    _onFocusIn: function (n) {
      return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
    },
    _parseMarkup: function (t, n, i) {
      var o;
      i.data && (n = e.extend(i.data, n)), k(u, [t, n, i]), e.each(n, function (e, n) {
        if (void 0 === n || n === !1) return !0;
        if (o = e.split("_"), o.length > 1) {
          var i = t.find(g + "-" + o[0]);
          if (i.length > 0) {
            var r = o[1];
            "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
          }
        } else t.find(g + "-" + e).html(n)
      })
    },
    _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
      }
      return t.scrollbarSize
    }
  }, e.magnificPopup = {
    instance: null,
    proto: y.prototype,
    modules: [],
    open: function (t, n) {
      return E(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
    },
    close: function () {
      return e.magnificPopup.instance && e.magnificPopup.instance.close()
    },
    registerModule: function (t, n) {
      n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">X</button>',
      tClose: "",
      tLoading: "Loading..."
    }
  }, e.fn.magnificPopup = function (n) {
    E();
    var i = e(this);
    if ("string" == typeof n)
      if ("open" === n) {
        var o, r = w ? i.data("magnificPopup") : i[0].magnificPopup,
          a = parseInt(arguments[1], 10) || 0;
        r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({
          mfpEl: o
        }, i, r)
      } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
    else n = e.extend(!0, {}, n), w ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
    return i
  };
  var S, P, O, z = "inline",
    M = function () {
      O && (P.after(O.addClass(S)).detach(), O = null)
    };
  e.magnificPopup.registerModule(z, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function () {
        t.types.push(z), I(s + "." + z, function () {
          M()
        })
      },
      getInline: function (n, i) {
        if (M(), n.src) {
          var o = t.st.inline,
            r = e(n.src);
          if (r.length) {
            var a = r[0].parentNode;
            a && a.tagName && (P || (S = o.hiddenClass, P = x(S), S = "mfp-" + S), O = r.after(P).detach().removeClass(S)), t.updateStatus("ready")
          } else t.updateStatus("error", o.tNotFound), r = e("<div>");
          return n.inlineElement = r, r
        }
        return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
      }
    }
  });
  var B, F = "ajax",
    H = function () {
      B && e(document.body).removeClass(B)
    },
    L = function () {
      H(), t.req && t.req.abort()
    };
  e.magnificPopup.registerModule(F, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function () {
        t.types.push(F), B = t.st.ajax.cursor, I(s + "." + F, L), I("BeforeChange." + F, L)
      },
      getAjax: function (n) {
        B && e(document.body).addClass(B), t.updateStatus("loading");
        var i = e.extend({
          url: n.src,
          success: function (i, o, r) {
            var a = {
              data: i,
              xhr: r
            };
            k("ParseAjax", a), t.appendContent(e(a.data), F), n.finished = !0, H(), t._setFocus(), setTimeout(function () {
              t.wrap.addClass(h)
            }, 16), t.updateStatus("ready"), k("AjaxContentAdded")
          },
          error: function () {
            H(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
          }
        }, t.st.ajax.settings);
        return t.req = e.ajax(i), ""
      }
    }
  });
  var A, j = function (n) {
    if (n.data && void 0 !== n.data.title) return n.data.title;
    var i = t.st.image.titleSrc;
    if (i) {
      if (e.isFunction(i)) return i.call(t, n);
      if (n.el) return n.el.attr(i) || ""
    }
    return ""
  };
  e.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function () {
        var n = t.st.image,
          i = ".image";
        t.types.push("image"), I(p + i, function () {
          "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
        }), I(s + i, function () {
          n.cursor && e(document.body).removeClass(n.cursor), b.off("resize" + g)
        }), I("Resize" + i, t.resizeImage), t.isLowIE && I("AfterChange", t.resizeImage)
      },
      resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
        }
      },
      _onImageHasSize: function (e) {
        e.img && (e.hasSize = !0, A && clearInterval(A), e.isCheckingImgSize = !1, k("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
      },
      findImageSize: function (e) {
        var n = 0,
          i = e.img[0],
          o = function (r) {
            A && clearInterval(A), A = setInterval(function () {
              return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (n > 200 && clearInterval(A), n++, void(3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500)))
            }, r)
          };
        o(1)
      },
      getImage: function (n, i) {
        var o = 0,
          r = function () {
            n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, k("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a()))
          },
          a = function () {
            n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
          },
          s = t.st.image,
          l = i.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
        }
        return t._parseMarkup(i, {
          title: j(n),
          img_replaceWith: n.img
        }, n), t.resizeImage(), n.hasSize ? (A && clearInterval(A), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
      }
    }
  });
  var N, W = function () {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
  };
  e.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (e) {
        return e.is("img") ? e : e.find("img")
      }
    },
    proto: {
      initZoom: function () {
        var e, n = t.st.zoom,
          i = ".zoom";
        if (n.enabled && t.supportsTransition) {
          var o, r, a = n.duration,
            c = function (e) {
              var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                i = "all " + n.duration / 1e3 + "s " + n.easing,
                o = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden"
                },
                r = "transition";
              return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
            },
            d = function () {
              t.content.css("visibility", "visible")
            };
          I("BuildControls" + i, function () {
            if (t._allowZoom()) {
              if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void d();
              r = c(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function () {
                r.css(t._getOffset(!0)), o = setTimeout(function () {
                  d(), setTimeout(function () {
                    r.remove(), e = r = null, k("ZoomAnimationEnded")
                  }, 16)
                }, a)
              }, 16)
            }
          }), I(l + i, function () {
            if (t._allowZoom()) {
              if (clearTimeout(o), t.st.removalDelay = a, !e) {
                if (e = t._getItemToZoom(), !e) return;
                r = c(e)
              }
              r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function () {
                r.css(t._getOffset())
              }, 16)
            }
          }), I(s + i, function () {
            t._allowZoom() && (d(), r && r.remove(), e = null)
          })
        }
      },
      _allowZoom: function () {
        return "image" === t.currItem.type
      },
      _getItemToZoom: function () {
        return t.currItem.hasSize ? t.currItem.img : !1
      },
      _getOffset: function (n) {
        var i;
        i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
        var o = i.offset(),
          r = parseInt(i.css("padding-top"), 10),
          a = parseInt(i.css("padding-bottom"), 10);
        o.top -= e(window).scrollTop() - r;
        var s = {
          width: i.width(),
          height: (w ? i.innerHeight() : i[0].offsetHeight) - a - r
        };
        return W() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
      }
    }
  });
  var R = "iframe",
    Z = "//about:blank",
    q = function (e) {
      if (t.currTemplate[R]) {
        var n = t.currTemplate[R].find("iframe");
        n.length && (e || (n[0].src = Z), t.isIE8 && n.css("display", e ? "block" : "none"))
      }
    };
  e.magnificPopup.registerModule(R, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function () {
        t.types.push(R), I("BeforeChange", function (e, t, n) {
          t !== n && (t === R ? q() : n === R && q(!0))
        }), I(s + "." + R, function () {
          q()
        })
      },
      getIframe: function (n, i) {
        var o = n.src,
          r = t.st.iframe;
        e.each(r.patterns, function () {
          return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
        });
        var a = {};
        return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
      }
    }
  });
  var D = function (e) {
      var n = t.items.length;
      return e > n - 1 ? e - n : 0 > e ? n + e : e
    },
    K = function (e, t, n) {
      return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
    };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function () {
        var n = t.st.gallery,
          o = ".mfp-gallery",
          a = Boolean(e.fn.mfpFastClick);
        return t.direction = !0, n && n.enabled ? (r += " mfp-gallery", I(p + o, function () {
          n.navigateByImgClick && t.wrap.on("click" + o, ".mfp-img", function () {
            return t.items.length > 1 ? (t.next(), !1) : void 0
          }), i.on("keydown" + o, function (e) {
            37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
          })
        }), I("UpdateStatus" + o, function (e, n) {
          n.text && (n.text = K(n.text, t.currItem.index, t.items.length))
        }), I(u + o, function (e, i, o, r) {
          var a = t.items.length;
          o.counter = a > 1 ? K(n.tCounter, r.index, a) : ""
        }), I("BuildControls" + o, function () {
          if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
            var i = n.arrowMarkup,
              o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(C),
              r = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(C),
              s = a ? "mfpFastClick" : "click";
            o[s](function () {
              t.prev()
            }), r[s](function () {
              t.next()
            }), t.isIE7 && (x("b", o[0], !1, !0), x("a", o[0], !1, !0), x("b", r[0], !1, !0), x("a", r[0], !1, !0)), t.container.find('.mfp-bottom-bar').append(o.add(r))
          }
        }), I(f + o, function () {
          t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
            t.preloadNearbyImages(), t._preloadTimeout = null
          }, 16)
        }), void I(s + o, function () {
          i.off(o), t.wrap.off("click" + o), t.arrowLeft && a && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
        })) : !1
      },
      next: function () {
        t.direction = !0, t.index = D(t.index + 1), t.updateItemHTML()
      },
      prev: function () {
        t.direction = !1, t.index = D(t.index - 1), t.updateItemHTML()
      },
      goTo: function (e) {
        t.direction = e >= t.index, t.index = e, t.updateItemHTML()
      },
      preloadNearbyImages: function () {
        var e, n = t.st.gallery.preload,
          i = Math.min(n[0], t.items.length),
          o = Math.min(n[1], t.items.length);
        for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index + e);
        for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index - e)
      },
      _preloadItem: function (n) {
        if (n = D(n), !t.items[n].preloaded) {
          var i = t.items[n];
          i.parsed || (i = t.parseEl(n)), k("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
            i.hasSize = !0
          }).on("error.mfploader", function () {
            i.hasSize = !0, i.loadError = !0, k("LazyLoadError", i)
          }).attr("src", i.src)), i.preloaded = !0
        }
      }
    }
  });
  var Y = "retina";
  e.magnificPopup.registerModule(Y, {
      options: {
        replaceSrc: function (e) {
          return e.src.replace(/\.\w+$/, function (e) {
            return "@2x" + e
          })
        },
        ratio: 1
      },
      proto: {
        initRetina: function () {
          if (window.devicePixelRatio > 1) {
            var e = t.st.retina,
              n = e.ratio;
            n = isNaN(n) ? n() : n, n > 1 && (I("ImageHasSize." + Y, function (e, t) {
              t.img.css({
                "max-width": t.img[0].naturalWidth / n,
                width: "100%"
              })
            }), I("ElementParse." + Y, function (t, i) {
              i.src = e.replaceSrc(i, n)
            }))
          }
        }
      }
    }),
    function () {
      var t = 1e3,
        n = "ontouchstart" in window,
        i = function () {
          b.off("touchmove" + r + " touchend" + r)
        },
        o = "mfpFastClick",
        r = "." + o;
      e.fn.mfpFastClick = function (o) {
        return e(this).each(function () {
          var a, s = e(this);
          if (n) {
            var l, c, d, u, p, f;
            s.on("touchstart" + r, function (e) {
              u = !1, f = 1, p = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], c = p.clientX, d = p.clientY, b.on("touchmove" + r, function (e) {
                p = e.originalEvent ? e.originalEvent.touches : e.touches, f = p.length, p = p[0], (Math.abs(p.clientX - c) > 10 || Math.abs(p.clientY - d) > 10) && (u = !0, i())
              }).on("touchend" + r, function (e) {
                i(), u || f > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function () {
                  a = !1
                }, t), o())
              })
            })
          }
          s.on("click" + r, function () {
            a || o()
          })
        })
      }, e.fn.destroyMfpFastClick = function () {
        e(this).off("touchstart" + r + " click" + r), n && b.off("touchmove" + r + " touchend" + r)
      }
    }(), E()
});


/*! device.js 0.2.7 */
(function () {
  var a, b, c, d, e, f, g, h, i, j;
  b = window.device, a = {}, window.device = a, d = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), a.ios = function () {
    return a.iphone() || a.ipod() || a.ipad()
  }, a.iphone = function () {
    return !a.windows() && e("iphone")
  }, a.ipod = function () {
    return e("ipod")
  }, a.ipad = function () {
    return e("ipad")
  }, a.android = function () {
    return !a.windows() && e("android")
  }, a.androidPhone = function () {
    return a.android() && e("mobile")
  }, a.androidTablet = function () {
    return a.android() && !e("mobile")
  }, a.blackberry = function () {
    return e("blackberry") || e("bb10") || e("rim")
  }, a.blackberryPhone = function () {
    return a.blackberry() && !e("tablet")
  }, a.blackberryTablet = function () {
    return a.blackberry() && e("tablet")
  }, a.windows = function () {
    return e("windows")
  }, a.windowsPhone = function () {
    return a.windows() && e("phone")
  }, a.windowsTablet = function () {
    return a.windows() && e("touch") && !a.windowsPhone()
  }, a.fxos = function () {
    return (e("(mobile;") || e("(tablet;")) && e("; rv:")
  }, a.fxosPhone = function () {
    return a.fxos() && e("mobile")
  }, a.fxosTablet = function () {
    return a.fxos() && e("tablet")
  }, a.meego = function () {
    return e("meego")
  }, a.cordova = function () {
    return window.cordova && "file:" === location.protocol
  }, a.nodeWebkit = function () {
    return "object" == typeof window.process
  }, a.mobile = function () {
    return a.androidPhone() || a.iphone() || a.ipod() || a.windowsPhone() || a.blackberryPhone() || a.fxosPhone() || a.meego()
  }, a.tablet = function () {
    return a.ipad() || a.androidTablet() || a.blackberryTablet() || a.windowsTablet() || a.fxosTablet()
  }, a.desktop = function () {
    return !a.tablet() && !a.mobile()
  }, a.television = function () {
    var a;
    for (television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"], a = 0; a < television.length;) {
      if (e(television[a])) return !0;
      a++
    }
    return !1
  }, a.portrait = function () {
    return window.innerHeight / window.innerWidth > 1
  }, a.landscape = function () {
    return window.innerHeight / window.innerWidth < 1
  }, a.noConflict = function () {
    return window.device = b, this
  }, e = function (a) {
    return -1 !== j.indexOf(a)
  }, g = function (a) {
    var b;
    return b = new RegExp(a, "i"), d.className.match(b)
  }, c = function (a) {
    var b = null;
    g(a) || (b = d.className.replace(/^\s+|\s+$/g, ""), d.className = b + " " + a)
  }, i = function (a) {
    g(a) && (d.className = d.className.replace(" " + a, ""))
  }, a.ios() ? a.ipad() ? c("ios ipad tablet") : a.iphone() ? c("ios iphone mobile") : a.ipod() && c("ios ipod mobile") : a.android() ? c(a.androidTablet() ? "android tablet" : "android mobile") : a.blackberry() ? c(a.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : a.windows() ? c(a.windowsTablet() ? "windows tablet" : a.windowsPhone() ? "windows mobile" : "desktop") : a.fxos() ? c(a.fxosTablet() ? "fxos tablet" : "fxos mobile") : a.meego() ? c("meego mobile") : a.nodeWebkit() ? c("node-webkit") : a.television() ? c("television") : a.desktop() && c("desktop"), a.cordova() && c("cordova"), f = function () {
    a.landscape() ? (i("portrait"), c("landscape")) : (i("landscape"), c("portrait"))
  }, h = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(h, f, !1) : window.attachEvent ? window.attachEvent(h, f) : window[h] = f, f(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
    return a
  }) : "undefined" != typeof module && module.exports ? module.exports = a : window.device = a
}).call(this);


/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery), + function (a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var c in b)
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    return !1
  }
  a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
      d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0
    });
    var e = function () {
      c || a(d).trigger(a.support.transition.end)
    };
    return setTimeout(e, b), this
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function (b) {
        return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
      }
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var c = a(this),
        e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
    })
  }
  var c = '[data-dismiss="alert"]',
    d = function (b) {
      a(b).on("click", c, this.close)
    };
  d.VERSION = "3.3.6", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove()
    }
    var e = a(this),
      f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a(f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.button"),
        f = "object" == typeof b && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
    })
  }
  var c = function (b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
  };
  c.VERSION = "3.3.6", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function (b) {
    var c = "disabled",
      d = this.$element,
      e = d.is("input") ? "val" : "html",
      f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
    }, this), 0)
  }, c.prototype.toggle = function () {
    var a = !0,
      b = this.$element.closest('[data-toggle="buttons"]');
    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target);
    d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.carousel"),
        f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
        g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
    })
  }
  var c = function (b, c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return
      }
      a.preventDefault()
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
      d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
      f = (c + e) % this.$items.length;
    return this.$items.eq(f)
  }, c.prototype.to = function (a) {
    var b = this,
      c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a)
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, c.prototype.next = function () {
    return this.sliding ? void 0 : this.slide("next")
  }, c.prototype.prev = function () {
    return this.sliding ? void 0 : this.slide("prev")
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
      f = d || this.getItemForDirection(b, e),
      g = this.interval,
      h = "next" == b ? "left" : "right",
      i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
      k = a.Event("slide.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active")
      }
      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m)
        }, 0)
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this
  };
  var e = function (c) {
    var d, e = a(this),
      f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
        h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
    }
  };
  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);
      b.call(c, c.data())
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d)
  }

  function c(b) {
    return this.each(function () {
      var c = a(this),
        e = c.data("bs.collapse"),
        f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
    })
  }
  var d = function (b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
  };
  d.VERSION = "3.3.6", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height"
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");
        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
          var h = function () {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
          };
          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
        var e = function () {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e)
    }, this)).end()
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
      g = f.data("bs.collapse"),
      h = g ? "toggle" : e.data();
    c.call(f, h)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
        e = b(d),
        f = {
          relatedTarget: this
        };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
    }))
  }

  function d(b) {
    return this.each(function () {
      var c = a(this),
        d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
    })
  }
  var e = ".dropdown-backdrop",
    f = '[data-toggle="dropdown"]',
    g = function (b) {
      a(b).on("click.bs.dropdown", this.toggle)
    };
  g.VERSION = "3.3.6", g.prototype.toggle = function (d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
        g = f.hasClass("open");
      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
      }
      return !1
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);
      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
          g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
          i = e.find(".dropdown-menu" + h);
        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function (a) {
  "use strict";

  function b(b, d) {
    return this.each(function () {
      var e = a(this),
        f = e.data("bs.modal"),
        g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
    })
  }
  var c = function (b, c) {
    this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a)
  }, c.prototype.show = function (b) {
    var d = this,
      e = a.Event("show.bs.modal", {
        relatedTarget: b
      });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
      })
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f)
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
    }))
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
    }, this))
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
  }, c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
    })
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, c.prototype.backdrop = function (b) {
    var d = this,
      e = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
          return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
        }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var g = function () {
        d.removeBackdrop(), b && b()
      };
      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
    } else b && b()
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog()
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    })
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    })
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;
    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad)
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
      e = d.attr("href"),
      f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
      g = f.data("bs.modal") ? "toggle" : a.extend({
        remote: !/#/.test(e) && e
      }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus")
      })
    }), b.call(f, g, this)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tooltip"),
        f = "object" == typeof b && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function (a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
        click: !1,
        hover: !1,
        focus: !1
      }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
          i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
      c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show)) : c.show())
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState)
      if (this.inState[a]) return !0;
    return !1
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide)) : c.hide())
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
        f = this.tip(),
        g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
        i = /\s?auto?\s?/i,
        j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
        l = f[0].offsetWidth,
        m = f[0].offsetHeight;
      if (j) {
        var n = h,
          o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
      }
      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);
      var q = function () {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
      };
      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
      e = d[0].offsetWidth,
      f = d[0].offsetHeight,
      g = parseInt(d.css("margin-top"), 10),
      h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function (a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        })
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
      j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
      m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
      n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l)
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
  }, c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
    }
    var e = this,
      f = a(this.$tip),
      g = a.Event("hide.bs." + this.type);
    return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
  }, c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, c.prototype.hasContent = function () {
    return this.getTitle()
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;
    var c = b[0],
      d = "BODY" == c.tagName,
      e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = d ? {
        top: 0,
        left: 0
      } : b.offset(),
      g = {
        scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
      },
      h = d ? {
        width: a(window).width(),
        height: a(window).height()
      } : null;
    return a.extend({}, e, g, h, f)
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
      g = this.getPosition(this.$viewport);
    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
        i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
    } else {
      var j = b.left - f,
        k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
    }
    return e
  }, c.prototype.getTitle = function () {
    var a, b = this.$element,
      c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, c.prototype.getUID = function (a) {
    do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
    return a
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, c.prototype.enable = function () {
    this.enabled = !0
  }, c.prototype.disable = function () {
    this.enabled = !1
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }, c.prototype.toggle = function (b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, c.prototype.destroy = function () {
    var a = this;
    clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
    })
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.popover"),
        f = "object" == typeof b && b;
      (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function (a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.6", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS
  }, c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }, c.prototype.getContent = function () {
    var a = this.$element,
      b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
  }

  function c(c) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.scrollspy"),
        f = "object" == typeof c && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }
  b.VERSION = "3.3.6", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, b.prototype.refresh = function () {
    var b = this,
      c = "offset",
      d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
        e = b.data("target") || b.attr("href"),
        f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [
        [f[c]().top + d, e]
      ] || null
    }).sort(function (a, b) {
      return a[0] - b[0]
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1])
    })
  }, b.prototype.process = function () {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset,
      c = this.getScrollHeight(),
      d = this.options.offset + c - this.$scrollElement.height(),
      e = this.offsets,
      f = this.targets,
      g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();
    for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
      d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      c.call(b, b.data())
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
    })
  }
  var c = function (b) {
    this.element = a(b)
  };
  c.VERSION = "3.3.6", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
      c = b.closest("ul:not(.dropdown-menu)"),
      d = b.data("target");
    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
        f = a.Event("hide.bs.tab", {
          relatedTarget: b[0]
        }),
        g = a.Event("show.bs.tab", {
          relatedTarget: e[0]
        });
      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          })
        })
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
    }
    var g = d.find("> .active"),
      h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this
  };
  var e = function (c) {
    c.preventDefault(), b.call(a(this), "show")
  };
  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.affix"),
        f = "object" == typeof b && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
    })
  }
  var c = function (b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
  };
  c.VERSION = "3.3.6", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
      f = this.$element.offset(),
      g = this.$target.height();
    if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
    if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
    var h = null == this.affixed,
      i = h ? e : f.top,
      j = h ? g : b;
    return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
      b = this.$element.offset();
    return this.pinnedOffset = b.top - a
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1)
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
        d = this.options.offset,
        e = d.top,
        f = d.bottom,
        g = Math.max(a(document).height(), a(document.body).height());
      "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);
      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
          j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
      }
      "bottom" == h && this.$element.offset({
        top: g - b - f
      })
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
        d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
    })
  })
}(jQuery);


/* styleswitch [for demonstration purposes only] */
/* styleswitch START */
/**
 * Styleswitch stylesheet switcher built on jQuery
 * Under an Attribution, Share Alike License
 * By Kelvin Luck ( http://www.kelvinluck.com/ )
 **/
(function ($) {
  jQuery(document).ready(function () {
    jQuery(".styleswitch").click(function () {
      switchStylestyle(this.getAttribute("data-color"));
      return false
    });
    var c = readCookie("style");
    if (c) switchStylestyle(c)
  });

  function switchStylestyle(styleName) {
    jQuery("link[rel*=style][title]").each(function (i) {
      this.disabled = true;
      if (this.getAttribute("title") == styleName) this.disabled = false
    })
  }
})(jQuery);

function createCookie(name, value, days) {
  if (days) {
    var date = new Date;
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1E3);
    var expires = "; expires=" + date.toGMTString()
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/"
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name) {
  createCookie(name, "", -1)
};
/* styleswitch END */