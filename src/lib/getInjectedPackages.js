/* global chrome */
const isChromeExtension = window.chrome && chrome.runtime && chrome.runtime.id;

const getInjectedPackages = () => new Promise((resolve) => {
  if(!isChromeExtension) {
    resolve([]);
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getInjectedPackages' }, resolve);
  });
});

export default getInjectedPackages;
