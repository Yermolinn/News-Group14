const newsList = document.querySelector('.news-list');
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';
const weatherContainer = document.querySelector('.weather-container');

import localStorageService from '../localStorageService/localStorageService';
import {
  removeFavoriteBtnHTML,
  addFavoriteBtnHTML,
  alreadyRead,
  handleFavorite,
  handleRead,
  checkLokalStorage,
} from '../render/render';
const axios = require('axios').default;

class MostPopularApiService {


  async getNews() {
    const mostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${API_KEY}`;
    const response = await axios.get(mostPopularUrl);
    return response.data.results;
  }
}
async function render() {
  //рендерить  популярні новини
  const mostPopularApiService = new MostPopularApiService();

  const articles = await mostPopularApiService.getNews();


  if (articles.length === 0) throw new Error('No data');


  let i = 0;
  const card = articles.reduce((markup, article) => {
      weatherContainer.style.display = 'block';
    i++;
    let image = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
    if (article.media.length !== 0) {
      image = article.media[0]['media-metadata'][2].url;
    }
    article = {
      image: image,
      section: article.section,
      title: article.title,
      description: article.abstract,
      date: article.published_date,
      url: article.url,
      id: article.id,
    };
    return markup + createMostPopularNews(article, i);
  }, '');

  updateCard(card);
}

function updateCard(markup) {
  newsList.innerHTML = markup;
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
render();
