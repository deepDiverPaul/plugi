$(".gjs-editor").append($("#toggle-sidebar"));
$(".gjs-pn-panels").prepend($("#sidebar-header"));
$(".gjs-pn-panels").append($("#sidebar-bottom-buttons"));
$("#toggle-sidebar").click(function() {
  $("#gjs").toggleClass("sidebar-collapsed"), S();
});
y();
window.editor.on("run:open-sm", function(t) {
  $(".gjs-trt-traits").parent().parent().css("display", "none"), $(".gjs-sm-sectors").parent().parent().css("display", "block"), $("#gjs-sm-advanced .gjs-sm-properties").append($(".gjs-clm-tags"));
});
window.editor.on("run:open-tm", function(t) {
  $(".gjs-sm-sectors").parent().parent().css("display", "none"), $(".gjs-trt-traits").parent().parent().css("display", "block");
});
window.editor.on("block:drag:start", function(t) {
  y();
});
window.editor.on("rteToolbarPosUpdate", function(t) {
  !window.editor || !window.editor.getSelected() || !window.editor.getSelected().getEl() || setTimeout(function() {
    let i = $(".gjs-rte-toolbar").first();
    if (i.offset().top < t.elementTop + 0.5 * t.elementHeight) {
      let a = t.elementTop - i.height();
      a > 0 && i.css("top", a + "px");
    }
  }, 0);
});
function y() {
  $(window).width() < 1e3 && ($("#gjs").addClass("sidebar-collapsed"), S());
}
function S() {
  window.editor.trigger("change:canvasOffset canvasScroll");
}
let g = !1;
$(document).keydown(function(t) {
  t.which === 8 && (g = !0);
}).keyup(function(t) {
  t.which === 8 && (g = !1);
});
$(window).on("beforeunload", function(t) {
  g && t.preventDefault();
});
function A() {
  $(".gjs-blocks-cs").prepend($("#block-search"));
}
window.addEventListener("message", V, !1);
function V(t) {
  t.data === "page-loaded" ? ($("#phpb-loading").addClass("loaded"), A(), window.isLoaded = !0, $(window).trigger("pagebuilder-page-loaded")) : t.data === "touch-start" && window.touchStart();
}
$(document).on("input", "#block-search input", function() {
  let t = $(this).val().toLowerCase();
  $(".gjs-block-category").each(function() {
    let e = !1;
    $(this).find(".gjs-block").each(function() {
      $(this).data("original-html") || $(this).data("original-html", $(this).html());
      let i = $(this).text();
      if (i.toLowerCase().includes(t)) {
        $(this).removeClass("d-none"), e = !0;
        let n = new RegExp("(" + t + ")", "gi"), a = i.replace(n, "<b>$1</b>");
        $(this).find(".gjs-block-label").html(
          $(this).data("original-html").replace(i.trim(), a)
        );
      } else
        $(this).addClass("d-none");
    }), $(this).removeClass("d-none"), e || $(this).addClass("d-none");
  });
});
window.customBuilderScripts = {};
window.editor.on("component:create", (t) => {
  if (t.components().length) {
    let e = t.components().models[t.components().length - 1];
    if (e.attributes.type === "script") {
      let i = t.attributes.attributes["block-id"];
      i === void 0 && (i = t.attributes.attributes.id);
      let n = e, a = !1;
      for (; n.parent(); )
        if (n = n.parent(), n.attributes.attributes["phpb-content-container"]) {
          a = !0;
          break;
        }
      a && (window.customBuilderScripts[i] = e.toHTML(), e.remove());
    }
  }
});
window.editor.on("component:add", function(t) {
  if (t.attributes["run-builder-script"] !== void 0) {
    let e = customBuilderScripts;
    window.customBuilderScripts[t.attributes["block-id"]] = customBuilderScripts[t.attributes["run-builder-script"]], runScriptsOfComponentAndChildren(t), window.customBuilderScripts = e, delete t.attributes["run-builder-script"];
  }
});
window.editor.on("sorter:drag:end", function(t) {
  let e = t.modelToDrop;
  e && e.attributes && (e.attributes["block-id"] || e.attributes.id) && window.runScriptsOfComponentAndChildren(e);
  for (let i in CKEDITOR.instances)
    CKEDITOR.instances[i].destroy(!0);
});
window.runScriptsOfComponentAndChildren = function(t) {
  x(t), t.components().each(function(e) {
    runScriptsOfComponentAndChildren(e);
  });
};
function x(t) {
  let e = t.attributes["block-id"];
  if (e === void 0 && (e = t.attributes.attributes.id), e && window.customBuilderScripts[e] !== void 0) {
    let i = t.attributes["style-identifier"], n = $("<container>").append(window.customBuilderScripts[e]);
    n.find("script").prepend("let inPageBuilder = true;"), n.find("script").prepend('let blockSelector = ".' + i + '";'), n.find("script").prepend('let block = document.getElementsByClassName("' + i + '")[0];'), n.find("script").prepend("(function(){"), n.find("script").append("})();");
    let a = document.createElement("script");
    a.type = "text/javascript", a.innerHTML = n.find("script").html(), window.editor.Canvas.getDocument().body.appendChild(a);
  }
}
function H() {
  R();
  let t = document.createElement("script");
  t.type = "text/javascript", t.src = window.injectionScriptUrl;
  let e = t.outerHTML + "<script>" + h.toString() + h.name + "()<\/script>";
  window.initialComponents = window.initialComponents.replace("</body>", e + "</body>"), $.each(window.languages, (i, n) => {
    window.pageBlocks[i] === null && (window.pageBlocks[i] = {});
  }), activateLanguage(window.currentLanguage);
}
function h() {
  let t = document.querySelectorAll("script");
  for (let e = 0; e < t.length; e++) {
    let i = t[e];
    if (i.innerHTML.startsWith("var script")) {
      let n = i.innerHTML.split("=")[0], a = parseInt(n.replace("var script", ""));
      if (Number.isInteger(a)) {
        let s = "script" + a + "Start";
        if (typeof window[s] == "function")
          return a !== 0 && window[s](), !1;
      }
    }
  }
}
function R() {
  for (let t in window.themeBlocks) {
    let e = window.themeBlocks[t], i = $("<container>").append(e.content);
    i.find("[phpb-blocks-container]").each(function() {
      $(this).html() !== "" && $(this).html().trim() === "" && $(this).html("");
    }), window.themeBlocks[t].content = i.html(), e.content = i.html(), editor.BlockManager.add(t, e);
  }
}
$("#language-selector select").on("change", function() {
  let t = $(this).find("option:selected").val();
  window.switchLanguage(t, function() {
    activateLanguage(t);
  });
});
window.activateLanguage = function(t) {
  window.currentLanguage = t, window.editor.select(), window.editor.DomComponents.clear(), window.editor.DomComponents.componentsById = [], window.editor.UndoManager.clear(), window.editor.Canvas.getDocument().querySelectorAll("script").forEach(function(e) {
    e.remove();
  }), window.editor.setComponents(window.initialComponents), v(editor.getWrapper()), window.editor.getWrapper().find("[phpb-content-container]").forEach((e, i) => {
    e.set("custom-name", window.translations["page-content"]), e.components(window.contentContainerComponents[i]), w(e), d(e);
  });
};
$(window).on("pagebuilder-page-loaded", function(t) {
  window.editor.getWrapper().find("[phpb-content-container]").forEach((e) => {
    u(e), window.runScriptsOfComponentAndChildren(e);
  }), window.setWaiting(!1), setTimeout(function() {
    window.changesOffset = window.editor.getModel().get("changesCount"), window.afterInitialRendering = !0;
  }, 250);
});
function w(t) {
  let e = t;
  if (t.get("tagName") === "phpb-block") {
    let i = t.attributes.attributes.id;
    window.pageBlocks[window.currentLanguage][i] !== void 0 && window.pageBlocks[window.currentLanguage][i].html !== void 0 && (e = t.replaceWith(window.pageBlocks[window.currentLanguage][i].html), window.pageBlocks[window.currentLanguage][i].html = "");
  }
  e.get("components").each((i) => w(i));
}
function v(t) {
  "phpb-content-container" in t.attributes.attributes || (j(t), t.get("components").each((e) => v(e)));
}
window.editor.on("component:selected", function(t) {
  m(t) ? $(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(2)").click() : t.get("type") === "" && B(t) && ($(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(3)").click(), $("#gjs-sm-position").hasClass("gjs-sm-open") && $("#gjs-sm-position").find(".gjs-sm-title").click(), $("#gjs-sm-background").hasClass("gjs-sm-open") || $("#gjs-sm-background").find(".gjs-sm-title").click()), m(t) || setTimeout(function() {
    $(".gjs-trt-traits").html('<p class="no-settings">' + window.translations["trait-manager"]["no-settings"] + "</p>");
  }, 0), setTimeout(function() {
    t.attributes.removable || $(".gjs-toolbar .fa-trash-o.gjs-toolbar-item").hide(), t.attributes.copyable || $(".gjs-toolbar .fa-clone.gjs-toolbar-item").hide(), t.attributes.draggable || $(".gjs-toolbar .fa-arrows.gjs-toolbar-item").hide(), !t.attributes.removable && !t.attributes.copyable && !t.attributes.draggable && window.editor.select(t.parent());
    let e = t.attributes["block-slug"];
    if (e) {
      let n = window.themeBlocks[e].label.split("</div>");
      n.length > 1 && $(".gjs-toolbar").attr("title", "Bloknaam: " + n[1]);
    }
  }, 0);
});
window.editor.on("component:clone", function(t) {
  if (!b) {
    let e = window.editor.getWrapper().find("." + t.attributes["style-identifier"])[0];
    t.attributes["style-identifier"] !== void 0 && t.attributes["style-identifier"] !== "" && (t.removeClass(t.attributes["style-identifier"]), delete t.attributes["style-identifier"], p(t)), t.attributes["block-id"] = t.attributes["block-slug"], e && window.customBuilderScripts[e.attributes["block-id"]] !== void 0 && (t.attributes["run-builder-script"] = e.attributes["block-id"]);
  }
});
function B(t) {
  let e = !1, i = t.getEl();
  if (i && i.style) {
    let n = window.getComputedStyle(i);
    ["background", "background-image", "background-color"].forEach((a) => {
      let s = n.getPropertyValue(a);
      s !== void 0 && s !== "" && !s.includes("none") && !s.includes("rgba(0, 0, 0, 0)") && (e = !0);
    });
  }
  return e;
}
function m(t) {
  return t.attributes.traits.length > 0;
}
window.editor.on("block:drag:stop", function(t) {
  if (!t || !t.attributes || !t.attributes.attributes)
    return;
  let e = D();
  t.attributes.attributes["dropped-component-id"] = e;
  let i = t.parent();
  d(t), i.components().each(function(n) {
    n.attributes["dropped-component-id"] === e && (delete n.attributes["dropped-component-id"], t = n);
  }), u(t), window.runScriptsOfComponentAndChildren(t);
});
function d(t) {
  if (t.attributes.tagName === "phpb-block") {
    let e = t.parent(), i = cloneComponent(t), n;
    t.attributes.attributes["is-html"] === "false" ? e.components().each(function(a) {
      if (a.cid === t.cid) {
        let s = "wrapper" in t.attributes.attributes ? t.attributes.attributes.wrapper : "div";
        n = t.replaceWith({ tagName: s }), n.attributes["is-style-wrapper"] = !0, i.components().each(function(l) {
          n.append(cloneComponent(l));
        });
      }
    }) : e.components().each(function(a) {
      if (a.cid === t.cid)
        if (i.components().length === 1) {
          let s = cloneComponent(i.components().models[0]);
          n = t.replaceWith(s);
        } else
          n = t.replaceWith({ tagName: "div" }), n.attributes["is-style-wrapper"] = !0, i.components().each(function(s) {
            n.append(cloneComponent(s));
          });
    }), t.remove(), E(i, n, !0, !1), J(n), d(n);
  } else
    t.components().each(function(e) {
      d(e);
    });
}
function P(t) {
  let e = [], i = t, n = !1;
  for (; i.parent() && i.parent().attributes.attributes["phpb-blocks-container"] === void 0 && i.parent().attributes["is-html"] !== "true" && i.parent().attributes.attributes["phpb-content-container"] === void 0; )
    i.parent().attributes["is-html"] === "false" && (n = !0), i.attributes["block-id"] !== void 0 && e.push(i.attributes["block-id"]), i = i.parent();
  let a = t.attributes["block-id"];
  n ? a = i.attributes["block-id"] : e = [];
  let s = window.pageBlocks[window.currentLanguage][a];
  e.reverse().forEach(function(r) {
    s === void 0 || s.blocks === void 0 || s.blocks[r] === void 0 ? s = {} : s = s.blocks[r];
  });
  let l = {};
  return s !== void 0 && s.settings !== void 0 && s.settings.attributes !== void 0 && (l = s.settings.attributes), l;
}
function J(t) {
  if (window.blockSettings[t.attributes["block-slug"]] === void 0)
    return;
  t.attributes.settings = {};
  let e = P(t);
  e["style-identifier"] !== void 0 && t.addClass(e["style-identifier"]), t.attributes["is-updating"] = !0, window.blockSettings[t.attributes["block-slug"]].forEach(function(n) {
    let a = t.addTrait(n);
    e[n.name] !== void 0 ? a[0].setTargetValue(e[n.name]) : n["default-value"] !== void 0 && a[0].setTargetValue(n["default-value"]);
  }), t.attributes["is-updating"] = !1;
}
window.editor.on("component:update", function(t) {
  if (window.isLoaded !== !0 || t.attributes["block-slug"] === void 0 || t.attributes["is-updating"] || t.changed.attributes === void 0 || $(".gjs-frame").contents().find("#" + t.ccid).length === 0)
    return;
  let e = [], i = t, n = !1;
  for (; i.parent() && i.parent().attributes.attributes["phpb-blocks-container"] === void 0 && i.parent().attributes["is-html"] !== "true" && i.parent().attributes.attributes["phpb-content-container"] === void 0; )
    i.parent().attributes["is-html"] === "false" && (n = !0), i.attributes["block-id"] !== void 0 && e.push(i.attributes["block-id"]), i = i.parent();
  n ? t = i : e = [], t.attributes["is-updating"] = !0, $(".gjs-frame").contents().find("#" + t.ccid).addClass("gjs-freezed");
  let a = window.editor.getWrapper().find("#" + t.ccid)[0].parent(), s = window.getComponentDataInStorageFormat(t);
  $.ajax({
    type: "POST",
    url: window.renderBlockUrl,
    data: {
      data: JSON.stringify(s),
      language: window.currentLanguage
    },
    success: function(l) {
      let r = $(l).attr("block-id");
      window.pageBlocks[window.currentLanguage][r] = s.blocks[r] === void 0 ? {} : s.blocks[r], t.replaceWith(l), w(a), d(a), u(a, !1, !1);
      let o = c(a, [r]);
      runScriptsOfComponentAndChildren(o), e.push(r);
      let _ = c(a, e.reverse());
      window.editor.select(_);
    },
    error: function() {
      $(".gjs-frame").contents().find("#" + t.ccid).removeClass("gjs-freezed"), t.attributes["is-updating"] = !1, window.toastr.error(window.translations["toastr-component-update-failed"]);
    }
  });
});
function c(t, e) {
  if (e.length === 0)
    return t;
  let i = null;
  return t.forEachChild(function(n) {
    if (n.attributes["block-id"] === e[0])
      return i = c(n, e.slice(1)), !1;
  }), t.forEachChild(function(n) {
    let a = c(n, e);
    if (a !== null)
      return i = a, !1;
  }), i;
}
let b = !1;
window.cloneComponent = function(t) {
  b = !0;
  let e = t.clone();
  return T(t, e), b = !1, e;
};
function T(t, e) {
  E(t, e, !1, !0);
  for (let i = 0; i < t.components().length; i++) {
    let n = t.components().models[i], a = e.components().models[i];
    T(n, a);
  }
}
function E(t, e, i, n) {
  let a = t.attributes.attributes;
  for (let s in a)
    n && (e.attributes.attributes[s] = a[s]), i && (e.attributes[s] = a[s]);
}
function u(t, e = !1, i = !0) {
  if (j(t), t.attributes.attributes["phpb-content-container"] !== void 0)
    t.set({
      droppable: !0,
      hoverable: !0
    });
  else if (t.attributes["block-slug"] !== void 0) {
    t.find("[phpb-hide-if-not-editable]").forEach((a) => {
      i || window.afterInitialRendering ? a.addClass("editable") : a.removeClass("editable");
    });
    let n = {
      selectable: !0,
      hoverable: !0
    };
    e || (n = {
      removable: !0,
      draggable: !0,
      copyable: !0,
      selectable: !0,
      hoverable: !0,
      stylable: !0
    }, p(t)), t.attributes["is-html"] === "true" ? (e = !1, i = !0) : (e = !0, i = !1, t.getEl().setAttribute("data-cursor", "default")), t.set(n);
  }
  if (t.attributes.attributes["data-raw-content"] !== void 0) {
    t.set({ editable: !0 });
    return;
  }
  if (i && (U(t), t.attributes["made-text-editable"] === "true")) {
    t.attributes.attributes["data-raw-content"] = "true";
    let n = t.replaceWith(t.toHTML());
    ["block-id", "block-slug", "is-html", "style-identifier"].forEach((a) => {
      n.attributes[a] = t.attributes[a];
    }), u(n);
    return;
  }
  t.get("components").each((n) => u(n, e, i));
}
function U(t) {
  let e = t.get("tagName"), i = [
    //'div','span', // needed for editable bootstrap alert, but cannot be used since divs (block containers) then cannot be removed
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "h7",
    "p",
    "small",
    "b",
    "strong",
    "i",
    "em",
    "label",
    "button",
    "ol",
    "ul",
    "li",
    "table"
  ], n = [
    "img"
  ], a = {};
  "phpb-blocks-container" in t.attributes.attributes && (a.hoverable = !0, a.selectable = !0, a.droppable = !0), i.includes(e) || "phpb-editable" in t.attributes.attributes ? (a.editable = !0, t.attributes["made-text-editable"] = "true") : n.includes(e) && (a.editable = !0), B(t) && (a.hoverable = !0, a.selectable = !0, a.stylable = !0), e === "a" && (a.hoverable = !0, a.selectable = !0, a.stylable = !0, a.removable = !0), $.isEmptyObject(a) || (t.set(a), a.stylable !== void 0 && a.stylable && p(t));
}
function p(t) {
  let e = !1;
  t.getClasses().forEach((i) => {
    i.startsWith("ID") && i.length >= 16 && (e = i);
  }), t.attributes["style-identifier"] === void 0 && (t.attributes["style-identifier"] = e || D()), t.addClass(t.attributes["style-identifier"]);
}
function j(t) {
  t.set({
    removable: !1,
    draggable: !1,
    droppable: !1,
    badgable: !1,
    stylable: !1,
    highlightable: !1,
    copyable: !1,
    resizable: !1,
    editable: !1,
    layerable: !1,
    selectable: !1,
    hoverable: !1
  });
}
let F = 0;
function D() {
  return "ID" + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5) + F++).toUpperCase();
}
function O() {
  window.grapesJSLoaded ? H() : setTimeout(O, 100);
}
O();
window.pageData = {};
window.changesOffset = 0;
window.onbeforeunload = K;
function K() {
  if (window.editor.getModel().get("changesCount") - window.changesOffset > 0)
    return "Are you sure? There are unsaved changes.";
}
$("#save-page").click(function() {
  N();
});
$(document).bind("keydown", function(t) {
  if (t.ctrlKey && t.which === 83)
    return window.editor.store(), N(), t.preventDefault(), !1;
});
window.switchLanguage = function(t, e) {
  window.setWaiting(!0), I(function() {
    L(t);
    let i = window.pageData;
    i.blocks = { [t]: window.pageBlocks[t] }, $.ajax({
      type: "POST",
      url: window.renderLanguageVariantUrl,
      data: {
        data: JSON.stringify(i),
        language: t
      },
      success: function(n) {
        n = JSON.parse(n), window.pageBlocks[t] = n.dynamicBlocks ? n.dynamicBlocks : {}, e(), window.setWaiting(!1);
      },
      error: function(n) {
        e(), console.log(n);
        let a = n.statusText + " " + n.status;
        a = n.responseJSON.message ? a + ': "' + n.responseJSON.message + '"' : a, window.toastr.error(a), window.toastr.error(window.translations["toastr-switching-language-failed"]);
      }
    });
  });
};
function L(t) {
  let e = window.pageBlocks[t], i = window.pageBlocks[window.currentLanguage];
  if (e === void 0)
    e = i;
  else {
    q(i, e);
    for (let n in i)
      e[n] === void 0 && (e[n] = i[n]);
  }
  for (let n in i) {
    let a = $("<container>" + i[n].html + "</container>"), s = $("<container>" + e[n].html + "</container>");
    a.find("[phpb-blocks-container]").each(function(l) {
      let r = $(this).html();
      s.find("[phpb-blocks-container]").eq(l).html(r);
    }), e[n].html = s.html();
  }
  window.pageBlocks[t] = e;
}
function q(t, e) {
  for (let i in t)
    if (e[i] !== void 0)
      for (let n in t[i].blocks) {
        let a = t[i].blocks[n], s = e[i].blocks[n];
        if (!a || !s)
          continue;
        let l = a.html.match(/phpb-blocks-container(.*)>(.*)</g), r = s.html.match(/phpb-blocks-container(.*)>(.*)</g);
        if (!(!l || !r))
          for (let o = 0; o < l.length; o++)
            e[i].blocks[n].html = e[i].blocks[n].html.replace(r[o], l[o]);
      }
}
function I(t) {
  setTimeout(function() {
    let e = window.pageData.css ? window.pageData.css : window.initialCss;
    window.pageData = {
      html: [],
      components: [],
      css: null,
      style: null
    }, window.pageBlocks[window.currentLanguage] = [], window.editor.getWrapper().find("[phpb-content-container]").forEach((i, n) => {
      let a = W(i);
      window.pageData.css = z(e, a.css), window.pageData.style = a.style, window.pageData.html[n] = a.html, window.pageData.components[n] = a.components, window.pageBlocks[window.currentLanguage] = { ...window.pageBlocks[window.currentLanguage], ...a.blocks }, window.contentContainerComponents[n] = a.components;
    }), t && t();
  }, 200);
}
function z(t, e) {
  if (!t)
    return e;
  let i = JSON.stringify(window.pageBlocks), n = "\\.ID(.*?){(.*?)}";
  return t.match(new RegExp(n, "g")).forEach(function(s) {
    let l = s.split("{")[0], r = l.replace(".", " ").trim();
    e.indexOf(l) === -1 && i.indexOf(r) >= 0 && (e += s);
  }), e;
}
function G(t) {
  let e = JSON.stringify(window.pageBlocks), i = [];
  return t.forEach((n) => {
    if (n.attributes.selectors.models.length) {
      let a = n.attributes.selectors.models[0].id;
      e.includes(a) && i.push(n);
    }
  }), i;
}
function N() {
  f(), I(function() {
    $.each(window.languages, (e, i) => {
      e !== window.currentLanguage && L(e);
    });
    let t = window.pageData;
    t.style = G(t.style), t.blocks = window.pageBlocks, $.ajax({
      type: "POST",
      url: $("#save-page").data("url"),
      data: {
        data: JSON.stringify(t)
      },
      success: function() {
        f(), window.toastr.success(window.translations["toastr-changes-saved"]), setTimeout(function() {
          window.changesOffset = window.editor.getModel().get("changesCount");
        }, 250);
      },
      error: function(e) {
        f(), console.log(e);
        let i = e.statusText + " " + e.status;
        i = e.responseJSON.message ? i + ': "' + e.responseJSON.message + '"' : i, window.toastr.error(i), window.toastr.error(window.translations["toastr-saving-failed"]);
      }
    });
  });
}
window.getComponentDataInStorageFormat = function(t) {
  let e = window.cloneComponent(t.parent());
  console.log({
    container: e,
    componentParent: t.parent()
  });
  const i = t.attributes["block-id"];
  return console.log(t.attributes["block-id"]), e.components().forEach((n) => {
    console.log({ c: n }), (n == null ? void 0 : n.attributes["block-id"]) !== i && (n == null || n.remove());
  }), console.log({
    containerL: e.get("components").length,
    componentParentL: t.parent().get("components").length
  }), W(e);
};
function W(t) {
  let e = window.editor.DomComponents.componentsById;
  window.editor.DomComponents.componentsById = [], t = window.cloneComponent(t);
  let i = M(t).blocks, n = window.html_beautify(Q(t)), a = window.editor.getCss(), s = window.editor.getStyle(), l = JSON.parse(JSON.stringify(t.get("components")));
  return window.editor.DomComponents.componentsById = e, {
    html: n,
    css: a,
    components: l,
    blocks: i,
    style: s
  };
}
function Q(t) {
  let e = "";
  t.get("components").forEach((n) => e += n.toHTML());
  let i = $("<container>" + e + "</container>");
  return i.find("phpb-block").each(function() {
    $(this).replaceWith('[block slug="' + $(this).attr("slug") + '" id="' + $(this).attr("id") + '"]');
  }), i.html();
}
function k(t) {
  let e = $("<container>" + t.toHTML() + "</container>");
  return e.find("phpb-block").each(function() {
    $(this).replaceWith('[block slug="' + $(this).attr("slug") + '" id="' + $(this).attr("id") + '"]');
  }), e.html();
}
function M(t, e = !1, i = !1) {
  let n = {
    current_block: { settings: {}, blocks: {}, html: "", is_html: !1 },
    blocks: {}
  }, a = e, s = i;
  if (t.attributes["block-id"] !== void 0 && (t.attributes["is-html"] === "false" ? (a = !0, s = !1) : e && (a = !1, s = !0)), t.get("components").forEach(function(l) {
    let r = M(l, a, s);
    for (let o in r.current_block.blocks)
      n.current_block.blocks[o] = r.current_block.blocks[o];
    for (let o in r.blocks)
      n.blocks[o] = r.blocks[o];
  }), !t.parent() || t.attributes["block-id"] === void 0)
    return n;
  if (t.attributes["is-html"] === "true")
    if (e)
      n.current_block.blocks[t.attributes["block-id"]] = { settings: {}, blocks: {}, html: window.html_beautify(k(t)), is_html: !0 };
    else {
      t.attributes["style-identifier"] !== void 0 && (n.current_block.settings.attributes = { "style-identifier": t.attributes["style-identifier"] });
      let l = t.attributes["block-id"];
      t.attributes["block-id"].startsWith("ID") || (l = C()), t.replaceWith({
        tagName: "phpb-block",
        attributes: {
          slug: t.attributes["block-slug"],
          id: l
        }
      }), n.blocks[l] = { settings: n.current_block.settings, blocks: {}, html: window.html_beautify(k(t)), is_html: !0 }, n.current_block = { settings: {}, blocks: {}, html: "", is_html: !1 };
    }
  else {
    let l = {};
    t.get("traits").each(function(o) {
      l[o.get("name")] = o.getTargetValue();
    }), n.current_block.settings.attributes = l, t.attributes["style-identifier"] !== void 0 && (n.current_block.settings.attributes["style-identifier"] = t.attributes["style-identifier"]);
    let r = t.attributes["block-id"];
    if (t.attributes["block-id"].startsWith("ID") || (r = C()), t.replaceWith({
      tagName: "phpb-block",
      attributes: {
        slug: t.attributes["block-slug"],
        id: r
      }
    }), e) {
      let o = { settings: {}, blocks: {}, html: "", is_html: !1 };
      o.blocks[t.attributes["block-id"]] = n.current_block, n.current_block = o;
    } else
      n.blocks[r] = n.current_block, n.current_block = { settings: {}, blocks: {}, html: "", is_html: !1 };
  }
  return n;
}
let X = 0;
function C() {
  return "ID" + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5) + X++).toUpperCase();
}
window.setWaiting = function(t) {
  let e = window.editor.DomComponents.getWrapper();
  t ? e.addClass("gjs-waiting") : e.removeClass("gjs-waiting");
};
function f() {
  let t = $("#save-page");
  t.blur(), t.hasClass("waiting") ? (t.attr("disabled", !1), t.removeClass("waiting"), t.find(".spinner-border").addClass("d-none")) : (t.attr("disabled", !0), t.addClass("waiting"), t.find(".spinner-border").removeClass("d-none"));
}
window.CKEDITOR.on("instanceReady", function(t) {
  t.editor.on("paste", function(e) {
    let i = e.data.dataValue;
    i = i.replace(/<(?!\/?(?:a|table|tr|td|th|thead|tbody|tfoot|caption|col|colgroup|p|ul|ol|li|br|strong|em|b|i|u|strike|sub|sup|h1|h2|h3|h4|h5|h6|blockquote|pre|hr)\b)[^>]+>/gm, ""), i = i.replace(/<(a|table|tr|td|th|thead|tbody|tfoot|caption|col|colgroup|p|ul|ol|li|br|strong|em|b|i|u|strike|sub|sup|h1|h2|h3|h4|h5|h6|blockquote|pre|hr)\b[^>]*>/gm, function(n, a) {
      if (a === "a") {
        let s = n.match(/href="([^"]*)"/);
        return s ? '<a href="' + s[1] + '">' : n;
      }
      if ("|table|tr|td|th|thead|tbody|tfoot|".includes("|" + a + "|")) {
        let s = n.match(/style="([^"]*)"/);
        return s ? "<" + a + ' style="' + s[1] + '">' : n;
      }
      return "<" + a + ">";
    }), e.data.dataValue = i;
  });
});
window.CKEDITOR.on("dialogDefinition", function(t) {
  let e = t.data.name, i = t.data.definition;
  if (e === "link") {
    let n = i.getContents("info");
    i.onLoad = function() {
      let a = CKEDITOR.dialog.getCurrent();
      a.getContentElement("info", "linkType").getElement().hide(), a.getContentElement("info", "protocol").getElement().hide(), a.getContentElement("info", "url").getElement().hide();
    }, n.add({
      type: "select",
      id: "linktype-selector",
      label: "Linktype",
      default: "",
      items: [
        [window.translations.page, "page"],
        ["URL", "url"]
      ],
      onChange: function(a) {
        let s = CKEDITOR.dialog.getCurrent();
        a.data.value === "page" ? (s.getContentElement("info", "page-selector").getElement().show(), s.getContentElement("info", "url-field").getElement().hide()) : (s.getContentElement("info", "page-selector").getElement().hide(), s.getContentElement("info", "url-field").getElement().show(), s.getContentElement("info", "url-field").setValue(""));
      },
      setup: function(a) {
        a.type === void 0 ? this.setValue("page") : a.type === "url" && a.url.url.startsWith("[page id=") ? this.setValue("page") : this.setValue(a.type);
      }
    }), n.add({
      type: "select",
      id: "page-selector",
      label: window.translations.page,
      default: "",
      items: window.pages,
      onChange: function() {
        let a = CKEDITOR.dialog.getCurrent(), s = "[page id=" + this.getValue() + "]";
        a.setValueOf("info", "url", s), a.setValueOf("info", "protocol", "");
      },
      setup: function(a) {
        this.allowOnChange = !1;
        let s = "";
        a.url && (s = a.url.url.substr(9, a.url.url.length - 10)), this.setValue(s), this.allowOnChange = !0;
      }
    }), n.add({
      type: "text",
      id: "url-field",
      label: "URL",
      default: "",
      onChange: function() {
        let a = CKEDITOR.dialog.getCurrent(), s = this.getValue();
        a.setValueOf("info", "url", s);
      },
      setup: function(a) {
        this.allowOnChange = !1;
        let s = "";
        a.url && (s = a.url.url), this.setValue(s), this.allowOnChange = !0;
      }
    });
  }
});
window.touchStart = function() {
  $("#gjs").addClass("sidebar-collapsed");
};
window.addEventListener("keydown", function(t) {
  if (t.ctrlKey && t.key === "s")
    return t.preventDefault(), !1;
});
window.parent.postMessage("page-loaded", "*");
document.addEventListener("touchstart", (t) => {
  window.parent.postMessage("touch-start", "*");
});
