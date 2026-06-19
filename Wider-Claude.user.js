// ==UserScript==
// @name         Wider Claude
// @namespace    http://tampermonkey.net/
// @version      2026-05-10
// @description  Makes Claude's chat window wider
// @author       You
// @match        https://claude.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @grant        none
// ==/UserScript==

(function() {

    const getCSSClassCoordInStyleSheet = (_class="") => {
        let styleSheetIndex = -1, ruleIndex = -1;
        try {
            Object.values(document.styleSheets).forEach((_CSSStyleSheet, _styleSheetIndex) => {
                try {
                    Object.values(_CSSStyleSheet.cssRules).forEach((_CSSRule, _ruleIndex) => {
                        try {
                            if (typeof _class == "string") {
                                if (_CSSRule.selectorText == _class) {
                                    ruleIndex = _ruleIndex;
                                    styleSheetIndex = _styleSheetIndex;
                                }
                            }
                            else if (_class instanceof RegExp) {
                                if (_CSSRule.selectorText.match(_class)) {
                                    ruleIndex = _ruleIndex;
                                    styleSheetIndex = _styleSheetIndex;
                                }
                            }
                        }
                        catch(e) {
                            console.warn(_CSSStyleSheet);
                            console.warn(_CSSRule);
                            console.warn(e);
                        }
                    })
                }
                catch(e) {
                    console.warn(_CSSStyleSheet)
                    console.warn(e);
                }
            })
        }
        catch(e) {
            console.warn(e);
        }

        if (document?.styleSheets?.[styleSheetIndex]?.cssRules?.[ruleIndex]) {return document?.styleSheets?.[styleSheetIndex]?.cssRules?.[ruleIndex];}

        let foundRule;
        getLayerNames().forEach(layer => {
            getRulesInLayer(layer).forEach(rule => {
                if (rule.selectorText == ".max-w-3xl") foundRule = rule;
            })
        })

        return foundRule || null;
    };



    const getRulesInLayer = (layerName) => {
        const results = [];

        for (const sheet of document.styleSheets) {
            let rules;
            try {
                rules = sheet.cssRules; // throws if cross-origin
            } catch {
                continue;
            }

            for (const rule of rules) {
                collectLayerRules(rule, layerName, results);
            }
        }

        return results;
    };



    const collectLayerRules = (rule, targetLayer, results) => {
        // @layer block: `@layer utilities { ... }`
        if (rule instanceof CSSLayerBlockRule) {
            if (rule.name === targetLayer) {
                results.push(...rule.cssRules);
            } else {
                // layers can be nested — recurse
                for (const inner of rule.cssRules) {
                    collectLayerRules(inner, targetLayer, results);
                }
            }
        }

        // @media / @supports / etc. can wrap @layer blocks — recurse into those too
        if (rule.cssRules) {
            for (const inner of rule.cssRules) {
                collectLayerRules(inner, targetLayer, results);
            }
        }
    };



    const getLayerNames = () => {
        const names = new Set();

        function walk(rules) {
            for (const rule of rules) {
                if (rule instanceof CSSLayerStatementRule) {
                    rule.nameList.forEach(n => names.add(n));
                } else if (rule instanceof CSSLayerBlockRule) {
                    names.add(rule.name);
                    walk(rule.cssRules);
                } else if (rule.cssRules) {
                    walk(rule.cssRules); // @media, @supports, etc.
                }
            }
        }

        for (const sheet of document.styleSheets) {
            try { walk(sheet.cssRules); } catch {}
        }

        return [...names];
    }



    setTimeout(()=>{getCSSClassCoordInStyleSheet(".max-w-3xl").style.maxWidth = "90%";}, 100);
})();
