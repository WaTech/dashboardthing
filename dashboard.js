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

    $(document).ready(function() {
      var html = '<style type="text/css">' + 
                  '.dashboardStrip{ z-index: 9999; background-color: red; height: 1.5em; width: 100%; position: fixed; top: 0; left: 0; }' + 
                  '.timer{ height: 100%; width: 25%; float: right; }</style>' + 
                  '<div class="dashboardStrip"><div class="timer">foooooooo</div></div>';
      
      $('body').prepend(html);
    });
    
    scheduleRedirect(5000);

    function scheduleRedirect(redirMillis) {
      $.ajax({
          url: 'https://watech.service-now.com/api/x_ocios_egovdash/dashboard_sites',
          dataType: "json",
          // beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:DfHjaedhfWpMJ2Ueh8zM')); },
          success: function(data, status, xhr) { 
            // var results = data.result;
            setTimeout(function() { doRedirect(data); }, redirMillis);
          },
      });
    }

    function doRedirect(results) {
        var currentUrl = location.href;
        var newUrl = getNextSite(currentUrl, results);
        location.href = newUrl;
    }

    animateScrolling(20000);    

    function animateScrolling(animMillis) {
        $("html, body").animate({
            scrollTop: $(document).height()
        }, animMillis);
    }

    function getNextSite(siteUrl, sites) {
        // Find index of siteUrl
        var matchedIdx = null;

        //console.log(sites);

        for (var idx in sites) {
            if (sites[idx].url === siteUrl) {
                matchedIdx = parseInt(idx);
            }
        }

        if (matchedIdx === null) {
            alert("oh shit");
            return "http://google.com";
        }

        if (matchedIdx + 1 < sites.length) {
            return sites[matchedIdx + 1].url;
        } else {
            return sites[0].url;
        }
    }


})();
