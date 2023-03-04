import LocalStorageService from '../LocalStorageService/LocalStorageService';
import { getNews } from '../ArticlesSearchAPI/ArticlesSearchAPI';

const axios = require('axios').default;
const ENDPOINT = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = 'api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ';

import { default as axios } from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export default class PixabayApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.perPage = 40;
    this.image_type = "photo";
    this.orientation = "horizontal";
    this.safesearch = true;
    this.onpage = 8;
  }


  async getNews() {
    const URL = `${ENDPOINT}?${API_KEY}&q=${this.searchQuery}`;
    const response = await axios.get(URL);
    console.log(response.data.response.docs);
    if (this.page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    this.nextPage();
    return response.data.response.docs;
  }
  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

const pixabayApiService = new PixabayApiService();
const formEl = document.getElementById('search-form');
const newsList = document.querySelector('.news-list');

formEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget;
  const value = formEl.elements.searchQuery.value.trim();
  pixabayApiService.searchQuery = value;

  try {
    const articles = await pixabayApiService.getNews();
    console.log(':ракета: ~ articles', articles);
    if (articles.length === 0) throw new Error('No data');
    const card = articles.reduce(
      (markup, article) => createNewsCard(article) + markup,
      ''
    );
    console.log(card);
    updateCard(card);
  } catch (err) {
    onError();
  } formEl.reset()
}
function updateCard(markup) {
  newsList.innerHTML = markup;
}
function onError(error) {
  console.error(error);
}
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
        src=
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