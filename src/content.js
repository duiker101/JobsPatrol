window.onload = function(){
    var result = [], links = document.links;

    // get all the links and put them in the response
    for (var l of links) {
    	var title = l.text.replace( /^\s+|\s+$/g, '' );
    	var link = l.href;
        result.push({href:link,title:title});
    }

    // return it to the background page
    chrome.runtime.sendMessage(result);
};
