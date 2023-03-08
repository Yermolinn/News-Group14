import LocalStorageService from '../LocalStorageService/LocalStorageService';
const favCollectionEl = document.querySelector('.favorite-collection');
console.log(favCollectionEl);

const cardFromLocal = LocalStorageService.load('favorite');
console.log(cardFromLocal)
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


let i = 0;
const arrayForCollection = []
for (const card of cardFromLocal) {
    i += 1;
    console.log(card.title);
        let defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
  if (card.media.length !== 0) {
    defaultImg = card.media[0]['media-metadata'][2].url;
  }
    let markup = `<div class="news-card ${`news-card--${card.id}`} grid grid-item-${i}">

            <div class="top-wrap">
              <img
                src="${defaultImg}"
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
                ${addFavoriteBtnHTML}
              </button>
            </div>
            <div class="info">
              <h2 class="info-item">${card.title}</h2>
              <p class="describe">${card.abstract}</p>
              <div class="lower-content">
                <p class="news-date">${card.published_date}</p>
                <a class="news-link ${`news-link--${card.id}`} link" href="${card.url}"  onclick="handleRead()" target="_blank">Read more</a>
              </div>
            </div>
          </div>
          
        `
        // console.log(markup);
        arrayForCollection.push(markup)
}

favCollectionEl.insertAdjacentHTML('beforeend', arrayForCollection.join(''))

// const markup = createMarkUp(cardFromLocal);
// favCollectionEl.insertAdjacentHTML('beforeend', markup)

// function createMarkUp (arr, i) {
//     i = 0;
//     let defaultImg = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
// //   if (media.length !== 0) {
// //     defaultImg = media[0]['media-metadata'][2].url;
// //   }
//     const newArr = arr
//     .map(el => {
//         i += 1;
//         return `<div class="news-card ${`news-card--${id}`} grid grid-item-${i}">

//         <div class="top-wrap">
//           <img
//             src="${defaultImg}"
//             loading="lazy"
//             width="288"
//             height="395"
//             class="news-img"
//           />
//           <p class="isread ${`isread--${id}`}"></p>
//           <div class="category-wrap">
//             <p class="top-text">${section}</p>
//           </div>
//           <button class="favorite-btn ${`favorite-btn--${id}`}" data-id="${id}">
//             ${addFavoriteBtnHTML}
//           </button>
//         </div>
//         <div class="info">
//           <h2 class="info-item">${title}</h2>
//           <p class="describe">${abstract}</p>
//           <div class="lower-content">
//             <p class="news-date">${published_date}</p>
//             <a class="news-link ${`news-link--${id}`} link" href="${url}"  onclick="handleRead()" target="_blank">Read more</a>
//           </div>
//         </div>
//       </div>
      
//     `;
//     })
//     .join('');
//     return newArr
// }