window.onload = function(){
    console.log("content");
    var result = [], links = document.links;

    for (var l of links) {
    	var title = l.text.replace( /^\s+|\s+$/g, '' );
    	var link = l.href;
        result.push({href:link,title:title});
    }

	console.log("sending");
    chrome.runtime.sendMessage(result);
};
