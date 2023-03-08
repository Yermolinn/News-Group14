const newsList = document.querySelector('.news-list');
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';
import localStorageService from '../localStorageService/localStorageService';
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

  updateCard(card);
}

//
// Перевірка на локалсторедж
//

let readMoreId = [];
let favoriteId = [];
// readMoreId = localStorageService.save('readMoreLocal', readMoreId);
console.log(readMoreId);

// console.log(localStorageService.load('readMoreLocal').map(elem => elem));
isReadEmpty();
isFavoriteEmpty();

function isReadEmpty() {
  if (localStorageService.load('readMoreLocal') === undefined) {
    return;
  }
  readMoreId = localStorageService.load('readMoreLocal');
}

function isFavoriteEmpty() {
  if (localStorageService.load('favorite') === undefined) {
    favoriteId = [];
    return;
  }
  favoriteId = localStorageService.load('favorite');
}

function checkLokalStorage(elem, localArr) {
  if (localArr === undefined) {
    return;
  }

  for (let i = 0; i < localArr.length; i += 1) {
    if (localArr[i].uri === elem.uri) {
      return true;
    }
  }
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

const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon(
  'icon-favorite-remove'
)}`;
const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-favorite-add'
)}`;
const alreadyRead = `Already read`;
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
    let check = checkLokalStorage(article, localArr);
    if (check === true) {
      p.innerHTML = alreadyRead;
      card.classList.add('opacity');
    }
    btn.onclick = handleFavorite(isFav, article, btn);
    link.onclick = handleRead(article, p, card);
  }, 0);

  const handleFavorite = (isFav, data, btn) => () => {
    // логіка кнопки фейворіт
    btn.classList.toggle('favorite-btn--active');

    if (btn.classList.contains('favorite-btn--active')) {
      isFav = true;
      btn.innerHTML = removeFavoriteBtnHTML;
      for (let i = 0; i < favoriteId.length; i += 1) {
        if (favoriteId[i].uri === data.uri) {
          return;
        }
      }
      data.favorite = isFav;
      favoriteId.push(data);
      localStorageService.save('favorite', favoriteId);
    } else {
      isFav = false;
      btn.innerHTML = addFavoriteBtnHTML;
      const index = favoriteId.findIndex(item => item.isFav === false);
      favoriteId.splice(index, 1);
      localStorageService.save('favorite', favoriteId);
    }
  };
  const handleRead = (data, p, card) => () => {
    // логіка натискання на read more
    p.innerHTML = alreadyRead;
    card.classList.add('opacity');
    let dateOfRead = new Date()
      .toLocaleDateString({
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.');
    data.dayRead = dateOfRead;
    console.log(data);
    for (let i = 0; i < readMoreId.length; i += 1) {
      if (readMoreId[i].uri === data.uri) {
        return;
      }
    }
    readMoreId.push(data);
    localStorageService.save(`readMoreLocal`, readMoreId);
    // const item = {
    //   read: {
    //     [dateOfRead]: [data],
    //   },
    // };

    // item.read[dateOfRead].push(data);
    // console.log(item.read[dateOfRead]);
    // const newRead = { ...read, ...item };
    // console.log(newRead);
    // localStorageService.save('read', newRead);
  };

  let defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
  if (media.length !== 0) {
    defaultImg = media[0]['media-metadata'][2].url;
  }
  return `<div class="news-card ${`news-card--${id}`} grid grid-item-${i}">

    <div class="top-wrap">
      <img
        src="${defaultImg}"
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