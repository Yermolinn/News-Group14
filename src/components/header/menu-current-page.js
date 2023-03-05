const menuLinks = document.querySelectorAll('.menu__link');

const bodyId = document.querySelector('body').id;

for (let menuLink of menuLinks) {
  if (menuLink.dataset.active === bodyId) {
    menuLink.classList.add('.menu--current');
  }
}
