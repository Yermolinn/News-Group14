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
    // console.log(response.data.response.docs);
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

    if (articles.length === 0) throw new Error('No data');
    let i = 0;
    const articles8 = articles.splice(0, 8)
    const card = articles8.reduce((markup, article) => {
      weatherContainer.style.display = 'block';
      i++;
      const attachURL = `https://www.nytimes.com/`;
      let image = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
      if (article.multimedia.length !== 0) {
        image = `${attachURL}${article.multimedia[0].url}`;
      }
      article = {
        image: image,
        section: article.section_name,
        title: article.headline.main,
        description: article.snippet,
        date: article.pub_date,
        url: article.web_url,
        id: article.uri.slice(20, article.uri.length),
      };
      return markup + createMostPopularNews(article, i);
    }, '');

    updateCard(card);
  } catch (err) {
    onError((weatherContainer.style.display = 'none'));
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
  const { image, section, title, description, date, url, id } = article;
  setTimeout(() => {
    // виконається після того як з'являться картки
    const btn = document.querySelector(`.favorite-btn--${id}`);
    const link = document.querySelector(`.news-link--${id}`);
    const p = document.querySelector(`.isread--${id}`);
    const card = document.querySelector(`.news-card--${id}`);

    let isFav = false;
    let localFavorite = localStorageService.load('favorite');
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
  return `<div class="news-card ${`news-card--${id}`} grid grid-item-${i}">

    <div class="top-wrap">
      <img
        src="${image}"
        loading="lazy"
        width="288"
        height="395"
        class="news-img"
      />
      <p class="isread ${`isread--${id}`}"></p>
      <div class="category-wrap">
        <p class="top-text">${section}</p>
      </div>
      <button class="favorite-btn ${`favorite-btn--${id}`}" data-id="${id}">
        ${addFavoriteBtnHTML}
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${title}</h2>
      <p class="describe">${description.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${date.slice(0, 10).replaceAll('-', '/')}</p>
        <a class="news-link ${`news-link--${id}`} link" href="${url}"  onclick="handleRead()" target="_blank">Read more</a>
      </div>
    </div>
  </div>
  
`;
}