import localStorageService from '../localStorageService/localStorageService';

//
// Перевірка на локалсторедж
//

let readMoreId = [];
let favoriteId = [];
let defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;

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

export function checkLokalStorage(elem, localArr) {
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

export const addFavoriteBtnHTML = `Add to favorite ${createSvgIcon(
  'icon-favorite-remove'
)}`;
export const removeFavoriteBtnHTML = `Remove from favorite ${createSvgIcon(
  'icon-favorite-add'
)}`;
export const alreadyRead = `Already read`;
export const handleFavorite = (isFav, data, btn) => () => {
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
    const index = favoriteId.findIndex(item => item.uri === data.uri);
    favoriteId.splice(index, 1);
    localStorageService.save('favorite', favoriteId);
  }
};
export const handleRead = (data, p, card) => () => {
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
};
