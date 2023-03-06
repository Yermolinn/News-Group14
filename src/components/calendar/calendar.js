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
  disableMobile: 'true',
  appendTo: refs.calendarWrapper,
  maxDate: 'today',
  dateFormat: 'd/m/Y',
  altFormat: 'd/m/Y',
  onReady: [function () {}],
  onOpen: [
    function (fullDate, shortDate, objFlatpickr) {
      toggleStyleInput();
      // console.dir(t);
      // onCalendarOpenClick();
      objFlatpickr.element.addEventListener('click', onCalendarOpenClick);
    },
  ],
  onClose: [
    function (f, s, objFlatpickr) {
      toggleStyleInput();
      removeInputCalendarListener(objFlatpickr);
    },
  ],
  onChange: [
    function (time, second, objFlatpickr) {
      if (arrCategoryElements.length === 0) {
        return;
      }

      let ourDate = objFlatpickr
        .formatDate(objFlatpickr.latestSelectedDateObj, 'Y-m-d')
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
// refs.calendarWrapper.appendChild(selectedDate.calendarContainer);

let counter = 0;

function onCalendarOpenClick() {
  counter += 1;
  console.log(counter);

  if (counter % 2 === 0) {
    selectedDate.close();
  }
}

function removeInputCalendarListener(objFlatpickr) {
  objFlatpickr.element.removeEventListener('click', onCalendarOpenClick);
  counter = 0;
}

export { selectedDate };

// СДЕЛАТЬ РЕСЕТ!!!!!!
