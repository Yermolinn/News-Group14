const links = document.querySelectorAll('.nav__link');

const bodyId = document.querySelector('body').id;

for (let link of links) {
  if (link.dataset.active === bodyId) {
    link.classList.add('current');
  }
}
