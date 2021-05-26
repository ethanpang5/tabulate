// eslint-disable-next-line no-undef
chrome.browserAction.onClicked.addListener(function(activeTab)
{
    // eslint-disable-next-line no-undef
    chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
});