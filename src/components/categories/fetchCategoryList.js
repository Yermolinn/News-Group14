const ENDPOINT_LIST =
  'https://api.nytimes.com/svc/news/v3/content/section-list.json';
const CATEGORY_KEY = 'api-key=ACLRvQCjQo6GX0rmeAKsofVnQwGUSZA5';
export async function exportCategories() {
  const response = await fetch(`${ENDPOINT_LIST}?${CATEGORY_KEY}`);
  return response;
}
