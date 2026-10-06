// ==UserScript==
// @name         Wider Claude
// @namespace    http://tampermonkey.net/
// @version      2026-05-10
// @description  Makes Claude's chat window wider
// @author       You
// @run-at       document-idle
// @match        https://claude.ai/chat/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jsdiff/5.1.0/diff.min.js
// ==/UserScript==



setTimeout(function() {
    'use strict';
    debugger;


    // First, identify a div containing a width-limiting class
    var targetClasses = [];
    const cssObjRegexp = /[\s\t\n]*\{[^\}]*\}/i;
    const targets = [
        document.body.querySelector(`div[data-testid="chat-column"]`),
        document.body.querySelector(`div[data-testid="transcript-list"]`)
    ];

    targets.forEach(target => {
        target.classList.forEach(c => {
            const match = c.match(/max-w-(.+)/);
            if (match?.[1]) targetClasses.push(match[0]);
        });
    });

    if (targetClasses.lenght === 0) console.error("There's a problem with the Wider Claude code, the HTML page has changed structure");

    window._temp_link = [];
    window._temp_counter = -1;

    // Second, scan through the links to .css files to know which one is responsible of defining the width-limiting class
    document.body.querySelectorAll(`link[href*=".css"]`).forEach(l => {
        window._temp_link.push(l);
        const req = new XMLHttpRequest();
        const link = l.href;

        req.open("GET", link, true);
        req.onload = () => {
            ++window._temp_counter;
            var css = String(req.responseText);

            targetClasses.forEach(targetClass => {
                const pattern = "\\."+RegExp.escape(targetClass).replaceAll(/\\(?=([\(\)\[\]\+\,\.])|x2c)/g, "\\\\\\")+"[^\\{]*";
                const regexp = RegExp(pattern, "gi");
                const match = css.match(regexp) || [];
                debugger;

                console.log("Found a match: "+match);

                if (match.length > 0) {
                    match.forEach(m => {
                        const replaceToken = RegExp(RegExp.escape(m)+cssObjRegexp.source, "i");
                        const replaceValue = m+"{max-width:100%;}";
                        console.log("Replacing the following pattern: ");
                        console.warn(replaceToken);
                        console.log("By the following value: ");
                        console.warn(replaceValue);
                        console.log("The css loaded indeed matches the replacement pattern: ");
                        console.warn(css.match(replaceToken));

                        css = css.replace( replaceToken, replaceValue );
                    });


                    console.log(Diff.diffChars(req.responseText, css)/*.filter(o => { if (o.added === true || o.removed === true) return false; else return true; })*/)
                    const styleSheet = document.createElement("style");
                    document.body.append(styleSheet);
                    document.body.lastChild.innerHTML = css;
                    window._temp_link[window._temp_counter].remove();
                }
            });

            if (window._temp_link.length === window._temp_counter) {
                delete window._temp_link;
                delete window._temp_counter;
            }
        };

        req.send();
    });



}, 100);