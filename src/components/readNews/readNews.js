
// import '../render/addToFavoriteBtn';

import localStorageService from '../localStorageService/localStorageService';
import {
  checkLokalStorage,
  removeFavoriteBtnHTML,
  addFavoriteBtnHTML,
  alreadyRead,
  handleFavorite,
  handleRead,
} from '../render/render';

const favCollectionEl = document.querySelector('.favorite-collection');
// console.log(favCollectionEl);

const cardFromLocal = localStorageService.load('readMoreLocal');
console.log(cardFromLocal)
// const cardFromLocal = JSON.parse(localStorage.getItem('readMoreLocal'));
// console.log(cardFromLocal);
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

let j = 1;
let readDate = 1;
const arrayForCollection = [];
const markUp = [];
if (cardFromLocal) {
  for (let i = 0; i < cardFromLocal.length; i += 1) {
    // console.log(cardFromLocal[i].title);
    let defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
    if (cardFromLocal[i].media.length !== 0) {
      defaultImg = cardFromLocal[i].media[0]['media-metadata'][2].url;
    }
    // console.log(readDate);
    let headCard = false;
    if (readDate) {
      markUp.push(`<div class="read--date--card">
        <div class="read--one--day">
        <a class="read--date">${cardFromLocal[i].dayRead}</a>
        <svg class="read--contacts__svg" width="15px" height="9px"><use href="./sprite.f14d31f7.svg#icon-arrow-up"></use></svg>
        <svg class="read--contacts__svg_hid read--is-hidden" width="15px" height="9px"><use href="./sprite.f14d31f7.svg#icon-arrow-down"></use></svg>
        </div>
         <div class= "read--day"> <div class="read--news-cards news-list">`);
    }

    markUp.push(`<div class="news-card ${`news-card--${cardFromLocal[i].id}`} grid grid-item-${i}">
            <div class="top-wrap">
              <img
                src="${defaultImg}"
                loading="lazy"
                width="288"
                height="395"
                class="news-img"
              />
              <p class="isread ${`isread--${cardFromLocal[i].id}`}"></p>
                <div class="category-wrap">
                <p class="top-text">${cardFromLocal[i].section}</p>
                </div>
              <button class="favorite-btn ${`favorite-btn--${cardFromLocal[i].id}`}" data-id="${cardFromLocal[i].id}">
                ${addFavoriteBtnHTML}
              </button>
            </div>
            <div class="info">
              <h2 class="info-item">${cardFromLocal[i].title}</h2>
              <p class="describe">${cardFromLocal[i].abstract}</p>
              <div class="lower-content">
                <p class="news-date">${cardFromLocal[i].published_date}</p>
                <a class="news-link ${`news-link--${cardFromLocal[i].id}`} link" href="${cardFromLocal[i].url}"  onclick="handleRead()" target="_blank">Read more</a>
              </div>
            </div>
          </div>
        `);
    // console.log(markUp);
    if (cardFromLocal.length < 2) { readDate = 0 } else {
      if (j < (cardFromLocal.length)) {
        readDate = Math.abs(cardFromLocal[i].dayRead.replace(/[\s.,%]/g, '') - cardFromLocal[j].dayRead.replace(/[\s.,%]/g, ''));
        j++;
      }
      if (readDate) {
        markUp.push(`</div> </div> </div>`);
      }
    }
  }
  // 
  document.querySelector('.read--cards').insertAdjacentHTML('beforeend', markUp.join(''));

  let dateCardsEls = document.querySelectorAll('.read--date--card');
  // console.log(dateCardsEls);

  for (el of dateCardsEls) {
    el.addEventListener("click", (event) => {

      if (event.target.querySelector('.read--contacts__svg')) {
        // event.currentTarget.querySelector('.read--day').style.display = "none"
        event.currentTarget.querySelector('.read--day').classList.toggle('read--is-hidden');
        event.target.querySelector('.read--contacts__svg').classList.toggle('read--is-hidden');
        event.target.querySelector('.read--contacts__svg_hid').classList.toggle('read--is-hidden');
      }
    });
  }
}
else {
  markUp.push(`<section class="read--underfined">  <p class="read--underfined___title">We haven't found news from <br> this category</p> <picture> <source srcset="./src/images/img-error-mobile-x1.png 1x, ./src/images/img-error-mobile-x2.png 2x" type="image/png" media="(max-width: 479.98px)" alt="underfined-picture"> <source srcset="./src/images/img-error-tablet-x1.png 1x 1x, ./src/images/img-error-tablet-x2.png 2x" type="image/png" media="(max-width:767.98px)" alt="underfined-picture"> <source srcset="./src/images/img-error-x1.png 1x, ./src/images/img-error-x2.png 2x" type="image/png" media="(min-width: 1279.98px)" alt="underfined-picture"> <img class="read--underfined___picture" src="/goIt-news-team-project/mobile.9ca3fe39.png" alt="underfined-picture" width="248" height="198"> </picture>  </section>`);
  document.querySelector('.read--cards').insertAdjacentHTML('beforeend', markUp.join(''));
}