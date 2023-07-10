var Ce = !1, Me = !1, R = [], Te = -1;
function Lr(e) {
  Fr(e);
}
function Fr(e) {
  R.includes(e) || R.push(e), zr();
}
function vt(e) {
  let t = R.indexOf(e);
  t !== -1 && t > Te && R.splice(t, 1);
}
function zr() {
  !Me && !Ce && (Ce = !0, queueMicrotask(kr));
}
function kr() {
  Ce = !1, Me = !0;
  for (let e = 0; e < R.length; e++)
    R[e](), Te = e;
  R.length = 0, Te = -1, Me = !1;
}
var K, H, Q, mt, Ie = !0;
function Dr(e) {
  Ie = !1, e(), Ie = !0;
}
function Kr(e) {
  K = e.reactive, Q = e.release, H = (t) => e.effect(t, { scheduler: (r) => {
    Ie ? Lr(r) : r();
  } }), mt = e.raw;
}
function lt(e) {
  H = e;
}
function Hr(e) {
  let t = () => {
  };
  return [(n) => {
    let i = H(n);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((o) => o());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), Q(i));
    }, i;
  }, () => {
    t();
  }];
}
var xt = [], bt = [], wt = [];
function Ur(e) {
  wt.push(e);
}
function Et(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, bt.push(t));
}
function Br(e) {
  xt.push(e);
}
function Yr(e, t, r) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r);
}
function At(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
    (t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
  });
}
var Be = new MutationObserver(Je), Ye = !1;
function We() {
  Be.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Ye = !0;
}
function St() {
  Wr(), Be.disconnect(), Ye = !1;
}
var J = [], Ee = !1;
function Wr() {
  J = J.concat(Be.takeRecords()), J.length && !Ee && (Ee = !0, queueMicrotask(() => {
    qr(), Ee = !1;
  }));
}
function qr() {
  Je(J), J.length = 0;
}
function m(e) {
  if (!Ye)
    return e();
  St();
  let t = e();
  return We(), t;
}
var qe = !1, se = [];
function Jr() {
  qe = !0;
}
function Vr() {
  qe = !1, Je(se), se = [];
}
function Je(e) {
  if (qe) {
    se = se.concat(e);
    return;
  }
  let t = [], r = [], n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let o = 0; o < e.length; o++)
    if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)), e[o].removedNodes.forEach((a) => a.nodeType === 1 && r.push(a))), e[o].type === "attributes")) {
      let a = e[o].target, s = e[o].attributeName, u = e[o].oldValue, c = () => {
        n.has(a) || n.set(a, []), n.get(a).push({ name: s, value: a.getAttribute(s) });
      }, l = () => {
        i.has(a) || i.set(a, []), i.get(a).push(s);
      };
      a.hasAttribute(s) && u === null ? c() : a.hasAttribute(s) ? (l(), c()) : l();
    }
  i.forEach((o, a) => {
    At(a, o);
  }), n.forEach((o, a) => {
    xt.forEach((s) => s(a, o));
  });
  for (let o of r)
    if (!t.includes(o) && (bt.forEach((a) => a(o)), o._x_cleanups))
      for (; o._x_cleanups.length; )
        o._x_cleanups.pop()();
  t.forEach((o) => {
    o._x_ignoreSelf = !0, o._x_ignore = !0;
  });
  for (let o of t)
    r.includes(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, wt.forEach((a) => a(o)), o._x_ignore = !0, o._x_ignoreSelf = !0);
  t.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }), t = null, r = null, n = null, i = null;
}
function Ot(e) {
  return te(k(e));
}
function ee(e, t, r) {
  return e._x_dataStack = [t, ...k(r || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
  };
}
function k(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? k(e.host) : e.parentNode ? k(e.parentNode) : [];
}
function te(e) {
  let t = new Proxy({}, {
    ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
    has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
    get: (r, n) => (e.find((i) => {
      if (i.hasOwnProperty(n)) {
        let o = Object.getOwnPropertyDescriptor(i, n);
        if (o.get && o.get._x_alreadyBound || o.set && o.set._x_alreadyBound)
          return !0;
        if ((o.get || o.set) && o.enumerable) {
          let a = o.get, s = o.set, u = o;
          a = a && a.bind(t), s = s && s.bind(t), a && (a._x_alreadyBound = !0), s && (s._x_alreadyBound = !0), Object.defineProperty(i, n, {
            ...u,
            get: a,
            set: s
          });
        }
        return !0;
      }
      return !1;
    }) || {})[n],
    set: (r, n, i) => {
      let o = e.find((a) => a.hasOwnProperty(n));
      return o ? o[n] = i : e[e.length - 1][n] = i, !0;
    }
  });
  return t;
}
function Ct(e) {
  let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null, r = (n, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o, { value: a, enumerable: s }]) => {
      if (s === !1 || a === void 0)
        return;
      let u = i === "" ? o : `${i}.${o}`;
      typeof a == "object" && a !== null && a._x_interceptor ? n[o] = a.initialize(e, u, o) : t(a) && a !== n && !(a instanceof Element) && r(a, u);
    });
  };
  return r(e);
}
function Mt(e, t = () => {
}) {
  let r = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(n, i, o) {
      return e(this.initialValue, () => Gr(n, i), (a) => Pe(n, i, a), i, o);
    }
  };
  return t(r), (n) => {
    if (typeof n == "object" && n !== null && n._x_interceptor) {
      let i = r.initialize.bind(r);
      r.initialize = (o, a, s) => {
        let u = n.initialize(o, a, s);
        return r.initialValue = u, i(o, a, s);
      };
    } else
      r.initialValue = n;
    return r;
  };
}
function Gr(e, t) {
  return t.split(".").reduce((r, n) => r[n], e);
}
function Pe(e, t, r) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = r;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), Pe(e[t[0]], t.slice(1), r);
  }
}
var Tt = {};
function A(e, t) {
  Tt[e] = t;
}
function $e(e, t) {
  return Object.entries(Tt).forEach(([r, n]) => {
    let i = null;
    function o() {
      if (i)
        return i;
      {
        let [a, s] = Rt(t);
        return i = { interceptor: Mt, ...a }, Et(t, s), i;
      }
    }
    Object.defineProperty(e, `$${r}`, {
      get() {
        return n(t, o());
      },
      enumerable: !1
    });
  }), e;
}
function Zr(e, t, r, ...n) {
  try {
    return r(...n);
  } catch (i) {
    Z(i, e, t);
  }
}
function Z(e, t, r = void 0) {
  Object.assign(e, { el: t, expression: r }), console.warn(`Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var ae = !0;
function Xr(e) {
  let t = ae;
  ae = !1, e(), ae = t;
}
function z(e, t, r = {}) {
  let n;
  return b(e, t)((i) => n = i, r), n;
}
function b(...e) {
  return It(...e);
}
var It = Pt;
function Qr(e) {
  It = e;
}
function Pt(e, t) {
  let r = {};
  $e(r, e);
  let n = [r, ...k(e)], i = typeof t == "function" ? en(n, t) : rn(n, t, e);
  return Zr.bind(null, e, t, i);
}
function en(e, t) {
  return (r = () => {
  }, { scope: n = {}, params: i = [] } = {}) => {
    let o = t.apply(te([n, ...e]), i);
    ue(r, o);
  };
}
var Ae = {};
function tn(e, t) {
  if (Ae[e])
    return Ae[e];
  let r = Object.getPrototypeOf(async function() {
  }).constructor, n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(async()=>{ ${e} })()` : e, o = (() => {
    try {
      return new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);
    } catch (a) {
      return Z(a, t, e), Promise.resolve();
    }
  })();
  return Ae[e] = o, o;
}
function rn(e, t, r) {
  let n = tn(t, r);
  return (i = () => {
  }, { scope: o = {}, params: a = [] } = {}) => {
    n.result = void 0, n.finished = !1;
    let s = te([o, ...e]);
    if (typeof n == "function") {
      let u = n(n, s).catch((c) => Z(c, r, t));
      n.finished ? (ue(i, n.result, s, a, r), n.result = void 0) : u.then((c) => {
        ue(i, c, s, a, r);
      }).catch((c) => Z(c, r, t)).finally(() => n.result = void 0);
    }
  };
}
function ue(e, t, r, n, i) {
  if (ae && typeof t == "function") {
    let o = t.apply(r, n);
    o instanceof Promise ? o.then((a) => ue(e, a, r, n)).catch((a) => Z(a, i, t)) : e(o);
  } else
    typeof t == "object" && t instanceof Promise ? t.then((o) => e(o)) : e(t);
}
var Ve = "x-";
function U(e = "") {
  return Ve + e;
}
function nn(e) {
  Ve = e;
}
var je = {};
function y(e, t) {
  return je[e] = t, {
    before(r) {
      if (!je[r]) {
        console.warn("Cannot find directive `${directive}`. `${name}` will use the default order of execution");
        return;
      }
      const n = j.indexOf(r);
      j.splice(n >= 0 ? n : j.indexOf("DEFAULT"), 0, e);
    }
  };
}
function Ge(e, t, r) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let o = Object.entries(e._x_virtualDirectives).map(([s, u]) => ({ name: s, value: u })), a = $t(o);
    o = o.map((s) => a.find((u) => u.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), t = t.concat(o);
  }
  let n = {};
  return t.map(Ft((o, a) => n[o] = a)).filter(kt).map(sn(n, r)).sort(un).map((o) => an(e, o));
}
function $t(e) {
  return Array.from(e).map(Ft()).filter((t) => !kt(t));
}
var Re = !1, q = /* @__PURE__ */ new Map(), jt = Symbol();
function on(e) {
  Re = !0;
  let t = Symbol();
  jt = t, q.set(t, []);
  let r = () => {
    for (; q.get(t).length; )
      q.get(t).shift()();
    q.delete(t);
  }, n = () => {
    Re = !1, r();
  };
  e(r), n();
}
function Rt(e) {
  let t = [], r = (s) => t.push(s), [n, i] = Hr(e);
  return t.push(i), [{
    Alpine: ne,
    effect: n,
    cleanup: r,
    evaluateLater: b.bind(b, e),
    evaluate: z.bind(z, e)
  }, () => t.forEach((s) => s())];
}
function an(e, t) {
  let r = () => {
  }, n = je[t.type] || r, [i, o] = Rt(e);
  Yr(e, t.original, o);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), n = n.bind(n, e, t, i), Re ? q.get(jt).push(n) : n());
  };
  return a.runCleanups = o, a;
}
var Nt = (e, t) => ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }), Lt = (e) => e;
function Ft(e = () => {
}) {
  return ({ name: t, value: r }) => {
    let { name: n, value: i } = zt.reduce((o, a) => a(o), { name: t, value: r });
    return n !== t && e(n, t), { name: n, value: i };
  };
}
var zt = [];
function Ze(e) {
  zt.push(e);
}
function kt({ name: e }) {
  return Dt().test(e);
}
var Dt = () => new RegExp(`^${Ve}([^:^.]+)\\b`);
function sn(e, t) {
  return ({ name: r, value: n }) => {
    let i = r.match(Dt()), o = r.match(/:([a-zA-Z0-9\-:]+)/), a = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[r] || r;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: a.map((u) => u.replace(".", "")),
      expression: n,
      original: s
    };
  };
}
var Ne = "DEFAULT", j = [
  "ignore",
  "ref",
  "data",
  "id",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  Ne,
  "teleport"
];
function un(e, t) {
  let r = j.indexOf(e.type) === -1 ? Ne : e.type, n = j.indexOf(t.type) === -1 ? Ne : t.type;
  return j.indexOf(r) - j.indexOf(n);
}
function V(e, t, r = {}) {
  e.dispatchEvent(new CustomEvent(t, {
    detail: r,
    bubbles: !0,
    composed: !0,
    cancelable: !0
  }));
}
function M(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => M(i, t));
    return;
  }
  let r = !1;
  if (t(e, () => r = !0), r)
    return;
  let n = e.firstElementChild;
  for (; n; )
    M(n, t), n = n.nextElementSibling;
}
function T(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var ft = !1;
function cn() {
  ft && T("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), ft = !0, document.body || T("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), V(document, "alpine:init"), V(document, "alpine:initializing"), We(), Ur((t) => I(t, M)), Et((t) => qt(t)), Br((t, r) => {
    Ge(t, r).forEach((n) => n());
  });
  let e = (t) => !fe(t.parentElement, !0);
  Array.from(document.querySelectorAll(Ut())).filter(e).forEach((t) => {
    I(t);
  }), V(document, "alpine:initialized");
}
var Xe = [], Kt = [];
function Ht() {
  return Xe.map((e) => e());
}
function Ut() {
  return Xe.concat(Kt).map((e) => e());
}
function Bt(e) {
  Xe.push(e);
}
function Yt(e) {
  Kt.push(e);
}
function fe(e, t = !1) {
  return de(e, (r) => {
    if ((t ? Ut() : Ht()).some((i) => r.matches(i)))
      return !0;
  });
}
function de(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return de(e.parentElement, t);
  }
}
function ln(e) {
  return Ht().some((t) => e.matches(t));
}
var Wt = [];
function fn(e) {
  Wt.push(e);
}
function I(e, t = M, r = () => {
}) {
  on(() => {
    t(e, (n, i) => {
      r(n, i), Wt.forEach((o) => o(n, i)), Ge(n, n.attributes).forEach((o) => o()), n._x_ignore && i();
    });
  });
}
function qt(e) {
  M(e, (t) => At(t));
}
var Le = [], Qe = !1;
function et(e = () => {
}) {
  return queueMicrotask(() => {
    Qe || setTimeout(() => {
      Fe();
    });
  }), new Promise((t) => {
    Le.push(() => {
      e(), t();
    });
  });
}
function Fe() {
  for (Qe = !1; Le.length; )
    Le.shift()();
}
function dn() {
  Qe = !0;
}
function tt(e, t) {
  return Array.isArray(t) ? dt(e, t.join(" ")) : typeof t == "object" && t !== null ? pn(e, t) : typeof t == "function" ? tt(e, t()) : dt(e, t);
}
function dt(e, t) {
  let r = (i) => i.split(" ").filter((o) => !e.classList.contains(o)).filter(Boolean), n = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", n(r(t));
}
function pn(e, t) {
  let r = (s) => s.split(" ").filter(Boolean), n = Object.entries(t).flatMap(([s, u]) => u ? r(s) : !1).filter(Boolean), i = Object.entries(t).flatMap(([s, u]) => u ? !1 : r(s)).filter(Boolean), o = [], a = [];
  return i.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), a.push(s));
  }), n.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), o.push(s));
  }), () => {
    a.forEach((s) => e.classList.add(s)), o.forEach((s) => e.classList.remove(s));
  };
}
function pe(e, t) {
  return typeof t == "object" && t !== null ? _n(e, t) : hn(e, t);
}
function _n(e, t) {
  let r = {};
  return Object.entries(t).forEach(([n, i]) => {
    r[n] = e.style[n], n.startsWith("--") || (n = gn(n)), e.style.setProperty(n, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    pe(e, r);
  };
}
function hn(e, t) {
  let r = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", r || "");
  };
}
function gn(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function ze(e, t = () => {
}) {
  let r = !1;
  return function() {
    r ? t.apply(this, arguments) : (r = !0, e.apply(this, arguments));
  };
}
y("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
  typeof n == "function" && (n = i(n)), n !== !1 && (!n || typeof n == "boolean" ? vn(e, r, t) : yn(e, n, t));
});
function yn(e, t, r) {
  Jt(e, tt, ""), {
    enter: (i) => {
      e._x_transition.enter.during = i;
    },
    "enter-start": (i) => {
      e._x_transition.enter.start = i;
    },
    "enter-end": (i) => {
      e._x_transition.enter.end = i;
    },
    leave: (i) => {
      e._x_transition.leave.during = i;
    },
    "leave-start": (i) => {
      e._x_transition.leave.start = i;
    },
    "leave-end": (i) => {
      e._x_transition.leave.end = i;
    }
  }[r](t);
}
function vn(e, t, r) {
  Jt(e, pe);
  let n = !t.includes("in") && !t.includes("out") && !r, i = n || t.includes("in") || ["enter"].includes(r), o = n || t.includes("out") || ["leave"].includes(r);
  t.includes("in") && !n && (t = t.filter((h, v) => v < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((h, v) => v > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), s = a || t.includes("opacity"), u = a || t.includes("scale"), c = s ? 0 : 1, l = u ? Y(t, "scale", 95) / 100 : 1, p = Y(t, "delay", 0) / 1e3, d = Y(t, "origin", "center"), _ = "opacity, transform", O = Y(t, "duration", 150) / 1e3, ie = Y(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: d,
    transitionDelay: `${p}s`,
    transitionProperty: _,
    transitionDuration: `${O}s`,
    transitionTimingFunction: f
  }, e._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${l})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), o && (e._x_transition.leave.during = {
    transformOrigin: d,
    transitionDelay: `${p}s`,
    transitionProperty: _,
    transitionDuration: `${ie}s`,
    transitionTimingFunction: f
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${l})`
  });
}
function Jt(e, t, r = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: r, start: r, end: r },
    leave: { during: r, start: r, end: r },
    in(n = () => {
    }, i = () => {
    }) {
      ke(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, n, i);
    },
    out(n = () => {
    }, i = () => {
    }) {
      ke(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, n, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, r, n) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let o = () => i(r);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : o() : e._x_transition ? e._x_transition.in(r) : o();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((a, s) => {
    e._x_transition.out(() => {
    }, () => a(n)), e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(n), queueMicrotask(() => {
    let a = Vt(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : i(() => {
      let s = (u) => {
        let c = Promise.all([
          u._x_hidePromise,
          ...(u._x_hideChildren || []).map(s)
        ]).then(([l]) => l());
        return delete u._x_hidePromise, delete u._x_hideChildren, c;
      };
      s(e).catch((u) => {
        if (!u.isFromCancelledTransition)
          throw u;
      });
    });
  });
};
function Vt(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Vt(t);
}
function ke(e, t, { during: r, start: n, end: i } = {}, o = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
    o(), a();
    return;
  }
  let s, u, c;
  mn(e, {
    start() {
      s = t(e, n);
    },
    during() {
      u = t(e, r);
    },
    before: o,
    end() {
      s(), c = t(e, i);
    },
    after: a,
    cleanup() {
      u(), c();
    }
  });
}
function mn(e, t) {
  let r, n, i, o = ze(() => {
    m(() => {
      r = !0, n || t.before(), i || (t.end(), Fe()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: ze(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      o();
    }),
    finish: o
  }, m(() => {
    t.start(), t.during();
  }), dn(), requestAnimationFrame(() => {
    if (r)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), m(() => {
      t.before();
    }), n = !0, requestAnimationFrame(() => {
      r || (m(() => {
        t.end();
      }), Fe(), setTimeout(e._x_transitioning.finish, a + s), i = !0);
    });
  });
}
function Y(e, t, r) {
  if (e.indexOf(t) === -1)
    return r;
  const n = e[e.indexOf(t) + 1];
  if (!n || t === "scale" && isNaN(n))
    return r;
  if (t === "duration" || t === "delay") {
    let i = n.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n;
}
var X = !1;
function re(e, t = () => {
}) {
  return (...r) => X ? t(...r) : e(...r);
}
function xn(e) {
  return (...t) => X && e(...t);
}
function bn(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), X = !0, En(() => {
    wn(t);
  }), X = !1;
}
function wn(e) {
  let t = !1;
  I(e, (n, i) => {
    M(n, (o, a) => {
      if (t && ln(o))
        return a();
      t = !0, i(o, a);
    });
  });
}
function En(e) {
  let t = H;
  lt((r, n) => {
    let i = t(r);
    return Q(i), () => {
    };
  }), e(), lt(t);
}
function Gt(e, t, r, n = []) {
  switch (e._x_bindings || (e._x_bindings = K({})), e._x_bindings[t] = r, t = n.includes("camel") ? Pn(t) : t, t) {
    case "value":
      An(e, r);
      break;
    case "style":
      On(e, r);
      break;
    case "class":
      Sn(e, r);
      break;
    case "selected":
    case "checked":
      Cn(e, t, r);
      break;
    default:
      Zt(e, t, r);
      break;
  }
}
function An(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = pt(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((r) => pt(r, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    In(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t;
  }
}
function Sn(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = tt(e, t);
}
function On(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = pe(e, t);
}
function Cn(e, t, r) {
  Zt(e, t, r), Tn(e, t, r);
}
function Zt(e, t, r) {
  [null, void 0, !1].includes(r) && $n(t) ? e.removeAttribute(t) : (Xt(t) && (r = t), Mn(e, t, r));
}
function Mn(e, t, r) {
  e.getAttribute(t) != r && e.setAttribute(t, r);
}
function Tn(e, t, r) {
  e[t] !== r && (e[t] = r);
}
function In(e, t) {
  const r = [].concat(t).map((n) => n + "");
  Array.from(e.options).forEach((n) => {
    n.selected = r.includes(n.value);
  });
}
function Pn(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function pt(e, t) {
  return e == t;
}
function Xt(e) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ].includes(e);
}
function $n(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function jn(e, t, r) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  let n = e.getAttribute(t);
  return n === null ? typeof r == "function" ? r() : r : n === "" ? !0 : Xt(t) ? !![t, "true"].includes(n) : n;
}
function Qt(e, t) {
  var r;
  return function() {
    var n = this, i = arguments, o = function() {
      r = null, e.apply(n, i);
    };
    clearTimeout(r), r = setTimeout(o, t);
  };
}
function er(e, t) {
  let r;
  return function() {
    let n = this, i = arguments;
    r || (e.apply(n, i), r = !0, setTimeout(() => r = !1, t));
  };
}
function Rn(e) {
  (Array.isArray(e) ? e : [e]).forEach((r) => r(ne));
}
var $ = {}, _t = !1;
function Nn(e, t) {
  if (_t || ($ = K($), _t = !0), t === void 0)
    return $[e];
  $[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && $[e].init(), Ct($[e]);
}
function Ln() {
  return $;
}
var tr = {};
function Fn(e, t) {
  let r = typeof t != "function" ? () => t : t;
  e instanceof Element ? rr(e, r()) : tr[e] = r;
}
function zn(e) {
  return Object.entries(tr).forEach(([t, r]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...n) => r(...n);
      }
    });
  }), e;
}
function rr(e, t, r) {
  let n = [];
  for (; n.length; )
    n.pop()();
  let i = Object.entries(t).map(([a, s]) => ({ name: a, value: s })), o = $t(i);
  i = i.map((a) => o.find((s) => s.name === a.name) ? {
    name: `x-bind:${a.name}`,
    value: `"${a.value}"`
  } : a), Ge(e, i, r).map((a) => {
    n.push(a.runCleanups), a();
  });
}
var nr = {};
function kn(e, t) {
  nr[e] = t;
}
function Dn(e, t) {
  return Object.entries(nr).forEach(([r, n]) => {
    Object.defineProperty(e, r, {
      get() {
        return (...i) => n.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var Kn = {
  get reactive() {
    return K;
  },
  get release() {
    return Q;
  },
  get effect() {
    return H;
  },
  get raw() {
    return mt;
  },
  version: "3.12.2",
  flushAndStopDeferringMutations: Vr,
  dontAutoEvaluateFunctions: Xr,
  disableEffectScheduling: Dr,
  startObservingMutations: We,
  stopObservingMutations: St,
  setReactivityEngine: Kr,
  closestDataStack: k,
  skipDuringClone: re,
  onlyDuringClone: xn,
  addRootSelector: Bt,
  addInitSelector: Yt,
  addScopeToNode: ee,
  deferMutations: Jr,
  mapAttributes: Ze,
  evaluateLater: b,
  interceptInit: fn,
  setEvaluator: Qr,
  mergeProxies: te,
  findClosest: de,
  closestRoot: fe,
  destroyTree: qt,
  interceptor: Mt,
  transition: ke,
  setStyles: pe,
  mutateDom: m,
  directive: y,
  throttle: er,
  debounce: Qt,
  evaluate: z,
  initTree: I,
  nextTick: et,
  prefixed: U,
  prefix: nn,
  plugin: Rn,
  magic: A,
  store: Nn,
  start: cn,
  clone: bn,
  bound: jn,
  $data: Ot,
  walk: M,
  data: kn,
  bind: Fn
}, ne = Kn;
function Hn(e, t) {
  const r = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    r[n[i]] = !0;
  return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
var Un = Object.freeze({}), ir = Object.assign, Bn = Object.prototype.hasOwnProperty, _e = (e, t) => Bn.call(e, t), N = Array.isArray, G = (e) => or(e) === "[object Map]", Yn = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", he = (e) => e !== null && typeof e == "object", Wn = Object.prototype.toString, or = (e) => Wn.call(e), ar = (e) => or(e).slice(8, -1), nt = (e) => Yn(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Jn = qn((e) => e.charAt(0).toUpperCase() + e.slice(1)), sr = (e, t) => e !== t && (e === e || t === t), De = /* @__PURE__ */ new WeakMap(), W = [], S, L = Symbol("iterate"), Ke = Symbol("Map key iterate");
function Vn(e) {
  return e && e._isEffect === !0;
}
function Gn(e, t = Un) {
  Vn(e) && (e = e.raw);
  const r = Qn(e, t);
  return t.lazy || r(), r;
}
function Zn(e) {
  e.active && (ur(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var Xn = 0;
function Qn(e, t) {
  const r = function() {
    if (!r.active)
      return e();
    if (!W.includes(r)) {
      ur(r);
      try {
        return ti(), W.push(r), S = r, e();
      } finally {
        W.pop(), cr(), S = W[W.length - 1];
      }
    }
  };
  return r.id = Xn++, r.allowRecurse = !!t.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = e, r.deps = [], r.options = t, r;
}
function ur(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++)
      t[r].delete(e);
    t.length = 0;
  }
}
var D = !0, it = [];
function ei() {
  it.push(D), D = !1;
}
function ti() {
  it.push(D), D = !0;
}
function cr() {
  const e = it.pop();
  D = e === void 0 ? !0 : e;
}
function E(e, t, r) {
  if (!D || S === void 0)
    return;
  let n = De.get(e);
  n || De.set(e, n = /* @__PURE__ */ new Map());
  let i = n.get(r);
  i || n.set(r, i = /* @__PURE__ */ new Set()), i.has(S) || (i.add(S), S.deps.push(i), S.options.onTrack && S.options.onTrack({
    effect: S,
    target: e,
    type: t,
    key: r
  }));
}
function P(e, t, r, n, i, o) {
  const a = De.get(e);
  if (!a)
    return;
  const s = /* @__PURE__ */ new Set(), u = (l) => {
    l && l.forEach((p) => {
      (p !== S || p.allowRecurse) && s.add(p);
    });
  };
  if (t === "clear")
    a.forEach(u);
  else if (r === "length" && N(e))
    a.forEach((l, p) => {
      (p === "length" || p >= n) && u(l);
    });
  else
    switch (r !== void 0 && u(a.get(r)), t) {
      case "add":
        N(e) ? nt(r) && u(a.get("length")) : (u(a.get(L)), G(e) && u(a.get(Ke)));
        break;
      case "delete":
        N(e) || (u(a.get(L)), G(e) && u(a.get(Ke)));
        break;
      case "set":
        G(e) && u(a.get(L));
        break;
    }
  const c = (l) => {
    l.options.onTrigger && l.options.onTrigger({
      effect: l,
      target: e,
      key: r,
      type: t,
      newValue: n,
      oldValue: i,
      oldTarget: o
    }), l.options.scheduler ? l.options.scheduler(l) : l();
  };
  s.forEach(c);
}
var ri = /* @__PURE__ */ Hn("__proto__,__v_isRef,__isVue"), lr = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(rt)), ni = /* @__PURE__ */ ge(), ii = /* @__PURE__ */ ge(!1, !0), oi = /* @__PURE__ */ ge(!0), ai = /* @__PURE__ */ ge(!0, !0), ce = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function(...r) {
    const n = g(this);
    for (let o = 0, a = this.length; o < a; o++)
      E(n, "get", o + "");
    const i = t.apply(n, r);
    return i === -1 || i === !1 ? t.apply(n, r.map(g)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  ce[e] = function(...r) {
    ei();
    const n = t.apply(this, r);
    return cr(), n;
  };
});
function ge(e = !1, t = !1) {
  return function(n, i, o) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && o === (e ? t ? gi : Sr : t ? hi : Ar).get(n))
      return n;
    const a = N(n);
    if (!e && a && _e(ce, i))
      return Reflect.get(ce, i, o);
    const s = Reflect.get(n, i, o);
    return (rt(i) ? lr.has(i) : ri(i)) || (e || E(n, "get", i), t) ? s : He(s) ? !a || !nt(i) ? s.value : s : he(s) ? e ? Or(s) : ut(s) : s;
  };
}
var si = /* @__PURE__ */ fr(), ui = /* @__PURE__ */ fr(!0);
function fr(e = !1) {
  return function(r, n, i, o) {
    let a = r[n];
    if (!e && (i = g(i), a = g(a), !N(r) && He(a) && !He(i)))
      return a.value = i, !0;
    const s = N(r) && nt(n) ? Number(n) < r.length : _e(r, n), u = Reflect.set(r, n, i, o);
    return r === g(o) && (s ? sr(i, a) && P(r, "set", n, i, a) : P(r, "add", n, i)), u;
  };
}
function ci(e, t) {
  const r = _e(e, t), n = e[t], i = Reflect.deleteProperty(e, t);
  return i && r && P(e, "delete", t, void 0, n), i;
}
function li(e, t) {
  const r = Reflect.has(e, t);
  return (!rt(t) || !lr.has(t)) && E(e, "has", t), r;
}
function fi(e) {
  return E(e, "iterate", N(e) ? "length" : L), Reflect.ownKeys(e);
}
var dr = {
  get: ni,
  set: si,
  deleteProperty: ci,
  has: li,
  ownKeys: fi
}, pr = {
  get: oi,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
};
ir({}, dr, {
  get: ii,
  set: ui
});
ir({}, pr, {
  get: ai
});
var ot = (e) => he(e) ? ut(e) : e, at = (e) => he(e) ? Or(e) : e, st = (e) => e, ye = (e) => Reflect.getPrototypeOf(e);
function ve(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const i = g(e), o = g(t);
  t !== o && !r && E(i, "get", t), !r && E(i, "get", o);
  const { has: a } = ye(i), s = n ? st : r ? at : ot;
  if (a.call(i, t))
    return s(e.get(t));
  if (a.call(i, o))
    return s(e.get(o));
  e !== i && e.get(t);
}
function me(e, t = !1) {
  const r = this.__v_raw, n = g(r), i = g(e);
  return e !== i && !t && E(n, "has", e), !t && E(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i);
}
function xe(e, t = !1) {
  return e = e.__v_raw, !t && E(g(e), "iterate", L), Reflect.get(e, "size", e);
}
function _r(e) {
  e = g(e);
  const t = g(this);
  return ye(t).has.call(t, e) || (t.add(e), P(t, "add", e, e)), this;
}
function hr(e, t) {
  t = g(t);
  const r = g(this), { has: n, get: i } = ye(r);
  let o = n.call(r, e);
  o ? Er(r, n, e) : (e = g(e), o = n.call(r, e));
  const a = i.call(r, e);
  return r.set(e, t), o ? sr(t, a) && P(r, "set", e, t, a) : P(r, "add", e, t), this;
}
function gr(e) {
  const t = g(this), { has: r, get: n } = ye(t);
  let i = r.call(t, e);
  i ? Er(t, r, e) : (e = g(e), i = r.call(t, e));
  const o = n ? n.call(t, e) : void 0, a = t.delete(e);
  return i && P(t, "delete", e, void 0, o), a;
}
function yr() {
  const e = g(this), t = e.size !== 0, r = G(e) ? new Map(e) : new Set(e), n = e.clear();
  return t && P(e, "clear", void 0, void 0, r), n;
}
function be(e, t) {
  return function(n, i) {
    const o = this, a = o.__v_raw, s = g(a), u = t ? st : e ? at : ot;
    return !e && E(s, "iterate", L), a.forEach((c, l) => n.call(i, u(c), u(l), o));
  };
}
function oe(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, o = g(i), a = G(o), s = e === "entries" || e === Symbol.iterator && a, u = e === "keys" && a, c = i[e](...n), l = r ? st : t ? at : ot;
    return !t && E(o, "iterate", u ? Ke : L), {
      next() {
        const { value: p, done: d } = c.next();
        return d ? { value: p, done: d } : {
          value: s ? [l(p[0]), l(p[1])] : l(p),
          done: d
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function C(e) {
  return function(...t) {
    {
      const r = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Jn(e)} operation ${r}failed: target is readonly.`, g(this));
    }
    return e === "delete" ? !1 : this;
  };
}
var vr = {
  get(e) {
    return ve(this, e);
  },
  get size() {
    return xe(this);
  },
  has: me,
  add: _r,
  set: hr,
  delete: gr,
  clear: yr,
  forEach: be(!1, !1)
}, mr = {
  get(e) {
    return ve(this, e, !1, !0);
  },
  get size() {
    return xe(this);
  },
  has: me,
  add: _r,
  set: hr,
  delete: gr,
  clear: yr,
  forEach: be(!1, !0)
}, xr = {
  get(e) {
    return ve(this, e, !0);
  },
  get size() {
    return xe(this, !0);
  },
  has(e) {
    return me.call(this, e, !0);
  },
  add: C("add"),
  set: C("set"),
  delete: C("delete"),
  clear: C("clear"),
  forEach: be(!0, !1)
}, br = {
  get(e) {
    return ve(this, e, !0, !0);
  },
  get size() {
    return xe(this, !0);
  },
  has(e) {
    return me.call(this, e, !0);
  },
  add: C("add"),
  set: C("set"),
  delete: C("delete"),
  clear: C("clear"),
  forEach: be(!0, !0)
}, di = ["keys", "values", "entries", Symbol.iterator];
di.forEach((e) => {
  vr[e] = oe(e, !1, !1), xr[e] = oe(e, !0, !1), mr[e] = oe(e, !1, !0), br[e] = oe(e, !0, !0);
});
function wr(e, t) {
  const r = t ? e ? br : mr : e ? xr : vr;
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(_e(r, i) && i in n ? r : n, i, o);
}
var pi = {
  get: wr(!1, !1)
}, _i = {
  get: wr(!0, !1)
};
function Er(e, t, r) {
  const n = g(r);
  if (n !== r && t.call(e, n)) {
    const i = ar(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var Ar = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), gi = /* @__PURE__ */ new WeakMap();
function yi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function vi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : yi(ar(e));
}
function ut(e) {
  return e && e.__v_isReadonly ? e : Cr(e, !1, dr, pi, Ar);
}
function Or(e) {
  return Cr(e, !0, pr, _i, Sr);
}
function Cr(e, t, r, n, i) {
  if (!he(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const a = vi(e);
  if (a === 0)
    return e;
  const s = new Proxy(e, a === 2 ? n : r);
  return i.set(e, s), s;
}
function g(e) {
  return e && g(e.__v_raw) || e;
}
function He(e) {
  return !!(e && e.__v_isRef === !0);
}
A("nextTick", () => et);
A("dispatch", (e) => V.bind(V, e));
A("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
  let o = t(n), a = !0, s, u = r(() => o((c) => {
    JSON.stringify(c), a ? s = c : queueMicrotask(() => {
      i(c, s), s = c;
    }), a = !1;
  }));
  e._x_effects.delete(u);
});
A("store", Ln);
A("data", (e) => Ot(e));
A("root", (e) => fe(e));
A("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = te(mi(e))), e._x_refs_proxy));
function mi(e) {
  let t = [], r = e;
  for (; r; )
    r._x_refs && t.push(r._x_refs), r = r.parentNode;
  return t;
}
var Se = {};
function Mr(e) {
  return Se[e] || (Se[e] = 0), ++Se[e];
}
function xi(e, t) {
  return de(e, (r) => {
    if (r._x_ids && r._x_ids[t])
      return !0;
  });
}
function bi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Mr(t));
}
A("id", (e) => (t, r = null) => {
  let n = xi(e, t), i = n ? n._x_ids[t] : Mr(t);
  return r ? `${t}-${i}-${r}` : `${t}-${i}`;
});
A("el", (e) => e);
Tr("Focus", "focus", "focus");
Tr("Persist", "persist", "persist");
function Tr(e, t, r) {
  A(t, (n) => T(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
function wi({ get: e, set: t }, { get: r, set: n }) {
  let i = !0, o, a, s = H(() => {
    let u, c;
    i ? (u = e(), n(u), c = r(), i = !1) : (u = e(), c = r(), a = JSON.stringify(u), JSON.stringify(c), a !== o ? (c = r(), n(u), c = u) : (t(c), u = c)), o = JSON.stringify(u), JSON.stringify(c);
  });
  return () => {
    Q(s);
  };
}
y("modelable", (e, { expression: t }, { effect: r, evaluateLater: n, cleanup: i }) => {
  let o = n(t), a = () => {
    let l;
    return o((p) => l = p), l;
  }, s = n(`${t} = __placeholder`), u = (l) => s(() => {
  }, { scope: { __placeholder: l } }), c = a();
  u(c), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let l = e._x_model.get, p = e._x_model.set, d = wi({
      get() {
        return l();
      },
      set(_) {
        p(_);
      }
    }, {
      get() {
        return a();
      },
      set(_) {
        u(_);
      }
    });
    i(d);
  });
});
var Ei = document.createElement("div");
y("teleport", (e, { modifiers: t, expression: r }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && T("x-teleport can only be used on a <template> tag", e);
  let i = re(() => document.querySelector(r), () => Ei)();
  i || T(`Cannot find x-teleport element for selector: "${r}"`);
  let o = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = o, o._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((a) => {
    o.addEventListener(a, (s) => {
      s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
    });
  }), ee(o, {}, e), m(() => {
    t.includes("prepend") ? i.parentNode.insertBefore(o, i) : t.includes("append") ? i.parentNode.insertBefore(o, i.nextSibling) : i.appendChild(o), I(o), o._x_ignore = !0;
  }), n(() => o.remove());
});
var Ir = () => {
};
Ir.inline = (e, { modifiers: t }, { cleanup: r }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, r(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
y("ignore", Ir);
y("effect", (e, { expression: t }, { effect: r }) => r(b(e, t)));
function Ue(e, t, r, n) {
  let i = e, o = (u) => n(u), a = {}, s = (u, c) => (l) => c(u, l);
  if (r.includes("dot") && (t = Ai(t)), r.includes("camel") && (t = Si(t)), r.includes("passive") && (a.passive = !0), r.includes("capture") && (a.capture = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("debounce")) {
    let u = r[r.indexOf("debounce") + 1] || "invalid-wait", c = le(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = Qt(o, c);
  }
  if (r.includes("throttle")) {
    let u = r[r.indexOf("throttle") + 1] || "invalid-wait", c = le(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = er(o, c);
  }
  return r.includes("prevent") && (o = s(o, (u, c) => {
    c.preventDefault(), u(c);
  })), r.includes("stop") && (o = s(o, (u, c) => {
    c.stopPropagation(), u(c);
  })), r.includes("self") && (o = s(o, (u, c) => {
    c.target === e && u(c);
  })), (r.includes("away") || r.includes("outside")) && (i = document, o = s(o, (u, c) => {
    e.contains(c.target) || c.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && u(c));
  })), r.includes("once") && (o = s(o, (u, c) => {
    u(c), i.removeEventListener(t, o, a);
  })), o = s(o, (u, c) => {
    Ci(t) && Mi(c, r) || u(c);
  }), i.addEventListener(t, o, a), () => {
    i.removeEventListener(t, o, a);
  };
}
function Ai(e) {
  return e.replace(/-/g, ".");
}
function Si(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function le(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Oi(e) {
  return [" ", "_"].includes(e) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Ci(e) {
  return ["keydown", "keyup"].includes(e);
}
function Mi(e, t) {
  let r = t.filter((o) => !["window", "document", "prevent", "stop", "once", "capture"].includes(o));
  if (r.includes("debounce")) {
    let o = r.indexOf("debounce");
    r.splice(o, le((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (r.includes("throttle")) {
    let o = r.indexOf("throttle");
    r.splice(o, le((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (r.length === 0 || r.length === 1 && ht(e.key).includes(r[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => r.includes(o));
  return r = r.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && ht(e.key).includes(r[0]));
}
function ht(e) {
  if (!e)
    return [];
  e = Oi(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return t[e] = e, Object.keys(t).map((r) => {
    if (t[r] === e)
      return r;
  }).filter((r) => r);
}
y("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
  let o = e;
  t.includes("parent") && (o = e.parentNode);
  let a = b(o, r), s;
  typeof r == "string" ? s = b(o, `${r} = __placeholder`) : typeof r == "function" && typeof r() == "string" ? s = b(o, `${r()} = __placeholder`) : s = () => {
  };
  let u = () => {
    let d;
    return a((_) => d = _), gt(d) ? d.get() : d;
  }, c = (d) => {
    let _;
    a((O) => _ = O), gt(_) ? _.set(d) : s(() => {
    }, {
      scope: { __placeholder: d }
    });
  };
  typeof r == "string" && e.type === "radio" && m(() => {
    e.hasAttribute("name") || e.setAttribute("name", r);
  });
  var l = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let p = X ? () => {
  } : Ue(e, l, t, (d) => {
    c(Ti(e, t, d, u()));
  });
  if (t.includes("fill") && [null, ""].includes(u()) && e.dispatchEvent(new Event(l, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = p, i(() => e._x_removeModelListeners.default()), e.form) {
    let d = Ue(e.form, "reset", [], (_) => {
      et(() => e._x_model && e._x_model.set(e.value));
    });
    i(() => d());
  }
  e._x_model = {
    get() {
      return u();
    },
    set(d) {
      c(d);
    }
  }, e._x_forceModelUpdate = (d) => {
    d = d === void 0 ? u() : d, d === void 0 && typeof r == "string" && r.match(/\./) && (d = ""), window.fromModel = !0, m(() => Gt(e, "value", d)), delete window.fromModel;
  }, n(() => {
    let d = u();
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(d);
  });
});
function Ti(e, t, r, n) {
  return m(() => {
    if (r instanceof CustomEvent && r.detail !== void 0)
      return r.detail ?? r.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(n)) {
        let i = t.includes("number") ? Oe(r.target.value) : r.target.value;
        return r.target.checked ? n.concat([i]) : n.filter((o) => !Ii(o, i));
      } else
        return r.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(r.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Oe(o);
        }) : Array.from(r.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i = r.target.value;
        return t.includes("number") ? Oe(i) : t.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function Oe(e) {
  let t = e ? parseFloat(e) : null;
  return Pi(t) ? t : e;
}
function Ii(e, t) {
  return e == t;
}
function Pi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function gt(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
y("cloak", (e) => queueMicrotask(() => m(() => e.removeAttribute(U("cloak")))));
Yt(() => `[${U("init")}]`);
y("init", re((e, { expression: t }, { evaluate: r }) => typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)));
y("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((o) => {
      m(() => {
        e.textContent = o;
      });
    });
  });
});
y("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((o) => {
      m(() => {
        e.innerHTML = o, e._x_ignoreSelf = !0, I(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Ze(Nt(":", Lt(U("bind:"))));
y("bind", (e, { value: t, modifiers: r, expression: n, original: i }, { effect: o }) => {
  if (!t) {
    let s = {};
    zn(s), b(e, n)((c) => {
      rr(e, c, i);
    }, { scope: s });
    return;
  }
  if (t === "key")
    return $i(e, n);
  let a = b(e, n);
  o(() => a((s) => {
    s === void 0 && typeof n == "string" && n.match(/\./) && (s = ""), m(() => Gt(e, t, s, r));
  }));
});
function $i(e, t) {
  e._x_keyExpression = t;
}
Bt(() => `[${U("data")}]`);
y("data", re((e, { expression: t }, { cleanup: r }) => {
  t = t === "" ? "{}" : t;
  let n = {};
  $e(n, e);
  let i = {};
  Dn(i, n);
  let o = z(e, t, { scope: i });
  (o === void 0 || o === !0) && (o = {}), $e(o, e);
  let a = K(o);
  Ct(a);
  let s = ee(e, a);
  a.init && z(e, a.init), r(() => {
    a.destroy && z(e, a.destroy), s();
  });
}));
y("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
  let i = b(e, r);
  e._x_doHide || (e._x_doHide = () => {
    m(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    m(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let o = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, a = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, s = () => setTimeout(a), u = ze((p) => p ? a() : o(), (p) => {
    typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, p, a, o) : p ? s() : o();
  }), c, l = !0;
  n(() => i((p) => {
    !l && p === c || (t.includes("immediate") && (p ? s() : o()), u(p), c = p, l = !1);
  }));
});
y("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = Ri(t), o = b(e, i.items), a = b(e, e._x_keyExpression || "index");
  e._x_prevKeys = [], e._x_lookup = {}, r(() => ji(e, i, o, a)), n(() => {
    Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function ji(e, t, r, n) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), o = e;
  r((a) => {
    Ni(a) && a >= 0 && (a = Array.from(Array(a).keys(), (f) => f + 1)), a === void 0 && (a = []);
    let s = e._x_lookup, u = e._x_prevKeys, c = [], l = [];
    if (i(a))
      a = Object.entries(a).map(([f, h]) => {
        let v = yt(t, h, f, a);
        n((x) => l.push(x), { scope: { index: f, ...v } }), c.push(v);
      });
    else
      for (let f = 0; f < a.length; f++) {
        let h = yt(t, a[f], f, a);
        n((v) => l.push(v), { scope: { index: f, ...h } }), c.push(h);
      }
    let p = [], d = [], _ = [], O = [];
    for (let f = 0; f < u.length; f++) {
      let h = u[f];
      l.indexOf(h) === -1 && _.push(h);
    }
    u = u.filter((f) => !_.includes(f));
    let ie = "template";
    for (let f = 0; f < l.length; f++) {
      let h = l[f], v = u.indexOf(h);
      if (v === -1)
        u.splice(f, 0, h), p.push([ie, f]);
      else if (v !== f) {
        let x = u.splice(f, 1)[0], w = u.splice(v - 1, 1)[0];
        u.splice(f, 0, w), u.splice(v, 0, x), d.push([x, w]);
      } else
        O.push(h);
      ie = h;
    }
    for (let f = 0; f < _.length; f++) {
      let h = _[f];
      s[h]._x_effects && s[h]._x_effects.forEach(vt), s[h].remove(), s[h] = null, delete s[h];
    }
    for (let f = 0; f < d.length; f++) {
      let [h, v] = d[f], x = s[h], w = s[v], F = document.createElement("div");
      m(() => {
        w || T('x-for ":key" is undefined or invalid', o), w.after(F), x.after(w), w._x_currentIfEl && w.after(w._x_currentIfEl), F.before(x), x._x_currentIfEl && x.after(x._x_currentIfEl), F.remove();
      }), w._x_refreshXForScope(c[l.indexOf(v)]);
    }
    for (let f = 0; f < p.length; f++) {
      let [h, v] = p[f], x = h === "template" ? o : s[h];
      x._x_currentIfEl && (x = x._x_currentIfEl);
      let w = c[v], F = l[v], B = document.importNode(o.content, !0).firstElementChild, ct = K(w);
      ee(B, ct, o), B._x_refreshXForScope = (jr) => {
        Object.entries(jr).forEach(([Rr, Nr]) => {
          ct[Rr] = Nr;
        });
      }, m(() => {
        x.after(B), I(B);
      }), typeof F == "object" && T("x-for key cannot be an object, it must be a string or an integer", o), s[F] = B;
    }
    for (let f = 0; f < O.length; f++)
      s[O[f]]._x_refreshXForScope(c[l.indexOf(O[f])]);
    o._x_prevKeys = l;
  });
}
function Ri(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, r = /^\s*\(|\)\s*$/g, n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(n);
  if (!i)
    return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(r, "").trim(), s = a.match(t);
  return s ? (o.item = a.replace(t, "").trim(), o.index = s[1].trim(), s[2] && (o.collection = s[2].trim())) : o.item = a, o;
}
function yt(e, t, r, n) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, s) => {
    i[a] = t[s];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = t[a];
  }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i;
}
function Ni(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Pr() {
}
Pr.inline = (e, { expression: t }, { cleanup: r }) => {
  let n = fe(e);
  n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t]);
};
y("ref", Pr);
y("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = b(e, t), o = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(!0).firstElementChild;
    return ee(s, {}, e), m(() => {
      e.after(s), I(s);
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      M(s, (u) => {
        u._x_effects && u._x_effects.forEach(vt);
      }), s.remove(), delete e._x_currentIfEl;
    }, s;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  r(() => i((s) => {
    s ? o() : a();
  })), n(() => e._x_undoIf && e._x_undoIf());
});
y("id", (e, { expression: t }, { evaluate: r }) => {
  r(t).forEach((i) => bi(e, i));
});
Ze(Nt("@", Lt(U("on:"))));
y("on", re((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
  let o = n ? b(e, n) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = Ue(e, t, r, (s) => {
    o(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => a());
}));
we("Collapse", "collapse", "collapse");
we("Intersect", "intersect", "intersect");
we("Focus", "trap", "focus");
we("Mask", "mask", "mask");
function we(e, t, r) {
  y(t, (n) => T(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n));
}
ne.setEvaluator(Pt);
ne.setReactivityEngine({ reactive: ut, effect: Gn, release: Zn, raw: g });
var Li = ne, Fi = Li;
window.addEventListener("message", zi, !1);
function zi(e) {
  if (e.data === "thumb-saved") {
    const t = document.querySelector("iframe.thumb-renderer");
    t.attributes.src = `${t.attributes.src}`;
  }
}
var ki = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Di(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var $r = { exports: {} };
(function(e, t) {
  (function(r, n, i) {
    e.exports = i(), e.exports.default = i();
  })("slugify", ki, function() {
    var r = JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`), n = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
    function i(o, a) {
      if (typeof o != "string")
        throw new Error("slugify: string argument expected");
      a = typeof a == "string" ? { replacement: a } : a || {};
      var s = n[a.locale] || {}, u = a.replacement === void 0 ? "-" : a.replacement, c = a.trim === void 0 ? !0 : a.trim, l = o.normalize().split("").reduce(function(p, d) {
        var _ = s[d];
        return _ === void 0 && (_ = r[d]), _ === void 0 && (_ = d), _ === u && (_ = " "), p + _.replace(a.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "");
      }, "");
      return a.strict && (l = l.replace(/[^A-Za-z0-9\s]/g, "")), c && (l = l.trim()), l = l.replace(/\s+/g, u), a.lower && (l = l.toLowerCase()), l;
    }
    return i.extend = function(o) {
      Object.assign(r, o);
    }, i;
  });
})($r);
var Ki = $r.exports;
const Hi = /* @__PURE__ */ Di(Ki);
window.slugify = Hi;
Fi.start();
