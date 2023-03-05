import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import {
  newList,
  arrCategoryElements,
  createCards,
} from '../categories/categories';

const refs = {
  arrowUpEL: document.querySelector('.icon-arrow-up'),
  arrowDownEL: document.querySelector('.icon-arrow-down'),
  iconDateEl: document.querySelector('.icon-date'),
  inputFlPickr: document.querySelector('.flatpickr'),

  calendarWrapper: document.querySelector('.calendar-wrapper'),
};

// import('flatpickr/dist/themes / dark.css');

const options = {
  maxDate: 'today',
  dateFormat: 'd/m/Y',
  altFormat: 'd/m/Y',
  onReady: [function () {}],
  onOpen: [
    function (f, s, t) {
      toggleStyleInput();
    },
  ],
  onClose: [
    function (f, s, t) {
      toggleStyleInput();
    },
  ],
  onChange: [
    function (time, second, third) {
      if (arrCategoryElements.length === 0) {
        return;
      }

      let ourDate = third
        .formatDate(third.latestSelectedDateObj, 'Y-m-d')
        .split('-')
        .join('/');

      const timeArr = arrCategoryElements.filter(elem => {
        const date = elem.published_date.slice(0, 10).split('-').join('/');

        return date === ourDate;
      });

      newList.innerHTML = createCards(timeArr);
    },
  ],
};

function toggleStyleInput() {
  refs.arrowUpEL.classList.toggle('hide');
  refs.arrowDownEL.classList.toggle('hide');
  refs.iconDateEl.classList.toggle('icon-active');
  refs.inputFlPickr.classList.toggle('placeholder-white');
  refs.calendarWrapper.classList.toggle('calendar-open');
}

let selectedDate = flatpickr('#date-picker', options);
// selectedDate.clear();
refs.calendarWrapper.appendChild(selectedDate.calendarContainer);

export { selectedDate };

// СДЕЛАТЬ РЕСЕТ!!!!!!

//data-id="disableSpecific"
