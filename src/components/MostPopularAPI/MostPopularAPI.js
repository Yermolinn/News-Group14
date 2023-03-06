const newsList = document.querySelector('.news-list');
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';
import { handleFavorite } from '../render/addToFavoriteBtn';
import LocalStorageService from '../LocalStorageService/LocalStorageService';
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
    // console.log(response.data.results[0].media[0]['media-metadata'][0].url);
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
  console.log('🚀 ~ articles', articles);
  if (articles.length === 0) throw new Error('No data');
  const card = articles.reduce(
    (markup, article) => createMostPopularNews(article) + markup,
    ''
  );
  console.log(card);
  updateCard(card);
}

//
//            FAVORITE FUNCTIONAL
//
const refs = {
  iconSvg: new URL('../../images/sprite.svg', import.meta.url),
};

function createSvgIcon(name) {
  return `
    <svg class="icon-favorite-remove" width="16" height="16">
          <use href="${refs.iconSvg}#${name}"></use>
    </svg>
  `;
}
export function getFavorite() {
  const favorite = LocalStorageService.load('favorite');

  return favorite;
}
const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon(
  'icon-favorite-remove'
)}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-favorite-add'
)}`;

function updateCard(markup) {
  newsList.innerHTML = markup;
}
function onError(error) {
  console.error(error);
}
export function createMostPopularNews(article) {
  const { abstract, published_date, section, title, media, url, id } = article;
  setTimeout(() => {
    const btn = document.querySelector(`.favorite-btn--${id}`);
    const link = document.querySelector('news-link');
    btn.onclick = handleFavorite(id, article, btn);
    // link.addEventListener('click', handleRead(id, article));
  }, 0);

  const handleFavorite = (articleId, data, btn) => () => {
    btn.classList.toggle('favorite-btn--active');
    const favorite = getFavorite();
    const saveFavorite = {
      [articleId]: data,
    };
    console.log(saveFavorite);
    if (btn.classList.contains('favorite-btn--active')) {
      btn.innerHTML = removeFavoriteBtnHTML;
      const newFavorite = { ...favorite, ...saveFavorite };
      LocalStorageService.save('favorite', newFavorite);
    } else {
      btn.innerHTML = addFavoriteBtnHTML;
      LocalStorageService.remove(saveFavorite);
    }
  };
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
      <button class="favorite-btn ${`favorite-btn--${id}`}" data-id="${id}">
        ${addFavoriteBtnHTML}
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${title}</h2>
      <p class="describe">${abstract.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${published_date
          .slice(0, 10)
          .replaceAll('-', '/')}</p>
        <a class="news-link link" href="${url}">Read more</a>
      </div>
    </div>
  </div>
  
`;
  }
  return `<div class="news-card">
    <div class="top-wrap">
      <img
        src="${media[0]['media-metadata'][2].url}"
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section}</p>
      </div>
      <button class="favorite-btn ${`favorite-btn--${id}`}" data-id="${id}">
        ${addFavoriteBtnHTML}
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${title}</h2>
      <p class="describe">${abstract.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${published_date
          .slice(0, 10)
          .replaceAll('-', '/')}</p>
        <a class="news-link link" href="${url}">Read more</a>
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
