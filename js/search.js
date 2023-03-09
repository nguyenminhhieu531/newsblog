const elSearchTitle = document.getElementById('search-title');

const keyword = getQueryParam('keyword');

renderArticles();
function renderArticles(page = 1) {
  fetch(`${BASE_URL}articles/search?q=${keyword}&limit=9&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const totalPage = res.meta.last_page;

      let contentHTML = '';
      articles.forEach((article) => {
        const pubDate = dayjs(article.publish_date).fromNow();
        let title = article.title;
        let description = article.description;
        const liked = ARTICLES_LIKED.includes(article.id) ? 'liked' : '';

        if (keyword) {
          const re = new RegExp(keyword, 'igm');
          title = title.replace(re, (mark) => `<mark>${mark}</mark>`);
          description = description.replace(re, (mark) => `<mark>${mark}</mark>`);
        }

        contentHTML += `
        <div class="col-lg-4 col-md-6 item mb-4">
          <div class="card h-100">
            <div class="card-header p-0 position-relative">
              <a href="${article.link}" class="zvn-article-thumb">
                <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                  alt="${article.title}">
              </a>
            </div>
            <div class="card-body blog-details">
              <span class="label-blue">${article.category.name}</span>
              <a href="${article.link}" class="blog-desc">${title}</a>
              <p class="mb-3">${description}</p>
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
                <i class="fa fa-heart icon-like ${liked}" aria-hidden="true" data-id="${article.id}"></i>
              </div>
            </div>
          </div>
        </div>`;
      });
      document.getElementById('articles').innerHTML = contentHTML;
      renderPagination(page, totalPage);
    });
}
