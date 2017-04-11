const search = document.querySelector('.search');
const results = document.querySelector('.results');

search.addEventListener('input', e => {
  fetch(`https://ac.cnstrc.com/autocomplete/${search.value}?autocomplete_key=CD06z4gVeqSXRiDL2ZNK`)
    .then(res => res.json())
    .then(res => {
      const packages = res.sections.packages;
      if(packages.length === 0) {
        return;
      }
      results.innerHTML = packages.map(package => package.value).join('<br>');
    });
});
