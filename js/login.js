checkAuth();

let emailLogin = document.getElementById('email-login');
let emailPass = document.getElementById('email-pass');
const btnSubmit = document.getElementById('btn-submit');
// authentication - auth
// JWT - json web token


btnSubmit.addEventListener('click', () => {
  let email = emailLogin.value.trim();
  let password = emailPass.value.trim();
  const data = {
    email: email,
    password: password,
  };
  console.log(data);

  fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem(FRONTEND_ACCESS_TOKEN, res.access_token);
      if(res.access_token){
        alert("Đăng nhập thành công. Nhấn Ok để reload lại trang");
        location.reload();
      }
      else{
        showToast('Tài khoản hoặc mật khẩu không chính xác');
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

