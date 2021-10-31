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
    console.log(chrome, req.type in chrome, chrome[req.type], req.func in chrome[req.type]);
    if (req.type in chrome && req.func in chrome[req.type]) {
      console.log('req exec', req.type, req.func, req.params);
      resp = await chrome[req.type][req.func](...req.params);
    } else {
      console.log('req fail', req.type, req.func, req.params);
    }
    sendResp(resp);
  }
)
