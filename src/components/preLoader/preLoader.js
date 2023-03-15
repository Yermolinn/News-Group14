const mask = document.querySelector('.mask');

window.addEventListener('load', getRemuveLoader, { once: true });

export default function getRemuveLoader() {
  mask.classList.remove('visually-hidden');
  setTimeout(() => {
    mask.classList.add('visually-hidden');
  }, 600);
}
