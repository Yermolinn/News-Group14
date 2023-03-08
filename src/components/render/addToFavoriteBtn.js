const addToFavoriteBtn = document.querySelector('.favourite-btn');
console.log(addToFavoriteBtn);

let currentId = 0;
let isFav = false;
const STORAGE_KEY = 'favorites';
addToFavoriteBtn.addEventListener('click', handleFavorite);

// check if the object already exists in the favorites array in local storage
const favoritesArray = [];

function handleFavorite() {
  const item = {
    name: document.querySelector('.info-item').textContent,
    URL: document.querySelector('.news-link').getAttribute('href'),
    describe: document.querySelector('.describe').textContent,
    date: document.querySelector('.news-date').textContent,
    category: document.querySelector('.top-text').textContent,
    photo: document.querySelector('.top-wrap img').getAttribute('src'),
    isFav,
    currentId,
  };
  if (isFav) {
    isFav = false;
    refs.addToFavoriteBtn.firstElementChild.textContent = 'Add to favorite';
    document
      .querySelector('.icon-favorite-remove')
      .classList.remove('hide-icon');
    document.querySelector('.icon-favorite-add').classList.add('hide-icon');
    const currentState = localStorageService.load(STORAGE_KEY);
    console.log(currentState);
    const index = currentState.findIndex(item => item.isFav === false);
    currentState.splice(index, 1);
    favoritesArray.pop();
    localStorageService.save(STORAGE_KEY, currentState);
  } else {
    isFav = true;
    refs.addToFavoriteBtn.firstElementChild.textContent =
      'Remove from favorite';
    document.querySelector('.icon-favorite-remove').classList.add('hide-icon');
    document.querySelector('.icon-favorite-add').classList.remove('hide-icon');
    favoritesArray.push(item);
    currentId += 1;
    localStorageService.save(STORAGE_KEY, favoritesArray);
  }
}
