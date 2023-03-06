export function createNewsCardCategory(arr, i) {
  return `<div class="news-card grid grid-item-${i}">
    <div class="top-wrap">
      <img
        src=${arr.multimedia[2].url}
        loading="lazy"
        width="288"
        height="395"
        class="news-img"
      />
      <p class="isread">Have read</p>
      <div class="category-wrap">
        <p class="top-text">${arr.section}</p>
      </div>
      <button class="favorite-btn">
        <span class="btn-text">Add to favorite</span>
        <svg class="icon-favorite-remove" width="16" height="16">
          <use href="./images/sprite.svg#icon-favorite-remove"></use>
        </svg>
         <svg class="icon-favorite-add hide-icon" width="16" height="16">
          <use href="./images/sprite.svg#icon-favorite-add"></use>
        </svg>
      </button>
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
