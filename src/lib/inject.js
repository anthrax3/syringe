/* global chrome */
const isChromeExtension = window.chrome && chrome.runtime && chrome.runtime.id;

const inject = packages => {
  if(!isChromeExtension) {
    return;
  }

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
      const bundle = Object.keys(res).reduce((bundle, pkg) => bundle + res[pkg].bundle, '');
      const code = `(() => {
        const s = document.createElement('script');
        s.innerHTML = '(' + (() => { ${bundle} }).toString() + ')()';
        document.body.appendChild(s);
      })();`;
      chrome.tabs.executeScript({ code });
    });
};

export default inject;
