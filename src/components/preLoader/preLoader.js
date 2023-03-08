const mask = document.querySelector('.mask');

window.addEventListener('load', getRemuveLoader);

function getRemuveLoader() {
  mask.classList.add('.hide');
  setTimeout(() => {
    mask.remove();
  }, 600);
}
