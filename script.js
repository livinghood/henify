function swap(text) {
	return text
	.replace((/\b([hH]an|[hH]ans|[hH]onom|[hH]on|[hH]ennes|[hH]enne)\b/g), function(match) {
		return translateToHen(match);
	});
}

function translateToHen(word) {
	return word
	.replace(/\bhan\b/g, "hen")
	.replace(/\bHan\b/g, "Hen")
	.replace(/\bhans\b/g, "hens")
	.replace(/\bHans\b/g, "Hens")
	.replace(/\bhonom\b/g, "hen")
	.replace(/\bHonom\b/g, "Hen")
	.replace(/\bhon\b/g, "hen")
	.replace(/\bHon\b/g, "Hen")
	.replace(/\bhennes\b/g, "hens")
	.replace(/\bHennes\b/g, "Hens")
	.replace(/\bhenne\b/g, "hen")
	.replace(/\bHenne\b/g, "Hen");
}


function henify(node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
        false
    );

    while(treeWalker.nextNode()) {
       treeWalker.currentNode.textContent = swap(treeWalker.currentNode.textContent);
       treeWalker.currentNode.textContent = treeWalker.currentNode.textContent;
    }
}


chrome.extension.sendRequest({checkPaused: "hello"}, function(response) {
    if (response.maybePaused!="true") {
        henify(document.body);

    document.body.addEventListener('DOMNodeInserted', function(event) {
        henify(event.target);
    });
}
});