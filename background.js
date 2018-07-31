
var toTestLinks = ["/career", "/jobs", "/work"];
var toTestTitles = ["Jobs", "Career", "Work with"];
var jobs = {};

chrome.runtime.onMessage.addListener(
    function (data, sender, response) {
        var tabId = sender.tab.id;
        var found = null;
        console.log("got request from tab"+tabId);

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

        console.log("found");
        if (found !== null) {
            jobs[tabId] = found;
            chrome.browserAction.setIcon({path: 'green.png', tabId: tabId});
        } else {
            chrome.browserAction.disable(tabId);
        }

        response(found);
    }
);
