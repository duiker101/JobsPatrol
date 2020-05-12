window.addEventListener('focus', function() {
    sendMsg('focus');
});

window.onload = function () {
    sendMsg('load');
};

function sendMsg(source) {
    let result = [], links = document.links;

    // get all the links and put them in the response
    for (let l of links) {
        let title = l.text.replace(/^\s+|\s+$/g, '');
        let link = l.href;
        result.push({href: link, title: title});
    }

    // return it to the background page
    chrome.runtime.sendMessage({
        action: 'loaded',
        from: source,
        data: {text: document.documentElement.textContent, links: result}
    });
}
