import { difference } from 'lodash';
import { exportCategories } from './fetchCategoryList';
import { FethNewsService } from './fetchNewsCategory';
import { createCardOnError } from './createCardOnError';
import { selectedDate } from '../calendar/calendar';

import localStorageService from '../localStorageService/localStorageService';
import {
  checkLokalStorage,
  removeFavoriteBtnHTML,
  addFavoriteBtnHTML,
  alreadyRead,
  handleFavorite,
  handleRead,
} from '../render/render';


import {
  newArrli,
  paginationEl,
  resolveArray,
  ulEl,
  btnNextPg,
  btnPrewPg
} from '../pagination/pagination'; 


const container = document.querySelector('.final-menu');

/* const newArrli = [];
const paginationEl = document.querySelector('.pagination');
const resolveArray = [];
const ulEl = document.querySelector(`.pagination-list`);
const btnNextPg = document.querySelector('.pagination-btn__next');
const btnPrewPg = document.querySelector('.pagination-btn__prew'); */

const arrCategoryElements = [];
const weatherContainer = document.querySelector('.weather-container');


const fethNewsService = new FethNewsService();
const newList = document.querySelector('.news-list');
container.addEventListener('click', getNewsCategory);
console.log(newList);
//додавання змінних попагінаціі//
/* const btnNextPg = document.querySelector('button.pagination-btn__next');
const btnPrewPg = document.querySelector('button.pagination-btn__prew');
btnNextPg.addEventListener ('click', nextPageCategory);
btnPrewPg.addEventListener ('click', prewPageCategory); */
// ------------------------<dropdown>
const myDropdown = document.getElementById('myDropdown');
const dropdownBtn = document.querySelector('.dropdownbtn');

dropdownBtn.addEventListener('click', myFunction);
dropdownBtn.addEventListener('blur', hideDropdown);

function myFunction() {
  myDropdown.classList.toggle('show');
  dropdownBtn.classList.toggle('active');
}

function hideDropdown() {
  myDropdown.classList.remove('show');
  dropdownBtn.classList.remove('active');
}
// -----------------------</dropdown>---------------------------

// container.insertAdjacentHTML('afterend', matkUp(results));
/* <button type="button" class="categories-list__btn category-content">Admin</button>; */
// -------------------------<category>---------------------------

exportCategories()
  .then(data => data.json())
  .then(results => {
    return results.results;
  })
  .then(results => {
    return getArraySections(results);
  })
  .then(resuls => {
    getCreateButtonCategory(resuls);
  });
//   ------------------------</category>--------------------------------

function getCreateButtonCategory(array) {
  if (window.matchMedia('screen and (max-width: 767px)').matches == true) {
    const mark = array
      .map(res => {
        return `<button type="button" class="categories-list__btn" data-category="section">${res}</button>`;
      })
      .join('');
    myDropdown.insertAdjacentHTML('afterbegin', mark);
  } else if (
    window.matchMedia('screen and (min-width: 768px) and (max-width: 1279px)')
      .matches == true
  ) {
    const newArray = array.splice(0, 3);
    const mark = newArray
      .map(res => {
        return `<button type="button" class="mainbtn" data-category="section">${res}</button>`;
      })
      .join('');
    container.insertAdjacentHTML('afterbegin', mark);

    const newMark = array
      .map(res => {
        return `<button type="button" class="categories-list__btn" data-category="section">${res}</button>`;
      })
      .join('');
    myDropdown.insertAdjacentHTML('afterbegin', newMark);
  } else if (
    window.matchMedia('screen and (min-width: 1280px)').matches == true
  ) {
    const newArray = array.splice(0, 6);
    const mark = newArray
      .map(res => {
        return `<button type="button" class="mainbtn" data-category="section">${res}</button>`;
      })
      .join('');
    container.insertAdjacentHTML('afterbegin', mark);
    const newMark = array
      .map(res => {
        return `<button type="button" class="categories-list__btn" data-category="section">${res}</button>`;
      })
      .join('');
    myDropdown.insertAdjacentHTML('afterbegin', newMark);
  }
}

function getArraySections(results) {
  const mark = results.map(res => {
    return res.display_name;
  });
  return mark;
}

// -------------------------------</functions galary>--------------------------

function getNewsCategory(e) {
  const element = e.target;
  if (!element.dataset.category) {
    return;
  }
  newList.innerHTML = '';
  fethNewsService.section = getRender(element.textContent.toLowerCase());
  fethNewsService.resetPage();
  serchArticlesCategory();
}

/* function nextPageCategory() {
  fethNewsService.incrementPage();
  serchArticlesCategory();
}

function prewPageCategory() {
  fethNewsService.descrementPage();
  serchArticlesCategory();
} */

function getRender(name) {
  let newName = name;
  const newString = name;
  let indexUmper = newString.indexOf('&');
  let indexSlesh = newString.indexOf('/');
  if (indexUmper !== -1) {
    newName = newString.replace('&', '%26');
    return newName;
  } else if (indexSlesh !== -1) {
    newName = newString.replace('/', '%2F');
    return newName;
  }
  return newName;
}

async function serchArticlesCategory() {
  return await fethNewsService
    .fetchNews()
    .then(data => data.json())
    .then(({ results /* num_results */ }) => {
      let ourDate = 0;
      arrCategoryElements.length = 0;

      if (selectedDate.selectedDates.length === 0) {
        // Если нужно выбирать автоматически сегодняшнюю дату
        // ourDate = selectedDate
        //   .formatDate(new Date(), 'Y-m-d')
        //   .split('-')
        //   .join('/');

        arrCategoryElements.push(...results);
        return results;
      } else {
        ourDate = selectedDate
          .formatDate(selectedDate.latestSelectedDateObj, 'Y-m-d')
          .split('-')
          .join('/');
      }

      const timeArr = results.filter(elem => {
        const date = elem.published_date.slice(0, 10).split('-').join('/');
        return date === ourDate;
      });
      

      arrCategoryElements.push(...timeArr);
      return timeArr;
    })
    .then(resolve => {
      resolveArray.length = 0;
      resolveArray.push(...resolve);
      let currentPage = 1;
      let rows = 8;
      displayList(resolve, rows, currentPage);
      displayPagination(resolve, rows);
      
      /* console.log(displayList(resolve, rows, currentPage)); */
      // newList.insertAdjacentHTML('afterbegin', createCardOnError('category'));
      /* newList.insertAdjacentHTML('afterbegin', createCards(resolve));  */
    })
    
    .catch(() => {
      newList.insertAdjacentHTML('afterbegin', createCardOnError('category'));
    });
}

btnPrewPg.addEventListener(`click`, onPrewBtn);
btnNextPg.addEventListener(`click`, onNextBtn);

//-------------------------------create cadr----------------------------------------

function createCards(arr) {
  let numberGridElement = 0;
  //   const mark = arr
  //     .map(el => {
  //       numberGridElement++;
  //       return createNewsCardCategory(el, numberGridElement);
  //     })
  //     .join('');
  const card = arr.reduce((markup, article) => {
      weatherContainer.style.display = 'block';
    numberGridElement++;
    let image = `https://cdn.create.vista.com/api/media/small/251043028/stock-photo-selective-focus-black-news-lettering`;
    if (article.multimedia !== null) {
      image = article.multimedia[2].url;
    }
    article = {
      image: image,
      section: article.section,
      title: article.title,
      description: article.abstract,
      date: article.published_date,
      url: article.url,
      id: article.slug_name,
    };
    return markup + createMostPopularNews(article, numberGridElement);
  }, '');


  return card;
}

// -------------------LacalStarage-------------------------------
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

//----------------------Pagination-------------------------------//

function displayList(arrData, rowPerPage, page) {
  /*  const postsEl = document.querySelector('.news-list'); */
  /* postsEl.innerHTML = ""; */
  newList.innerHTML = '';
  /* page--; */

  const start = rowPerPage * page;
  const end = start + rowPerPage;
  const paginatedData = arrData.slice(start, end);

  newList.insertAdjacentHTML('afterbegin', createCards(paginatedData));
}

function displayPagination(arrData, rowPerPage) {
  const pagesCount = Math.ceil(arrData.length / rowPerPage);
  newArrli.length = 0;
  for (let i = 0; i < pagesCount; i++) {
    const liEl = displayPaginationBtn(i + 1);

    newArrli.push(liEl);
  }
  let spliceArrray = null;

  if (newArrli.length < 5) {
    spliceArrray = [...newArrli];

    spliceArrray[0].classList.add(`pagination-btn--active`);
    ulEl.innerHTML = ``;
    ulEl.append(...spliceArrray);
  } else {
    spliceArrray = newArrli.slice(0, 3);
    spliceArrray[0].classList.add(`pagination-btn--active`);
    ulEl.innerHTML = ``;
    ulEl.append(...spliceArrray, `...`, newArrli[newArrli.length - 1]);
  }

  paginationEl.innerHTML = ``;
  paginationEl.appendChild(ulEl);
  ulEl.addEventListener(`click`, showPaginBtns);
}

function showPaginBtns(e) {
  const target = e.target;

  if (!target.classList.contains('pagination-btn')) {
    return;
  }
  createCardsOnCurrentBtn(target);
}

function createCardsOnCurrentBtn(element) {
  let numberLi = Number(element.textContent); //2
  let spliceArrray = null;

  if (numberLi === newArrli.length - 3) {
    ulEl.innerHTML = '';

    spliceArrray = [
      newArrli[newArrli.length - 3],
      newArrli[newArrli.length - 2],
      newArrli[newArrli.length - 1],
    ];

    ulEl.append(...spliceArrray);
    console.log(ulEl);
    paginationEl.innerHTML = ``;
    paginationEl.appendChild(ulEl);
    // spliceArrray = [...newArrli]; // 4 элемента-кнопки
  } else {
    spliceArrray = newArrli.slice(numberLi - 1, numberLi + 2);
  }

  if (!element.classList.contains('pagination-btn--active')) {
    const activeBtn = document.querySelector('.pagination-btn--active');
    activeBtn.classList.remove('pagination-btn--active');

    const currentPage = element.textContent;
    element.classList.add('pagination-btn--active');

    displayList(resolveArray, 8, currentPage);
  }

  ulEl.innerHTML = ``;

  if (newArrli.length < 5) {
    ulEl.append(newArrli[0], `...`, ...newArrli);
  } else if (newArrli.length - numberLi <= 4) {
    ulEl.append(
      newArrli[0],
      `...`,
      ...spliceArrray,
      newArrli[newArrli.length - 1]
    );
  } else {
    ulEl.append(
      newArrli[0],
      `...`,
      ...spliceArrray,
      `...`,
      newArrli[newArrli.length - 1]
    );
  }
}

function displayPaginationBtn(page) {
  const liEl = document.createElement('li');
  liEl.classList.add('pagination-btn');
  liEl.textContent = page;

  return liEl;
}

function onPrewBtn() {
  const activeBtn = document.querySelector(`.pagination-btn--active`);
  let prevActiveBtn = Number(activeBtn.textContent) - 2;
  if (Number(activeBtn.textContent) >= 2) {
    createCardsOnCurrentBtn(newArrli[prevActiveBtn]);
  }
}

function onNextBtn() {
  const activeBtn = document.querySelector(`.pagination-btn--active`);
  let nextActiveBtn = Number(activeBtn.textContent);
  if (Number(activeBtn.textContent) <= newArrli.length - 2) {
    createCardsOnCurrentBtn(newArrli[nextActiveBtn]);
  }
}

// ---------------------export--------------------------------------
export { newList, arrCategoryElements, createCards };
