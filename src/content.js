const injectPackages = (packages, cb) => {
  const scriptId = 'syring-script';
  const exisitingScript = document.getElementById(scriptId);
  if(exisitingScript !== null) {
      exisitingScript.remove();
  }
  const script = document.createElement('script');
  script.id = scriptId;
  if(typeof cb === 'function') {
    script.onload = () => cb(true); 
    script.onerror = () => cb(false); 
  }
  script.src = `https://pkgzip.com/?${packages.join(',')}`;
  document.body.appendChild(script);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if(msg.action === 'inject') {
    injectPackages(msg.packages, success => sendResponse({ success }));
  }

  // Allows us to respond async
  return true;
});
