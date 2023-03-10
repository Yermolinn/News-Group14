import localStorageService from '../localStorageService/localStorageService';
import {
  handleRead,
  checkLokalStorage,
  alreadyRead,
  addFavoriteBtnHTML,
  removeFavoriteBtnHTML,
  handleFavorite,
} from '../render/render';
const favCollectionEl = document.querySelector('.favorite-collection');
// console.log(favCollectionEl);
const cardFromLocal = localStorageService.load('favorite');
// console.log(cardFromLocal);
const readFromLocal = localStorageService.load('readMoreLocal');
// console.log(readFromLocal);

let i = 0;
const arrayForCollection = [];
// console.log(arrayForCollection);
for (const card of cardFromLocal) {
  i += 1;
  // let image = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
  // if (card.media.length !== 0) {
  //   image = card.media[0]['media-metadata'][2].url;
  // }
  let markup = `<div class="news-card ${`news-card--${card.id}`} grid grid-item-${i}">

    <div class="top-wrap">
      <img
        src="${card.image}"
        loading="lazy"
        width="288"
        height="395"
        class="news-img"
      />
      <p class="isread ${`isread--${card.id}`}"></p>
      <div class="category-wrap">
        <p class="top-text">${card.section}</p>
      </div>
      <button class="favorite-btn ${`favorite-btn--${card.id}`}" data-id="${card.id}">
        ${removeFavoriteBtnHTML}
      </button>
    </div>
    <div class="info">
      <h2 class="info-item">${card.title}</h2>
      <p class="describe">${card.description.slice(0, 150) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${card.date.slice(0, 10).replaceAll('-', '/')}</p>
        <a class="news-link ${`news-link--${card.id}`} link" href="${card.url}"  onclick="handleRead()" target="_blank">Read more</a>
      </div>
    </div>
  </div>
  
`;
  setTimeout(() => {
    const btn = document.querySelector(`.favorite-btn--${card.id}`);
    const link = document.querySelector(`.news-link--${card.id}`);
    const p = document.querySelector(`.isread--${card.id}`);
    const newsCard = document.querySelector(`.news-card--${card.id}`);
    console.log(btn);
    console.log(link);

    let isFav = true;
    let localFavorite = localStorageService.load('favorite');
    let checkFavorite = checkLokalStorage(card, localFavorite);
    if (checkFavorite === true) {
      btn.innerHTML = removeFavoriteBtnHTML;
      btn.classList.add('favorite-btn--active');
    }

    let localArr = localStorageService.load('readMoreLocal');
    let checkRead = checkLokalStorage(card, localArr);
    if (checkRead === true) {
      p.innerHTML = alreadyRead;
      newsCard.classList.add('opacity');
    }
    btn.onclick = handleFavorite(isFav, card, btn );
    link.onclick = handleRead(card, p, newsCard);
  }, 0);

  // console.log(markup);
  arrayForCollection.push(markup);
}
favCollectionEl.insertAdjacentHTML('beforeend', arrayForCollection.join(''));
