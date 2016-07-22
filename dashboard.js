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
    var api_url = 'https://dev17733.service-now.com/api/now/table/x_67288_dashboard_sites';

    var sites = "";
    $.ajax({
      dataType: "json",
      url: api_url,
      async: false,
      success: function(data, status, xhr) { sites = data; },
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:DfHjaedhfWpMJ2Ueh8zM'));}, 
    });

    console.log(sites);
    
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

  setTimeout(redirect, 5000);

  function redirect() {
    var currentUrl = location.href;
    var newUrl = getNextSite(currentUrl);
      console.log(currentUrl);
      console.log(newUrl);
    location.href = newUrl;
  }

    function getNextSite(siteUrl) {
        // Find index of siteUrl
        var matchedIdx = null;

        for (var idx in sites.result) {
            console.log("idx " + idx);
            console.log("sitesidx " + sites.result[idx].url);
            if (sites.result[idx].url === siteUrl) {
                alert("woo!");
                matchedIdx = idx;
            }
        }

        if (matchedIdx === null | matchedIdx === undefined) {
            alert("oh shit");
        } else if (matchedIdx+1 < sites.result.length) {
            return sites.result[matchedIdx+1].url;
        } else {
            console.log(sites.result[0]);
            return sites.result[0].url;
        }
    }


})();
