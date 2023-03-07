const CATEGORY_PARAPM = 'limit=8';
const ENDPOINT_CATEGORY = 'https://api.nytimes.com/svc/news/v3/content/all/';
const CATEGORY_KEY = 'api-key=ACLRvQCjQo6GX0rmeAKsofVnQwGUSZA5';

class FethNewsService {
  constructor() {
    this.section = '';
    this.page = 0;
  }

  async fetchNews() {
    const response = await fetch(
      `${ENDPOINT_CATEGORY}${this.section}.json?${CATEGORY_PARAPM}&offset=${this.page}&${CATEGORY_KEY}`
    );
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  /* descrementPage() {
    this.page -= 1;
    if (this.page <= 1) {
      this.page === 1;
    }
  } */

  resetPage() {
    this.page = 0;
  }
}
export { FethNewsService };
