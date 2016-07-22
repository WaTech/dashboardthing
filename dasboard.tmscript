// ==UserScript==
// @name Big Dashboard Thing
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the giant TV!
// @author alexiasa
// @match https://egov.watech.wa.gov/egovboard
// @match https://freeboard.io/board/tmJrkl
// @require http://code.jquery.com/jquery-latest.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function() {
   'use strict';
  
  //run instantly and then goes after (setTimeout interval)
  $("html, body").animate({ scrollTop: $(document).height() }, 20000);
  
  setTimeout(function() {
     $('html, body').animate({scrollTop:0}, 20000);
  },20000);
  
  setInterval(function(){
    // 4000 - it will take 4 secound in total from the top of the page to the bottom
    $("html, body").animate({ scrollTop: $(document).height() }, 20000);
    setTimeout(function() {
      $('html, body').animate({scrollTop:0}, 20000);
    },20000);
  },20000);
  
  setTimeout(redirect, 10000);
  
  GM_setValue("firstSite", "https://freeboard.io/board/tmJrkl");
  GM_setValue("newSite", "https://egov.watech.wa.gov/egovboard");
  
  function redirect() {
    if (location.href == GM_getValue("firstSite")) {
      location.href = GM_getValue("newSite");
    } else {
      location.href = GM_getValue("firstSite");
    }
  }
})();
