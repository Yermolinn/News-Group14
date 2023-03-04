// import { save, load, remove } from '../LocalStorageService/LocalStorageService';
import LocalStorageService from '../LocalStorageService/LocalStorageService';
import { getNews } from '../ArticlesSearchAPI/ArticlesSearchAPI';
export function createNewsCard({
  headline,
  web_url,
  section_name,
  lead_paragraph,
  pub_date,
}) {
  return `<div class="news-card">
    <div class="top-wrap">
      <img
        src=${image}
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section_name}</p>
      </div>
      <button class="favourite">Add to favorite</button>
    </div>
    <div class="info">
      <h2 class="info-item">${headline.main}</h2>
      <p class="describe">${lead_paragraph.slice(0, 60) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${pub_date.slice(0, 10).replace('-', '/')}</p>
        <a class="news-link link" href="${web_url}">Read more</a>
      </div>
    </div>
  </div>
`;
}
export async function fetchNews() {
  const docs = await getNews(query); // ПРОБЛЕМА!!!
  console.log('🚀 ~ docs', docs);
  if (docs.length === 0) throw new Error('No data');
  // if (docs.length < perPage) {
  //   loadMoreBtn.hide();
  //   Notify.info("We're sorry, but you've reached the end of search results.");
  // }

  const card = docs.reduce((markup, doc) => createNewsCard(doc) + markup, '');
  updateNews(card);
}
console.log(document.querySelector('.top-wrap img').getAttribute('src'));
function addNews(markup) {
  newsList.insertAdjacentHTML('beforeend', markup);
}

export function updateNews(markup) {
  newsList.innerHTML = markup;
}
// ///////////////////////////////////////////////////////
// Кнопка AddToFavourite
// //////////////////////////////////////////////////////
const refs = {
  addToFavoriteBtn: document.querySelector('.favourite-btn'),
  readMore: document.querySelector('.news-link'),
};
let currentId = 0;
let isFav = false;
const STORAGE_KEY = 'favorites';
const STORAGE_KEY_2 = 'read';
const alreadyReadArray = [];
refs.addToFavoriteBtn.addEventListener('click', handleFavorite);
refs.readMore.addEventListener('click', addToRead);

function addToRead() {
  const dateOfRead = Date.now();
  const item = {
    name: document.querySelector('.info-item').textContent, // refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.firstElementChild.textContent
    URL: document.querySelector('.news-link').getAttribute('href'), //    refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.getAttribute('href'
    describe: document.querySelector('.describe').textContent, //refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.childNodes[3].textContent
    date: document.querySelector('.news-date').textContent, //    refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.textContent
    category: document.querySelector('.top-text').textContent, //refs.addToFavoriteBtn.previousElementSibling.firstElementChild.textContent
    photo: document.querySelector('.top-wrap img').getAttribute('src'), //refs.addToFavoriteBtn.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute("src")
    dateOfRead: dateOfRead,
    currentId,
  };
  alreadyReadArray.push(item);
  currentId += 1;
  LocalStorageService.save(STORAGE_KEY_2, alreadyReadArray);
}

// check if the object already exists in the favorites array in local storage
const favoritesArray = [];

// const isObjectInFavorites = favoritesArray.some(
//   obj => obj.name === favObject.name && obj.value === favObject.value
// );

function handleFavorite() {
  if (isFav) {
    isFav = false;
    refs.addToFavoriteBtn.firstElementChild.textContent = 'Add to favorite';
    document
      .querySelector('.icon-favorite-remove')
      .classList.remove('hide-icon');
    document.querySelector('.icon-favorite-add').classList.add('hide-icon');
  } else {
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
    // const currentState = LocalStorageService.load(STORAGE_KEY);
    // console.log(currentState);
    // const isObjectInFavorites = currentState.some(
    //   obj => obj.name === item.name
    // );
    // if (isObjectInFavorites) {
    //   isFav = true;
    //   refs.addToFavoriteBtn.firstElementChild.textContent =
    //     'Remove from favorite';
    //   document
    //     .querySelector('.icon-favorite-remove')
    //     .classList.add('hide-icon');
    //   document
    //     .querySelector('.icon-favorite-add')
    //     .classList.remove('hide-icon');
    // } else {
    isFav = true;
    refs.addToFavoriteBtn.firstElementChild.textContent =
      'Remove from favorite';
    document.querySelector('.icon-favorite-remove').classList.add('hide-icon');
    document.querySelector('.icon-favorite-add').classList.remove('hide-icon');
    favoritesArray.push(item);
    currentId += 1;
    LocalStorageService.save(STORAGE_KEY, favoritesArray);
  }
}

// function addNewsToStorage(card, date) {
//   const currentState = LocalStorageService.load(STORAGE_KEY);
//   if (currentState === undefined) {
//     LocalStorageService.save(STORAGE_KEY, [createCardObject(card, date)]);
//   } else {
//     currentState.push(createCardObject(card, date));
//     LocalStorageService.save(STORAGE_KEY, currentState);
//   }
//   currentId += 1;
// }
