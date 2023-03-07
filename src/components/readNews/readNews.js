
const obj = {
     read: {
        250282: [
            {
                name: 2,
                URL: 3,
                describe: [4, 'ksdjfhskjdfhksjdhfksjhdfkjshdfkshfdhskdfhsjdfhjs'],
                date: 5,
                category: 6,
                photo: 7,
                currentId:2,
            },{
                name: 5,
                URL: 5,
                describe: ['ksdjfhskjdfhksjdhfksjhdfkjshdfkshfdhskdfhsjdfhjs'],
                date: 545455,
                category: 45456,
                photo: 45457,
                currentId:2454545,
            },{
                name: 2,
                URL: 3454545,
                describe: [445445, 'ksd45454jfhskjdfhksjdhfksjhdfkjshdfkshfdhskdfhsjdfhjs'],
                date: 545,
                category: 645,
                photo: 745,
                currentId:45452,
            },
        ],
         
         456788: [
            {
                name: 23,
                URL: 324,
                describe: [4, 'ksdjfhskjdfhksjdhfksjhdfkjshdfkshfdhskdfhsjdfhjs'],
                date: 5,
                category: 6,
                photo: 7,
                currentId:2,
            },{
                name: 2,
                URL: 5,
                describe: ['ksdjfhskjdfhksjdhfksjhdfkjshdfkshfdhskdfhsjdfhjs'],
                date: 545455,
                category: 45456,
                photo: 45457,
                currentId:2454545,
            },{
                name: 26,
                URL: 3454545,
                describe: [445445, 'ksd45454jfhskjdfhksjdhfksjhdfkjshdfkshfdhskdfhsjdfhjs'],
                date: 545,
                category: 645,
                photo: 745,
                currentId:45452,
            },
        ],
    }
}



// -------------------------------------------------------------------------------------------------------------------------------------------

function createMarkup(imagesObject, body) {
    const markUp = [];
    const idArticles = [];
    let removeKey = undefined;
    for (key in imagesObject) {
        markUp.push(`<div class="read--date--card" id= ${key}>
        <div class="read--one--day">
        <a class="read--date">${key}</a>
        <svg class="read--contacts__svg" width="15px" height="9px"><use href="./images/sprite.svg#icon-arrow-up"></use></svg>
         </div>
         <div class= "read--day" >`);
        let count = 0;
        for (let i = 0; i < imagesObject[key].length; i++) {
            if (!idArticles.includes(imagesObject[key][i].name)) {
                count++;
                idArticles.push(imagesObject[key][i].name);
                markUp.push(`
    <div class="read--news-cards">
    <div class="news-card">
    <div class="top-wrap">
      <img
        src=
        loading="lazy"
        width="288"
        height="39"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${imagesObject[key][i].name}</p>
      </div>
      <button class="favorite-btn">Add to favorite</button>
    </div>
    <div class="info">
      <h2 class="info-item">${imagesObject[key][i].URL}</h2>
      <p class="describe">${imagesObject[key][i].describe.slice(0, 60) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${imagesObject[key][i].describe.slice(0, 10)}</p>
        <a class="news-link link" href="${imagesObject[key][i].URL}">Read more</a>
      </div>
    </div>
  </div>
  </div>
`);
        }
        }
        
        markUp.push(`</div>  </div>`);
        if (count == 0) {
            removeKey = key;
            console.log(removeKey);
        }
    }
    body.insertAdjacentHTML('afterbegin', markUp.join(''));
    if (removeKey) {
        document.getElementById(removeKey).remove();
    }
}
const readMainPlace = document.querySelector('main');
createMarkup(obj.read, readMainPlace);


let dateCardsEls = document.querySelectorAll('.read--date--card');

for (el of dateCardsEls) {
    el.addEventListener("click", (event) => {

        if (event.target.querySelector('.read--contacts__svg')) {
            // event.currentTarget.querySelector('.read--day').style.display = "none"
            event.currentTarget.querySelector('.read--day').classList.toggle('read--is-hidden');
        }
});
}

