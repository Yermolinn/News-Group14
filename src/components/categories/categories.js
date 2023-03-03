import { exportCategories } from './fetchCategoryList';
import { FethNewsService } from './fetchNewsCategory';

const container = document.querySelector('.final-menu');
const fethNewsService = new FethNewsService();
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
    container.insertAdjacentHTML('afterbegin', getFirstElements(resuls));
    return resuls;
  })
  .then(res => {
    myDropdown.insertAdjacentHTML('afterbegin', getLastElements(res));
  });

//   ------------------------</category>--------------------------------

function getArraySections(results) {
  const mark = results.map(res => {
    return res.display_name;
  });
  return mark;
}

function getFirstElements(results) {
  const newArray = results.splice(0, 6);
  const mark = newArray
    .map(res => {
      return `<button type="button" class="mainbtn" data-category="section">${res}</button>`;
    })
    .join('');
  return mark;
}

function getLastElements(results) {
  const mark = results
    .map(res => {
      return `<button type="button" class="categories-list__btn" data-category="section">${res}</button>`;
    })
    .join('');
  return mark;
}

// -------------------------------</functions galary>--------------------------

function getNewsCategory(e) {
  const element = e.target;

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
      return results.results;
    });
}
