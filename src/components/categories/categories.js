import { exportCategories } from './fetchCategoryList';
import { FethNewsService } from './fetchNewsCategory';

import { selectedDate } from '../calendar/calendar';

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

async function getNewsCategory(e) {
  fethNewsService.section = e.target.textContent.toLowerCase();
  fethNewsService.resetPage();
  const a = await serchArticlesCategory();
  console.log(a);
}

async function serchArticlesCategory() {
  return await fethNewsService
    .fetchNews()
    .then(data => data.json())
    .then(({ results }) => {
      let ourDate = 0;

      if (selectedDate.selectedDates.length === 0) {
        ourDate = selectedDate
          .formatDate(new Date(), 'Y-m-d')
          .split('-')
          .join('/');
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
      return timeArr;
    });
}
