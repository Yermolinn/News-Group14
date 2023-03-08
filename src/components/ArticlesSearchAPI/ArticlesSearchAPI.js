import localStorageService from '../localStorageServicel/localStorageService';
import { getNews } from '../ArticlesSearchAPI/ArticlesSearchAPI';

const axios = require('axios').default;
const ENDPOINT = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';

// import { default as axios } from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.perPage = 40;
    this.image_type = "photo";
    this.orientation = "horizontal";
    this.safesearch = true;
    this.onpage = 8;
  }


  async getNews() {
    const URL = `${ENDPOINT}?${API_KEY}&q=${this.searchQuery}`;
    const response = await axios.get(URL);
    console.log(response.data.response.docs);
    if (this.page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    this.nextPage();
    return response.data.response.docs;
  }
  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

const pixabayApiService = new PixabayApiService();
const formEl = document.getElementById('search-form');
const newsList = document.querySelector('.news-list');

formEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget;
  const value = formEl.elements.searchQuery.value.trim();
  pixabayApiService.searchQuery = value;

  try {
    const articles = await pixabayApiService.getNews();
    console.log(':ракета: ~ articles', articles);
    if (articles.length === 0) throw new Error('No data');
    let i = 0;
    const card = articles.reduce(
      (markup, article) => {
        i++
        return markup + createNewsCard(article, i)
      
      }, ''
    );
    console.log(card);
    updateCard(card);
  } catch (err) {
    onError();
  } formEl.reset()
}

function updateCard(markup) {
  newsList.innerHTML = markup;

}

function onError(error) {
  console.error(error);
}
export function createNewsCard({
  // при пошуку......
  headline,
  web_url,
  section_name,
  snippet,
  pub_date,
  multimedia,
}, i) {
  const defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
  const attachURL = `https://www.nytimes.com/`;
  if (multimedia.length === 0) {
    return `<div class="news-card grid grid-item-${i}">
    <div class="top-wrap">
      <img
        src="${defaultImg}"
        loading="lazy"
        class="news-img"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section_name}</p>
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
      <h2 class="info-item">${headline.main}</h2>
      <p class="describe">${snippet.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${pub_date.slice(0, 10).replaceAll('-', '/')}</p>
        <a class="news-link link" href="${web_url}">Read more</a>
      </div>
    </div>
  </div>
`;
  }
  return `<div class="news-card grid grid-item-${i}">
    <div class="top-wrap ">
      <img
        src="${attachURL}${multimedia[0].url}"
        loading="lazy"
        width="288"
        height="395"
        class="news-img"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section_name}</p>
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
      <h2 class="info-item">${headline.main}</h2>
      <p class="describe">${snippet.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${pub_date.slice(0, 10).replaceAll('-', '/')}</p>
        <a class="news-link link" href="${web_url}">Read more</a>
      </div>
    </div>
  </div>
`;
}






