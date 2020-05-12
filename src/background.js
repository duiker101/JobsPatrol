let toTestLinks = ["/career", "/jobs", "/work"];
let toTestTitles = ["Jobs", "Career", "Work with"];
let jobs = {};

let currentTab = 0;

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({url: jobs[tab.id].href});
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	if (currentTab > 0) updateIcon(currentTab);
});

chrome.tabs.onActivated.addListener(function ({tabId}, info) {
	currentTab = tabId;
	updateIcon(tabId);
});

function updateIcon(tabId) {
	let found = jobs[tabId];
	if (!!found) {
		if (found.type === 1) {
			chrome.browserAction.setIcon({path: "img/blue.png", tabId: tabId});
		} else if (found.type === 2) {
			chrome.browserAction.setIcon({path: "img/green.png", tabId: tabId});
		}
	} else if (!found || found === 0) {
		chrome.browserAction.setIcon({path: "img/red.png", tabId: tabId});
		chrome.browserAction.disable(tabId);
	}
}

// Receive message that the page has been loaded
chrome.runtime.onMessage.addListener(function (data, sender, response) {
	let tabId = sender.tab.id;

	if (data.action === "loading") {
		chrome.browserAction.setIcon({path: "img/yellow.png", tabId: tabId});
		return;
	}

	let links = data.data.links;
	let allText = data.data.text;
	let found = null;

	// test the links and titles
	for (let l of links) {
		for (let t of toTestLinks) {
			if (
				l.href.toLocaleLowerCase().indexOf(t.toLocaleLowerCase()) >= 0
			) {
				found = l;
				break;
			}
		}

		for (let t of toTestTitles) {
			if (
				l.title.toLocaleLowerCase().indexOf(t.toLocaleLowerCase()) >= 0
			) {
				found = l;
				break;
			}
		}

		if (found !== null) break;
	}

	// a link has been found, update the browser action
	if (found !== null) {
		if (allText.toLocaleLowerCase().indexOf("remote") >= 0) {
			jobs[tabId] = {type: 1, href: found.href};
			chrome.browserAction.setIcon({path: "img/blue.png", tabId: tabId});
		} else {
			jobs[tabId] = {type: 2, href: found.href};
			chrome.browserAction.setIcon({path: "img/green.png", tabId: tabId});
		}
	} else {
		jobs[tabId] = {type: 0};
		chrome.browserAction.setIcon({path: "img/red.png", tabId: tabId});
		chrome.browserAction.disable(tabId);
	}
});
