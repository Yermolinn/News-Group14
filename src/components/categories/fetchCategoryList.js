const ENDPOINT_LIST =
  'https://api.nytimes.com/svc/news/v3/content/section-list.json';
// const endpoint2 = 'https://api.nytimes.com/svc/news/v3/content/all/';
const CATEGORY_KEY = 'api-key=ACLRvQCjQo6GX0rmeAKsofVnQwGUSZA5';
// const CATEGORY_PARAPM = 'limit=8';

export async function exportCategories() {
  const response = await fetch(`${ENDPOINT_LIST}?${CATEGORY_KEY}`);
  return response;
}
