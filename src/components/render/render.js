// import { save, load, remove } from '../LocalStorageService/LocalStorageService';

import LocalStorage from '../LocalStorageService/LocalStorageService';

import { getNews } from '../ArticlesSearchAPI/ArticlesSearchAPI';
// const axios = require('axios').default;
// const ENDPOINT = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
// const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';
// import { default as axios } from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// export default class PixabayApiService {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//     this.perPage = 40;
//   }

//   async getNews() {
//     const URL = `${ENDPOINT}?${API_KEY}&q=${this.searchQuery}`;
//     const response = await axios.get(URL);
//     console.log(response.data.response.docs);
//     if (this.page === 1) {
//       Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
//     }
//     this.nextPage();
//     return response.data.response.docs;
//   }

//   nextPage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }
// }
// const pixabayApiService = new PixabayApiService();

// const formEl = document.getElementById('search-form');
// const newsList = document.querySelector('.news-list');
// console.log(newsList);
// formEl.addEventListener('submit', onSubmit);
// async function onSubmit(e) {
//   e.preventDefault();
//   const formEl = e.currentTarget;
//   const value = formEl.elements.searchQuery.value.trim();
//   pixabayApiService.searchQuery = value;
//   // getNews(value).then(() => {
//   //   if (articles.length === 0) throw new Error("No data");
//   //   return articles.reduce((markup, article) =>
//   //     createNewsCard(article) + markup, "");
//   // })
//   // .then(updateCard)
//   // .catch(onError)
//   // .finally(() => formEl.reset());
//   try {
//     const articles = await pixabayApiService.getNews();
//     console.log('🚀 ~ articles', articles);
//     if (articles.length === 0) throw new Error('No data');
//     const card = articles.reduce(
//       (markup, article) => createNewsCard(article) + markup,
//       ''
//     );
//     console.log(card);
//     updateCard(card);
//   } catch (err) {
//     onError();
//   }
// }
// function updateCard(markup) {
//   newsList.innerHTML = markup;
// }

// function onError(error) {
//   console.error(error);
// }
export function createNewsCard({
  // при пошуку......
  headline,
  web_url,
  section_name,
  lead_paragraph,
  pub_date,
}) {
  return `<div class="news-card">
    <div class="top-wrap">
      <img
        src=
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section_name}</p>
      </div>
      <button class="favorite-btn">Add to favorite</button>
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
function addNews(markup) {
  newsList.insertAdjacentHTML('beforeend', markup);
}

export function updateNews(markup) {
  newsList.innerHTML = markup;
}
// ///////////////////////////////////////////////////////
// Кнопка AddToFavourite
// //////////////////////////////////////////////////////
// const refs = {
//   addToFavoriteBtn: document.querySelector('.favorite-btn'),
//   readMore: document.querySelector('.news-link'),
// };
// let currentId = 0;
// let isFav = false;

// const STORAGE_KEY = 'favorites';
// const STORAGE_KEY_2 = 'read';
// refs.addToFavoriteBtn.addEventListener('click', handleFavorite);
// refs.readMore.addEventListener('click', addToRead);

// function addToRead() {
//   let dateOfRead = new Date()
//     .toLocaleDateString({
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     })
//     .replace(/\//g, '.');
//   const item = {
//     read: {
//       [`${dateOfRead}`]: [
//         {
//           name: document.querySelector('.info-item').textContent, // refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.firstElementChild.textContent
//           URL: document.querySelector('.news-link').getAttribute('href'), //    refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.getAttribute('href'
//           describe: document.querySelector('.describe').textContent, //refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.childNodes[3].textContent
//           date: document.querySelector('.news-date').textContent, //    refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.textContent
//           category: document.querySelector('.top-text').textContent, //refs.addToFavoriteBtn.previousElementSibling.firstElementChild.textContent
//           photo: document.querySelector('.top-wrap img').getAttribute('src'), //refs.addToFavoriteBtn.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute("src")
//           currentId,
//         },
//       ],
//     },
//   };

//   currentId += 1;
//   LocalStorageService.save(STORAGE_KEY_2, item);
// }



// check if the object already exists in the favorites array in local storage
// const favoritesArray = [];


// const isObjectInFavorites = favoritesArray.some(
//   obj => obj.name === favObject.name && obj.value === favObject.value
// );




// function handleFavorite() {
//   const item = {
//     name: document.querySelector('.info-item').textContent,
//     URL: document.querySelector('.news-link').getAttribute('href'),
//     describe: document.querySelector('.describe').textContent,
//     date: document.querySelector('.news-date').textContent,
//     category: document.querySelector('.top-text').textContent,
//     photo: document.querySelector('.top-wrap img').getAttribute('src'),
//     isFav,
//     currentId,
//   };
//   if (isFav) {
//     isFav = false;
//     refs.addToFavoriteBtn.firstElementChild.textContent = 'Add to favorite';
//     document
//       .querySelector('.icon-favorite-remove')
//       .classList.remove('hide-icon');
//     document.querySelector('.icon-favorite-add').classList.add('hide-icon');
//   } else {
//     const currentState = LocalStorageService.load(STORAGE_KEY);
//     console.log(currentState);
//     if (currentState.includes(item)) {
//       isFav = true;
//       refs.addToFavoriteBtn.firstElementChild.textContent =
//         'Remove from favorite';
//       document
//         .querySelector('.icon-favorite-remove')
//         .classList.add('hide-icon');
//       document
//         .querySelector('.icon-favorite-add')
//         .classList.remove('hide-icon');
//     } else {
//       isFav = true;
//       refs.addToFavoriteBtn.firstElementChild.textContent =
//         'Remove from favorite';
//       document
//         .querySelector('.icon-favorite-remove')
//         .classList.add('hide-icon');
//       document
//         .querySelector('.icon-favorite-add')
//         .classList.remove('hide-icon');
//       favoritesArray.push(item);
//       currentId += 1;
//       LocalStorageService.save(STORAGE_KEY, favoritesArray);
//     }
//   }
// }


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
