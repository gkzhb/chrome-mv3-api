let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessageExternal.addListener(
  async (req, sender, sendResp) => {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    let resp;
    switch (req.type) {
      case 'tabGroups':
        resp = await chrome.tabGroups[req.func](...req.params);
        console.log(`tabGroups ${req.func}`, req.params, resp);
        break;
      default:
    }
    sendResp(resp);
  }
)
