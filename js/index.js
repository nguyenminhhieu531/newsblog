// Render Categories Featured
// fetch(`${BASE_URL}categories_news/featured?limit=4`)
//   .then((response) => response.json())
//   .then((res) => {
//     const categories = res.data;
//     let contentHTML = '';
//     const ICONS = ['fa fa-bath', 'fa fa-female', 'fa fa-cutlery', 'fa fa-pie-chart'];
//     categories.forEach((category, index) => {
//       contentHTML += `
//       <div class="col-lg-3 col-6 grids-feature mt-lg-0 mt-md-4 mt-3">
//         <a href="category.html?id=${category.id}">
//           <div class="area-box">
//             <span class="${ICONS[index]}"></span>
//             <h4 class="title-head">${category.name}</h4>
//           </div>
//         </a>
//       </div>`;
//     });
//     document.getElementById('categories-featured').innerHTML = contentHTML;
//   });

// Render Articles Latest
fetch(`${BASE_URL}articles?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const articles = res.data;

    let contentHTML = '';
    articles.forEach((article, index) => {
      const pubDate = dayjs(article.publish_date).fromNow();
      const liked = ARTICLES_LIKED.includes(article.id) ? 'liked' : '';

      contentHTML += `
      <div class="col-lg-4 col-md-6 mt-md-0 mt-4">
        <div class="top-pic${index + 1}" style="background: url(${
        article.thumb
      }) no-repeat center center; background-size: cover;">
          <div class="card-body blog-details">
            <a href="detail.html?id=${article.id}" class="blog-desc">${article.title}</a>
            <div class="author align-items-center">
              <img src="assets/images/a2.jpg" alt="" class="img-fluid rounded-circle" />
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
      </div>`;
    });

    document.getElementById('articles-latest').innerHTML = contentHTML;
  });

// Render Articles Popular
fetch(`${BASE_URL}articles/popular?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const articles = res.data;

    let contentHTML = '';
    articles.forEach((article, index) => {
      const pubDate = dayjs(article.publish_date).fromNow();
      const arrDesc = article.description.split(' ');
      let shortDesc = '';
      if (arrDesc.length <= 20) {
        shortDesc = article.description;
      } else {
        const arrShortDesc = arrDesc.slice(0, 20);
        shortDesc = arrShortDesc.join(' ');
        shortDesc += ' ...';
      }

      contentHTML += `
      <div class="col-lg-4 col-md-6 item mb-4">
        <div class="card h-100">
          <div class="card-header p-0 position-relative">
            <a href="detail.html?id=${article.id}" class="zvn-article-thumb">
              <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                alt="${article.title}">
            </a>
          </div>
          <div class="card-body blog-details">
            <span class="label-blue">${article.category.name}</span>
            <a href="detail.html?id=${article.id}" class="blog-desc line-clamp-2">${article.title}</a>
            <p class="mb-3">${shortDesc}</p>
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
              <i class="fa fa-heart icon-like" aria-hidden="true"  data-id="${article.id}" data-title="${article.title}"></i>
            </div>
          </div>
        </div>
      </div>`;
    });

    document.getElementById('articles-popular').innerHTML = contentHTML;
  });

// Render Articles General
let currentPage = 2;
const btnLoadMore = document.getElementById('btn-load-more');

btnLoadMore.addEventListener('click', () => {
  currentPage++;
  btnLoadMore.innerText = 'Đang tải ...';
  btnLoadMore.disabled = true;
  renderArticles(currentPage);
});

renderArticles(currentPage);
function renderArticles(page = 1) {
  fetch(`${BASE_URL}articles?limit=4&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const lastPage = res.meta.last_page;

      let contentHTML = '';
      articles.forEach((article) => {
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
      document.getElementById('articles-general').innerHTML += contentHTML;
      if (page === lastPage) {
        btnLoadMore.style.display = 'none';
      } else {
        btnLoadMore.innerText = 'Xem thêm';
        btnLoadMore.disabled = false;
      }
    });
}
