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

    setupAnimations(20000);
    
    setupRedirect(5000);


    function setupRedirect(redirMillis) {
      $.ajax({
          url: 'https://dev17733.service-now.com/api/now/table/x_67288_dashboard_sites',
          dataType: "json",
          beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:DfHjaedhfWpMJ2Ueh8zM')); },
          success: function(data, status, xhr) { 
            setTimeout(function() { 
                var currentUrl = location.href;
                var newUrl = getNextSite(currentUrl, data.result);
                location.href = newUrl;
            }, redirMillis);
          },
      });
    }


    function setupAnimations(animMillis) {
        $("html, body").animate({
            scrollTop: $(document).height()
        }, animMillis);

        setTimeout(function() {
            $('html, body').animate({
                scrollTop: 0
            }, animMillis);
        }, animMillis);

        setInterval(function() {

            // 4000 - it will take 4 secound in total from the top of the page to the bottom
            $("html, body").animate({
                scrollTop: $(document).height()
            }, animMillis);

            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: 0
                }, animMillis);
            }, animMillis);

        }, animMillis);
    }


    // function redirect() {
    //     var currentUrl = location.href;
    //     var newUrl = getNextSite(currentUrl, resultsDoc.results);
    //     console.log("Current: " + currentUrl);
    //     console.log("New: " + newUrl);
    //     location.href = newUrl;
    // }

    function getNextSite(siteUrl, sites) {
        // Find index of siteUrl
        var matchedIdx = "";
        console.log(sites);

        for (var idx in sites) {
            if (sites[idx].url === siteUrl) {
                console.log("idx " + idx);
                console.log("sitesidx " + sites[idx].url);
                matchedIdx = parseInt(idx);
            }
        }

        if (matchedIdx === null || matchedIdx === undefined || matchedIdx === "") {
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
