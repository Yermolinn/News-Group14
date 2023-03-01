import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  arrowUp: document.querySelector('.icon-arrow-up'),
  arrowDown: document.querySelector('.icon-arrow-down'),
};
// import('flatpickr/dist/themes/dark.css');

let selectedDate = flatpickr('#date-picker', {
  maxDate: 'today',
  defaultDate: 'today',
  dateFormat: 'd/m/Y',
  onOpen: [
    function () {
      refs.arrowDown.classList.remove('hide');
      refs.arrowUp.classList.add('icons-active');
    },
  ],
});

{
  /* <div class="input-date">
  <svg class="icon-date" width="19" height="19">
    <use href="./images/sprite.svg#icon-date"></use>
  </svg>

  <input type="text" id="date-picker" class="flatpickr">
  
  <svg class="icon-arrow-down" width="9" height="9.14">
    <use href="./images/sprite.svg#icon-arrow-down"></use>
  </svg>

  <svg class="icon-arrow-up hide" width="9" height="9.14">
    <use href="./images/sprite.svg#icon-arrow-up"></use>
  </svg>
</div> */
}
