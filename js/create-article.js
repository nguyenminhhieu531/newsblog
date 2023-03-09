checkAuth();

let editor;
ClassicEditor.create(document.querySelector("#article-content"))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

const btnSubmit = document.getElementById("btn-submit");
// authentication - auth
// JWT - json web token

let articalTitle = document.getElementById("artical-title");
let articleDescription = document.getElementById("article-description");
let articleContent = document.getElementById("article-content");

let articalThum = document.getElementById("artical-thum");
let btnImageRandom = document.getElementById("btn-Image-Random");

let urlImage;
let imageRandom;
btnImageRandom.addEventListener("click", function(){
  imageRandom = Math.floor(Math.random() * 1000);
  urlImage = `https://picsum.photos/id/${imageRandom}/1280/720`;
  articalThum.src = urlImage;
  console.log(urlImage);
});

btnSubmit.addEventListener("click", () => {
  let title = articalTitle.value.trim();
  let description = articleDescription.value.trim();
  // let content = articleContent.value.trim();
  const data = {
    title: title,
    description: description,
    content: editor.getData(),
    thumb: urlImage,
    category_id: 1,
  };
  console.log(urlImage);

  const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
  fetch(`${BASE_URL}articles/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data);
      console.log(res);
      if(data.title === '' || data.content === '' || data.description === ''){
        showToast("Mời bạn nhập đầy đủ thông tin bài viết");
      }
      else{
        window.location.href = `category.html?id=${data.category_id}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
