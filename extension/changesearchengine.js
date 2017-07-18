function log(message) {
    //console.log(message);
}

function onGooglePageClick(info, tab) {
    log("info: " + JSON.stringify(info));
    log("tab: " + JSON.stringify(tab));

    var googleUrl = info.pageUrl;

    var bingUrl = googleUrl.replace("google.com", "bing.com");

    openUrl(bingUrl);

}

function onBingPageClick(info, tab) {
    log("info: " + JSON.stringify(info));
    log("tab: " + JSON.stringify(tab));

    var url = info.pageUrl;

    var newUrl = url.replace("bing.com", "google.com");

    openUrl(newUrl);

}

function openUrl(url) {
    browser.tabs.create({ "url": url });
}

function updateContextMenus(url) {

    browser.contextMenus.remove("context_bing");
    browser.contextMenus.remove("context_google");

    if (url.toLowerCase().includes("google.com")) {
                browser.contextMenus.create({
                    "id":"context_bing",
                    "title": "Show results in Bing", "contexts": ["page"],
                    "onclick": onGooglePageClick
                });
        }

    else if (url.toLowerCase().includes("bing.com")) {
        browser.contextMenus.create({
            "id":"context_google",
            "title": "Show results in Google", "contexts": ["page"],
            "onclick": onBingPageClick
        });
    }
}

function handleUpdated(tabId, changeInfo, tabInfo) {

    if (changeInfo.url)
    {
        updateContextMenus(changeInfo.url);
    }
}

function handleActivated(activeInfo) {
    browser.tabs.get(activeInfo.tabId, function(tabInfo)
    {
        updateContextMenus(tabInfo.url);
    });

}

browser.tabs.onUpdated.addListener(handleUpdated);

browser.tabs.onActivated.addListener(handleActivated);














