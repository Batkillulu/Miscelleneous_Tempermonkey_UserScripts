// ==UserScript==
// @name         Wider MDN
// @namespace    http://tampermonkey.net/
// @version      2026-02-17
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
    document.querySelector(".layout__2-sidebars-inline.reference-layout").style.paddingInline = "35px";
    document.querySelector(".layout__right-sidebar.reference-layout__toc").style.justifySelf = "right";
    document.querySelector(".layout__header.reference-layout__header").style.width = "108%";
    document.documentElement.style.setProperty("--layout-content-max", "64rem");
})();