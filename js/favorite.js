console.log('ARTICLES_LIKED', ARTICLES_LIKED);
const elArticles = document.getElementById('articles');

ARTICLES_LIKED.forEach((articleId) => {
  fetch(`${BASE_URL}articles/${articleId}`)
    .then((response) => response.json())
    .then((res) => {
      const article = res.data;
      const pubDate = dayjs(article.publish_date).fromNow();
      const content = `
        <div class="col-lg-6 mb-4 article-item-liked" data-id="${article.id}">
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
                  <i class="fa fa-heart icon-like liked remove-liked" aria-hidden="true" data-id="${article.id}" data-title="${article.title}"></i>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      elArticles.innerHTML += content;
    });
});
