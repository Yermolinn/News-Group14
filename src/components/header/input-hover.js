const formBtn = document.querySelector('.form__btn');
const formInput = document.querySelector('.form__input');

if (window.matchMedia('(min-width: 320px)').matches) {
  formBtn.addEventListener('mouseover', () => {
    formInput.classList.toggle('shown');
    formBtn.classList.toggle('shown');
  });
}
