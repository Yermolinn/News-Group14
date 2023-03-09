import localStorageService from '../localStorageService/localStorageService';
import { createSearchOnError } from './articleSearchCardOnError';
import {
  checkLokalStorage,
  removeFavoriteBtnHTML,
  addFavoriteBtnHTML,
  alreadyRead,
  handleFavorite,
  handleRead,
} from '../render/render';
const axios = require('axios').default;
const ENDPOINT = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';

// import { default as axios } from 'axios';

export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.perPage = 40;
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.onpage = 8;
  }

  async getNews() {
    const URL = `${ENDPOINT}?${API_KEY}&q=${this.searchQuery}`;
    const response = await axios.get(URL);
    console.log(response.data.response.docs);
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
const weatherContainer = document.querySelector('.weather-container');

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
    const card = articles.reduce((markup, article) => {
      weatherContainer.style.display = "block";
      i++;
      return markup + createMostPopularNews(article, i);
    }, '');
    console.log(card);
    updateCard(card);
  } catch (err) {
    onError(weatherContainer.style.display = "none");
  }
  formEl.reset();
}

function updateCard(markup) {
  newsList.innerHTML = markup;
}

function onError(error) {
  newsList.innerHTML = createSearchOnError();
  console.error(error);
}

function createMostPopularNews(article, i) {
  // створює розмітку популярних новин
  const {
    headline,
    pub_date,
    section_name,
    snippet,
    multimedia,
    web_url,
    uri,
  } = article;
  setTimeout(() => {
    // виконається після того як з'являться картки
    const btn = document.querySelector(
      `.favorite-btn--${uri.slice(15, uri.length)}`
    );
    const link = document.querySelector(
      `.news-link--${uri.slice(15, uri.length)}`
    );
    const p = document.querySelector(`.isread--${uri.slice(15, uri.length)}`);
    const card = document.querySelector(
      `.news-card--${uri.slice(15, uri.length)}`
    );

    let isFav = false;
    let localFavorite = localStorageService.load('favorite');
    console.log(localFavorite);
    let checkFavorite = checkLokalStorage(article, localFavorite);
    if (checkFavorite === true) {
      btn.innerHTML = removeFavoriteBtnHTML;
      btn.classList.add('favorite-btn--active');
    }
    let localArr = localStorageService.load('readMoreLocal');
    let checkRead = checkLokalStorage(article, localArr);
    if (checkRead === true) {
      p.innerHTML = alreadyRead;
      card.classList.add('opacity');
    }
    btn.onclick = handleFavorite(isFav, article, btn);
    link.onclick = handleRead(article, p, card);
  }, 0);
  const attachURL = `https://www.nytimes.com/`;

  if (multimedia.length !== 0) {
    defaultImg = `${attachURL}${multimedia[0].url}`;
  }
  return `<div class="news-card ${`news-card--${uri.slice(
    15,
    uri.length
  )}`} grid grid-item-${i}">

    <div class="top-wrap">
      <img
        src="${defaultImg}"
        loading="lazy"
        width="288"
        height="395"
        class="news-img"
      />
      <p class="isread ${`isread--${uri.slice(15, uri.length)}`}"></p>
      <div class="category-wrap">
        <p class="top-text">${section_name}</p>
      </div>
      <button class="favorite-btn ${`favorite-btn--${uri.slice(
        15,
        uri.length
      )}`}" data-id="${uri.slice(15, uri.length)}">
        ${addFavoriteBtnHTML}
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${headline.main}</h2>
      <p class="describe">${snippet.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${pub_date.slice(0, 10).replaceAll('-', '/')}</p>
        <a class="news-link ${`news-link--${uri.slice(
          15,
          uri.length
        )}`} link" href="${web_url}"  onclick="handleRead()" target="_blank">Read more</a>
      </div>
    </div>
  </div>
  
`;
}
