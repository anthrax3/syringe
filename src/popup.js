const search = document.querySelector('.search');
const results = document.querySelector('.results');

const searchIndexes = {
  current: 0,
  used: 0
};

search.addEventListener('input', e => {
  if(search.value === '') {
    results.innerHTML = '';
    return;
  }

  searchIndexes.current++;
  const searchIndex = searchIndexes.current;

  fetch(`https://ac.cnstrc.com/autocomplete/${search.value}?autocomplete_key=CD06z4gVeqSXRiDL2ZNK`)
    .then(res => res.json())
    .then(res => {
      const packages = res.sections.packages;
      if(packages.length === 0 || (searchIndex < searchIndexes.used)) {
        return;
      }
      searchIndexes.used = searchIndex;
      results.innerHTML = packages.map(package => package.value).join('<br>');
    });
});
