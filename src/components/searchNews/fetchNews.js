const ENDPOINT = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const API_KEY = "api-key=HR9YxGV98GGTmMcKHA5eY4Aer5nJgRvJ";

export async function getNews(query) {
const URL = `${ENDPOINT}?q=${query}&${API_KEY}`;

  return await fetch(URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
})
        
}





const formEl = document.getElementById('search-form');

formEl.addEventListener('submit', onSubmit);


function onSubmit(e) {
  e.preventDefault();
    const formEl = e.currentTarget;
    const value = formEl.elements.searchQuery.value.trim();
  getNews.query = value;
  getNews().finally(() => formEl.reset());
}