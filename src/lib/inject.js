/* global chrome */
const isChromeExtension = window.chrome && chrome.runtime && chrome.runtime.id;

const inject = packages => {
  if(!isChromeExtension) {
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'inject', packages }, console.log);
  });
};

export default inject;
