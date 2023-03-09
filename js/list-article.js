checkAuth();

const bodyArticle = document.getElementById("tbody-article");
// authentication - auth
// JWT - json web token

// Lấy thông tin từ form đăng ký chuyển sang form cập nhập thông tib
const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
fetch(`${BASE_URL}articles/my-articles`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    const articles = res.data;
    console.log("articles", articles);
    let contentHTML = "";
    articles.forEach((article, index) => {
      const pubDate = dayjs(article.publish_date).fromNow();
      contentHTML += `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${articles[index].title}</td>
      <td>Kích hoạt</td>
      <td>
        <button class="btn-danger btn-outline"><i class="fa-regular fa-trash-can"></i></button>
      </td>
    </tr>`;
    });
    bodyArticle.innerHTML = contentHTML;
  });
