(function() {
    'use strict';
    if (window.top !== window.self) {
      return;
    }


    $(document).ready(function() {
        $(document).bind('keyup', '`', processKeystroke);
        doIfRunning(startDashboard);
    });

    function processKeystroke() {
      doIfRunning(stopDashboard, startDashboard);
    }

    function startDashboard() {
        setTabValue("isRunning", true);

        addBanner();
        var count=10;
        var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
        function timer() {
          count=count-1;
          if (count <= 0) {
             clearInterval(counter);
             return;
          }
          document.getElementById("timer").innerHTML = count + " secs"; // watch for spelling
        }

        scheduleRedirect(10000);
        animateScrolling(40000);    
    }

    function stopDashboard() {
      doIfRunning(function() {
        setTabValue("isRunning", false);
      });
    }


//==========================================================================================

    function addBanner() {
        var html = '<style type="text/css">' + 
                      '.dashboardStrip{ z-index: 9999; background-color: gray; height: 1.5em; width: 100%; position: fixed; top: 0; left: 0; color: white; }' + 
                      '.timer{ height: 100%; width: 25%; float: right; color: white; }' +
                    '</style>' + 
                    '<div class="dashboardStrip"> To disable/enable the dashboard, press the ` or ~ key ONCE' + 
                      //'<div id="timer" class="timer"></div>' +
                    '</div>';
        $('body').first().append(html);
    }


    function animateScrolling(animMillis) {
        $("html, body").not('iframe html, iframe body').animate({
            scrollTop: $(document).height()
        }, animMillis);
    }

//==========================================================================================


    function scheduleRedirect(redirMillis) {
      $.ajax({
          url: 'https://watech.service-now.com/api/x_ocios_egovdash/dashboard_sites',
          dataType: "json",
          // beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:DfHjaedhfWpMJ2Ueh8zM')); },
          success: function(data, status, xhr) { 
            //var results = data.result;
            //alert(dump(data));
            setTimeout(function() { doRedirect(data.result); }, redirMillis);
          },
      });
    }

    function doRedirect(results) {
      console.log("redirecting from" + location.href + " to " + getNextSite(currentUrl, results));
        var currentUrl = location.href;
        var newUrl = getNextSite(currentUrl, results);
        if (location.href != newUrl) {
            location.href = newUrl;
        }
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
            return sites[0].url; //location.href;
        } 

        if (matchedIdx + 1 < sites.length) {
            return sites[matchedIdx + 1].url;
        }

        return sites[0].url;
    }

//==========================================================================================

    function doIfRunning(funcToRun, otherFuncToRun) {
      GM_getTab(function (tabData) {
        if(tabData.isRunning) {
          if (typeof funcToRun === "function") { funcToRun(); }
        } else {
          if (typeof otherFuncToRun === "function") { otherFuncToRun(); }
        }
      });
    }

    function setTabValue(key, value) {
        GM_getTab(function (tabData) {
            tabData[key] = value;
            GM_saveTab(tabData);
            console.info(tabData);
        });      
    }

//==========================================================================================

})();
