const elPagination = document.getElementById('pagination');
let currentPage = 1;
const PAGE_RANGE = 10;
let start = 1;
let end = PAGE_RANGE;

elPagination.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('page-numbers')) {
    if (el.id === 'btn-next') {
      currentPage++;
      if (currentPage % PAGE_RANGE === 1) {
        start = currentPage;
        end = start - 1 + PAGE_RANGE;
      }

      renderArticles(currentPage);
    } else if (el.id === 'btn-prev') {
      currentPage--;
      if (currentPage % PAGE_RANGE === 0) {
        end = currentPage;
        start = end - PAGE_RANGE + 1;
      }
      
      renderArticles(currentPage);
    } else {
      const page = parseInt(el.dataset.page);
      currentPage = page;
      renderArticles(page);
    }
  }
});

function renderPagination(page, total) {
  if (end > total) end = total;
  const isFirstPage = page === 1 ? 'disabled' : '';
  const isLastPage = page === total ? 'disabled' : '';
  let content = `<li><a class="page-numbers ${isFirstPage}" href="#" id="btn-prev">Prev</a></li>`;

  for (let i = start; i <= end; i++) {
    if (i === page) {
      content += `<li><span aria-current="page" class="page-numbers current">${i}</span></li>`;
    } else {
      content += `<li><a class="page-numbers" href="#" data-page="${i}">${i}</a></li>`;
    }
  }

  content += `<li><a class="page-numbers ${isLastPage}" href="#" id="btn-next">Next</a></li>`;
  elPagination.innerHTML = content;
}
