const formBtn = document.querySelector('.form__btn');
const formInput = document.querySelector('.form__input');

if (window.matchMedia('(min-width: 320px)').matches) {
  formBtn.addEventListener('click', () => {
    formInput.classList.add('shown');
    formBtn.classList.add('shown');
  });
  formBtn.addEventListener('click', () => {
    formInput.classList.remove('shown');
    formBtn.classList.remove('shown');
  });
}
