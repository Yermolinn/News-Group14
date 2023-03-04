import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { qweqwe } from '../categories/categories';

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
  // defaultDate: 'today',
  dateFormat: 'd/m/Y',
  altFormat: 'd/m/Y',
  onReady: [function (first, second) {}],
  onOpen: [
    function () {
      toggleStyleInput();
    },
  ],
  onClose: [
    function () {
      toggleStyleInput();
    },
  ],
  onChange: [function (time, second, third) {}],
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
refs.calendarWrapper.insertAdjacentElement(
  'beforeend',
  selectedDate.calendarContainer
);

// let dateqwqe = selectedDate

export { selectedDate };
