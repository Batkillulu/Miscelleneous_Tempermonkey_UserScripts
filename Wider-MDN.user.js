// ==UserScript==
// @name         Wider MDN
// @namespace    http://tampermonkey.net/
// @version      2026-02-23
// @description  try to take over the world!
// @author       You
// @run-at       document-idle
// @match        https://developer.mozilla.org/en-US/docs*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    document.querySelector(".layout__2-sidebars-inline.reference-layout").style.paddingInline = "10px";
    // document.querySelector(".layout__2-sidebars-inline.reference-layout").style.gridTemplateColumns = '[full-start left-sidebar-start] 15% [left-sidebar-end] 1% [content-start] 71% [content-end] 1% [right-sidebar-start] 12% [full-end right-sidebar-end]';
    document.querySelector(".layout__right-sidebar.reference-layout__toc").style.justifySelf = "right";
    document.querySelector(".layout__right-sidebar.reference-layout__toc").style.justifySelf = "right";
    document.querySelector(".layout__right-sidebar.reference-layout__toc").style.width = "100%";
    document.documentElement.style.setProperty("--layout-content-max", "64rem");
    document.documentElement.style.setProperty("--layout-2-sidebars", '[full-start left-sidebar-start] 15% [left-sidebar-end] 1% [content-start] 71% [content-end] 1% [right-sidebar-start] 12% [full-end right-sidebar-end]')
})();
