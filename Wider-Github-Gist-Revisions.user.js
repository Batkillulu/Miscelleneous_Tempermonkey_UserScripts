// ==UserScript==
// @name         Wider Github Gists Revisions
// @namespace    http://tampermonkey.net/
// @version      2026-01-30
// @description  try to take over the world!
// @author       You
// @match        https://gist.github.com/Batkillulu/71e308523fbc51940e997530dcc918ec/revisions*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.styleSheets[6].cssRules[249].style.maxWidth = "";
    // Your code here...
})();