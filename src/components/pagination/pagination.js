/* import { FethNewsService } from "../categories/fetchNewsCategory";
import { fethNewsService } from "../categories/categories";  */

//-----------Змінні для пагінації, що мають експортуватися-----------//
export const newArrli = [];
export  const paginationEl = document.querySelector('.pagination');
export const resolveArray = [];
export const ulEl = document.querySelector(`.pagination-list`);
export const btnNextPg = document.querySelector('.pagination-btn__next');
export const btnPrewPg = document.querySelector('.pagination-btn__prew');



//-----------функції пагінації-----------------------//


//---------функція що виводить 8 карток на сторінку(ключова)----//
 export function displayList(arrData, rowPerPage, page) {
  /*  const postsEl = document.querySelector('.news-list'); */
  /* postsEl.innerHTML = ""; */
  newList.innerHTML = '';
  /* page--; */

  const start = rowPerPage * page;
  const end = start + rowPerPage;
  const paginatedData = arrData.slice(start, end);

  newList.insertAdjacentHTML('afterbegin', createCards(paginatedData));
}

//-------------функція створює кнопки пагінації----------//
export function displayPagination(arrData, rowPerPage) {
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

//------------виводить активну кнопку-------------//

export function showPaginBtns(e) {
  const target = e.target;

  if (!target.classList.contains('pagination-btn')) {
    return;
  }
  createCardsOnCurrentBtn(target);
}

//-------------відповідає за логіку перемикання кнопок пагінації-------//

export function createCardsOnCurrentBtn(element) {
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

//---------безпосереднє створення кнопок пагінації(генерує лішки)-----//

export function displayPaginationBtn(page) {
  const liEl = document.createElement('li');
  liEl.classList.add('pagination-btn');
  liEl.textContent = page;

  return liEl;
}


//--------фунції функціоналу кнопок вперед та назад по пагінації------//

export function onPrewBtn() {
  const activeBtn = document.querySelector(`.pagination-btn--active`);
  let prevActiveBtn = Number(activeBtn.textContent) - 2;
  if (Number(activeBtn.textContent) >= 2) {
    createCardsOnCurrentBtn(newArrli[prevActiveBtn]);
  }
}

export function onNextBtn() {
  const activeBtn = document.querySelector(`.pagination-btn--active`);
  let nextActiveBtn = Number(activeBtn.textContent);
  if (Number(activeBtn.textContent) <= newArrli.length - 2) {
    createCardsOnCurrentBtn(newArrli[nextActiveBtn]);
  }
}


//-----------слухачі на кнопки вперед та назад пагінації--------//

/* btnPrewPg.addEventListener(`click`, onPrewBtn);
btnNextPg.addEventListener(`click`, onNextBtn); */