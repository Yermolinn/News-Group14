import { getNews } from '../ArticlesSearchAPI/ArticlesSearchAPI';
export function createNewsCard({
  headline,
  web_url,
  section_name,
  lead_paragraph,
  pub_date,
}) {
  return `<div class="news-card">
    <div class="top-wrap">
      <img
        src="./images/error-desktop.jpg"
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${section_name}</p>
      </div>
      <button class="favourite">Add to favorite</button>
    </div>
    <div class="info">
      <h2 class="info-item">${headline.main}</h2>
      <p class="describe">${lead_paragraph.slice(0, 60) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${pub_date.slice(0, 10).replace('-', '/')}</p>
        <a class="news-link link" href="${web_url}">Read more</a>
      </div>
    </div>
  </div>
`;
}

export async function fetchGallery() {
  const docs = await getNews(); // ПРОБЛЕМА!!!
  console.log('🚀 ~ docs', docs);
  if (docs.length === 0) throw new Error('No data');
  // if (docs.length < perPage) {
  //   loadMoreBtn.hide();
  //   Notify.info("We're sorry, but you've reached the end of search results.");
  // }

  const card = docs.reduce((markup, doc) => createGallery(doc) + markup, '');
  updateNews(card);
}

function addNews(markup) {
  newsList.insertAdjacentHTML('beforeend', markup);
}

export function updateNews(markup) {
  newsList.innerHTML = markup;
}
