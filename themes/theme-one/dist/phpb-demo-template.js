var Ge = (
  /** @class */
  function() {
    function i(t, e) {
      e === void 0 && (e = []), this._eventType = t, this._eventFunctions = e;
    }
    return i.prototype.init = function() {
      var t = this;
      this._eventFunctions.forEach(function(e) {
        typeof window < "u" && window.addEventListener(t._eventType, e);
      });
    }, i;
  }()
), It = globalThis && globalThis.__assign || function() {
  return It = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, It.apply(this, arguments);
}, Dt = {
  alwaysOpen: !1,
  activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
  inactiveClasses: "text-gray-500 dark:text-gray-400",
  onOpen: function() {
  },
  onClose: function() {
  },
  onToggle: function() {
  }
}, Oe = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = []), e === void 0 && (e = Dt), this._items = t, this._options = It(It({}, Dt), e), this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._items.length && this._items.map(function(e) {
        e.active && t.open(e.id), e.triggerEl.addEventListener("click", function() {
          t.toggle(e.id);
        });
      });
    }, i.prototype.getItem = function(t) {
      return this._items.filter(function(e) {
        return e.id === t;
      })[0];
    }, i.prototype.open = function(t) {
      var e, r, n = this, o = this.getItem(t);
      this._options.alwaysOpen || this._items.map(function(s) {
        var a, l;
        s !== o && ((a = s.triggerEl.classList).remove.apply(a, n._options.activeClasses.split(" ")), (l = s.triggerEl.classList).add.apply(l, n._options.inactiveClasses.split(" ")), s.targetEl.classList.add("hidden"), s.triggerEl.setAttribute("aria-expanded", "false"), s.active = !1, s.iconEl && s.iconEl.classList.remove("rotate-180"));
      }), (e = o.triggerEl.classList).add.apply(e, this._options.activeClasses.split(" ")), (r = o.triggerEl.classList).remove.apply(r, this._options.inactiveClasses.split(" ")), o.triggerEl.setAttribute("aria-expanded", "true"), o.targetEl.classList.remove("hidden"), o.active = !0, o.iconEl && o.iconEl.classList.add("rotate-180"), this._options.onOpen(this, o);
    }, i.prototype.toggle = function(t) {
      var e = this.getItem(t);
      e.active ? this.close(t) : this.open(t), this._options.onToggle(this, e);
    }, i.prototype.close = function(t) {
      var e, r, n = this.getItem(t);
      (e = n.triggerEl.classList).remove.apply(e, this._options.activeClasses.split(" ")), (r = n.triggerEl.classList).add.apply(r, this._options.inactiveClasses.split(" ")), n.targetEl.classList.add("hidden"), n.triggerEl.setAttribute("aria-expanded", "false"), n.active = !1, n.iconEl && n.iconEl.classList.remove("rotate-180"), this._options.onClose(this, n);
    }, i;
  }()
);
typeof window < "u" && (window.Accordion = Oe);
function Je() {
  document.querySelectorAll("[data-accordion]").forEach(function(i) {
    var t = i.getAttribute("data-accordion"), e = i.getAttribute("data-active-classes"), r = i.getAttribute("data-inactive-classes"), n = [];
    i.querySelectorAll("[data-accordion-target]").forEach(function(o) {
      var s = {
        id: o.getAttribute("data-accordion-target"),
        triggerEl: o,
        targetEl: document.querySelector(o.getAttribute("data-accordion-target")),
        iconEl: o.querySelector("[data-accordion-icon]"),
        active: o.getAttribute("aria-expanded") === "true"
      };
      n.push(s);
    }), new Oe(n, {
      alwaysOpen: t === "open",
      activeClasses: e || Dt.activeClasses,
      inactiveClasses: r || Dt.inactiveClasses
    });
  });
}
var jt = globalThis && globalThis.__assign || function() {
  return jt = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, jt.apply(this, arguments);
}, pe = {
  onCollapse: function() {
  },
  onExpand: function() {
  },
  onToggle: function() {
  }
}, xe = (
  /** @class */
  function() {
    function i(t, e, r) {
      t === void 0 && (t = null), e === void 0 && (e = null), r === void 0 && (r = pe), this._targetEl = t, this._triggerEl = e, this._options = jt(jt({}, pe), r), this._visible = !1, this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._triggerEl && (this._triggerEl.hasAttribute("aria-expanded") ? this._visible = this._triggerEl.getAttribute("aria-expanded") === "true" : this._visible = !this._targetEl.classList.contains("hidden"), this._triggerEl.addEventListener("click", function() {
        t.toggle();
      }));
    }, i.prototype.collapse = function() {
      this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onCollapse(this);
    }, i.prototype.expand = function() {
      this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onExpand(this);
    }, i.prototype.toggle = function() {
      this._visible ? this.collapse() : this.expand(), this._options.onToggle(this);
    }, i;
  }()
);
typeof window < "u" && (window.Collapse = xe);
function Qe() {
  document.querySelectorAll("[data-collapse-toggle]").forEach(function(i) {
    var t = i.getAttribute("data-collapse-toggle"), e = document.getElementById(t);
    e ? new xe(e, i) : console.error('The target element with id "'.concat(t, '" does not exist. Please check the data-collapse-toggle attribute.'));
  });
}
var J = globalThis && globalThis.__assign || function() {
  return J = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, J.apply(this, arguments);
}, Ct = {
  defaultPosition: 0,
  indicators: {
    items: [],
    activeClasses: "bg-white dark:bg-gray-800",
    inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
  },
  interval: 3e3,
  onNext: function() {
  },
  onPrev: function() {
  },
  onChange: function() {
  }
}, ke = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = []), e === void 0 && (e = Ct), this._items = t, this._options = J(J(J({}, Ct), e), { indicators: J(J({}, Ct.indicators), e.indicators) }), this._activeItem = this.getItem(this._options.defaultPosition), this._indicators = this._options.indicators.items, this._intervalDuration = this._options.interval, this._intervalInstance = null, this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._items.map(function(e) {
        e.el.classList.add("absolute", "inset-0", "transition-transform", "transform");
      }), this._getActiveItem() ? this.slideTo(this._getActiveItem().position) : this.slideTo(0), this._indicators.map(function(e, r) {
        e.el.addEventListener("click", function() {
          t.slideTo(r);
        });
      });
    }, i.prototype.getItem = function(t) {
      return this._items[t];
    }, i.prototype.slideTo = function(t) {
      var e = this._items[t], r = {
        left: e.position === 0 ? this._items[this._items.length - 1] : this._items[e.position - 1],
        middle: e,
        right: e.position === this._items.length - 1 ? this._items[0] : this._items[e.position + 1]
      };
      this._rotate(r), this._setActiveItem(e), this._intervalInstance && (this.pause(), this.cycle()), this._options.onChange(this);
    }, i.prototype.next = function() {
      var t = this._getActiveItem(), e = null;
      t.position === this._items.length - 1 ? e = this._items[0] : e = this._items[t.position + 1], this.slideTo(e.position), this._options.onNext(this);
    }, i.prototype.prev = function() {
      var t = this._getActiveItem(), e = null;
      t.position === 0 ? e = this._items[this._items.length - 1] : e = this._items[t.position - 1], this.slideTo(e.position), this._options.onPrev(this);
    }, i.prototype._rotate = function(t) {
      this._items.map(function(e) {
        e.el.classList.add("hidden");
      }), t.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t.left.el.classList.add("-translate-x-full", "z-10"), t.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10"), t.middle.el.classList.add("translate-x-0", "z-20"), t.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t.right.el.classList.add("translate-x-full", "z-10");
    }, i.prototype.cycle = function() {
      var t = this;
      typeof window < "u" && (this._intervalInstance = window.setInterval(function() {
        t.next();
      }, this._intervalDuration));
    }, i.prototype.pause = function() {
      clearInterval(this._intervalInstance);
    }, i.prototype._getActiveItem = function() {
      return this._activeItem;
    }, i.prototype._setActiveItem = function(t) {
      var e, r, n = this;
      this._activeItem = t;
      var o = t.position;
      this._indicators.length && (this._indicators.map(function(s) {
        var a, l;
        s.el.setAttribute("aria-current", "false"), (a = s.el.classList).remove.apply(a, n._options.indicators.activeClasses.split(" ")), (l = s.el.classList).add.apply(l, n._options.indicators.inactiveClasses.split(" "));
      }), (e = this._indicators[o].el.classList).add.apply(e, this._options.indicators.activeClasses.split(" ")), (r = this._indicators[o].el.classList).remove.apply(r, this._options.indicators.inactiveClasses.split(" ")), this._indicators[o].el.setAttribute("aria-current", "true"));
    }, i;
  }()
);
typeof window < "u" && (window.Carousel = ke);
function Ze() {
  document.querySelectorAll("[data-carousel]").forEach(function(i) {
    var t = i.getAttribute("data-carousel-interval"), e = i.getAttribute("data-carousel") === "slide", r = [], n = 0;
    i.querySelectorAll("[data-carousel-item]").length && Array.from(i.querySelectorAll("[data-carousel-item]")).map(function(d, c) {
      r.push({
        position: c,
        el: d
      }), d.getAttribute("data-carousel-item") === "active" && (n = c);
    });
    var o = [];
    i.querySelectorAll("[data-carousel-slide-to]").length && Array.from(i.querySelectorAll("[data-carousel-slide-to]")).map(function(d) {
      o.push({
        position: parseInt(d.getAttribute("data-carousel-slide-to")),
        el: d
      });
    });
    var s = new ke(r, {
      defaultPosition: n,
      indicators: {
        items: o
      },
      interval: t || Ct.interval
    });
    e && s.cycle();
    var a = i.querySelector("[data-carousel-next]"), l = i.querySelector("[data-carousel-prev]");
    a && a.addEventListener("click", function() {
      s.next();
    }), l && l.addEventListener("click", function() {
      s.prev();
    });
  });
}
var St = globalThis && globalThis.__assign || function() {
  return St = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, St.apply(this, arguments);
}, he = {
  transition: "transition-opacity",
  duration: 300,
  timing: "ease-out",
  onHide: function() {
  }
}, Te = (
  /** @class */
  function() {
    function i(t, e, r) {
      t === void 0 && (t = null), e === void 0 && (e = null), r === void 0 && (r = he), this._targetEl = t, this._triggerEl = e, this._options = St(St({}, he), r), this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._triggerEl && this._triggerEl.addEventListener("click", function() {
        t.hide();
      });
    }, i.prototype.hide = function() {
      var t = this;
      this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0"), setTimeout(function() {
        t._targetEl.classList.add("hidden");
      }, this._options.duration), this._options.onHide(this, this._targetEl);
    }, i;
  }()
);
typeof window < "u" && (window.Dismiss = Te);
function ti() {
  document.querySelectorAll("[data-dismiss-target]").forEach(function(i) {
    var t = i.getAttribute("data-dismiss-target"), e = document.querySelector(t);
    e ? new Te(e, i) : console.error('The dismiss element with id "'.concat(t, '" does not exist. Please check the data-dismiss-target attribute.'));
  });
}
var C = "top", S = "bottom", B = "right", P = "left", Gt = "auto", gt = [C, S, B, P], nt = "start", ht = "end", ei = "clippingParents", Ce = "viewport", dt = "popper", ii = "reference", ve = /* @__PURE__ */ gt.reduce(function(i, t) {
  return i.concat([t + "-" + nt, t + "-" + ht]);
}, []), Pe = /* @__PURE__ */ [].concat(gt, [Gt]).reduce(function(i, t) {
  return i.concat([t, t + "-" + nt, t + "-" + ht]);
}, []), ri = "beforeRead", ni = "read", oi = "afterRead", si = "beforeMain", ai = "main", li = "afterMain", ci = "beforeWrite", di = "write", ui = "afterWrite", fi = [ri, ni, oi, si, ai, li, ci, di, ui];
function R(i) {
  return i ? (i.nodeName || "").toLowerCase() : null;
}
function D(i) {
  if (i == null)
    return window;
  if (i.toString() !== "[object Window]") {
    var t = i.ownerDocument;
    return t && t.defaultView || window;
  }
  return i;
}
function et(i) {
  var t = D(i).Element;
  return i instanceof t || i instanceof Element;
}
function j(i) {
  var t = D(i).HTMLElement;
  return i instanceof t || i instanceof HTMLElement;
}
function Jt(i) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = D(i).ShadowRoot;
  return i instanceof t || i instanceof ShadowRoot;
}
function pi(i) {
  var t = i.state;
  Object.keys(t.elements).forEach(function(e) {
    var r = t.styles[e] || {}, n = t.attributes[e] || {}, o = t.elements[e];
    !j(o) || !R(o) || (Object.assign(o.style, r), Object.keys(n).forEach(function(s) {
      var a = n[s];
      a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function hi(i) {
  var t = i.state, e = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var n = t.elements[r], o = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : e[r]), a = s.reduce(function(l, d) {
        return l[d] = "", l;
      }, {});
      !j(n) || !R(n) || (Object.assign(n.style, a), Object.keys(o).forEach(function(l) {
        n.removeAttribute(l);
      }));
    });
  };
}
const vi = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: pi,
  effect: hi,
  requires: ["computeStyles"]
};
function M(i) {
  return i.split("-")[0];
}
var tt = Math.max, Bt = Math.min, ot = Math.round;
function Xt() {
  var i = navigator.userAgentData;
  return i != null && i.brands && Array.isArray(i.brands) ? i.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ie() {
  return !/^((?!chrome|android).)*safari/i.test(Xt());
}
function st(i, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var r = i.getBoundingClientRect(), n = 1, o = 1;
  t && j(i) && (n = i.offsetWidth > 0 && ot(r.width) / i.offsetWidth || 1, o = i.offsetHeight > 0 && ot(r.height) / i.offsetHeight || 1);
  var s = et(i) ? D(i) : window, a = s.visualViewport, l = !Ie() && e, d = (r.left + (l && a ? a.offsetLeft : 0)) / n, c = (r.top + (l && a ? a.offsetTop : 0)) / o, v = r.width / n, y = r.height / o;
  return {
    width: v,
    height: y,
    top: c,
    right: d + v,
    bottom: c + y,
    left: d,
    x: d,
    y: c
  };
}
function Qt(i) {
  var t = st(i), e = i.offsetWidth, r = i.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: i.offsetLeft,
    y: i.offsetTop,
    width: e,
    height: r
  };
}
function De(i, t) {
  var e = t.getRootNode && t.getRootNode();
  if (i.contains(t))
    return !0;
  if (e && Jt(e)) {
    var r = t;
    do {
      if (r && i.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function V(i) {
  return D(i).getComputedStyle(i);
}
function gi(i) {
  return ["table", "td", "th"].indexOf(R(i)) >= 0;
}
function F(i) {
  return ((et(i) ? i.ownerDocument : (
    // $FlowFixMe[prop-missing]
    i.document
  )) || window.document).documentElement;
}
function zt(i) {
  return R(i) === "html" ? i : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    i.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    i.parentNode || // DOM Element detected
    (Jt(i) ? i.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    F(i)
  );
}
function ge(i) {
  return !j(i) || // https://github.com/popperjs/popper-core/issues/837
  V(i).position === "fixed" ? null : i.offsetParent;
}
function mi(i) {
  var t = /firefox/i.test(Xt()), e = /Trident/i.test(Xt());
  if (e && j(i)) {
    var r = V(i);
    if (r.position === "fixed")
      return null;
  }
  var n = zt(i);
  for (Jt(n) && (n = n.host); j(n) && ["html", "body"].indexOf(R(n)) < 0; ) {
    var o = V(n);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function mt(i) {
  for (var t = D(i), e = ge(i); e && gi(e) && V(e).position === "static"; )
    e = ge(e);
  return e && (R(e) === "html" || R(e) === "body" && V(e).position === "static") ? t : e || mi(i) || t;
}
function Zt(i) {
  return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y";
}
function ut(i, t, e) {
  return tt(i, Bt(t, e));
}
function yi(i, t, e) {
  var r = ut(i, t, e);
  return r > e ? e : r;
}
function je() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Se(i) {
  return Object.assign({}, je(), i);
}
function Be(i, t) {
  return t.reduce(function(e, r) {
    return e[r] = i, e;
  }, {});
}
var _i = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Se(typeof t != "number" ? t : Be(t, gt));
};
function bi(i) {
  var t, e = i.state, r = i.name, n = i.options, o = e.elements.arrow, s = e.modifiersData.popperOffsets, a = M(e.placement), l = Zt(a), d = [P, B].indexOf(a) >= 0, c = d ? "height" : "width";
  if (!(!o || !s)) {
    var v = _i(n.padding, e), y = Qt(o), u = l === "y" ? C : P, b = l === "y" ? S : B, h = e.rects.reference[c] + e.rects.reference[l] - s[l] - e.rects.popper[c], p = s[l] - e.rects.reference[l], _ = mt(o), E = _ ? l === "y" ? _.clientHeight || 0 : _.clientWidth || 0 : 0, L = h / 2 - p / 2, f = v[u], g = E - y[c] - v[b], m = E / 2 - y[c] / 2 + L, w = ut(f, m, g), x = l;
    e.modifiersData[r] = (t = {}, t[x] = w, t.centerOffset = w - m, t);
  }
}
function wi(i) {
  var t = i.state, e = i.options, r = e.element, n = r === void 0 ? "[data-popper-arrow]" : r;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || De(t.elements.popper, n) && (t.elements.arrow = n));
}
const Ei = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: bi,
  effect: wi,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function at(i) {
  return i.split("-")[1];
}
var Li = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ai(i, t) {
  var e = i.x, r = i.y, n = t.devicePixelRatio || 1;
  return {
    x: ot(e * n) / n || 0,
    y: ot(r * n) / n || 0
  };
}
function me(i) {
  var t, e = i.popper, r = i.popperRect, n = i.placement, o = i.variation, s = i.offsets, a = i.position, l = i.gpuAcceleration, d = i.adaptive, c = i.roundOffsets, v = i.isFixed, y = s.x, u = y === void 0 ? 0 : y, b = s.y, h = b === void 0 ? 0 : b, p = typeof c == "function" ? c({
    x: u,
    y: h
  }) : {
    x: u,
    y: h
  };
  u = p.x, h = p.y;
  var _ = s.hasOwnProperty("x"), E = s.hasOwnProperty("y"), L = P, f = C, g = window;
  if (d) {
    var m = mt(e), w = "clientHeight", x = "clientWidth";
    if (m === D(e) && (m = F(e), V(m).position !== "static" && a === "absolute" && (w = "scrollHeight", x = "scrollWidth")), m = m, n === C || (n === P || n === B) && o === ht) {
      f = S;
      var O = v && m === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        m[w]
      );
      h -= O - r.height, h *= l ? 1 : -1;
    }
    if (n === P || (n === C || n === S) && o === ht) {
      L = B;
      var A = v && m === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        m[x]
      );
      u -= A - r.width, u *= l ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: a
  }, d && Li), H = c === !0 ? Ai({
    x: u,
    y: h
  }, D(e)) : {
    x: u,
    y: h
  };
  if (u = H.x, h = H.y, l) {
    var T;
    return Object.assign({}, k, (T = {}, T[f] = E ? "0" : "", T[L] = _ ? "0" : "", T.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + h + "px)" : "translate3d(" + u + "px, " + h + "px, 0)", T));
  }
  return Object.assign({}, k, (t = {}, t[f] = E ? h + "px" : "", t[L] = _ ? u + "px" : "", t.transform = "", t));
}
function Oi(i) {
  var t = i.state, e = i.options, r = e.gpuAcceleration, n = r === void 0 ? !0 : r, o = e.adaptive, s = o === void 0 ? !0 : o, a = e.roundOffsets, l = a === void 0 ? !0 : a, d = {
    placement: M(t.placement),
    variation: at(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, me(Object.assign({}, d, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, me(Object.assign({}, d, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const xi = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Oi,
  data: {}
};
var Lt = {
  passive: !0
};
function ki(i) {
  var t = i.state, e = i.instance, r = i.options, n = r.scroll, o = n === void 0 ? !0 : n, s = r.resize, a = s === void 0 ? !0 : s, l = D(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && d.forEach(function(c) {
    c.addEventListener("scroll", e.update, Lt);
  }), a && l.addEventListener("resize", e.update, Lt), function() {
    o && d.forEach(function(c) {
      c.removeEventListener("scroll", e.update, Lt);
    }), a && l.removeEventListener("resize", e.update, Lt);
  };
}
const Ti = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ki,
  data: {}
};
var Ci = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Pt(i) {
  return i.replace(/left|right|bottom|top/g, function(t) {
    return Ci[t];
  });
}
var Pi = {
  start: "end",
  end: "start"
};
function ye(i) {
  return i.replace(/start|end/g, function(t) {
    return Pi[t];
  });
}
function te(i) {
  var t = D(i), e = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: r
  };
}
function ee(i) {
  return st(F(i)).left + te(i).scrollLeft;
}
function Ii(i, t) {
  var e = D(i), r = F(i), n = e.visualViewport, o = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (n) {
    o = n.width, s = n.height;
    var d = Ie();
    (d || !d && t === "fixed") && (a = n.offsetLeft, l = n.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: a + ee(i),
    y: l
  };
}
function Di(i) {
  var t, e = F(i), r = te(i), n = (t = i.ownerDocument) == null ? void 0 : t.body, o = tt(e.scrollWidth, e.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), s = tt(e.scrollHeight, e.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), a = -r.scrollLeft + ee(i), l = -r.scrollTop;
  return V(n || e).direction === "rtl" && (a += tt(e.clientWidth, n ? n.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function ie(i) {
  var t = V(i), e = t.overflow, r = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + n + r);
}
function He(i) {
  return ["html", "body", "#document"].indexOf(R(i)) >= 0 ? i.ownerDocument.body : j(i) && ie(i) ? i : He(zt(i));
}
function ft(i, t) {
  var e;
  t === void 0 && (t = []);
  var r = He(i), n = r === ((e = i.ownerDocument) == null ? void 0 : e.body), o = D(r), s = n ? [o].concat(o.visualViewport || [], ie(r) ? r : []) : r, a = t.concat(s);
  return n ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(ft(zt(s)))
  );
}
function Yt(i) {
  return Object.assign({}, i, {
    left: i.x,
    top: i.y,
    right: i.x + i.width,
    bottom: i.y + i.height
  });
}
function ji(i, t) {
  var e = st(i, !1, t === "fixed");
  return e.top = e.top + i.clientTop, e.left = e.left + i.clientLeft, e.bottom = e.top + i.clientHeight, e.right = e.left + i.clientWidth, e.width = i.clientWidth, e.height = i.clientHeight, e.x = e.left, e.y = e.top, e;
}
function _e(i, t, e) {
  return t === Ce ? Yt(Ii(i, e)) : et(t) ? ji(t, e) : Yt(Di(F(i)));
}
function Si(i) {
  var t = ft(zt(i)), e = ["absolute", "fixed"].indexOf(V(i).position) >= 0, r = e && j(i) ? mt(i) : i;
  return et(r) ? t.filter(function(n) {
    return et(n) && De(n, r) && R(n) !== "body";
  }) : [];
}
function Bi(i, t, e, r) {
  var n = t === "clippingParents" ? Si(i) : [].concat(t), o = [].concat(n, [e]), s = o[0], a = o.reduce(function(l, d) {
    var c = _e(i, d, r);
    return l.top = tt(c.top, l.top), l.right = Bt(c.right, l.right), l.bottom = Bt(c.bottom, l.bottom), l.left = tt(c.left, l.left), l;
  }, _e(i, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function qe(i) {
  var t = i.reference, e = i.element, r = i.placement, n = r ? M(r) : null, o = r ? at(r) : null, s = t.x + t.width / 2 - e.width / 2, a = t.y + t.height / 2 - e.height / 2, l;
  switch (n) {
    case C:
      l = {
        x: s,
        y: t.y - e.height
      };
      break;
    case S:
      l = {
        x: s,
        y: t.y + t.height
      };
      break;
    case B:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case P:
      l = {
        x: t.x - e.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var d = n ? Zt(n) : null;
  if (d != null) {
    var c = d === "y" ? "height" : "width";
    switch (o) {
      case nt:
        l[d] = l[d] - (t[c] / 2 - e[c] / 2);
        break;
      case ht:
        l[d] = l[d] + (t[c] / 2 - e[c] / 2);
        break;
    }
  }
  return l;
}
function vt(i, t) {
  t === void 0 && (t = {});
  var e = t, r = e.placement, n = r === void 0 ? i.placement : r, o = e.strategy, s = o === void 0 ? i.strategy : o, a = e.boundary, l = a === void 0 ? ei : a, d = e.rootBoundary, c = d === void 0 ? Ce : d, v = e.elementContext, y = v === void 0 ? dt : v, u = e.altBoundary, b = u === void 0 ? !1 : u, h = e.padding, p = h === void 0 ? 0 : h, _ = Se(typeof p != "number" ? p : Be(p, gt)), E = y === dt ? ii : dt, L = i.rects.popper, f = i.elements[b ? E : y], g = Bi(et(f) ? f : f.contextElement || F(i.elements.popper), l, c, s), m = st(i.elements.reference), w = qe({
    reference: m,
    element: L,
    strategy: "absolute",
    placement: n
  }), x = Yt(Object.assign({}, L, w)), O = y === dt ? x : m, A = {
    top: g.top - O.top + _.top,
    bottom: O.bottom - g.bottom + _.bottom,
    left: g.left - O.left + _.left,
    right: O.right - g.right + _.right
  }, k = i.modifiersData.offset;
  if (y === dt && k) {
    var H = k[n];
    Object.keys(A).forEach(function(T) {
      var X = [B, S].indexOf(T) >= 0 ? 1 : -1, Y = [C, S].indexOf(T) >= 0 ? "y" : "x";
      A[T] += H[Y] * X;
    });
  }
  return A;
}
function Hi(i, t) {
  t === void 0 && (t = {});
  var e = t, r = e.placement, n = e.boundary, o = e.rootBoundary, s = e.padding, a = e.flipVariations, l = e.allowedAutoPlacements, d = l === void 0 ? Pe : l, c = at(r), v = c ? a ? ve : ve.filter(function(b) {
    return at(b) === c;
  }) : gt, y = v.filter(function(b) {
    return d.indexOf(b) >= 0;
  });
  y.length === 0 && (y = v);
  var u = y.reduce(function(b, h) {
    return b[h] = vt(i, {
      placement: h,
      boundary: n,
      rootBoundary: o,
      padding: s
    })[M(h)], b;
  }, {});
  return Object.keys(u).sort(function(b, h) {
    return u[b] - u[h];
  });
}
function qi(i) {
  if (M(i) === Gt)
    return [];
  var t = Pt(i);
  return [ye(i), t, ye(t)];
}
function Mi(i) {
  var t = i.state, e = i.options, r = i.name;
  if (!t.modifiersData[r]._skip) {
    for (var n = e.mainAxis, o = n === void 0 ? !0 : n, s = e.altAxis, a = s === void 0 ? !0 : s, l = e.fallbackPlacements, d = e.padding, c = e.boundary, v = e.rootBoundary, y = e.altBoundary, u = e.flipVariations, b = u === void 0 ? !0 : u, h = e.allowedAutoPlacements, p = t.options.placement, _ = M(p), E = _ === p, L = l || (E || !b ? [Pt(p)] : qi(p)), f = [p].concat(L).reduce(function(it, z) {
      return it.concat(M(z) === Gt ? Hi(t, {
        placement: z,
        boundary: c,
        rootBoundary: v,
        padding: d,
        flipVariations: b,
        allowedAutoPlacements: h
      }) : z);
    }, []), g = t.rects.reference, m = t.rects.popper, w = /* @__PURE__ */ new Map(), x = !0, O = f[0], A = 0; A < f.length; A++) {
      var k = f[A], H = M(k), T = at(k) === nt, X = [C, S].indexOf(H) >= 0, Y = X ? "width" : "height", I = vt(t, {
        placement: k,
        boundary: c,
        rootBoundary: v,
        altBoundary: y,
        padding: d
      }), q = X ? T ? B : P : T ? S : C;
      g[Y] > m[Y] && (q = Pt(q));
      var yt = Pt(q), K = [];
      if (o && K.push(I[H] <= 0), a && K.push(I[q] <= 0, I[yt] <= 0), K.every(function(it) {
        return it;
      })) {
        O = k, x = !1;
        break;
      }
      w.set(k, K);
    }
    if (x)
      for (var _t = b ? 3 : 1, Wt = function(z) {
        var ct = f.find(function(wt) {
          var U = w.get(wt);
          if (U)
            return U.slice(0, z).every(function($t) {
              return $t;
            });
        });
        if (ct)
          return O = ct, "break";
      }, lt = _t; lt > 0; lt--) {
        var bt = Wt(lt);
        if (bt === "break")
          break;
      }
    t.placement !== O && (t.modifiersData[r]._skip = !0, t.placement = O, t.reset = !0);
  }
}
const Ri = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Mi,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function be(i, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: i.top - t.height - e.y,
    right: i.right - t.width + e.x,
    bottom: i.bottom - t.height + e.y,
    left: i.left - t.width - e.x
  };
}
function we(i) {
  return [C, B, S, P].some(function(t) {
    return i[t] >= 0;
  });
}
function Vi(i) {
  var t = i.state, e = i.name, r = t.rects.reference, n = t.rects.popper, o = t.modifiersData.preventOverflow, s = vt(t, {
    elementContext: "reference"
  }), a = vt(t, {
    altBoundary: !0
  }), l = be(s, r), d = be(a, n, o), c = we(l), v = we(d);
  t.modifiersData[e] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: d,
    isReferenceHidden: c,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": v
  });
}
const zi = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Vi
};
function Wi(i, t, e) {
  var r = M(i), n = [P, C].indexOf(r) >= 0 ? -1 : 1, o = typeof e == "function" ? e(Object.assign({}, t, {
    placement: i
  })) : e, s = o[0], a = o[1];
  return s = s || 0, a = (a || 0) * n, [P, B].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function $i(i) {
  var t = i.state, e = i.options, r = i.name, n = e.offset, o = n === void 0 ? [0, 0] : n, s = Pe.reduce(function(c, v) {
    return c[v] = Wi(v, t.rects, o), c;
  }, {}), a = s[t.placement], l = a.x, d = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += d), t.modifiersData[r] = s;
}
const Ni = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: $i
};
function Fi(i) {
  var t = i.state, e = i.name;
  t.modifiersData[e] = qe({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Xi = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Fi,
  data: {}
};
function Yi(i) {
  return i === "x" ? "y" : "x";
}
function Ki(i) {
  var t = i.state, e = i.options, r = i.name, n = e.mainAxis, o = n === void 0 ? !0 : n, s = e.altAxis, a = s === void 0 ? !1 : s, l = e.boundary, d = e.rootBoundary, c = e.altBoundary, v = e.padding, y = e.tether, u = y === void 0 ? !0 : y, b = e.tetherOffset, h = b === void 0 ? 0 : b, p = vt(t, {
    boundary: l,
    rootBoundary: d,
    padding: v,
    altBoundary: c
  }), _ = M(t.placement), E = at(t.placement), L = !E, f = Zt(_), g = Yi(f), m = t.modifiersData.popperOffsets, w = t.rects.reference, x = t.rects.popper, O = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, A = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, H = {
    x: 0,
    y: 0
  };
  if (m) {
    if (o) {
      var T, X = f === "y" ? C : P, Y = f === "y" ? S : B, I = f === "y" ? "height" : "width", q = m[f], yt = q + p[X], K = q - p[Y], _t = u ? -x[I] / 2 : 0, Wt = E === nt ? w[I] : x[I], lt = E === nt ? -x[I] : -w[I], bt = t.elements.arrow, it = u && bt ? Qt(bt) : {
        width: 0,
        height: 0
      }, z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : je(), ct = z[X], wt = z[Y], U = ut(0, w[I], it[I]), $t = L ? w[I] / 2 - _t - U - ct - A.mainAxis : Wt - U - ct - A.mainAxis, Ne = L ? -w[I] / 2 + _t + U + wt + A.mainAxis : lt + U + wt + A.mainAxis, Nt = t.elements.arrow && mt(t.elements.arrow), Fe = Nt ? f === "y" ? Nt.clientTop || 0 : Nt.clientLeft || 0 : 0, ne = (T = k == null ? void 0 : k[f]) != null ? T : 0, Xe = q + $t - ne - Fe, Ye = q + Ne - ne, oe = ut(u ? Bt(yt, Xe) : yt, q, u ? tt(K, Ye) : K);
      m[f] = oe, H[f] = oe - q;
    }
    if (a) {
      var se, Ke = f === "x" ? C : P, Ue = f === "x" ? S : B, G = m[g], Et = g === "y" ? "height" : "width", ae = G + p[Ke], le = G - p[Ue], Ft = [C, P].indexOf(_) !== -1, ce = (se = k == null ? void 0 : k[g]) != null ? se : 0, de = Ft ? ae : G - w[Et] - x[Et] - ce + A.altAxis, ue = Ft ? G + w[Et] + x[Et] - ce - A.altAxis : le, fe = u && Ft ? yi(de, G, ue) : ut(u ? de : ae, G, u ? ue : le);
      m[g] = fe, H[g] = fe - G;
    }
    t.modifiersData[r] = H;
  }
}
const Ui = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ki,
  requiresIfExists: ["offset"]
};
function Gi(i) {
  return {
    scrollLeft: i.scrollLeft,
    scrollTop: i.scrollTop
  };
}
function Ji(i) {
  return i === D(i) || !j(i) ? te(i) : Gi(i);
}
function Qi(i) {
  var t = i.getBoundingClientRect(), e = ot(t.width) / i.offsetWidth || 1, r = ot(t.height) / i.offsetHeight || 1;
  return e !== 1 || r !== 1;
}
function Zi(i, t, e) {
  e === void 0 && (e = !1);
  var r = j(t), n = j(t) && Qi(t), o = F(t), s = st(i, n, e), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !e) && ((R(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ie(o)) && (a = Ji(t)), j(t) ? (l = st(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = ee(o))), {
    x: s.left + a.scrollLeft - l.x,
    y: s.top + a.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function tr(i) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), r = [];
  i.forEach(function(o) {
    t.set(o.name, o);
  });
  function n(o) {
    e.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(a) {
      if (!e.has(a)) {
        var l = t.get(a);
        l && n(l);
      }
    }), r.push(o);
  }
  return i.forEach(function(o) {
    e.has(o.name) || n(o);
  }), r;
}
function er(i) {
  var t = tr(i);
  return fi.reduce(function(e, r) {
    return e.concat(t.filter(function(n) {
      return n.phase === r;
    }));
  }, []);
}
function ir(i) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(i());
      });
    })), t;
  };
}
function rr(i) {
  var t = i.reduce(function(e, r) {
    var n = e[r.name];
    return e[r.name] = n ? Object.assign({}, n, r, {
      options: Object.assign({}, n.options, r.options),
      data: Object.assign({}, n.data, r.data)
    }) : r, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var Ee = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Le() {
  for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++)
    t[e] = arguments[e];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function nr(i) {
  i === void 0 && (i = {});
  var t = i, e = t.defaultModifiers, r = e === void 0 ? [] : e, n = t.defaultOptions, o = n === void 0 ? Ee : n;
  return function(a, l, d) {
    d === void 0 && (d = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ee, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, v = [], y = !1, u = {
      state: c,
      setOptions: function(_) {
        var E = typeof _ == "function" ? _(c.options) : _;
        h(), c.options = Object.assign({}, o, c.options, E), c.scrollParents = {
          reference: et(a) ? ft(a) : a.contextElement ? ft(a.contextElement) : [],
          popper: ft(l)
        };
        var L = er(rr([].concat(r, c.options.modifiers)));
        return c.orderedModifiers = L.filter(function(f) {
          return f.enabled;
        }), b(), u.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!y) {
          var _ = c.elements, E = _.reference, L = _.popper;
          if (Le(E, L)) {
            c.rects = {
              reference: Zi(E, mt(L), c.options.strategy === "fixed"),
              popper: Qt(L)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(A) {
              return c.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var f = 0; f < c.orderedModifiers.length; f++) {
              if (c.reset === !0) {
                c.reset = !1, f = -1;
                continue;
              }
              var g = c.orderedModifiers[f], m = g.fn, w = g.options, x = w === void 0 ? {} : w, O = g.name;
              typeof m == "function" && (c = m({
                state: c,
                options: x,
                name: O,
                instance: u
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ir(function() {
        return new Promise(function(p) {
          u.forceUpdate(), p(c);
        });
      }),
      destroy: function() {
        h(), y = !0;
      }
    };
    if (!Le(a, l))
      return u;
    u.setOptions(d).then(function(p) {
      !y && d.onFirstUpdate && d.onFirstUpdate(p);
    });
    function b() {
      c.orderedModifiers.forEach(function(p) {
        var _ = p.name, E = p.options, L = E === void 0 ? {} : E, f = p.effect;
        if (typeof f == "function") {
          var g = f({
            state: c,
            name: _,
            instance: u,
            options: L
          }), m = function() {
          };
          v.push(g || m);
        }
      });
    }
    function h() {
      v.forEach(function(p) {
        return p();
      }), v = [];
    }
    return u;
  };
}
var or = [Ti, Xi, xi, vi, Ni, Ri, Ui, Ei, zi], re = /* @__PURE__ */ nr({
  defaultModifiers: or
}), W = globalThis && globalThis.__assign || function() {
  return W = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, W.apply(this, arguments);
}, At = globalThis && globalThis.__spreadArray || function(i, t, e) {
  if (e || arguments.length === 2)
    for (var r = 0, n = t.length, o; r < n; r++)
      (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return i.concat(o || Array.prototype.slice.call(t));
}, Q = {
  placement: "bottom",
  triggerType: "click",
  offsetSkidding: 0,
  offsetDistance: 10,
  delay: 300,
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, Me = (
  /** @class */
  function() {
    function i(t, e, r) {
      t === void 0 && (t = null), e === void 0 && (e = null), r === void 0 && (r = Q), this._targetEl = t, this._triggerEl = e, this._options = W(W({}, Q), r), this._popperInstance = this._createPopperInstance(), this._visible = !1, this._init();
    }
    return i.prototype._init = function() {
      this._triggerEl && this._setupEventListeners();
    }, i.prototype._setupEventListeners = function() {
      var t = this, e = this._getTriggerEvents();
      this._options.triggerType === "click" && e.showEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          t.toggle();
        });
      }), this._options.triggerType === "hover" && (e.showEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          r === "click" ? t.toggle() : setTimeout(function() {
            t.show();
          }, t._options.delay);
        }), t._targetEl.addEventListener(r, function() {
          t.show();
        });
      }), e.hideEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          setTimeout(function() {
            t._targetEl.matches(":hover") || t.hide();
          }, t._options.delay);
        }), t._targetEl.addEventListener(r, function() {
          setTimeout(function() {
            t._triggerEl.matches(":hover") || t.hide();
          }, t._options.delay);
        });
      }));
    }, i.prototype._createPopperInstance = function() {
      return re(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [
                this._options.offsetSkidding,
                this._options.offsetDistance
              ]
            }
          }
        ]
      });
    }, i.prototype._setupClickOutsideListener = function() {
      var t = this;
      this._clickOutsideEventListener = function(e) {
        t._handleClickOutside(e, t._targetEl);
      }, document.body.addEventListener("click", this._clickOutsideEventListener, !0);
    }, i.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, !0);
    }, i.prototype._handleClickOutside = function(t, e) {
      var r = t.target;
      r !== e && !e.contains(r) && !this._triggerEl.contains(r) && this.isVisible() && this.hide();
    }, i.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "click"],
            hideEvents: ["mouseleave"]
          };
        case "click":
          return {
            showEvents: ["click"],
            hideEvents: []
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["click"],
            hideEvents: []
          };
      }
    }, i.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show(), this._options.onToggle(this);
    }, i.prototype.isVisible = function() {
      return this._visible;
    }, i.prototype.show = function() {
      this._targetEl.classList.remove("hidden"), this._targetEl.classList.add("block"), this._popperInstance.setOptions(function(t) {
        return W(W({}, t), { modifiers: At(At([], t.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, i.prototype.hide = function() {
      this._targetEl.classList.remove("block"), this._targetEl.classList.add("hidden"), this._popperInstance.setOptions(function(t) {
        return W(W({}, t), { modifiers: At(At([], t.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._visible = !1, this._removeClickOutsideListener(), this._options.onHide(this);
    }, i;
  }()
);
typeof window < "u" && (window.Dropdown = Me);
function sr() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function(i) {
    var t = i.getAttribute("data-dropdown-toggle"), e = document.getElementById(t);
    if (e) {
      var r = i.getAttribute("data-dropdown-placement"), n = i.getAttribute("data-dropdown-offset-skidding"), o = i.getAttribute("data-dropdown-offset-distance"), s = i.getAttribute("data-dropdown-trigger"), a = i.getAttribute("data-dropdown-delay");
      new Me(e, i, {
        placement: r || Q.placement,
        triggerType: s || Q.triggerType,
        offsetSkidding: n ? parseInt(n) : Q.offsetSkidding,
        offsetDistance: o ? parseInt(o) : Q.offsetDistance,
        delay: a ? parseInt(a) : Q.delay
      });
    } else
      console.error('The dropdown element with id "'.concat(t, '" does not exist. Please check the data-dropdown-toggle attribute.'));
  });
}
var Ht = globalThis && globalThis.__assign || function() {
  return Ht = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, Ht.apply(this, arguments);
}, rt = {
  placement: "center",
  backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
  backdrop: "dynamic",
  closable: !0,
  onHide: function() {
  },
  onShow: function() {
  },
  onToggle: function() {
  }
}, Kt = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = null), e === void 0 && (e = rt), this._targetEl = t, this._options = Ht(Ht({}, rt), e), this._isHidden = !0, this._backdropEl = null, this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._targetEl && this._getPlacementClasses().map(function(e) {
        t._targetEl.classList.add(e);
      });
    }, i.prototype._createBackdrop = function() {
      var t;
      if (this._isHidden) {
        var e = document.createElement("div");
        e.setAttribute("modal-backdrop", ""), (t = e.classList).add.apply(t, this._options.backdropClasses.split(" ")), document.querySelector("body").append(e), this._backdropEl = e;
      }
    }, i.prototype._destroyBackdropEl = function() {
      this._isHidden || document.querySelector("[modal-backdrop]").remove();
    }, i.prototype._setupModalCloseEventListeners = function() {
      var t = this;
      this._options.backdrop === "dynamic" && (this._clickOutsideEventListener = function(e) {
        t._handleOutsideClick(e.target);
      }, this._targetEl.addEventListener("click", this._clickOutsideEventListener, !0)), this._keydownEventListener = function(e) {
        e.key === "Escape" && t.hide();
      }, document.body.addEventListener("keydown", this._keydownEventListener, !0);
    }, i.prototype._removeModalCloseEventListeners = function() {
      this._options.backdrop === "dynamic" && this._targetEl.removeEventListener("click", this._clickOutsideEventListener, !0), document.body.removeEventListener("keydown", this._keydownEventListener, !0);
    }, i.prototype._handleOutsideClick = function(t) {
      (t === this._targetEl || t === this._backdropEl && this.isVisible()) && this.hide();
    }, i.prototype._getPlacementClasses = function() {
      switch (this._options.placement) {
        case "top-left":
          return ["justify-start", "items-start"];
        case "top-center":
          return ["justify-center", "items-start"];
        case "top-right":
          return ["justify-end", "items-start"];
        case "center-left":
          return ["justify-start", "items-center"];
        case "center":
          return ["justify-center", "items-center"];
        case "center-right":
          return ["justify-end", "items-center"];
        case "bottom-left":
          return ["justify-start", "items-end"];
        case "bottom-center":
          return ["justify-center", "items-end"];
        case "bottom-right":
          return ["justify-end", "items-end"];
        default:
          return ["justify-center", "items-center"];
      }
    }, i.prototype.toggle = function() {
      this._isHidden ? this.show() : this.hide(), this._options.onToggle(this);
    }, i.prototype.show = function() {
      this.isHidden && (this._targetEl.classList.add("flex"), this._targetEl.classList.remove("hidden"), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._createBackdrop(), this._isHidden = !1, document.body.classList.add("overflow-hidden"), this._options.closable && this._setupModalCloseEventListeners(), this._options.onShow(this));
    }, i.prototype.hide = function() {
      this.isVisible && (this._targetEl.classList.add("hidden"), this._targetEl.classList.remove("flex"), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._destroyBackdropEl(), this._isHidden = !0, document.body.classList.remove("overflow-hidden"), this._options.closable && this._removeModalCloseEventListeners(), this._options.onHide(this));
    }, i.prototype.isVisible = function() {
      return !this._isHidden;
    }, i.prototype.isHidden = function() {
      return this._isHidden;
    }, i;
  }()
);
typeof window < "u" && (window.Modal = Kt);
var Ot = function(i, t) {
  return t.some(function(e) {
    return e.id === i;
  }) ? t.find(function(e) {
    return e.id === i;
  }) : null;
};
function ar() {
  var i = [];
  document.querySelectorAll("[data-modal-target]").forEach(function(t) {
    var e = t.getAttribute("data-modal-target"), r = document.getElementById(e);
    if (r) {
      var n = r.getAttribute("data-modal-placement"), o = r.getAttribute("data-modal-backdrop");
      Ot(e, i) || i.push({
        id: e,
        object: new Kt(r, {
          placement: n || rt.placement,
          backdrop: o || rt.backdrop
        })
      });
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."));
  }), document.querySelectorAll("[data-modal-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-modal-toggle"), r = document.getElementById(e);
    if (r) {
      var n = r.getAttribute("data-modal-placement"), o = r.getAttribute("data-modal-backdrop"), s = Ot(e, i);
      s || (s = {
        id: e,
        object: new Kt(r, {
          placement: n || rt.placement,
          backdrop: o || rt.backdrop
        })
      }, i.push(s)), t.addEventListener("click", function() {
        s.object.toggle();
      });
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"));
  }), document.querySelectorAll("[data-modal-show]").forEach(function(t) {
    var e = t.getAttribute("data-modal-show"), r = document.getElementById(e);
    if (r) {
      var n = Ot(e, i);
      n ? t.addEventListener("click", function() {
        n.object.isHidden && n.object.show();
      }) : console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."));
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"));
  }), document.querySelectorAll("[data-modal-hide]").forEach(function(t) {
    var e = t.getAttribute("data-modal-hide"), r = document.getElementById(e);
    if (r) {
      var n = Ot(e, i);
      n ? t.addEventListener("click", function() {
        n.object.isVisible && n.object.hide();
      }) : console.error("Modal with id ".concat(e, " has not been initialized. Please initialize it using the data-modal-target attribute."));
    } else
      console.error("Modal with id ".concat(e, " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"));
  });
}
var qt = globalThis && globalThis.__assign || function() {
  return qt = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, qt.apply(this, arguments);
}, Z = {
  placement: "left",
  bodyScrolling: !1,
  backdrop: !0,
  edge: !1,
  edgeOffset: "bottom-[60px]",
  backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, Re = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = null), e === void 0 && (e = Z), this._targetEl = t, this._options = qt(qt({}, Z), e), this._visible = !1, this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._targetEl && (this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.classList.add("transition-transform")), this._getPlacementClasses(this._options.placement).base.map(function(e) {
        t._targetEl.classList.add(e);
      }), document.addEventListener("keydown", function(e) {
        e.key === "Escape" && t.isVisible() && t.hide();
      });
    }, i.prototype.hide = function() {
      var t = this;
      this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(e) {
        t._targetEl.classList.remove(e);
      }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(e) {
        t._targetEl.classList.add(e);
      })) : (this._getPlacementClasses(this._options.placement).active.map(function(e) {
        t._targetEl.classList.remove(e);
      }), this._getPlacementClasses(this._options.placement).inactive.map(function(e) {
        t._targetEl.classList.add(e);
      })), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._options.bodyScrolling || document.body.classList.remove("overflow-hidden"), this._options.backdrop && this._destroyBackdropEl(), this._visible = !1, this._options.onHide(this);
    }, i.prototype.show = function() {
      var t = this;
      this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(e) {
        t._targetEl.classList.add(e);
      }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(e) {
        t._targetEl.classList.remove(e);
      })) : (this._getPlacementClasses(this._options.placement).active.map(function(e) {
        t._targetEl.classList.add(e);
      }), this._getPlacementClasses(this._options.placement).inactive.map(function(e) {
        t._targetEl.classList.remove(e);
      })), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._options.bodyScrolling || document.body.classList.add("overflow-hidden"), this._options.backdrop && this._createBackdrop(), this._visible = !0, this._options.onShow(this);
    }, i.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show();
    }, i.prototype._createBackdrop = function() {
      var t, e = this;
      if (!this._visible) {
        var r = document.createElement("div");
        r.setAttribute("drawer-backdrop", ""), (t = r.classList).add.apply(t, this._options.backdropClasses.split(" ")), document.querySelector("body").append(r), r.addEventListener("click", function() {
          e.hide();
        });
      }
    }, i.prototype._destroyBackdropEl = function() {
      this._visible && document.querySelector("[drawer-backdrop]").remove();
    }, i.prototype._getPlacementClasses = function(t) {
      switch (t) {
        case "top":
          return {
            base: ["top-0", "left-0", "right-0"],
            active: ["transform-none"],
            inactive: ["-translate-y-full"]
          };
        case "right":
          return {
            base: ["right-0", "top-0"],
            active: ["transform-none"],
            inactive: ["translate-x-full"]
          };
        case "bottom":
          return {
            base: ["bottom-0", "left-0", "right-0"],
            active: ["transform-none"],
            inactive: ["translate-y-full"]
          };
        case "left":
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["-translate-x-full"]
          };
        case "bottom-edge":
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["translate-y-full", this._options.edgeOffset]
          };
        default:
          return {
            base: ["left-0", "top-0"],
            active: ["transform-none"],
            inactive: ["-translate-x-full"]
          };
      }
    }, i.prototype.isHidden = function() {
      return !this._visible;
    }, i.prototype.isVisible = function() {
      return this._visible;
    }, i;
  }()
);
typeof window < "u" && (window.Drawer = Re);
var xt = function(i, t) {
  if (t.some(function(e) {
    return e.id === i;
  }))
    return t.find(function(e) {
      return e.id === i;
    });
};
function lr() {
  var i = [];
  document.querySelectorAll("[data-drawer-target]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-target"), r = document.getElementById(e);
    if (r) {
      var n = t.getAttribute("data-drawer-placement"), o = t.getAttribute("data-drawer-body-scrolling"), s = t.getAttribute("data-drawer-backdrop"), a = t.getAttribute("data-drawer-edge"), l = t.getAttribute("data-drawer-edge-offset");
      xt(e, i) || i.push({
        id: e,
        object: new Re(r, {
          placement: n || Z.placement,
          bodyScrolling: o ? o === "true" : Z.bodyScrolling,
          backdrop: s ? s === "true" : Z.backdrop,
          edge: a ? a === "true" : Z.edge,
          edgeOffset: l || Z.edgeOffset
        })
      });
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  }), document.querySelectorAll("[data-drawer-toggle]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-toggle"), r = document.getElementById(e);
    if (r) {
      var n = xt(e, i);
      n ? t.addEventListener("click", function() {
        n.object.toggle();
      }) : console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  }), document.querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-dismiss") ? t.getAttribute("data-drawer-dismiss") : t.getAttribute("data-drawer-hide"), r = document.getElementById(e);
    if (r) {
      var n = xt(e, i);
      n ? t.addEventListener("click", function() {
        n.object.hide();
      }) : console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"));
  }), document.querySelectorAll("[data-drawer-show]").forEach(function(t) {
    var e = t.getAttribute("data-drawer-show"), r = document.getElementById(e);
    if (r) {
      var n = xt(e, i);
      n ? t.addEventListener("click", function() {
        n.object.show();
      }) : console.error("Drawer with id ".concat(e, " has not been initialized. Please initialize it using the data-drawer-target attribute."));
    } else
      console.error("Drawer with id ".concat(e, " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"));
  });
}
var Mt = globalThis && globalThis.__assign || function() {
  return Mt = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, Mt.apply(this, arguments);
}, Ae = {
  defaultTabId: null,
  activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
  inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
  onShow: function() {
  }
}, Ve = (
  /** @class */
  function() {
    function i(t, e) {
      t === void 0 && (t = []), e === void 0 && (e = Ae), this._items = t, this._activeTab = e ? this.getTab(e.defaultTabId) : null, this._options = Mt(Mt({}, Ae), e), this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      this._items.length && (this._activeTab || this._setActiveTab(this._items[0]), this.show(this._activeTab.id, !0), this._items.map(function(e) {
        e.triggerEl.addEventListener("click", function() {
          t.show(e.id);
        });
      }));
    }, i.prototype.getActiveTab = function() {
      return this._activeTab;
    }, i.prototype._setActiveTab = function(t) {
      this._activeTab = t;
    }, i.prototype.getTab = function(t) {
      return this._items.filter(function(e) {
        return e.id === t;
      })[0];
    }, i.prototype.show = function(t, e) {
      var r, n, o = this;
      e === void 0 && (e = !1);
      var s = this.getTab(t);
      s === this._activeTab && !e || (this._items.map(function(a) {
        var l, d;
        a !== s && ((l = a.triggerEl.classList).remove.apply(l, o._options.activeClasses.split(" ")), (d = a.triggerEl.classList).add.apply(d, o._options.inactiveClasses.split(" ")), a.targetEl.classList.add("hidden"), a.triggerEl.setAttribute("aria-selected", "false"));
      }), (r = s.triggerEl.classList).add.apply(r, this._options.activeClasses.split(" ")), (n = s.triggerEl.classList).remove.apply(n, this._options.inactiveClasses.split(" ")), s.triggerEl.setAttribute("aria-selected", "true"), s.targetEl.classList.remove("hidden"), this._setActiveTab(s), this._options.onShow(this, s));
    }, i;
  }()
);
typeof window < "u" && (window.Tabs = Ve);
function cr() {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function(i) {
    var t = [], e = null;
    i.querySelectorAll('[role="tab"]').forEach(function(r) {
      var n = r.getAttribute("aria-selected") === "true", o = {
        id: r.getAttribute("data-tabs-target"),
        triggerEl: r,
        targetEl: document.querySelector(r.getAttribute("data-tabs-target"))
      };
      t.push(o), n && (e = o.id);
    }), new Ve(t, {
      defaultTabId: e
    });
  });
}
var $ = globalThis && globalThis.__assign || function() {
  return $ = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, $.apply(this, arguments);
}, kt = globalThis && globalThis.__spreadArray || function(i, t, e) {
  if (e || arguments.length === 2)
    for (var r = 0, n = t.length, o; r < n; r++)
      (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return i.concat(o || Array.prototype.slice.call(t));
}, Rt = {
  placement: "top",
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, ze = (
  /** @class */
  function() {
    function i(t, e, r) {
      t === void 0 && (t = null), e === void 0 && (e = null), r === void 0 && (r = Rt), this._targetEl = t, this._triggerEl = e, this._options = $($({}, Rt), r), this._popperInstance = this._createPopperInstance(), this._visible = !1, this._init();
    }
    return i.prototype._init = function() {
      this._triggerEl && this._setupEventListeners();
    }, i.prototype._setupEventListeners = function() {
      var t = this, e = this._getTriggerEvents();
      e.showEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          t.show();
        });
      }), e.hideEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          t.hide();
        });
      });
    }, i.prototype._createPopperInstance = function() {
      return re(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }
        ]
      });
    }, i.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    }, i.prototype._setupKeydownListener = function() {
      var t = this;
      this._keydownEventListener = function(e) {
        e.key === "Escape" && t.hide();
      }, document.body.addEventListener("keydown", this._keydownEventListener, !0);
    }, i.prototype._removeKeydownListener = function() {
      document.body.removeEventListener("keydown", this._keydownEventListener, !0);
    }, i.prototype._setupClickOutsideListener = function() {
      var t = this;
      this._clickOutsideEventListener = function(e) {
        t._handleClickOutside(e, t._targetEl);
      }, document.body.addEventListener("click", this._clickOutsideEventListener, !0);
    }, i.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, !0);
    }, i.prototype._handleClickOutside = function(t, e) {
      var r = t.target;
      r !== e && !e.contains(r) && !this._triggerEl.contains(r) && this.isVisible() && this.hide();
    }, i.prototype.isVisible = function() {
      return this._visible;
    }, i.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show();
    }, i.prototype.show = function() {
      this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(t) {
        return $($({}, t), { modifiers: kt(kt([], t.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, i.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(t) {
        return $($({}, t), { modifiers: kt(kt([], t.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this);
    }, i;
  }()
);
typeof window < "u" && (window.Tooltip = ze);
function dr() {
  document.querySelectorAll("[data-tooltip-target]").forEach(function(i) {
    var t = i.getAttribute("data-tooltip-target"), e = document.getElementById(t);
    if (e) {
      var r = i.getAttribute("data-tooltip-trigger"), n = i.getAttribute("data-tooltip-placement");
      new ze(e, i, {
        placement: n || Rt.placement,
        triggerType: r || Rt.triggerType
      });
    } else
      console.error('The tooltip element with id "'.concat(t, '" does not exist. Please check the data-tooltip-target attribute.'));
  });
}
var N = globalThis && globalThis.__assign || function() {
  return N = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, N.apply(this, arguments);
}, Tt = globalThis && globalThis.__spreadArray || function(i, t, e) {
  if (e || arguments.length === 2)
    for (var r = 0, n = t.length, o; r < n; r++)
      (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return i.concat(o || Array.prototype.slice.call(t));
}, pt = {
  placement: "top",
  offset: 10,
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, We = (
  /** @class */
  function() {
    function i(t, e, r) {
      t === void 0 && (t = null), e === void 0 && (e = null), r === void 0 && (r = pt), this._targetEl = t, this._triggerEl = e, this._options = N(N({}, pt), r), this._popperInstance = this._createPopperInstance(), this._visible = !1, this._init();
    }
    return i.prototype._init = function() {
      this._triggerEl && this._setupEventListeners();
    }, i.prototype._setupEventListeners = function() {
      var t = this, e = this._getTriggerEvents();
      e.showEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          t.show();
        }), t._targetEl.addEventListener(r, function() {
          t.show();
        });
      }), e.hideEvents.forEach(function(r) {
        t._triggerEl.addEventListener(r, function() {
          setTimeout(function() {
            t._targetEl.matches(":hover") || t.hide();
          }, 100);
        }), t._targetEl.addEventListener(r, function() {
          setTimeout(function() {
            t._triggerEl.matches(":hover") || t.hide();
          }, 100);
        });
      });
    }, i.prototype._createPopperInstance = function() {
      return re(this._triggerEl, this._targetEl, {
        placement: this._options.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, this._options.offset]
            }
          }
        ]
      });
    }, i.prototype._getTriggerEvents = function() {
      switch (this._options.triggerType) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    }, i.prototype._setupKeydownListener = function() {
      var t = this;
      this._keydownEventListener = function(e) {
        e.key === "Escape" && t.hide();
      }, document.body.addEventListener("keydown", this._keydownEventListener, !0);
    }, i.prototype._removeKeydownListener = function() {
      document.body.removeEventListener("keydown", this._keydownEventListener, !0);
    }, i.prototype._setupClickOutsideListener = function() {
      var t = this;
      this._clickOutsideEventListener = function(e) {
        t._handleClickOutside(e, t._targetEl);
      }, document.body.addEventListener("click", this._clickOutsideEventListener, !0);
    }, i.prototype._removeClickOutsideListener = function() {
      document.body.removeEventListener("click", this._clickOutsideEventListener, !0);
    }, i.prototype._handleClickOutside = function(t, e) {
      var r = t.target;
      r !== e && !e.contains(r) && !this._triggerEl.contains(r) && this.isVisible() && this.hide();
    }, i.prototype.isVisible = function() {
      return this._visible;
    }, i.prototype.toggle = function() {
      this.isVisible() ? this.hide() : this.show(), this._options.onToggle(this);
    }, i.prototype.show = function() {
      this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(t) {
        return N(N({}, t), { modifiers: Tt(Tt([], t.modifiers, !0), [
          { name: "eventListeners", enabled: !0 }
        ], !1) });
      }), this._setupClickOutsideListener(), this._setupKeydownListener(), this._popperInstance.update(), this._visible = !0, this._options.onShow(this);
    }, i.prototype.hide = function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(t) {
        return N(N({}, t), { modifiers: Tt(Tt([], t.modifiers, !0), [
          { name: "eventListeners", enabled: !1 }
        ], !1) });
      }), this._removeClickOutsideListener(), this._removeKeydownListener(), this._visible = !1, this._options.onHide(this);
    }, i;
  }()
);
typeof window < "u" && (window.Popover = We);
function ur() {
  document.querySelectorAll("[data-popover-target]").forEach(function(i) {
    var t = i.getAttribute("data-popover-target"), e = document.getElementById(t);
    if (e) {
      var r = i.getAttribute("data-popover-trigger"), n = i.getAttribute("data-popover-placement"), o = i.getAttribute("data-popover-offset");
      new We(e, i, {
        placement: n || pt.placement,
        offset: o ? parseInt(o) : pt.offset,
        triggerType: r || pt.triggerType
      });
    } else
      console.error('The popover element with id "'.concat(t, '" does not exist. Please check the data-popover-target attribute.'));
  });
}
var Vt = globalThis && globalThis.__assign || function() {
  return Vt = Object.assign || function(i) {
    for (var t, e = 1, r = arguments.length; e < r; e++) {
      t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, Vt.apply(this, arguments);
}, Ut = {
  triggerType: "hover",
  onShow: function() {
  },
  onHide: function() {
  },
  onToggle: function() {
  }
}, $e = (
  /** @class */
  function() {
    function i(t, e, r, n) {
      t === void 0 && (t = null), e === void 0 && (e = null), r === void 0 && (r = null), n === void 0 && (n = Ut), this._parentEl = t, this._triggerEl = e, this._targetEl = r, this._options = Vt(Vt({}, Ut), n), this._visible = !1, this._init();
    }
    return i.prototype._init = function() {
      var t = this;
      if (this._triggerEl) {
        var e = this._getTriggerEventTypes(this._options.triggerType);
        e.showEvents.forEach(function(r) {
          t._triggerEl.addEventListener(r, function() {
            t.show();
          }), t._targetEl.addEventListener(r, function() {
            t.show();
          });
        }), e.hideEvents.forEach(function(r) {
          t._parentEl.addEventListener(r, function() {
            t._parentEl.matches(":hover") || t.hide();
          });
        });
      }
    }, i.prototype.hide = function() {
      this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onHide(this);
    }, i.prototype.show = function() {
      this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onShow(this);
    }, i.prototype.toggle = function() {
      this._visible ? this.hide() : this.show();
    }, i.prototype.isHidden = function() {
      return !this._visible;
    }, i.prototype.isVisible = function() {
      return this._visible;
    }, i.prototype._getTriggerEventTypes = function(t) {
      switch (t) {
        case "hover":
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
        case "click":
          return {
            showEvents: ["click", "focus"],
            hideEvents: ["focusout", "blur"]
          };
        case "none":
          return {
            showEvents: [],
            hideEvents: []
          };
        default:
          return {
            showEvents: ["mouseenter", "focus"],
            hideEvents: ["mouseleave", "blur"]
          };
      }
    }, i;
  }()
);
typeof window < "u" && (window.Dial = $e);
function fr() {
  document.querySelectorAll("[data-dial-init]").forEach(function(i) {
    var t = i.querySelector("[data-dial-toggle]");
    if (t) {
      var e = t.getAttribute("data-dial-toggle"), r = document.getElementById(e);
      if (r) {
        var n = t.getAttribute("data-dial-trigger");
        new $e(i, t, r, {
          triggerType: n || Ut.triggerType
        });
      } else
        console.error("Dial with id ".concat(e, " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"));
    } else
      console.error("Dial with id ".concat(i.id, " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"));
  });
}
var pr = new Ge("load", [
  Je,
  Qe,
  Ze,
  ti,
  sr,
  ar,
  lr,
  cr,
  dr,
  ur,
  fr
]);
pr.init();
