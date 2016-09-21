(function() {
    'use strict';
    
    $(document).ready(function() {
        $(document).bind('keydown', 'ctrl+c', runScript);
    });
    
    function runScript() {
        addBanner();

        var count=30;
        var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
        function timer() {
          count=count-1;
          if (count <= 0) {
             clearInterval(counter);
             return;
          }
          document.getElementById("timer").innerHTML = count + " secs"; // watch for spelling
        }

        scheduleRedirect(5000);
        animateScrolling(20000);    
    }

    function addBanner() {
        var html = '<style type="text/css">' + 
                      '.dashboardStrip{ z-index: 9999; background-color: red; height: 1.5em; width: 100%; position: fixed; top: 0; left: 0; }' + 
                      '.timer{ height: 100%; width: 25%; float: right; }' +
                    '</style>' + 
                    '<div class="dashboardStrip">' + 
                      '<div id="timer"></div>' +
                    '</div>';
        $('body').prepend(html);
    }

    function scheduleRedirect(redirMillis) {
        $.ajax({
            url: 'https://watech.service-now.com/api/now/table/x_ocios_egovdash_sites',
            dataType: "json",
            beforeSend: function(xhr) { 
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa('justinb:b9h^hh@tEzX@')); 
            },
            success: function(data, status, xhr) { 
                var results = data.result;
                setTimeout(function() { 
                    doRedirect(results); 
                }, redirMillis);
            },
        });
    }

    function doRedirect(results) {
        var currentUrl = location.href;
        var newUrl = getNextSite(currentUrl, results);
        if (location.href != newUrl) {
            location.href = newUrl;
        }
    }
    
    function animateScrolling(animMillis) {
        $("html, body").animate({
            scrollTop: $(document).height()
        }, animMillis);
    }

    function getNextSite(siteUrl, sites) {
        // Find index of siteUrl
        var matchedIdx = null;
        for (var idx in sites) {
            if (sites[idx].url === siteUrl) {
                matchedIdx  = parseInt(idx);
            }
        }

        if (matchedIdx === null) {
            return location.href;
        } 

        if (matchedIdx + 1 < sites.length) {
            return sites[matchedIdx + 1].url;
        }

        return sites[0].url;
    }


})();