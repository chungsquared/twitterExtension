
/*chromeExtensions feature 4 different contexts for the rightclick menu:
	1. selection: whatever you highlight
	2. link: when you right click a url 
	3. image: any image you right click
	4. page: when you right click anywhere on the page
*/
var contextsList = ["selection", "link", "image", "page"];


//We loop through the contextsList array and create a hangler for each context

for(var i = 0;i<contextsList.length;i++){

	var context = contextsList[i];
	var titleX = "Twitter Toolkit: Share this "+context+" on your twitter profile"

	//context menus API allows you to edit right click menu
	chrome.contextMenus.create({
		title: titleX,
		contexts: [context],
		onclick: clickHandler,
		id: context,
	});
}

function clickHandler(data,tab){
	switch(data.menuItemId){
		case "selection": 
			chrome.windows.create({url: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(data.selectionText), type:"panel" });
			break;
		case "link":
			chrome.windows.create({url: "https://twitter.com/intent/tweet?url=" + encodeURIComponent(data.linkUrl), type:"panel"});
			break;
		case "image":
			chrome.windows.create({url: "https://twitter.com/intent/tweet?url=" + encodeURIComponent(data.srcUrl), type:"panel"});
			break;
		case "page":
			chrome.windows.create({url: "https://twitter.com/intent/tweet?text=" +
				encodeURIComponent(tab.title)+"&url="+(data.pageUrl), type:"panel"});
			break;
	}
}

