export function createNewsCardCategory(arr) {
  return `<div class="news-card">
    <div class="top-wrap">
      <img
        src=${arr.multimedia[2].url}
        loading="lazy"
        width="288"
        height="395"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${arr.section}</p>
      </div>
      <button class="favourite">Add to favorite</button>
    </div>
    <div class="info">
      <h2 class="info-item">${arr.title}</h2>
      <p class="describe">${arr.abstract.slice(0, 60) + '...'}</p>
      <div class="lower-content">
        <p class="news-date">${arr.published_date
          .slice(0, 10)
          .replace('-', '/')}</p>
        <a class="news-link link" href="${arr.url}">Read more</a>
      </div>
    </div>
  </div>
`;
}
