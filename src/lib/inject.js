/* global chrome */
const inject = packages => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'inject', packages }, console.log);
  });
};

export default inject;
