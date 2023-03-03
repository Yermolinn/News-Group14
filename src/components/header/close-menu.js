const closeMenuBtn = document.querySelector('.menu__close-icon');
const menu = document.querySelector('.menu');

closeMenuBtn.addEventListener('click', onCloseMenuBtn);
function onCloseMenuBtn() {
  menu.classList.add('is-hidden');
}
