const menuLinks = document.querySelectorAll('.menu__link');

const bodyId = document.querySelector('body').id;

for (let menuLink of menuLinks) {
  const menuDiv = menuLink.firstElementChild;
  let menuDivArr = menuDiv.children;
  const iconArrow = menuLink.lastElementChild;

  if (menuLink.dataset.active === bodyId) {
    menuLink.classList.add('menu--current');
    menuDivArr[0].classList.add('menu__icon--current');
    menuDivArr[1].classList.add('menu-text--current');
    iconArrow.classList.add('icon--current');
  }
}
