function updateBadge(paused){
    if (paused){
        chrome.browserAction.setBadgeText({text:"AV"});
    } else {
        chrome.browserAction.setBadgeText({text:""});
    }
}

chrome.browserAction.onClicked.addListener(
    function(tab){
        if (localStorage.getItem('paused')=="true"){
           localStorage.removeItem('paused');
           updateBadge(false);
        } else {
           localStorage.setItem('paused',"true");
           updateBadge(true);
        }
        chrome.tabs.update(tab.id, {url: tab.url});
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.checkPaused == "hello")
            sendResponse({maybePaused: localStorage.getItem('paused')});
  });

updateBadge(localStorage.getItem('paused')=="true");