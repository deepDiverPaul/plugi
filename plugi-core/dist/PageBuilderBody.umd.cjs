(function(d){typeof define=="function"&&define.amd?define(d):d()})(function(){"use strict";$(".gjs-editor").append($("#toggle-sidebar")),$(".gjs-pn-panels").prepend($("#sidebar-header")),$(".gjs-pn-panels").append($("#sidebar-bottom-buttons")),$("#toggle-sidebar").click(function(){$("#gjs").toggleClass("sidebar-collapsed"),m()}),d(),window.editor.on("run:open-sm",function(t){$(".gjs-trt-traits").parent().parent().css("display","none"),$(".gjs-sm-sectors").parent().parent().css("display","block"),$("#gjs-sm-advanced .gjs-sm-properties").append($(".gjs-clm-tags"))}),window.editor.on("run:open-tm",function(t){$(".gjs-sm-sectors").parent().parent().css("display","none"),$(".gjs-trt-traits").parent().parent().css("display","block")}),window.editor.on("block:drag:start",function(t){d()}),window.editor.on("rteToolbarPosUpdate",function(t){!window.editor||!window.editor.getSelected()||!window.editor.getSelected().getEl()||setTimeout(function(){let i=$(".gjs-rte-toolbar").first();if(i.offset().top<t.elementTop+.5*t.elementHeight){let s=t.elementTop-i.height();s>0&&i.css("top",s+"px")}},0)});function d(){$(window).width()<1e3&&($("#gjs").addClass("sidebar-collapsed"),m())}function m(){window.editor.trigger("change:canvasOffset canvasScroll")}let b=!1;$(document).keydown(function(t){t.which===8&&(b=!0)}).keyup(function(t){t.which===8&&(b=!1)}),$(window).on("beforeunload",function(t){b&&t.preventDefault()});function _(){$(".gjs-blocks-cs").prepend($("#block-search"))}window.addEventListener("message",A,!1);function A(t){t.data==="page-loaded"?($("#phpb-loading").addClass("loaded"),_(),window.isLoaded=!0,$(window).trigger("pagebuilder-page-loaded")):t.data==="touch-start"&&window.touchStart()}$(document).on("input","#block-search input",function(){let t=$(this).val().toLowerCase();$(".gjs-block-category").each(function(){let e=!1;$(this).find(".gjs-block").each(function(){$(this).data("original-html")||$(this).data("original-html",$(this).html());let i=$(this).text();if(i.toLowerCase().includes(t)){$(this).removeClass("d-none"),e=!0;let n=new RegExp("("+t+")","gi"),s=i.replace(n,"<b>$1</b>");$(this).find(".gjs-block-label").html($(this).data("original-html").replace(i.trim(),s))}else $(this).addClass("d-none")}),$(this).removeClass("d-none"),e||$(this).addClass("d-none")})}),window.customBuilderScripts={},window.editor.on("component:create",t=>{if(t.components().length){let e=t.components().models[t.components().length-1];if(e.attributes.type==="script"){let i=t.attributes.attributes["block-id"];i===void 0&&(i=t.attributes.attributes.id);let n=e,s=!1;for(;n.parent();)if(n=n.parent(),n.attributes.attributes["phpb-content-container"]){s=!0;break}s&&(window.customBuilderScripts[i]=e.toHTML(),e.remove())}}}),window.editor.on("component:add",function(t){if(t.attributes["run-builder-script"]!==void 0){let e=customBuilderScripts;window.customBuilderScripts[t.attributes["block-id"]]=customBuilderScripts[t.attributes["run-builder-script"]],runScriptsOfComponentAndChildren(t),window.customBuilderScripts=e,delete t.attributes["run-builder-script"]}}),window.editor.on("sorter:drag:end",function(t){let e=t.modelToDrop;e&&e.attributes&&(e.attributes["block-id"]||e.attributes.id)&&window.runScriptsOfComponentAndChildren(e);for(let i in CKEDITOR.instances)CKEDITOR.instances[i].destroy(!0)}),window.runScriptsOfComponentAndChildren=function(t){V(t),t.components().each(function(e){runScriptsOfComponentAndChildren(e)})};function V(t){let e=t.attributes["block-id"];if(e===void 0&&(e=t.attributes.attributes.id),e&&window.customBuilderScripts[e]!==void 0){let i=t.attributes["style-identifier"],n=$("<container>").append(window.customBuilderScripts[e]);n.find("script").prepend("let inPageBuilder = true;"),n.find("script").prepend('let blockSelector = ".'+i+'";'),n.find("script").prepend('let block = document.getElementsByClassName("'+i+'")[0];'),n.find("script").prepend("(function(){"),n.find("script").append("})();");let s=document.createElement("script");s.type="text/javascript",s.innerHTML=n.find("script").html(),window.editor.Canvas.getDocument().body.appendChild(s)}}function H(){R();let t=document.createElement("script");t.type="text/javascript",t.src=window.injectionScriptUrl;let e=t.outerHTML+"<script>"+k.toString()+k.name+"()<\/script>";window.initialComponents=window.initialComponents.replace("</body>",e+"</body>"),$.each(window.languages,(i,n)=>{window.pageBlocks[i]===null&&(window.pageBlocks[i]={})}),activateLanguage(window.currentLanguage)}function k(){let t=document.querySelectorAll("script");for(let e=0;e<t.length;e++){let i=t[e];if(i.innerHTML.startsWith("var script")){let n=i.innerHTML.split("=")[0],s=parseInt(n.replace("var script",""));if(Number.isInteger(s)){let a="script"+s+"Start";if(typeof window[a]=="function")return s!==0&&window[a](),!1}}}}function R(){for(let t in window.themeBlocks){let e=window.themeBlocks[t],i=$("<container>").append(e.content);i.find("[phpb-blocks-container]").each(function(){$(this).html()!==""&&$(this).html().trim()===""&&$(this).html("")}),window.themeBlocks[t].content=i.html(),e.content=i.html(),editor.BlockManager.add(t,e)}}$("#language-selector select").on("change",function(){let t=$(this).find("option:selected").val();window.switchLanguage(t,function(){activateLanguage(t)})}),window.activateLanguage=function(t){window.currentLanguage=t,window.editor.select(),window.editor.DomComponents.clear(),window.editor.DomComponents.componentsById=[],window.editor.UndoManager.clear(),window.editor.Canvas.getDocument().querySelectorAll("script").forEach(function(e){e.remove()}),window.editor.setComponents(window.initialComponents),C(editor.getWrapper()),window.editor.getWrapper().find("[phpb-content-container]").forEach((e,i)=>{e.set("custom-name",window.translations["page-content"]),e.components(window.contentContainerComponents[i]),g(e),u(e)})},$(window).on("pagebuilder-page-loaded",function(t){window.editor.getWrapper().find("[phpb-content-container]").forEach(e=>{c(e),window.runScriptsOfComponentAndChildren(e)}),window.setWaiting(!1),setTimeout(function(){window.changesOffset=window.editor.getModel().get("changesCount"),window.afterInitialRendering=!0},250)});function g(t){let e=t;if(t.get("tagName")==="phpb-block"){let i=t.attributes.attributes.id;window.pageBlocks[window.currentLanguage][i]!==void 0&&window.pageBlocks[window.currentLanguage][i].html!==void 0&&(e=t.replaceWith(window.pageBlocks[window.currentLanguage][i].html),window.pageBlocks[window.currentLanguage][i].html="")}e.get("components").each(i=>g(i))}function C(t){"phpb-content-container"in t.attributes.attributes||(E(t),t.get("components").each(e=>C(e)))}window.editor.on("component:selected",function(t){S(t)?$(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(2)").click():t.get("type")===""&&y(t)&&($(".gjs-pn-buttons .gjs-pn-btn:nth-of-type(3)").click(),$("#gjs-sm-position").hasClass("gjs-sm-open")&&$("#gjs-sm-position").find(".gjs-sm-title").click(),$("#gjs-sm-background").hasClass("gjs-sm-open")||$("#gjs-sm-background").find(".gjs-sm-title").click()),S(t)||setTimeout(function(){$(".gjs-trt-traits").html('<p class="no-settings">'+window.translations["trait-manager"]["no-settings"]+"</p>")},0),setTimeout(function(){t.attributes.removable||$(".gjs-toolbar .fa-trash-o.gjs-toolbar-item").hide(),t.attributes.copyable||$(".gjs-toolbar .fa-clone.gjs-toolbar-item").hide(),t.attributes.draggable||$(".gjs-toolbar .fa-arrows.gjs-toolbar-item").hide(),!t.attributes.removable&&!t.attributes.copyable&&!t.attributes.draggable&&window.editor.select(t.parent());let e=t.attributes["block-slug"];if(e){let n=window.themeBlocks[e].label.split("</div>");n.length>1&&$(".gjs-toolbar").attr("title","Bloknaam: "+n[1])}},0)}),window.editor.on("component:clone",function(t){if(!w){let e=window.editor.getWrapper().find("."+t.attributes["style-identifier"])[0];t.attributes["style-identifier"]!==void 0&&t.attributes["style-identifier"]!==""&&(t.removeClass(t.attributes["style-identifier"]),delete t.attributes["style-identifier"],p(t)),t.attributes["block-id"]=t.attributes["block-slug"],e&&window.customBuilderScripts[e.attributes["block-id"]]!==void 0&&(t.attributes["run-builder-script"]=e.attributes["block-id"])}});function y(t){let e=!1,i=t.getEl();if(i&&i.style){let n=window.getComputedStyle(i);["background","background-image","background-color"].forEach(s=>{let a=n.getPropertyValue(s);a!==void 0&&a!==""&&!a.includes("none")&&!a.includes("rgba(0, 0, 0, 0)")&&(e=!0)})}return e}function S(t){return t.attributes.traits.length>0}window.editor.on("block:drag:stop",function(t){if(!t||!t.attributes||!t.attributes.attributes)return;let e=B();t.attributes.attributes["dropped-component-id"]=e;let i=t.parent();u(t),i.components().each(function(n){n.attributes["dropped-component-id"]===e&&(delete n.attributes["dropped-component-id"],t=n)}),c(t),window.runScriptsOfComponentAndChildren(t)});function u(t){if(t.attributes.tagName==="phpb-block"){let e=t.parent(),i=cloneComponent(t),n;t.attributes.attributes["is-html"]==="false"?e.components().each(function(s){if(s.cid===t.cid){let a="wrapper"in t.attributes.attributes?t.attributes.attributes.wrapper:"div";n=t.replaceWith({tagName:a}),n.attributes["is-style-wrapper"]=!0,i.components().each(function(l){n.append(cloneComponent(l))})}}):e.components().each(function(s){if(s.cid===t.cid)if(i.components().length===1){let a=cloneComponent(i.components().models[0]);n=t.replaceWith(a)}else n=t.replaceWith({tagName:"div"}),n.attributes["is-style-wrapper"]=!0,i.components().each(function(a){n.append(cloneComponent(a))})}),t.remove(),T(i,n,!0,!1),P(n),u(n)}else t.components().each(function(e){u(e)})}function x(t){let e=[],i=t,n=!1;for(;i.parent()&&i.parent().attributes.attributes["phpb-blocks-container"]===void 0&&i.parent().attributes["is-html"]!=="true"&&i.parent().attributes.attributes["phpb-content-container"]===void 0;)i.parent().attributes["is-html"]==="false"&&(n=!0),i.attributes["block-id"]!==void 0&&e.push(i.attributes["block-id"]),i=i.parent();let s=t.attributes["block-id"];n?s=i.attributes["block-id"]:e=[];let a=window.pageBlocks[window.currentLanguage][s];e.reverse().forEach(function(r){a===void 0||a.blocks===void 0||a.blocks[r]===void 0?a={}:a=a.blocks[r]});let l={};return a!==void 0&&a.settings!==void 0&&a.settings.attributes!==void 0&&(l=a.settings.attributes),l}function P(t){if(window.blockSettings[t.attributes["block-slug"]]===void 0)return;t.attributes.settings={};let e=x(t);e["style-identifier"]!==void 0&&t.addClass(e["style-identifier"]),t.attributes["is-updating"]=!0,window.blockSettings[t.attributes["block-slug"]].forEach(function(n){let s=t.addTrait(n);e[n.name]!==void 0?s[0].setTargetValue(e[n.name]):n["default-value"]!==void 0&&s[0].setTargetValue(n["default-value"])}),t.attributes["is-updating"]=!1}window.editor.on("component:update",function(t){if(window.isLoaded!==!0||t.attributes["block-slug"]===void 0||t.attributes["is-updating"]||t.changed.attributes===void 0||$(".gjs-frame").contents().find("#"+t.ccid).length===0)return;let e=[],i=t,n=!1;for(;i.parent()&&i.parent().attributes.attributes["phpb-blocks-container"]===void 0&&i.parent().attributes["is-html"]!=="true"&&i.parent().attributes.attributes["phpb-content-container"]===void 0;)i.parent().attributes["is-html"]==="false"&&(n=!0),i.attributes["block-id"]!==void 0&&e.push(i.attributes["block-id"]),i=i.parent();n?t=i:e=[],t.attributes["is-updating"]=!0,$(".gjs-frame").contents().find("#"+t.ccid).addClass("gjs-freezed");let s=window.editor.getWrapper().find("#"+t.ccid)[0].parent(),a=window.getComponentDataInStorageFormat(t);$.ajax({type:"POST",url:window.renderBlockUrl,data:{data:JSON.stringify(a),language:window.currentLanguage},success:function(l){let r=$(l).attr("block-id");window.pageBlocks[window.currentLanguage][r]=a.blocks[r]===void 0?{}:a.blocks[r],t.replaceWith(l),g(s),u(s),c(s,!1,!1);let o=f(s,[r]);runScriptsOfComponentAndChildren(o),e.push(r);let Q=f(s,e.reverse());window.editor.select(Q)},error:function(){$(".gjs-frame").contents().find("#"+t.ccid).removeClass("gjs-freezed"),t.attributes["is-updating"]=!1,window.toastr.error(window.translations["toastr-component-update-failed"])}})});function f(t,e){if(e.length===0)return t;let i=null;return t.forEachChild(function(n){if(n.attributes["block-id"]===e[0])return i=f(n,e.slice(1)),!1}),t.forEachChild(function(n){let s=f(n,e);if(s!==null)return i=s,!1}),i}let w=!1;window.cloneComponent=function(t){w=!0;let e=t.clone();return v(t,e),w=!1,e};function v(t,e){T(t,e,!1,!0);for(let i=0;i<t.components().length;i++){let n=t.components().models[i],s=e.components().models[i];v(n,s)}}function T(t,e,i,n){let s=t.attributes.attributes;for(let a in s)n&&(e.attributes.attributes[a]=s[a]),i&&(e.attributes[a]=s[a])}function c(t,e=!1,i=!0){if(E(t),t.attributes.attributes["phpb-content-container"]!==void 0)t.set({droppable:!0,hoverable:!0});else if(t.attributes["block-slug"]!==void 0){t.find("[phpb-hide-if-not-editable]").forEach(s=>{i||window.afterInitialRendering?s.addClass("editable"):s.removeClass("editable")});let n={selectable:!0,hoverable:!0};e||(n={removable:!0,draggable:!0,copyable:!0,selectable:!0,hoverable:!0,stylable:!0},p(t)),t.attributes["is-html"]==="true"?(e=!1,i=!0):(e=!0,i=!1,t.getEl().setAttribute("data-cursor","default")),t.set(n)}if(t.attributes.attributes["data-raw-content"]!==void 0){t.set({editable:!0});return}if(i&&(U(t),t.attributes["made-text-editable"]==="true")){t.attributes.attributes["data-raw-content"]="true";let n=t.replaceWith(t.toHTML());["block-id","block-slug","is-html","style-identifier"].forEach(s=>{n.attributes[s]=t.attributes[s]}),c(n);return}t.get("components").each(n=>c(n,e,i))}function U(t){let e=t.get("tagName"),i=["h1","h2","h3","h4","h5","h6","h7","p","small","b","strong","i","em","label","button","ol","ul","li","table"],n=["img"],s={};"phpb-blocks-container"in t.attributes.attributes&&(s.hoverable=!0,s.selectable=!0,s.droppable=!0),i.includes(e)||"phpb-editable"in t.attributes.attributes?(s.editable=!0,t.attributes["made-text-editable"]="true"):n.includes(e)&&(s.editable=!0),y(t)&&(s.hoverable=!0,s.selectable=!0,s.stylable=!0),e==="a"&&(s.hoverable=!0,s.selectable=!0,s.stylable=!0,s.removable=!0),$.isEmptyObject(s)||(t.set(s),s.stylable!==void 0&&s.stylable&&p(t))}function p(t){let e=!1;t.getClasses().forEach(i=>{i.startsWith("ID")&&i.length===16&&(e=i)}),t.attributes["style-identifier"]===void 0&&(t.attributes["style-identifier"]=e||B()),t.addClass(t.attributes["style-identifier"])}function E(t){t.set({removable:!1,draggable:!1,droppable:!1,badgable:!1,stylable:!1,highlightable:!1,copyable:!1,resizable:!1,editable:!1,layerable:!1,selectable:!1,hoverable:!1})}let J=0;function B(){return"ID"+(Date.now().toString(36)+Math.random().toString(36).substr(2,5)+J++).toUpperCase()}function j(){window.grapesJSLoaded?H():setTimeout(j,100)}j(),window.pageData={},window.changesOffset=0,window.onbeforeunload=F;function F(){if(window.editor.getModel().get("changesCount")-window.changesOffset>0)return"Are you sure? There are unsaved changes."}$("#save-page").click(function(){O()}),$(document).bind("keydown",function(t){if(t.ctrlKey&&t.which===83)return window.editor.store(),O(),t.preventDefault(),!1}),window.switchLanguage=function(t,e){window.setWaiting(!0),L(function(){D(t);let i=window.pageData;i.blocks={[t]:window.pageBlocks[t]},$.ajax({type:"POST",url:window.renderLanguageVariantUrl,data:{data:JSON.stringify(i),language:t},success:function(n){n=JSON.parse(n),window.pageBlocks[t]=n.dynamicBlocks?n.dynamicBlocks:{},e()},error:function(n){e(),console.log(n);let s=n.statusText+" "+n.status;s=n.responseJSON.message?s+': "'+n.responseJSON.message+'"':s,window.toastr.error(s),window.toastr.error(window.translations["toastr-switching-language-failed"])}})})};function D(t){let e=window.pageBlocks[t],i=window.pageBlocks[window.currentLanguage];if(e===void 0)e=i;else{K(i,e);for(let n in i)e[n]===void 0&&(e[n]=i[n])}for(let n in i){let s=$("<container>"+i[n].html+"</container>"),a=$("<container>"+e[n].html+"</container>");s.find("[phpb-blocks-container]").each(function(l){let r=$(this).html();a.find("[phpb-blocks-container]").eq(l).html(r)}),e[n].html=a.html()}window.pageBlocks[t]=e}function K(t,e){for(let i in t)if(e[i]!==void 0)for(let n in t[i].blocks){let s=t[i].blocks[n],a=e[i].blocks[n];if(!s||!a)continue;let l=s.html.match(/phpb-blocks-container(.*)>(.*)</g),r=a.html.match(/phpb-blocks-container(.*)>(.*)</g);if(!(!l||!r))for(let o=0;o<l.length;o++)e[i].blocks[n].html=e[i].blocks[n].html.replace(r[o],l[o])}}function L(t){setTimeout(function(){window.pageData={html:[],components:[],css:null,style:null},window.pageBlocks[window.currentLanguage]=[],window.editor.getWrapper().find("[phpb-content-container]").forEach((e,i)=>{let n=I(e);window.pageData.css=n.css,window.pageData.style=n.style,window.pageData.html[i]=n.html,window.pageData.components[i]=n.components,window.pageBlocks[window.currentLanguage]={...window.pageBlocks[window.currentLanguage],...n.blocks},window.contentContainerComponents[i]=n.components}),t&&t()},200)}function O(){h(),L(function(){$.each(window.languages,(e,i)=>{e!==window.currentLanguage&&D(e)});let t=window.pageData;t.style=q(t.css,t.style),t.blocks=window.pageBlocks,$.ajax({type:"POST",url:$("#save-page").data("url"),data:{data:JSON.stringify(t)},success:function(){h(),window.toastr.success(window.translations["toastr-changes-saved"]),setTimeout(function(){window.changesOffset=window.editor.getModel().get("changesCount")},250)},error:function(e){h(),console.log(e);let i=e.statusText+" "+e.status;i=e.responseJSON.message?i+': "'+e.responseJSON.message+'"':i,window.toastr.error(i),window.toastr.error(window.translations["toastr-saving-failed"])}})})}function q(t,e){let i=[];return e.forEach(n=>{if(n.attributes.selectors.models.length){let s=n.attributes.selectors.models[0].id;t.includes(s)&&i.push(n)}}),i}window.getComponentDataInStorageFormat=function(t){let e=window.cloneComponent(t.parent());console.log({container:e,componentParent:t.parent()});const i=t.attributes["block-id"];return console.log(t.attributes["block-id"]),e.components().forEach(n=>{console.log({c:n}),(n==null?void 0:n.attributes["block-id"])!==i&&(n==null||n.remove())}),console.log({containerL:e.get("components").length,componentParentL:t.parent().get("components").length}),I(e)};function I(t){let e=window.editor.DomComponents.componentsById;window.editor.DomComponents.componentsById=[],t=window.cloneComponent(t);let i=N(t).blocks,n=window.html_beautify(z(t)),s=window.editor.getCss(),a=window.editor.getStyle(),l=JSON.parse(JSON.stringify(t.get("components")));return window.editor.DomComponents.componentsById=e,{html:n,css:s,components:l,blocks:i,style:a}}function z(t){let e="";t.get("components").forEach(n=>e+=n.toHTML());let i=$("<container>"+e+"</container>");return i.find("phpb-block").each(function(){$(this).replaceWith('[block slug="'+$(this).attr("slug")+'" id="'+$(this).attr("id")+'"]')}),i.html()}function W(t){let e=$("<container>"+t.toHTML()+"</container>");return e.find("phpb-block").each(function(){$(this).replaceWith('[block slug="'+$(this).attr("slug")+'" id="'+$(this).attr("id")+'"]')}),e.html()}function N(t,e=!1,i=!1){let n={current_block:{settings:{},blocks:{},html:"",is_html:!1},blocks:{}},s=e,a=i;if(t.attributes["block-id"]!==void 0&&(t.attributes["is-html"]==="false"?(s=!0,a=!1):e&&(s=!1,a=!0)),t.get("components").forEach(function(l){let r=N(l,s,a);for(let o in r.current_block.blocks)n.current_block.blocks[o]=r.current_block.blocks[o];for(let o in r.blocks)n.blocks[o]=r.blocks[o]}),!t.parent()||t.attributes["block-id"]===void 0)return n;if(t.attributes["is-html"]==="true")if(e)n.current_block.blocks[t.attributes["block-id"]]={settings:{},blocks:{},html:window.html_beautify(W(t)),is_html:!0};else{t.attributes["style-identifier"]!==void 0&&(n.current_block.settings.attributes={"style-identifier":t.attributes["style-identifier"]});let l=t.attributes["block-id"];t.attributes["block-id"].startsWith("ID")||(l=M()),t.replaceWith({tagName:"phpb-block",attributes:{slug:t.attributes["block-slug"],id:l}}),n.blocks[l]={settings:n.current_block.settings,blocks:{},html:window.html_beautify(W(t)),is_html:!0},n.current_block={settings:{},blocks:{},html:"",is_html:!1}}else{let l={};t.get("traits").each(function(o){l[o.get("name")]=o.getTargetValue()}),n.current_block.settings.attributes=l,t.attributes["style-identifier"]!==void 0&&(n.current_block.settings.attributes["style-identifier"]=t.attributes["style-identifier"]);let r=t.attributes["block-id"];if(t.attributes["block-id"].startsWith("ID")||(r=M()),t.replaceWith({tagName:"phpb-block",attributes:{slug:t.attributes["block-slug"],id:r}}),e){let o={settings:{},blocks:{},html:"",is_html:!1};o.blocks[t.attributes["block-id"]]=n.current_block,n.current_block=o}else n.blocks[r]=n.current_block,n.current_block={settings:{},blocks:{},html:"",is_html:!1}}return n}let G=0;function M(){return"ID"+(Date.now().toString(36)+Math.random().toString(36).substr(2,5)+G++).toUpperCase()}window.setWaiting=function(t){let e=window.editor.DomComponents.getWrapper();t?e.addClass("gjs-waiting"):e.removeClass("gjs-waiting")};function h(){let t=$("#save-page");t.blur(),t.hasClass("waiting")?(t.attr("disabled",!1),t.removeClass("waiting"),t.find(".spinner-border").addClass("d-none")):(t.attr("disabled",!0),t.addClass("waiting"),t.find(".spinner-border").removeClass("d-none"))}window.CKEDITOR.on("instanceReady",function(t){t.editor.on("paste",function(e){let i=e.data.dataValue;i=i.replace(/<(?!\/?(?:a|table|tr|td|th|thead|tbody|tfoot|caption|col|colgroup|p|ul|ol|li|br|strong|em|b|i|u|strike|sub|sup|h1|h2|h3|h4|h5|h6|blockquote|pre|hr)\b)[^>]+>/gm,""),i=i.replace(/<(a|table|tr|td|th|thead|tbody|tfoot|caption|col|colgroup|p|ul|ol|li|br|strong|em|b|i|u|strike|sub|sup|h1|h2|h3|h4|h5|h6|blockquote|pre|hr)\b[^>]*>/gm,function(n,s){if(s==="a"){let a=n.match(/href="([^"]*)"/);return a?'<a href="'+a[1]+'">':n}if("|table|tr|td|th|thead|tbody|tfoot|".includes("|"+s+"|")){let a=n.match(/style="([^"]*)"/);return a?"<"+s+' style="'+a[1]+'">':n}return"<"+s+">"}),e.data.dataValue=i})}),window.CKEDITOR.on("dialogDefinition",function(t){let e=t.data.name,i=t.data.definition;if(e==="link"){let n=i.getContents("info");i.onLoad=function(){let s=CKEDITOR.dialog.getCurrent();s.getContentElement("info","linkType").getElement().hide(),s.getContentElement("info","protocol").getElement().hide(),s.getContentElement("info","url").getElement().hide()},n.add({type:"select",id:"linktype-selector",label:"Linktype",default:"",items:[[window.translations.page,"page"],["URL","url"]],onChange:function(s){let a=CKEDITOR.dialog.getCurrent();s.data.value==="page"?(a.getContentElement("info","page-selector").getElement().show(),a.getContentElement("info","url-field").getElement().hide()):(a.getContentElement("info","page-selector").getElement().hide(),a.getContentElement("info","url-field").getElement().show(),a.getContentElement("info","url-field").setValue(""))},setup:function(s){s.type===void 0?this.setValue("page"):s.type==="url"&&s.url.url.startsWith("[page id=")?this.setValue("page"):this.setValue(s.type)}}),n.add({type:"select",id:"page-selector",label:window.translations.page,default:"",items:window.pages,onChange:function(){let s=CKEDITOR.dialog.getCurrent(),a="[page id="+this.getValue()+"]";s.setValueOf("info","url",a),s.setValueOf("info","protocol","")},setup:function(s){this.allowOnChange=!1;let a="";s.url&&(a=s.url.url.substr(9,s.url.url.length-10)),this.setValue(a),this.allowOnChange=!0}}),n.add({type:"text",id:"url-field",label:"URL",default:"",onChange:function(){let s=CKEDITOR.dialog.getCurrent(),a=this.getValue();s.setValueOf("info","url",a)},setup:function(s){this.allowOnChange=!1;let a="";s.url&&(a=s.url.url),this.setValue(a),this.allowOnChange=!0}})}}),window.touchStart=function(){$("#gjs").addClass("sidebar-collapsed")},window.addEventListener("keydown",function(t){if(t.ctrlKey&&t.key==="s")return t.preventDefault(),!1}),window.parent.postMessage("page-loaded","*"),document.addEventListener("touchstart",t=>{window.parent.postMessage("touch-start","*")})});