/* const key = 'f0202828d1c04f0ea9a14a62de794b57';
const main = document.querySelector ('main');

window.addEventListener ('load', function () {
  updateNews ();
});

async function updateNews () {
  const res = await fetch (
    `http://newsapi.org/v2/everything?domains=wsj.com&apiKey=${key}`,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const json = await res.json ();
  main.innerHTML = json.articles.map (createArticle).join ('\n');
}

function createArticle (article) {
  return `
    <div class="article">
      <a href="${article.url}"></a>
      <h2>${article.title}</h2>
      <img src="${article.urlToImg}" alt=""/>
      <p>${article.description}</p>
    </div>
  `;
} */


  
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});