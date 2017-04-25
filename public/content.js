const scriptId = 'syringe-script';

const injectPackages = (packages, cb) => {

  const dependencies = packages.reduce((deps, pkg) => {
    deps[pkg] = 'latest';
    return deps
  }, {});

  fetch('https://wzrd.in/multi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dependencies })
  })
    .then(res => res.json())
    .then(res => {

      const existingScript = document.getElementById(scriptId);
      if(existingScript !== null) {
          existingScript.remove();
      }

      const bundle = Object.keys(res).reduce((bundle, pkg) => bundle + res[pkg].bundle, '');
      const script = document.createElement('script');
      script.id = scriptId;
      script.dataset.packages = JSON.stringify(packages);
      script.innerHTML = bundle;
      document.body.appendChild(script);
      cb(true);
    })
    .catch(() => cb(false));
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if(msg.action === 'getInjectedPackages') {
    const script = document.getElementById(scriptId);
    if(script !== null && script.dataset.packages !== undefined) {
        return sendResponse(JSON.parse(script.dataset.packages));
    }
    return sendResponse(false);
  }

  if(msg.action === 'inject') {
    injectPackages(msg.packages, sendResponse);
  }

  // Allows us to respond async
  return true;
});
