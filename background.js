// TODO use regex for matching
var toTestLinks = ["/career", "/jobs", "/work"];
var toTestTitles = ["Jobs", "Career", "Work with"];
var jobs = {};

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: jobs[tab.id].href});
});

// Receive message that the page has been loaded
chrome.runtime.onMessage.addListener(
    function (data, sender, response) {
        var tabId = sender.tab.id;
        var found = null;

        // test the links and titles
        for (var l of data) {
            for (var t of toTestLinks) {
                if (l.href.indexOf(t) >= 0) {
                    found = l;
                    break;
                }
            }
            for (var t of toTestTitles) {
                if (l.title.indexOf(t) >= 0) {
                    found = l;
                    break;
                }
            }
            if (found !== null)
                break
        }

        // a link has been found, update the browser action
        if (found !== null) {
            jobs[tabId] = found;
            chrome.browserAction.setIcon({path: 'green.png', tabId: tabId});
        } else {
            chrome.browserAction.disable(tabId);
        }
    }
);
