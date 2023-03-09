checkAuth();

const btnSubmit = document.getElementById("btn-submit");
// authentication - auth
// JWT - json web token

let nameProfile = document.getElementById("name-profile");
let phoneProfile = document.getElementById("phone-profile");
let addressProfile = document.getElementById("address-profile");


// Lấy thông tin từ form đăng ký chuyển sang form cập nhập thông tin
const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
fetch(`${BASE_URL}auth/me`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((res) => {
    // console.log(res.data);
    nameProfile.value = res.data.name;
    phoneProfile.value = res.data.phone;
    addressProfile.value = res.data.address;
  });


  // Nút submit
btnSubmit.addEventListener("click", (e) => {
  let name = nameProfile.value;
  let phone = phoneProfile.value;
  let address = addressProfile.value;
  const data = {
    name: name,
    phone: phone,
    address: address,
  };
  console.log("data", data);

  const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
  fetch(`${BASE_URL}auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      alert('Cập nhập thông tin thành công');
      alert('Nhấn ok để reload lại trang');
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
});
