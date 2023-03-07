import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import('flatpickr/dist/themes/ dark.css');

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

  inputDate: document.querySelector('.input-date'),
  calendarWrapper: document.querySelector('.calendar-wrapper'),
  btnCross: document.querySelector('.calendar-btn-cross'),
};

const options = {
  disableMobile: 'true',
  appendTo: refs.calendarWrapper,
  maxDate: 'today',
  dateFormat: 'd/m/Y',
  altFormat: 'd/m/Y',
  onOpen: [
    function (fullDate, shortDate, objFlatpickr) {
      toggleStyleInput();
      objFlatpickr.element.addEventListener('click', onCalendarOpenClick);
    },
  ],
  onClose: [
    function (fullDate, shortDate, objFlatpickr) {
      toggleStyleInput();
      removeInputCalendarListener(objFlatpickr);
    },
  ],
  onChange: [
    function (fullDate, shortDate, objFlatpickr) {
      showBtnCross();

      if (arrCategoryElements.length === 0) {
        return;
      }

      if (objFlatpickr.latestSelectedDateObj !== undefined) {
        let ourDate = objFlatpickr
          .formatDate(objFlatpickr.latestSelectedDateObj, 'Y-m-d')
          .split('-')
          .join('/');

        const timeArr = arrCategoryElements.filter(elem => {
          const date = elem.published_date.slice(0, 10).split('-').join('/');
          return date === ourDate;
        });

        newList.innerHTML = createCards(timeArr);
      }
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
let counter = 0;

function onCalendarOpenClick() {
  counter += 1;

  if (counter % 2 === 0) {
    selectedDate.close();
  }
}

function removeInputCalendarListener(objFlatpickr) {
  objFlatpickr.element.removeEventListener('click', onCalendarOpenClick);
  counter = 0;
}

refs.btnCross.addEventListener('click', clearInputCalendar);

function clearInputCalendar(e) {
  selectedDate.clear();
  e.currentTarget.classList.add('visually-hidden');
}

function showBtnCross() {
  refs.btnCross.classList.remove('visually-hidden');
}

export { selectedDate };
