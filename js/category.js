const elCategoryTitle = document.getElementById('category-title');

const categoryId = getQueryParam('id');

renderArticles();
function renderArticles(page = 1) {
  fetch(`${BASE_URL}categories_news/${categoryId}/articles?limit=10&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const totalPage = res.meta.last_page;

      let contentHTML = '';
      articles.forEach((article) => {
        elCategoryTitle.innerText = article.category.name;
        document.querySelector('title').innerText = `NewsBlog | ${article.category.name}`;
        const pubDate = dayjs(article.publish_date).fromNow();
        const liked = ARTICLES_LIKED.includes(article.id) ? 'liked' : '';

        contentHTML += `
        <div class="col-lg-6 mb-4">
          <div class="bg-clr-white hover-box h-100">
            <div class="row h-100">
              <div class="col-sm-5 position-relative">
                <a href="detail.html?id=${article.id}" class="image-mobile zvn-article-thumb h-100">
                  <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                    alt="${article.title}">
                </a>
              </div>
              <div class="col-sm-7 card-body blog-details align-self">
                <a href="detail.html?id=${article.id}" class="blog-desc">${article.title}</a>
                <div class="author align-items-center">
                  <img src="assets/images/a1.jpg" alt="" class="img-fluid rounded-circle" />
                  <ul class="blog-meta">
                    <li>
                      <a href="author.html">${article.author}</a>
                    </li>
                    <li class="meta-item blog-lesson">
                      <span class="meta-value">  
                        <span class="fa fa-clock-o"></span>
                        ${pubDate} 
                      </span>
                    </li>
                  </ul>
                  <i class="fa fa-heart icon-like ${liked}" aria-hidden="true" data-id="${article.id}" data-title="${article.title}"></i>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      });
      document.getElementById('articles').innerHTML = contentHTML;
      renderPagination(page, totalPage);
    })
    .catch((error) => {
      window.location.href = '404.html';
    });
}
