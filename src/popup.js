const search = document.querySelector('.search');
const results = document.querySelector('.results');
const selected = document.querySelector('.selected');

const searchIndexes = {
  current: 0,
  used: 0
};

const packages = [];

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

search.addEventListener('keypress', e => {
  if(e.charCode === 13) {
    packages.push(search.value);
    search.value = '';
    results.innerHTML = '';
    selected.innerHTML = packages.join(', ');
  }
})
