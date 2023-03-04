import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// import { getNewsCategory } from '../categories/categories';

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
  onReady: [],
  onOpen: [
    function () {
      refs.arrowUpEL.classList.remove('hide');
      refs.arrowDownEL.classList.add('hide');
      refs.iconDateEl.classList.add('icon-active');
      refs.inputFlPickr.classList.add('placeholder-white');
      refs.calendarWrapper.classList.add('calendar-open');
    },
  ],
  onClose: [
    function () {
      refs.arrowUpEL.classList.add('hide');
      refs.arrowDownEL.classList.remove('hide');
      refs.iconDateEl.classList.remove('icon-active');
      refs.inputFlPickr.classList.remove('placeholder-white');
      refs.calendarWrapper.classList.remove('calendar-open');
    },
  ],
  onChange: [
    async function (time, second, third) {
      console.log(time);
      console.log(second);
      console.log(third);

      // console.log(data);
      // const newArr = data.map(elem => {
      //   console.log(elem);
      // });
    },
  ],
};

let selectedDate = flatpickr('#date-picker', options);

refs.calendarWrapper.insertAdjacentElement(
  'beforeend',
  selectedDate.calendarContainer
);

// getNewsCategory();
