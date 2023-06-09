$(document).ready(function() {
  $(".gjs-editor").append($("#toggle-sidebar")), $(".gjs-pn-panels").prepend($("#sidebar-header")), $(".gjs-pn-panels").append($("#sidebar-bottom-buttons")), $("#toggle-sidebar").click(function() {
    $("#gjs").toggleClass("sidebar-collapsed"), f();
  }), w(), window.editor.on("run:open-sm", function(u) {
    $(".gjs-trt-traits").parent().parent().css("display", "none"), $(".gjs-sm-sectors").parent().parent().css("display", "block"), $("#gjs-sm-advanced .gjs-sm-properties").append($(".gjs-clm-tags"));
  }), window.editor.on("run:open-tm", function(u) {
    $(".gjs-sm-sectors").parent().parent().css("display", "none"), $(".gjs-trt-traits").parent().parent().css("display", "block");
  }), window.editor.on("block:drag:start", function(u) {
    w();
  }), window.editor.on("rteToolbarPosUpdate", function(u) {
    !window.editor || !window.editor.getSelected() || !window.editor.getSelected().getEl() || setTimeout(function() {
      let b = $(".gjs-rte-toolbar").first();
      if (b.offset().top < u.elementTop + 0.5 * u.elementHeight) {
        let C = u.elementTop - b.height();
        C > 0 && b.css("top", C + "px");
      }
    }, 0);
  });
  function w() {
    $(window).width() < 1e3 && ($("#gjs").addClass("sidebar-collapsed"), f());
  }
  function f() {
    window.editor.trigger("change:canvasOffset canvasScroll");
  }
  let d = !1;
  $(document).keydown(function(u) {
    u.which === 8 && (d = !0);
  }).keyup(function(u) {
    u.which === 8 && (d = !1);
  }), $(window).on("beforeunload", function(u) {
    d && u.preventDefault();
  });
});
function I() {
  $(".gjs-blocks-cs").prepend($("#block-search"));
}
window.addEventListener("message", W, !1);
function W(w) {
  w.data === "page-loaded" ? ($("#phpb-loading").addClass("loaded"), I(), window.isLoaded = !0, $(window).trigger("pagebuilder-page-loaded")) : w.data === "touch-start" && window.touchStart();
}
$(document).on("input", "#block-search input", function() {
  let w = $(this).val().toLowerCase();
  $(".gjs-block-category").each(function() {
    let f = !1;
    $(this).find(".gjs-block").each(function() {
      $(this).data("original-html") || $(this).data("original-html", $(this).html());
      let d = $(this).text();
      if (d.toLowerCase().includes(w)) {
        $(this).removeClass("d-none"), f = !0;
        let u = new RegExp("(" + w + ")", "gi"), o = d.replace(u, "<b>$1</b>");
        $(this).find(".gjs-block-label").html(
          $(this).data("original-html").replace(d.trim(), o)
        );
      } else
        $(this).addClass("d-none");
    }), $(this).removeClass("d-none"), f || $(this).addClass("d-none");
  });
});
(function() {
  window.customBuilderScripts = {}, window.editor.on("component:create", (f) => {
    if (f.components().length) {
      let d = f.components().models[f.components().length - 1];
      if (d.attributes.type === "script") {
        let u = f.attributes.attributes["block-id"];
        u === void 0 && (u = f.attributes.attributes.id);
        let o = d, b = !1;
        for (; o.parent(); )
          if (o = o.parent(), o.attributes.attributes["phpb-content-container"]) {
            b = !0;
            break;
          }
        b && (window.customBuilderScripts[u] = d.toHTML(), d.remove());
      }
    }
  }), window.editor.on("component:add", function(f) {
    if (f.attributes["run-builder-script"] !== void 0) {
      let d = customBuilderScripts;
      window.customBuilderScripts[f.attributes["block-id"]] = customBuilderScripts[f.attributes["run-builder-script"]], runScriptsOfComponentAndChildren(f), window.customBuilderScripts = d, delete f.attributes["run-builder-script"];
    }
  }), window.editor.on("sorter:drag:end", function(f) {
    let d = f.modelToDrop;
    d && d.attributes && (d.attributes["block-id"] || d.attributes.id) && window.runScriptsOfComponentAndChildren(d);
    for (let u in CKEDITOR.instances)
      CKEDITOR.instances[u].destroy(!0);
  }), window.runScriptsOfComponentAndChildren = function(f) {
    w(f), f.components().each(function(d) {
      runScriptsOfComponentAndChildren(d);
    });
  };
  function w(f) {
    let d = f.attributes["block-id"];
    if (d === void 0 && (d = f.attributes.attributes.id), d && window.customBuilderScripts[d] !== void 0) {
      let u = f.attributes["style-identifier"], o = $("<container>").append(window.customBuilderScripts[d]);
      o.find("script").prepend("let inPageBuilder = true;"), o.find("script").prepend('let blockSelector = ".' + u + '";'), o.find("script").prepend('let block = document.getElementsByClassName("' + u + '")[0];'), o.find("script").prepend("(function(){"), o.find("script").append("})();");
      let b = document.createElement("script");
      b.type = "text/javascript", b.innerHTML = o.find("script").html(), window.editor.Canvas.getDocument().body.appendChild(b);
    }
  }
})();
(function() {
  function w() {
    d();
    let t = document.createElement("script");
    t.type = "text/javascript", t.src = window.injectionScriptUrl;
    let e = t.outerHTML + "<script>" + f.toString() + f.name + "()<\/script>";
    window.initialComponents = window.initialComponents.replace("</body>", e + "</body>"), $.each(window.languages, (n, l) => {
      window.pageBlocks[n] === null && (window.pageBlocks[n] = {});
    }), activateLanguage(window.currentLanguage);
  }
  function f() {
    let t = document.querySelectorAll("script");
    for (let e = 0; e < t.length; e++) {
      let n = t[e];
      if (n.innerHTML.startsWith("var script")) {
        let l = n.innerHTML.split("=")[0], r = parseInt(l.replace("var script", ""));
        if (Number.isInteger(r)) {
          let g = "script" + r + "Start";
          if (typeof window[g] == "function")
            return r !== 0 && window[g](), !1;
        }
      }
    }
  }
  function d() {
    for (let t in window.themeBlocks) {
      let e = window.themeBlocks[t], n = $("<container>").append(e.content);
      n.find("[phpb-blocks-container]").each(function() {
        $(this).html() !== "" && $(this).html().trim() === "" && $(this).html("");
      }), window.themeBlocks[t].content = n.html(), e.content = n.html(), editor.BlockManager.add(t, e);
    }
  }
  $("#language-selector select").on("change", function() {
    let t = $(this).find("option:selected").val();
    window.switchLanguage(t, function() {
      activateLanguage(t);
    });
  }), window.activateLanguage = function(t) {
    window.currentLanguage = t, window.editor.select(), window.editor.DomComponents.clear(), window.editor.DomComponents.componentsById = [], window.editor.UndoManager.clear(), window.editor.Canvas.getDocument().querySelectorAll("script").forEach(function(e) {
      e.remove();
    }), window.editor.setComponents(window.initialComponents), o(editor.getWrapper()), window.editor.getWrapper().find("[phpb-content-container]").forEach((e, n) => {
      e.set("custom-name", window.translations["page-content"]), e.components(window.contentContainerComponents[n]), u(e), C(e);
    });
  }, $(window).on("pagebuilder-page-loaded", function(t) {
    window.editor.getWrapper().find("[phpb-content-container]").forEach((e) => {
      s(e), window.runScriptsOfComponentAndChildren(e);
    }), window.setWaiting(!1), setTimeout(function() {
      window.changesOffset = window.editor.getModel().get("changesCount"), window.afterInitialRendering = !0;
    }, 250);
  });
  function u(t) {
    let e = t;
    if (t.get("tagName") === "phpb-block") {
      let n = t.attributes.attributes.id;
      window.pageBlocks[window.currentLanguage][n] !== void 0 && window.pageBlocks[window.currentLanguage][n].html !== void 0 && (e = t.replaceWith(window.pageBlocks[window.currentLanguage][n].html), window.pageBlocks[window.currentLanguage][n].html = "");
    }
    e.get("components").each((n) => u(n));
  }
  function o(t) {
    "phpb-content-container" in t.attributes.attributes || (p(t), t.get("components").each((e) => o(e)));
  }
  window.editor.on("component:selected", function(t) {
    v(t) ? $(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(2)").click() : t.get("type") === "" && b(t) && ($(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(3)").click(), $("#gjs-sm-position").hasClass("gjs-sm-open") && $("#gjs-sm-position").find(".gjs-sm-title").click(), $("#gjs-sm-background").hasClass("gjs-sm-open") || $("#gjs-sm-background").find(".gjs-sm-title").click()), v(t) || setTimeout(function() {
      $(".gjs-trt-traits").html('<p class="no-settings">' + window.translations["trait-manager"]["no-settings"] + "</p>");
    }, 0), setTimeout(function() {
      t.attributes.removable || $(".gjs-toolbar .fa-trash-o.gjs-toolbar-item").hide(), t.attributes.copyable || $(".gjs-toolbar .fa-clone.gjs-toolbar-item").hide(), t.attributes.draggable || $(".gjs-toolbar .fa-arrows.gjs-toolbar-item").hide(), !t.attributes.removable && !t.attributes.copyable && !t.attributes.draggable && window.editor.select(t.parent());
      let e = t.attributes["block-slug"];
      if (e) {
        let l = window.themeBlocks[e].label.split("</div>");
        l.length > 1 && $(".gjs-toolbar").attr("title", "Bloknaam: " + l[1]);
      }
    }, 0);
  }), window.editor.on("component:clone", function(t) {
    if (!B) {
      let e = window.editor.getWrapper().find("." + t.attributes["style-identifier"])[0];
      t.attributes["style-identifier"] !== void 0 && t.attributes["style-identifier"] !== "" && (t.removeClass(t.attributes["style-identifier"]), delete t.attributes["style-identifier"], a(t)), t.attributes["block-id"] = t.attributes["block-slug"], e && window.customBuilderScripts[e.attributes["block-id"]] !== void 0 && (t.attributes["run-builder-script"] = e.attributes["block-id"]);
    }
  });
  function b(t) {
    let e = !1, n = t.getEl();
    if (n && n.style) {
      let l = window.getComputedStyle(n);
      ["background", "background-image", "background-color"].forEach((r) => {
        let g = l.getPropertyValue(r);
        g !== void 0 && g !== "" && !g.includes("none") && !g.includes("rgba(0, 0, 0, 0)") && (e = !0);
      });
    }
    return e;
  }
  function v(t) {
    return t.attributes.traits.length > 0;
  }
  window.editor.on("block:drag:stop", function(t) {
    if (!t || !t.attributes || !t.attributes.attributes)
      return;
    let e = h();
    t.attributes.attributes["dropped-component-id"] = e;
    let n = t.parent();
    C(t), n.components().each(function(l) {
      l.attributes["dropped-component-id"] === e && (delete l.attributes["dropped-component-id"], t = l);
    }), s(t), window.runScriptsOfComponentAndChildren(t);
  });
  function C(t) {
    if (t.attributes.tagName === "phpb-block") {
      let e = t.parent(), n = cloneComponent(t), l;
      t.attributes.attributes["is-html"] === "false" ? e.components().each(function(r) {
        if (r.cid === t.cid) {
          let g = "wrapper" in t.attributes.attributes ? t.attributes.attributes.wrapper : "div";
          l = t.replaceWith({ tagName: g }), l.attributes["is-style-wrapper"] = !0, n.components().each(function(S) {
            l.append(cloneComponent(S));
          });
        }
      }) : e.components().each(function(r) {
        if (r.cid === t.cid)
          if (n.components().length === 1) {
            let g = cloneComponent(n.components().models[0]);
            l = t.replaceWith(g);
          } else
            l = t.replaceWith({ tagName: "div" }), l.attributes["is-style-wrapper"] = !0, n.components().each(function(g) {
              l.append(cloneComponent(g));
            });
      }), t.remove(), i(n, l, !0, !1), D(l), C(l);
    } else
      t.components().each(function(e) {
        C(e);
      });
  }
  function j(t) {
    let e = [], n = t, l = !1;
    for (; n.parent() && n.parent().attributes.attributes["phpb-blocks-container"] === void 0 && n.parent().attributes["is-html"] !== "true" && n.parent().attributes.attributes["phpb-content-container"] === void 0; )
      n.parent().attributes["is-html"] === "false" && (l = !0), n.attributes["block-id"] !== void 0 && e.push(n.attributes["block-id"]), n = n.parent();
    let r = t.attributes["block-id"];
    l ? r = n.attributes["block-id"] : e = [];
    let g = window.pageBlocks[window.currentLanguage][r];
    e.reverse().forEach(function(y) {
      g === void 0 || g.blocks === void 0 || g.blocks[y] === void 0 ? g = {} : g = g.blocks[y];
    });
    let S = {};
    return g !== void 0 && g.settings !== void 0 && g.settings.attributes !== void 0 && (S = g.settings.attributes), S;
  }
  function D(t) {
    if (window.blockSettings[t.attributes["block-slug"]] === void 0)
      return;
    t.attributes.settings = {};
    let e = j(t);
    e["style-identifier"] !== void 0 && t.addClass(e["style-identifier"]), t.attributes["is-updating"] = !0, window.blockSettings[t.attributes["block-slug"]].forEach(function(l) {
      let r = t.addTrait(l);
      e[l.name] !== void 0 ? r.setTargetValue(e[l.name]) : l["default-value"] !== void 0 && r.setTargetValue(l["default-value"]);
    }), t.attributes["is-updating"] = !1;
  }
  window.editor.on("component:update", function(t) {
    if (window.isLoaded !== !0 || t.attributes["block-slug"] === void 0 || t.attributes["is-updating"] || t.changed.attributes === void 0 || $(".gjs-frame").contents().find("#" + t.ccid).length === 0)
      return;
    let e = [], n = t, l = !1;
    for (; n.parent() && n.parent().attributes.attributes["phpb-blocks-container"] === void 0 && n.parent().attributes["is-html"] !== "true" && n.parent().attributes.attributes["phpb-content-container"] === void 0; )
      n.parent().attributes["is-html"] === "false" && (l = !0), n.attributes["block-id"] !== void 0 && e.push(n.attributes["block-id"]), n = n.parent();
    l ? t = n : e = [], t.attributes["is-updating"] = !0, $(".gjs-frame").contents().find("#" + t.ccid).addClass("gjs-freezed");
    let r = window.editor.getWrapper().find("#" + t.ccid)[0].parent(), g = window.getComponentDataInStorageFormat(t);
    $.ajax({
      type: "POST",
      url: window.renderBlockUrl,
      data: {
        data: JSON.stringify(g),
        language: window.currentLanguage
      },
      success: function(S) {
        let y = $(S).attr("block-id");
        window.pageBlocks[window.currentLanguage][y] = g.blocks[y] === void 0 ? {} : g.blocks[y], t.replaceWith(S), u(r), C(r), s(r, !1, !1);
        let O = T(r, [y]);
        runScriptsOfComponentAndChildren(O), e.push(y);
        let L = T(r, e.reverse());
        window.editor.select(L);
      },
      error: function() {
        $(".gjs-frame").contents().find("#" + t.ccid).removeClass("gjs-freezed"), t.attributes["is-updating"] = !1, window.toastr.error(window.translations["toastr-component-update-failed"]);
      }
    });
  });
  function T(t, e) {
    if (e.length === 0)
      return t;
    let n = null;
    return t.components().each(function(l) {
      if (l.attributes["block-id"] === e[0])
        return n = T(l, e.slice(1)), !1;
    }), t.components().each(function(l) {
      let r = T(l, e);
      if (r !== null)
        return n = r, !1;
    }), n;
  }
  let B = !1;
  window.cloneComponent = function(t) {
    B = !0;
    let e = t.clone();
    return E(t, e), B = !1, e;
  };
  function E(t, e) {
    i(t, e, !1, !0);
    for (let n = 0; n < t.components().length; n++) {
      let l = t.components().models[n], r = e.components().models[n];
      E(l, r);
    }
  }
  function i(t, e, n, l) {
    let r = t.attributes.attributes;
    for (let g in r)
      l && (e.attributes.attributes[g] = r[g]), n && (e.attributes[g] = r[g]);
  }
  function s(t, e = !1, n = !0) {
    if (p(t), t.attributes.attributes["phpb-content-container"] !== void 0)
      t.set({
        droppable: !0,
        hoverable: !0
      });
    else if (t.attributes["block-slug"] !== void 0) {
      t.find("[phpb-hide-if-not-editable]").forEach((r) => {
        n || window.afterInitialRendering ? r.addClass("editable") : r.removeClass("editable");
      });
      let l = {
        selectable: !0,
        hoverable: !0
      };
      e || (l = {
        removable: !0,
        draggable: !0,
        copyable: !0,
        selectable: !0,
        hoverable: !0,
        stylable: !0
      }, a(t)), t.attributes["is-html"] === "true" ? (e = !1, n = !0) : (e = !0, n = !1, t.getEl().setAttribute("data-cursor", "default")), t.set(l);
    }
    if (t.attributes.attributes["data-raw-content"] !== void 0) {
      t.set({ editable: !0 });
      return;
    }
    if (n && (c(t), t.attributes["made-text-editable"] === "true")) {
      t.attributes.attributes["data-raw-content"] = "true";
      let l = t.replaceWith(t.toHTML());
      ["block-id", "block-slug", "is-html", "style-identifier"].forEach((r) => {
        l.attributes[r] = t.attributes[r];
      }), s(l);
      return;
    }
    t.get("components").each((l) => s(l, e, n));
  }
  function c(t) {
    let e = t.get("tagName"), n = [
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
    ], l = [
      "img"
    ], r = {};
    "phpb-blocks-container" in t.attributes.attributes && (r.hoverable = !0, r.selectable = !0, r.droppable = !0), n.includes(e) || "phpb-editable" in t.attributes.attributes ? (r.editable = !0, t.attributes["made-text-editable"] = "true") : l.includes(e) && (r.editable = !0), b(t) && (r.hoverable = !0, r.selectable = !0, r.stylable = !0), e === "a" && (r.hoverable = !0, r.selectable = !0, r.stylable = !0, r.removable = !0), $.isEmptyObject(r) || (t.set(r), r.stylable !== void 0 && r.stylable && a(t));
  }
  function a(t) {
    let e = !1;
    t.getClasses().forEach((n) => {
      n.startsWith("ID") && n.length === 16 && (e = n);
    }), t.attributes["style-identifier"] === void 0 && (t.attributes["style-identifier"] = e || h()), t.addClass(t.attributes["style-identifier"]);
  }
  function p(t) {
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
  let k = 0;
  function h() {
    return "ID" + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5) + k++).toUpperCase();
  }
  function m() {
    window.grapesJSLoaded ? w() : setTimeout(m, 100);
  }
  m();
})();
$(document).ready(function() {
  window.pageData = {}, window.changesOffset = 0, window.onbeforeunload = w;
  function w() {
    if (window.editor.getModel().get("changesCount") - window.changesOffset > 0)
      return "Are you sure? There are unsaved changes.";
  }
  $("#save-page").click(function() {
    o();
  }), $(document).bind("keydown", function(i) {
    if (i.ctrlKey && i.which === 83)
      return window.editor.store(), o(), i.preventDefault(), !1;
  }), window.switchLanguage = function(i, s) {
    window.setWaiting(!0), u(function() {
      f(i);
      let c = window.pageData;
      c.blocks = { [i]: window.pageBlocks[i] }, $.ajax({
        type: "POST",
        url: window.renderLanguageVariantUrl,
        data: {
          data: JSON.stringify(c),
          language: i
        },
        success: function(a) {
          a = JSON.parse(a), window.pageBlocks[i] = a.dynamicBlocks ? a.dynamicBlocks : {}, s();
        },
        error: function(a) {
          s(), console.log(a);
          let p = a.statusText + " " + a.status;
          p = a.responseJSON.message ? p + ': "' + a.responseJSON.message + '"' : p, window.toastr.error(p), window.toastr.error(window.translations["toastr-switching-language-failed"]);
        }
      });
    });
  };
  function f(i) {
    let s = window.pageBlocks[i], c = window.pageBlocks[window.currentLanguage];
    if (s === void 0)
      s = c;
    else {
      d(c, s);
      for (let a in c)
        s[a] === void 0 && (s[a] = c[a]);
    }
    for (let a in c) {
      let p = $("<container>" + c[a].html + "</container>"), k = $("<container>" + s[a].html + "</container>");
      p.find("[phpb-blocks-container]").each(function(h) {
        let m = $(this).html();
        k.find("[phpb-blocks-container]").eq(h).html(m);
      }), s[a].html = k.html();
    }
    window.pageBlocks[i] = s;
  }
  function d(i, s) {
    for (let c in i)
      if (s[c] !== void 0)
        for (let a in i[c].blocks) {
          let p = i[c].blocks[a], k = s[c].blocks[a];
          if (!p || !k)
            continue;
          let h = p.html.match(/phpb-blocks-container(.*)>(.*)</g), m = k.html.match(/phpb-blocks-container(.*)>(.*)</g);
          if (!(!h || !m))
            for (let t = 0; t < h.length; t++)
              s[c].blocks[a].html = s[c].blocks[a].html.replace(m[t], h[t]);
        }
  }
  function u(i) {
    setTimeout(function() {
      window.pageData = {
        html: [],
        components: [],
        css: null,
        style: null
      }, window.pageBlocks[window.currentLanguage] = [], window.editor.getWrapper().find("[phpb-content-container]").forEach((s, c) => {
        let a = v(s);
        window.pageData.css = a.css, window.pageData.style = a.style, window.pageData.html[c] = a.html, window.pageData.components[c] = a.components, window.pageBlocks[window.currentLanguage] = { ...window.pageBlocks[window.currentLanguage], ...a.blocks }, window.contentContainerComponents[c] = a.components;
      }), i && i();
    }, 200);
  }
  function o() {
    E(), u(function() {
      $.each(window.languages, (s, c) => {
        s !== window.currentLanguage && f(s);
      });
      let i = window.pageData;
      i.style = b(i.css, i.style), i.blocks = window.pageBlocks, $.ajax({
        type: "POST",
        url: $("#save-page").data("url"),
        data: {
          data: JSON.stringify(i)
        },
        success: function() {
          E(), window.toastr.success(window.translations["toastr-changes-saved"]), setTimeout(function() {
            window.changesOffset = window.editor.getModel().get("changesCount");
          }, 250);
        },
        error: function(s) {
          E(), console.log(s);
          let c = s.statusText + " " + s.status;
          c = s.responseJSON.message ? c + ': "' + s.responseJSON.message + '"' : c, window.toastr.error(c), window.toastr.error(window.translations["toastr-saving-failed"]);
        }
      });
    });
  }
  function b(i, s) {
    let c = [];
    return s.forEach((a) => {
      if (a.attributes.selectors.models.length) {
        let p = a.attributes.selectors.models[0].id;
        i.includes(p) && c.push(a);
      }
    }), c;
  }
  window.getComponentDataInStorageFormat = function(i) {
    let s = window.cloneComponent(i.parent());
    return s.get("components").reset(), s.append(i), v(s);
  };
  function v(i) {
    let s = window.editor.DomComponents.componentsById;
    window.editor.DomComponents.componentsById = [], i = window.cloneComponent(i);
    let c = D(i).blocks, a = window.html_beautify(C(i)), p = window.editor.getCss(), k = window.editor.getStyle(), h = JSON.parse(JSON.stringify(i.get("components")));
    return window.editor.DomComponents.componentsById = s, {
      html: a,
      css: p,
      components: h,
      blocks: c,
      style: k
    };
  }
  function C(i) {
    let s = "";
    i.get("components").forEach((a) => s += a.toHTML());
    let c = $("<container>" + s + "</container>");
    return c.find("phpb-block").each(function() {
      $(this).replaceWith('[block slug="' + $(this).attr("slug") + '" id="' + $(this).attr("id") + '"]');
    }), c.html();
  }
  function j(i) {
    let s = $("<container>" + i.toHTML() + "</container>");
    return s.find("phpb-block").each(function() {
      $(this).replaceWith('[block slug="' + $(this).attr("slug") + '" id="' + $(this).attr("id") + '"]');
    }), s.html();
  }
  function D(i, s = !1, c = !1) {
    let a = {
      current_block: { settings: {}, blocks: {}, html: "", is_html: !1 },
      blocks: {}
    }, p = s, k = c;
    if (i.attributes["block-id"] !== void 0 && (i.attributes["is-html"] === "false" ? (p = !0, k = !1) : s && (p = !1, k = !0)), i.get("components").forEach(function(h) {
      let m = D(h, p, k);
      for (let t in m.current_block.blocks)
        a.current_block.blocks[t] = m.current_block.blocks[t];
      for (let t in m.blocks)
        a.blocks[t] = m.blocks[t];
    }), !i.parent() || i.attributes["block-id"] === void 0)
      return a;
    if (i.attributes["is-html"] === "true")
      if (s)
        a.current_block.blocks[i.attributes["block-id"]] = { settings: {}, blocks: {}, html: window.html_beautify(j(i)), is_html: !0 };
      else {
        i.attributes["style-identifier"] !== void 0 && (a.current_block.settings.attributes = { "style-identifier": i.attributes["style-identifier"] });
        let h = i.attributes["block-id"];
        i.attributes["block-id"].startsWith("ID") || (h = B()), i.replaceWith({
          tagName: "phpb-block",
          attributes: {
            slug: i.attributes["block-slug"],
            id: h
          }
        }), a.blocks[h] = { settings: a.current_block.settings, blocks: {}, html: window.html_beautify(j(i)), is_html: !0 }, a.current_block = { settings: {}, blocks: {}, html: "", is_html: !1 };
      }
    else {
      let h = {};
      i.get("traits").each(function(t) {
        h[t.get("name")] = t.getTargetValue();
      }), a.current_block.settings.attributes = h, i.attributes["style-identifier"] !== void 0 && (a.current_block.settings.attributes["style-identifier"] = i.attributes["style-identifier"]);
      let m = i.attributes["block-id"];
      if (i.attributes["block-id"].startsWith("ID") || (m = B()), i.replaceWith({
        tagName: "phpb-block",
        attributes: {
          slug: i.attributes["block-slug"],
          id: m
        }
      }), s) {
        let t = { settings: {}, blocks: {}, html: "", is_html: !1 };
        t.blocks[i.attributes["block-id"]] = a.current_block, a.current_block = t;
      } else
        a.blocks[m] = a.current_block, a.current_block = { settings: {}, blocks: {}, html: "", is_html: !1 };
    }
    return a;
  }
  let T = 0;
  function B() {
    return "ID" + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5) + T++).toUpperCase();
  }
  window.setWaiting = function(i) {
    let s = window.editor.DomComponents.getWrapper();
    i ? s.addClass("gjs-waiting") : s.removeClass("gjs-waiting");
  };
  function E() {
    let i = $("#save-page");
    i.blur(), i.hasClass("waiting") ? (i.attr("disabled", !1), i.removeClass("waiting"), i.find(".spinner-border").addClass("d-none")) : (i.attr("disabled", !0), i.addClass("waiting"), i.find(".spinner-border").removeClass("d-none"));
  }
});
$(document).ready(function() {
  window.CKEDITOR.on("instanceReady", function(w) {
    w.editor.on("paste", function(f) {
      let d = f.data.dataValue;
      d = d.replace(/<(?!\/?(?:a|table|tr|td|th|thead|tbody|tfoot|caption|col|colgroup|p|ul|ol|li|br|strong|em|b|i|u|strike|sub|sup|h1|h2|h3|h4|h5|h6|blockquote|pre|hr)\b)[^>]+>/gm, ""), d = d.replace(/<(a|table|tr|td|th|thead|tbody|tfoot|caption|col|colgroup|p|ul|ol|li|br|strong|em|b|i|u|strike|sub|sup|h1|h2|h3|h4|h5|h6|blockquote|pre|hr)\b[^>]*>/gm, function(u, o) {
        if (o === "a") {
          let b = u.match(/href="([^"]*)"/);
          return b ? '<a href="' + b[1] + '">' : u;
        }
        if ("|table|tr|td|th|thead|tbody|tfoot|".includes("|" + o + "|")) {
          let b = u.match(/style="([^"]*)"/);
          return b ? "<" + o + ' style="' + b[1] + '">' : u;
        }
        return "<" + o + ">";
      }), f.data.dataValue = d;
    });
  }), window.CKEDITOR.on("dialogDefinition", function(w) {
    let f = w.data.name, d = w.data.definition;
    if (f === "link") {
      let u = d.getContents("info");
      d.onLoad = function() {
        let o = CKEDITOR.dialog.getCurrent();
        o.getContentElement("info", "linkType").getElement().hide(), o.getContentElement("info", "protocol").getElement().hide(), o.getContentElement("info", "url").getElement().hide();
      }, u.add({
        type: "select",
        id: "linktype-selector",
        label: "Linktype",
        default: "",
        items: [
          [window.translations.page, "page"],
          ["URL", "url"]
        ],
        onChange: function(o) {
          let b = CKEDITOR.dialog.getCurrent();
          o.data.value === "page" ? (b.getContentElement("info", "page-selector").getElement().show(), b.getContentElement("info", "url-field").getElement().hide()) : (b.getContentElement("info", "page-selector").getElement().hide(), b.getContentElement("info", "url-field").getElement().show(), b.getContentElement("info", "url-field").setValue(""));
        },
        setup: function(o) {
          o.type === void 0 ? this.setValue("page") : o.type === "url" && o.url.url.startsWith("[page id=") ? this.setValue("page") : this.setValue(o.type);
        }
      }), u.add({
        type: "select",
        id: "page-selector",
        label: window.translations.page,
        default: "",
        items: window.pages,
        onChange: function() {
          let o = CKEDITOR.dialog.getCurrent(), b = "[page id=" + this.getValue() + "]";
          o.setValueOf("info", "url", b), o.setValueOf("info", "protocol", "");
        },
        setup: function(o) {
          this.allowOnChange = !1;
          let b = "";
          o.url && (b = o.url.url.substr(9, o.url.url.length - 10)), this.setValue(b), this.allowOnChange = !0;
        }
      }), u.add({
        type: "text",
        id: "url-field",
        label: "URL",
        default: "",
        onChange: function() {
          let o = CKEDITOR.dialog.getCurrent(), b = this.getValue();
          o.setValueOf("info", "url", b);
        },
        setup: function(o) {
          this.allowOnChange = !1;
          let b = "";
          o.url && (b = o.url.url), this.setValue(b), this.allowOnChange = !0;
        }
      });
    }
  });
});
$(document).ready(function() {
  window.touchStart = function() {
    $("#gjs").addClass("sidebar-collapsed");
  };
});
window.addEventListener("keydown", function(w) {
  if (w.ctrlKey && w.key === "s")
    return w.preventDefault(), !1;
});
window.parent.postMessage("page-loaded", "*");
document.addEventListener("touchstart", (w) => {
  window.parent.postMessage("touch-start", "*");
});
