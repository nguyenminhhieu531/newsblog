

checkAuth();

const btnSubmit = document.getElementById('btn-submit');
// authentication - auth
// JWT - json web token

let passwordCurrent = document.getElementById('password_current');
let passwordNew = document.getElementById('password_new');
let passwordConfirmation = document.getElementById('password_confirmation');


btnSubmit.addEventListener('click', (e) => {
    const data = {
      password_current: passwordCurrent.value.trim(),
      password: passwordNew.value.trim(),
      password_confirmation: passwordConfirmation.value.trim(),
    };
  
    console.log('data', data.password_current);
  
    const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
    fetch(`${BASE_URL}auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if(data.password === '' || data.password_confirmation === ''){
          showToast('Mời bạn nhập thông tin để thay đổi password');
        }
        else{
          alert('Thay đổi mật khẩu thành công. Nhấn Ok để chuyển về trang đăng nhập');
          window.location.href = "login.html";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  