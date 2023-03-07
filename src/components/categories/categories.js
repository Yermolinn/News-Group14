import { difference } from 'lodash';
import { exportCategories } from './fetchCategoryList';
import { FethNewsService } from './fetchNewsCategory';
import { createCardOnError } from './createCardOnError';
import { selectedDate } from '../calendar/calendar';
import { createNewsCardCategory } from './newCardCategory';
const container = document.querySelector('.final-menu');

const arrCategoryElements = [];

const fethNewsService = new FethNewsService();
const newList = document.querySelector('.news-list');
container.addEventListener('click', getNewsCategory);

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

async function getNewsCategory(e) {
  const element = e.target;
  if (!element.dataset.category) {
    return;
  }
  newList.innerHTML = '';
  fethNewsService.section = getRender(element.textContent.toLowerCase());
  fethNewsService.resetPage();
  await serchArticlesCategory();
}

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
    .then(({ results }) => {
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
      console.log(resolve);
      // newList.insertAdjacentHTML('afterbegin', createCardOnError('category'));
      newList.insertAdjacentHTML('afterbegin', createCards(resolve));
    })
    .catch(() => {
      newList.insertAdjacentHTML('afterbegin', createCardOnError('category'));
    });
}

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
    numberGridElement++;
    return markup + createNewsCardCategory(article, numberGridElement);
  }, '');
  console.log(card);
  return card;
}

export { newList, arrCategoryElements, createCards };
