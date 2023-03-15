/* import { FethNewsService } from "../categories/fetchNewsCategory";
import { fethNewsService } from "../categories/categories";  */

import { newList, createCards } from '../categories/categories';

import { render } from '../mostPopular/mostPopular';
import { renderCards } from '../articlesSearch/articlesSearch';

//-----------Змінні для пагінації, що мають експортуватися-----------//
const newArrli = [];
const paginationEl = document.querySelector('.pagination');
const resolveArray = [];
const ulEl = document.querySelector(`.pagination-list`);
const btnNextPg = document.querySelector('.pagination-btn__next');
const btnPrewPg = document.querySelector('.pagination-btn__prew');

const LEFT_THREE_DOTS = displayPaginationBtn('...');
LEFT_THREE_DOTS.classList.add('left-three-dots');

const RIGHT_THREE_DOTS = displayPaginationBtn('...');
RIGHT_THREE_DOTS.classList.add('right-three-dots');

let acumulator = null;

//-----------функції пагінації-----------------------//

let numberPaginationActiveBtn = 0;

btnPrewPg.addEventListener(`click`, onPrewBtn);
btnNextPg.addEventListener(`click`, onNextBtn);

// ---------------------New-Code-------------------

function startGeneratePagination(resolve, rows, currentPage) {
  displayList(resolve, rows, currentPage);
  displayPagination(resolve, rows);
}

function searchPagination(arrData, rowPerPage, page) {
  newList.innerHTML = '';
  const start = rowPerPage * (page - 1);
  const end = start + rowPerPage;
  acumulator = 'search';

  if (end > arrData.length) {
    const paginatedData = arrData.slice(start);
    newList.insertAdjacentHTML('afterbegin', renderCards(paginatedData));
  } else {
    const paginatedData = arrData.slice(start, end);
    newList.insertAdjacentHTML('afterbegin', renderCards(paginatedData));
  }
}

function mostPopularPagination(arrData, rowPerPage, page) {
  newList.innerHTML = '';
  const start = rowPerPage * (page - 1);
  const end = start + rowPerPage;
  acumulator = 'popular';

  if (end > arrData.length) {
    const paginatedData = arrData.slice(start);
    newList.insertAdjacentHTML('afterbegin', render(paginatedData));
  } else {
    const paginatedData = arrData.slice(start, end);
    newList.insertAdjacentHTML('afterbegin', render(paginatedData));
  }
}

//---------функція що виводить 8 карток на сторінку(ключова)----//

function displayList(arrData, rowPerPage, page) {
  newList.innerHTML = '';
  const start = rowPerPage * (page - 1);
  const end = start + rowPerPage;
  acumulator = 'categories';

  if (end > arrData.length) {
    const paginatedData = arrData.slice(start);
    newList.insertAdjacentHTML('afterbegin', createCards(paginatedData));
  } else {
    const paginatedData = arrData.slice(start, end);
    newList.insertAdjacentHTML('afterbegin', createCards(paginatedData));
  }
}

//-------------функція створює кнопки пагінації----------//
function displayPagination(arrData, rowPerPage) {
  const pagesCount = Math.ceil(arrData.length / rowPerPage);
  numberPaginationActiveBtn = 0;

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
    spliceArrray = newArrli.slice(0, 4);
    spliceArrray[0].classList.add(`pagination-btn--active`);
    ulEl.innerHTML = ``;
    ulEl.append(
      ...spliceArrray,
      RIGHT_THREE_DOTS,
      newArrli[newArrli.length - 1]
    );
  }

  //---------Початкове блокування кнопки "назад" для пагінації-----
  btnPrewPg.disabled = true;
  btnNextPg.disabled = false;
  //----------

  paginationEl.innerHTML = ``;
  paginationEl.appendChild(ulEl);
  ulEl.addEventListener(`click`, showPaginBtns);
}

//------------виводить активну кнопку-------------//

function showPaginBtns(e) {
  const target = e.target;

  if (!target.classList.contains('pagination-btn')) {
    return;
  }
  createCardsOnCurrentBtn(target);
}

//-------------відповідає за логіку перемикання кнопок пагінації-------//

function createCardsOnCurrentBtn(element) {
  //-------логіка натискання на три крапки--------

  const activeBtnForThreeDots =
    Number(document.querySelector('.pagination-btn--active').textContent) - 1;
  if (element.classList.contains('right-three-dots')) {
    element = newArrli[activeBtnForThreeDots + 4];
  } else if (element.classList.contains('left-three-dots')) {
    element = newArrli[activeBtnForThreeDots - 3];
  }

  let numberLi = Number(element.textContent);
  let spliceArrray = null;

  ulEl.innerHTML = ``;

  //--------Блокування кнопок вперед та назад--------

  if (numberLi === 1) {
    btnPrewPg.disabled = true;
  } else if (numberLi === newArrli.length) {
    btnPrewPg.disabled = false;
    btnNextPg.disabled = true;
  } else if (numberLi > 1 && numberLi !== newArrli.length) {
    btnPrewPg.disabled = false;
    btnNextPg.disabled = false;
  }

  //--------Логіка виведення кнопок до ul

  if (newArrli.length < 5) {
    ulEl.append(...newArrli);
  } else if (numberLi === 1) {
    spliceArrray = [newArrli[0], newArrli[1], newArrli[2], newArrli[3]];
    ulEl.append(
      ...spliceArrray,
      RIGHT_THREE_DOTS,
      newArrli[newArrli.length - 1]
    );
  } else if (numberLi === 2 || numberLi === 3) {
    spliceArrray = [newArrli[0], newArrli[1], newArrli[2], newArrli[3]];
    ulEl.append(
      ...spliceArrray,
      RIGHT_THREE_DOTS,
      newArrli[newArrli.length - 1]
    );
  } else if (newArrli.length - numberLi < 4) {
    spliceArrray = [
      newArrli[newArrli.length - 4],
      newArrli[newArrli.length - 3],
      newArrli[newArrli.length - 2],
      newArrli[newArrli.length - 1],
    ];
    ulEl.append(newArrli[0], LEFT_THREE_DOTS, ...spliceArrray);
  } else {
    spliceArrray = newArrli.slice(numberLi - 1, numberLi + 2);
    ulEl.append(
      newArrli[0],
      LEFT_THREE_DOTS,
      ...spliceArrray,
      RIGHT_THREE_DOTS,
      newArrli[newArrli.length - 1]
    );
  }

  const previousActiveBtn = newArrli[numberPaginationActiveBtn];
  const activeBtn = newArrli[numberLi - 1];

  // Перевірка на активний елемент
  if (!element.classList.contains('pagination-btn--active')) {
    previousActiveBtn.classList.remove('pagination-btn--active');
    activeBtn.classList.add('pagination-btn--active');
    numberPaginationActiveBtn = numberLi - 1;
    currentPage = element.textContent;
  } else return;

  if (acumulator === 'categories') {
    displayList(resolveArray, 8, currentPage);
  } else if (acumulator === 'search') {
    searchPagination(resolveArray, 8, currentPage);
  } else {
    mostPopularPagination(resolveArray, 8, currentPage);
  }
}

//---------безпосереднє створення кнопок пагінації(генерує лішки)-----//

function displayPaginationBtn(page) {
  const liEl = document.createElement('li');
  liEl.classList.add('pagination-btn');
  liEl.textContent = page;

  return liEl;
}

//--------фунції функціоналу кнопок вперед та назад по пагінації------//

function onPrewBtn() {
  const activeBtn = document.querySelector('.pagination-btn--active'); //2
  const numberActivBtn = Number(activeBtn.textContent); //2
  let prevActiveBtn = numberActivBtn - 1;

  if (numberActivBtn >= 2) {
    createCardsOnCurrentBtn(newArrli[prevActiveBtn - 1]);
  } else return;
}

function onNextBtn() {
  const activeBtn = document.querySelector(`.pagination-btn--active`);
  const numberActivBtn = Number(activeBtn.textContent);
  let nextActiveBtn = numberActivBtn;

  if (numberActivBtn <= newArrli.length - 1) {
    createCardsOnCurrentBtn(newArrli[nextActiveBtn]);
  } else return;
}

//-----------слухачі на кнопки вперед та назад пагінації--------//

export {
  resolveArray,
  startGeneratePagination,
  mostPopularPagination,
  displayPagination,
  searchPagination,
};
