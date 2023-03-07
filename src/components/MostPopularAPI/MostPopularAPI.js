const newsList = document.querySelector('.news-list');
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';
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
  //рендерить  популярні новини
  const mostPopularApiService = new MostPopularApiService();

  const articles = await mostPopularApiService.getNews();
  console.log('🚀 ~ articles', articles);
  if (articles.length === 0) throw new Error('No data');

  let i = 0;
  const card = articles.reduce((markup, article) => {
    i++;
    return markup + createMostPopularNews(article, i);
  }, '');

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

  // створює іконки, але ТІЛЬКИ сердечка

  return `
    <svg class="icon-favorite-remove" width="16" height="16">
          <use href="${refs.iconSvg}#${name}"></use>
    </svg>
  `;
}
export function getFavorite() {

  // вигружає з локал стореджа за ключем favorite значення

  const favorite = LocalStorageService.load('favorite');

  return favorite;
}

export function getRead() {

  // вигружає з локал стореджа за ключем read значення

  const read = LocalStorageService.load('read');

  return read;
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

export function createMostPopularNews(article, i) {
  // створює розмітку популярних новин
  const { abstract, published_date, section, title, media, url, id } = article;
  setTimeout(() => {
    // виконається після того як з'являться картки
    const btn = document.querySelector(`.favorite-btn--${id}`);
    const link = document.querySelector(`.news-link--${id}`);
    const p = document.querySelector(`.is-read--${id}`);
    console.log(p);

    btn.onclick = handleFavorite(id, article, btn);
    link.onclick = handleRead(article, p);
  }, 0);

  const handleFavorite = (articleId, data, btn) => () => {

    // логіка кнопки фейворіт


    btn.classList.toggle('favorite-btn--active');
    if (btn.classList.contains('favorite-btn--active')) {
      btn.innerHTML = removeFavoriteBtnHTML;
    } else {
      btn.innerHTML = addFavoriteBtnHTML;
    }
    const favorite = getFavorite();
    const saveFavorite = {
      [articleId]: data,
    };
    const newFavorite = { ...favorite, ...saveFavorite };
    console.log(saveFavorite);
    LocalStorageService.save('favorite', newFavorite);
  };
  const handleRead = (articleId, data, p) => () => {

    // логіка натискання на read more

    p.innerHTML = alreadyRead;
    const read = getRead();
    console.log(read);
    let dateOfRead = new Date()
      .toLocaleDateString({
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.');
    const item = {
      read: {
        [dateOfRead]: [data],
      },
      [dateOfRead]: data,
    };
    item.read[dateOfRead].push(data);
    console.log(item.read[dateOfRead]);
    const newRead = { ...read, ...item };
    console.log(newRead);
    LocalStorageService.save('read', newRead);
  };
  const defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
  if (media.length === 0) {

    return `<div class="news-card grid grid-item-${i}">

    <div class="top-wrap">
      <img
        src="${defaultImg}"
        loading="lazy"
        width="288"
        height="395"     
      />

      <p class="isread ${`isread--${id}`}"></p>

      <div class="category-wrap">
        <p class="top-text ">${section}</p>
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
        <a class="news-link ${`news-link--${id}`} link" href="${url}"  onclick="handleRead()" target="_blank">Read more</a>
      </div>
    </div>
  </div>
  
`;
  }

  return `<div class="news-card grid grid-item-${i}">

    <div class="top-wrap">
      <img
        src="${media[0]['media-metadata'][2].url}"
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
