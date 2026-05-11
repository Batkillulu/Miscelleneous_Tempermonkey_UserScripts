// ==UserScript==
// @name         Wider Claude
// @namespace    http://tampermonkey.net/
// @version      2026-05-10
// @description  Makes Claude's chat window wider
// @author       You
// @match        https://claude.ai/chat/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getCSSClassCoordInStyleSheet(_class="") {
        let styleSheetIndex = -1, ruleIndex = -1;
        Object.keys(document.styleSheets).reverse().forEach(_CSSStyleSheet => {
            Object.keys(document.styleSheets[_CSSStyleSheet].cssRules).forEach(_CSSRule => {
                if (document.styleSheets[_CSSStyleSheet].cssRules[_CSSRule].selectorText == _class) ruleIndex = _CSSRule, styleSheetIndex = _CSSStyleSheet;
            })
        })
        return document.styleSheets[styleSheetIndex].cssRules[ruleIndex]
    };

    getCSSClassCoordInStyleSheet(".max-w-3xl").style.maxWidth = "90%";
})();