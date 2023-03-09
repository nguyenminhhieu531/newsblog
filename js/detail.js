const articleId = parseInt(getQueryParam('id'));
console.log('articleId', articleId);

// if (!ARTICLES_SEEN.includes(articleId)) ARTICLES_SEEN.push(articleId);

let ARTICLES_SEEN = JSON.parse(localStorage.getItem('ARTICLES_SEEN')) || [];
let COMMENTS = JSON.parse(localStorage.getItem('COMMENTS')) || {};
let articleComments = COMMENTS[articleId] || [];

const elArticleTitle = document.getElementById('article-title');
const elArticlePublishDate = document.getElementById('article-publish-date');
const elArticleAuthor = document.getElementById('article-author');
const elArticleCategory = document.getElementById('article-category');
const elArticleThumb = document.getElementById('article-thumb');
const elArticleContent = document.getElementById('article-content');
const elComments = document.getElementById('comments');
const elMessageComment = document.getElementById('message-comment');
const btnPostComment = document.getElementById('btn-post-comment');
const inputCommentName = document.getElementById('comment-name');
const inputCommentMessage = document.getElementById('comment-message');
const relatedArticle = document.getElementById('related-article');
let parent = null;

renderCommentList(articleComments);

fetch(`${BASE_URL}articles/${articleId}`)
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    const article = res.data;
    elArticleTitle.innerText = article.title;
    elArticlePublishDate.innerText = article.publish_date;
    elArticleAuthor.innerText = article.author;
    elArticleCategory.innerText = article.category.name;
    elArticleCategory.parentElement.href = `category.html?id=${article.category_id}`;
    elArticleThumb.src = article.thumb;

    elArticleContent.innerHTML = article.content;
    document.querySelector('title').innerText = article.title;
  })
  .catch((error) => {
    window.location.href = '404.html';
  });

  // Bài viết liên quan
  fetch(`${BASE_URL}articles/popular?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    const articles = res.data;
    let contentHTML = '';
    articles.forEach((article) => {
      const pubDate = dayjs(article.publish_date).fromNow();
      contentHTML += `
          <article class="post">
            <figure class="post-thumb"><img src="${article.thumb}" alt=""></figure>
            <div class="text">
              <a href="detail.html?id=${article.id}">
                ${article.title}
              </a>
            </div>
            <div class="post-info">${pubDate}</div>
          </article>`;
    });
    relatedArticle.innerHTML = contentHTML;
  });


// call api
/**
 * fetch(xxxx)
 * .then()
 * .then() {
 *  // do du lieu chi tiet bai viet
 * luu id cua bai viet hien tai vao localstorage
 * kiem tra xem id da chua, neu chua co thi luu vao, da co khong xu ly
 * if (!ARTICLES_SEEN.includes(articleId)) ARTICLES_SEEN.push(articleId);
 * }
 *
 */

btnPostComment.addEventListener('click', () => {
  const name = inputCommentName.value.trim();
  const message = inputCommentMessage.value.trim();
  if (!name || !message) {
    alert('Vui lòng nhập đầy đủ tên và nội dung bình luận!');
  } else {
    const newComment = {
      id: createId(),
      name,
      message,
      datetime: dayjs().format('YYYY-MM-DD H:mm:ss'),
      articleId,
      parent,
    };
    console.log('newComment', newComment);
    COMMENTS = saveLocalComment(newComment);
    renderCommentList(COMMENTS[articleId]);
  }
});

elComments.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('btn-reply')) {
    parent = el.dataset.parent;
    elMessageComment.innerHTML = /* html */ `
    Phản hồi bình luận của 
    <span class="text-info">${parent}</span> 
    <span class="btn-remove-reply btn btn-sm btn-danger">X</span>`;
    btnPostComment.innerText = 'Gửi phản hồi';
  }
});

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('btn-remove-reply')) {
    parent = null;
    elMessageComment.innerHTML = '';
    btnPostComment.innerText = 'Gửi bình luận';
  }
});

function saveLocalComment(newComment) {
  let items = JSON.parse(localStorage.getItem('COMMENTS')) || {};
  if (newComment.parent) {
    // binh luan con
    // tìm vị trị của comment cha trong danh sách
    const idx = items[articleId].findIndex((item) => item.id === newComment.parent);
    if (items[articleId][idx].child) {
      // da co du lieu
      items[articleId][idx].child.unshift(newComment);
    } else {
      // chua co du lieu
      items[articleId][idx].child = [newComment];
    }
  } else {
    if (!items[articleId]) {
      items[articleId] = [newComment];
    } else {
      items[articleId].unshift(newComment);
    }
  }

  localStorage.setItem('COMMENTS', JSON.stringify(items));
  return items;
}

function renderCommentList(comments) {
  let html = '';
  comments.forEach((comment) => {
    html += renderCommentItem(comment);
  });
  elComments.innerHTML = html;
}

function renderCommentItem(comment) {
  let htmlCommentChild = '';
  if (comment.child) {
    comment.child.forEach((commentChild) => {
      htmlCommentChild += /* html */`
        <div class="media mt-4 mb-0 border-0 px-0 pb-0" style="grid-template-columns: 85px auto">
          <a class="comment-img" href="#url"><img src="assets/images/a1.jpg" class="img-responsive"
              width="100px" alt="placeholder image"></a>
          <div class="media-body comments-grid-right">
            <h5>${commentChild.name} - ${commentChild.id}</h5>
            <ul class="p-0 comment">
              <li class="">${commentChild.datetime}</li>
              <li>
                <a href="#comment" class="text-primary btn-reply" data-parent="${commentChild.id}">Reply</a>
              </li>
            </ul>
            <p>${comment.message}</p>
          </div>
        </div>`;
    });
  }

  return /* html */ `
  <div class="media-grid">
    <div class="media" style="grid-template-columns: 85px auto">
      <a class="comment-img" href="#url"><img src="assets/images/a1.jpg" class="img-responsive"
          width="100px" alt="placeholder image"></a>
      <div class="media-body comments-grid-right">
        <h5>${comment.name} - ${comment.id}</h5>
        <ul class="p-0 comment">
          <li class="">${comment.datetime}</li>
          <li>
            <a href="#comment" class="text-primary btn-reply" data-parent="${comment.id}">Reply</a>
          </li>
        </ul>
        <p>${comment.message}</p>
        ${htmlCommentChild}
      </div>
    </div>
  </div>`;
}
