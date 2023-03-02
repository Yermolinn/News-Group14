const openMenuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu');

openMenuBtn.addEventListener('click', onOpenMenuBtn);

function onOpenMenuBtn() {
  menu.classList.remove('is-hidden');
}
