const formBtn = document.querySelector('.form__btn');
const formInput = document.querySelector('.form__input');

if (window.matchMedia('(min-width: 320px)').matches) {
  formBtn.addEventListener('focus', () => {
    formInput.classList.add('shown');
    formBtn.classList.add('shown');
  });
  formBtn.addEventListener('blur', () => {
    formInput.classList.remove('shown');
    formBtn.classList.remove('shown');
  });
}
