const readMore = document.querySelector('.news-link');

let currentId = 0;
const STORAGE_KEY_2 = 'read';
const alreadyReadArray = [];
readMore.addEventListener('click', addToRead);

function addToRead() {
  let dateOfRead = new Date()
    .toLocaleDateString({
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');
  const item = {
    read: {
      [`${dateOfRead}`]: [
        {
          name: document.querySelector('.info-item').textContent, // refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.firstElementChild.textContent
          URL: document.querySelector('.news-link').getAttribute('href'), //    refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.getAttribute('href'
          describe: document.querySelector('.describe').textContent, //refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.childNodes[3].textContent
          date: document.querySelector('.news-date').textContent, //    refs.addToFavoriteBtn.parentElement.parentElement.lastElementChild.lastElementChild.firstElementChild.textContent
          category: document.querySelector('.top-text').textContent, //refs.addToFavoriteBtn.previousElementSibling.firstElementChild.textContent
          photo: document.querySelector('.top-wrap img').getAttribute('src'), //refs.addToFavoriteBtn.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute("src")
          currentId,
        },
      ],
    },
  };

  currentId += 1;
  localStorageService.save(STORAGE_KEY_2, item);
}
