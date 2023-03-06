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
};

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
      createBtnCross(objFlatpickr);

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

let crossElem = undefined;

function createBtnCross(objFlatpickr) {
  if (typeof crossElem === 'undefined') {
    crossElem = document.createElement('button');

    crossElem.setAttribute('type', 'button');
    crossElem.classList.add('calendar-btn-cross');

    refs.inputDate.appendChild(crossElem);

    crossElem.addEventListener(
      'click',
      () => {
        objFlatpickr.clear();
        refs.inputDate.removeChild(
          document.querySelector('.calendar-btn-cross')
        );
        crossElem = undefined;
      },
      { once: true }
    );
  }
}

export { selectedDate };
