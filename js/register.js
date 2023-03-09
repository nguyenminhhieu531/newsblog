checkAuth();

const btnSubmit = document.getElementById('btn-submit');

let nameRegister = document.getElementById('name-register');
let emailRegister = document.getElementById('email-register');
let phoneRegister = document.getElementById('phone-register');
let addressRegister = document.getElementById('address-register');
let passRegister = document.getElementById('pass-register');

btnSubmit.addEventListener('click', () => {
  let name = nameRegister.value.trim();
  let email = emailRegister.value.trim();
  let password = passRegister.value.trim();
  let phone = phoneRegister.value.trim();
  let address = addressRegister.value.trim();
  const data = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    address: address
    // name: 'Hieu Minh Nguyen',
    // email: 'minhhieu20021999531@gmail.com',
    // password: 'minhhieu20021999',
    // phone: '0329824531',
    // address: 'Quận 9',
  };
  console.log(data);

  fetch(`${BASE_URL}users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }
        ),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          localStorage.setItem(FRONTEND_ACCESS_TOKEN, res.access_token);
          if(res.access_token){
            alert("Đăng ký thành công. Nhấn Ok để chuyển về trang đăng nhập");
            window.location.href = "login.html";
          }
          else{
            alert('Vui lòng nhập đầy đủ thông tin để đăng ký!');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
