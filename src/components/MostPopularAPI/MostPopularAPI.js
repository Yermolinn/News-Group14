const newsList = document.querySelector('.news-list');
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';
import { default as axios } from 'axios';
import { handleFavorite } from '../render/addToFavoriteBtn';
const axios = require('axios').default;
class MostPopularApiService {
  //   constructor() {
  //     this.page = 1;
  //     this.searchQuery = '';
  //     this.perPage = 40;
  //   }

  async getNews() {
    // const URL = `${ENDPOINT}?${API_KEY}&q=${this.searchQuery}`; // це для пошуку
    const mostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?${API_KEY}`;
    const response = await axios.get(mostPopularUrl);
    console.log(response.data.results[0].media[0]['media-metadata'][0].url);
    return response.data.results;
  }

  //   nextPage() {
  //     this.page += 1;
  //   }
  //   resetPage() {
  //     this.page = 1;
  //   }
}
async function render() {
  const mostPopularApiService = new MostPopularApiService();

  const articles = await mostPopularApiService.getNews();
  console.log('🚀 ~ articles', articles[0].media[0]['media-metadata'][0].url);
  if (articles.length === 0) throw new Error('No data');
  const card = articles.reduce(
    (markup, article) => createMostPopularNews(article) + markup,
    ''
  );
  // console.log(card);
  updateCard(card);
  const addToFavoriteBtn = document.querySelector('.favorite-btn');
}

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon(
  'icon-favorite-remove'
)}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-favorite-add'
)}`;
const alreadyRead = `Already read${createSvgIcon('icon-read')}`;
function updateCard(markup) {
  newsList.innerHTML = markup;
}
function onError(error) {
  console.error(error);
}
export function createMostPopularNews({
  // при пошуку......
  title,
  url,
  section,
  abstract,
  published_date,
  media,
}) {
  const defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
  if (media.length === 0) {
    return `<div class="news-card">
    <div class="top-wrap">
      <img
        src="${defaultImg}"
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section}</p>
      </div>
      <button class="favorite-btn">
        <span class="btn-text">Add to favorite</span>
        <svg class="icon-favorite-remove" width="16" height="16">
          <use href="./images/sprite.svg#icon-favorite-remove"></use>
        </svg>
         <svg class="icon-favorite-add hide-icon" width="16" height="16">
          <use href="./images/sprite.svg#icon-favorite-add"></use>
        </svg>
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${title}</h2>
      <p class="describe">${abstract.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${published_date
          .slice(0, 10)
          .replace('-', '/')}</p>
        <a class="news-link link" href="${url}">Read more</a>
      </div>
    </div>
  </div>
  
`;
  }
  return `<div class="news-card">
    <div class="top-wrap">
      <img
        src=""
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread ${`top-text--${id}`}"></p>
      <div class="category-wrap">
        <p class="top-text">${section}</p>
      </div>
      <button class="favorite-btn">
        <span class="btn-text">Add to favorite</span>
        <svg class="icon-favorite-remove" width="16" height="16">
          <use href="./images/sprite.svg#icon-favorite-remove"></use>
        </svg>
         <svg class="icon-favorite-add hide-icon" width="16" height="16">
          <use href="./images/sprite.svg#icon-favorite-add"></use>
        </svg>
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${title}</h2>
      <p class="describe">${abstract.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${published_date
          .slice(0, 10)
          .replaceAll('-', '/')}</p>
        <a class="news-link ${`news-link--${id}`} link" href="${url}"  onclick="handleRead()" target="_blank">Read more</a>
      </div>
    </div>
  </div>
`;
}

render();

{
  /* <button class="favorite-btn">
  <span class="btn-text">Add to favorite</span>
  <svg class="icon-favorite-remove" width="16" height="16">
    <use href="./images/sprite.svg#icon-favorite-remove"></use>                            ЦЕ ТЕ ЩО Я ВИРІЗАВ 
  </svg>
  <svg class="icon-favorite-add hide-icon" width="16" height="16">
    <use href="./images/sprite.svg#icon-favorite-add"></use>
  </svg>
</button>; */
}
