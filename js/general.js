const BASE_URL = 'https://apiforlearning.zendvn.com/api/v2/';
const FRONTEND_ACCESS_TOKEN = 'FRONTEND_ACCESS_TOKEN';

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('vi');

let ARTICLES_LIKED = JSON.parse(localStorage.getItem('ARTICLES_LIKED')) || [];

document.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('icon-like')) {
    const id = parseInt(el.dataset.id);
    const title = el.dataset.title;
    console.log(title);
    if (ARTICLES_LIKED.includes(id)) {
      el.classList.remove('liked');
      ARTICLES_LIKED = ARTICLES_LIKED.filter((articleId) => articleId !== id);
      if (el.classList.contains('remove-liked')) {
        el.closest('.article-item-liked').remove();
      }
      showToast(`Đã bỏ yêu thích bài viết "${title}"`);
    } else {
      el.classList.add('liked');
      ARTICLES_LIKED.push(id);
      showToast(`Đã yêu thích bài viết "${title}"`);
    }
    localStorage.setItem('ARTICLES_LIKED', JSON.stringify(ARTICLES_LIKED));
    document.getElementById('total-liked').innerText = `(${ARTICLES_LIKED.length})`;
  }

  if (el.id === 'btn-logout') {
    const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
    fetch(`${BASE_URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        localStorage.removeItem(FRONTEND_ACCESS_TOKEN);
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function checkAuth() {
  const token = localStorage.getItem(FRONTEND_ACCESS_TOKEN);
  if (token) {
    fetch(`${BASE_URL}auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.err) {
          window.location.href = 'index.html';
        }
      });
  }
}

function getQueryParam(key) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}

function showToast(message) {
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
  }).showToast();
}

function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}
