import { exportCategories } from './fetchCategoryList';
import { FethNewsService } from './fetchNewsCategory';

const container = document.querySelector('.wrap');
const fethNewsService = new FethNewsService();
container.addEventListener('click', getNewsCategory);

exportCategories()
  .then(data => data.json())
  .then(results => {
    return results.results;
  })
  .then(results => {
    container.insertAdjacentHTML('beforeend', matkUp(results));
  });
function matkUp(results) {
  const mark = results
    .map(res => {
      return `<button type="button" class ="categories__button">${res.display_name}</button>`;
    })
    .join('');
  return mark;
}
function getNewsCategory(e) {
  fethNewsService.section = e.target.textContent.toLowerCase();
  fethNewsService.resetPage();
  serchArticlesCategory();
}
function serchArticlesCategory() {
  fethNewsService
    .fetchNews()
    .then(data => data.json())
    .then(results => {
      console.log(results.results);
    });
}
