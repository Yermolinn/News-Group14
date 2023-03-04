import { difference } from 'lodash';
import { exportCategories } from './fetchCategoryList';
import { FethNewsService } from './fetchNewsCategory';
import { createNewsCardCategory } from './newCardCategory';
const container = document.querySelector('.final-menu');
const fethNewsService = new FethNewsService();
const newList = document.querySelector('.news-list');
container.addEventListener('click', getNewsCategory);

// ------------------------<dropdown>
const myDropdown = document.getElementById('myDropdown');
const dropdownBtn = document.querySelector('.dropdownbtn');
dropdownBtn.addEventListener('click', myFunction);
function myFunction() {
  myDropdown.classList.toggle('show');
  dropdownBtn.classList.toggle('active');
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
  if (
    window.matchMedia('screen and (min-width:480px) and (max-width: 767px)')
      .matches == true
  ) {
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


function matkUp(results) {
  const mark = results
    .map(res => {
      return `<button type="button" class ="categories__button">${res.display_name}</button>`;
    })
    .join('');
  return mark;
}

function getNewsCategory(e) {
  const element = e.target;
  newList.innerHTML = '';
  if (!element.dataset.category) {
    return;
  }
  fethNewsService.section = element.textContent.toLowerCase();
  fethNewsService.resetPage();
  serchArticlesCategory();
}

export async function serchArticlesCategory() {
  await fethNewsService
    .fetchNews()
    .then(data => data.json())
    .then(results => {
      console.log(results.results);
      return results.results;
    })
    .then(resolve => {
      newList.insertAdjacentHTML('afterbegin', createCards(resolve));
    });
}

//-------------------------------create cadr----------------------------------------

function createCards(arr) {
  const mark = arr
    .map(el => {
      return createNewsCardCategory(el);
    })
    .join('');
  return mark;
}
