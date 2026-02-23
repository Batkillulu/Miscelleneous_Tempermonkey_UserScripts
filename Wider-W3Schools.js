// ==UserScript==
// @name         Widder W3Schools
// @version      2026-02-18
// @description  Widder W3Schools.
// @author       You
// @match        https://www.w3schools.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=w3schools.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    document.querySelector(".belowtopnavcontainer").style.maxWidth = "none";
    document.getElementById("subtopnav").style.maxWidth = "none";
    document.getElementById("right").hidden = true;
    document.getElementById("main").style.width = "100%";
})();

