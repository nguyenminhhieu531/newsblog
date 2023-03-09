// Render Menu
fetch(`${BASE_URL}categories_news`)
  .then((response) => response.json())
  .then((res) => {
    const categories = res.data;
    let contentHTML = '';
    let contentOtherHTML = '';

    categories.forEach((category, index) => {
      // if (index < 2) {
      //   contentHTML += `
      //   <li class="nav-item">
      //     <a class="nav-link" href="category.html?id=${category.id}">${category.name}</a>
      //   </li>`;
      // } else {
      contentOtherHTML += `<a class="dropdown-item" href="category.html?id=${category.id}">${category.name}</a>`;
      // }
    });

    if (contentOtherHTML !== '') {
      contentOtherHTML = /* html */ `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Danh mục <span class="fa fa-angle-down"></span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          ${contentOtherHTML}
        </div>
      </li>`;
    }

    const favoriteMenu = `<li class="nav-item"><a class="nav-link" href="favorite.html">Yêu thích <span class="text-danger" id="total-liked">(0)</span></a></li>`;
    // const accountMenu = /* html */`
    // <li class="nav-item dropdown">
    //   <a class="nav-link dropdown-toggle" href="#" id="accountMenu" role="button" data-toggle="dropdown"
    //     aria-haspopup="true" aria-expanded="false">
    //     Tài khoản <span class="fa fa-angle-down"></span>
    //   </a>
    //   <div class="dropdown-menu" aria-labelledby="accountMenu">
    //     <a class="dropdown-item" href="login.html">Đăng nhập</a>
    //     <a class="dropdown-item" href="register.html">Đăng ký</a>
    //   </div>
    // </li>`;

    document.getElementById('main-menu').innerHTML = contentHTML + contentOtherHTML + favoriteMenu;
    document.getElementById('total-liked').innerText = `(${ARTICLES_LIKED.length})`;

    const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
    fetch(`${BASE_URL}auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const currentUser = res.data;
        if (currentUser) {
          renderAccountMenu(currentUser.name);
        } else {
          renderAccountMenu();
        }
      });
  });

function renderAccountMenu(username) {
  let subMenu = '';
  if (username) {
    subMenu = /*html */ `
    <a class="dropdown-item" href="list-article.html">Danh sách bài viết</a>
    <a class="dropdown-item" href="create-article.html">Thêm bài viết</a>
    <a class="dropdown-item" href="change-password.html">Thay đổi mật khẩu</a>
    <a class="dropdown-item" href="profile.html">Cập nhật thông tin</a>
    <a class="dropdown-item" href="#" id="btn-logout">Logout</a>`;
  } else {
    subMenu = /*html */ `
    <a class="dropdown-item" href="login.html">Đăng nhập</a>
    <a class="dropdown-item" href="register.html">Đăng ký</a>`;
  }

  const accountMenu = /* html */ `
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="accountMenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${username || 'Tài khoản'} <span class="fa fa-angle-down"></span>
    </a>
    <div class="dropdown-menu" aria-labelledby="accountMenu">${subMenu}</div>
  </li>`;

  document.getElementById('main-menu').innerHTML += accountMenu;
}
