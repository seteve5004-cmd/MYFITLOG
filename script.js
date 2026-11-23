// FITLOG 메인 페이지의 간단한 클릭 기능

// 화면 아래쪽에 안내 메시지를 보여주는 함수
function showMessage(message) {
  let toast = document.querySelector(".toast");

  // 안내창이 아직 없으면 새로 만듭니다.
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  // 2초 뒤 안내창을 숨깁니다.
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

// 검색창 열기와 닫기
const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", function () {
  searchPanel.classList.toggle("show");

  if (searchPanel.classList.contains("show")) {
    searchInput.focus();
  }
});

// 검색 버튼을 누르면 상품 이름을 확인합니다.
document.getElementById("searchSubmit").addEventListener("click", function () {
  const keyword = searchInput.value.trim();

  if (keyword === "") {
    showMessage("검색어를 입력해 주세요.");
    return;
  }

  const products = document.querySelectorAll(".product-card");
  let found = false;

  products.forEach(function (product) {
    const name = product.dataset.name;

    if (name.includes(keyword)) {
      found = true;
      product.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  if (found) {
    showMessage("검색한 상품을 찾았습니다.");
  } else {
    showMessage("일치하는 상품이 없습니다. 다른 검색어를 입력해 주세요.");
  }
});

// 엔터 키로도 검색할 수 있도록 합니다.
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.getElementById("searchSubmit").click();
  }
});

// 장바구니 버튼은 화면 안내를 보여줍니다.
document.getElementById("cartButton").addEventListener("click", function () {
  showMessage("장바구니 기능은 준비 중입니다.");
});

// 로그인 창에 필요한 HTML 요소를 가져옵니다.
const loginButton = document.getElementById("loginButton");
const loginOverlay = document.getElementById("loginOverlay");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

// 세션 스토리지에 로그인 정보가 있는지 확인합니다.
function checkLogin() {
  const savedEmail = sessionStorage.getItem("loginEmail");

  if (savedEmail !== null) {
    loginButton.textContent = "LOGOUT";
  } else {
    loginButton.textContent = "LOGIN";
  }
}

// 로그인 버튼을 누르면 로그인 창을 열거나 로그아웃합니다.
loginButton.addEventListener("click", function () {
  const savedEmail = sessionStorage.getItem("loginEmail");


  // ===== 회원가입 기능 =====
const signupOverlay = document.getElementById("signupOverlay");
const signupClose = document.getElementById("signupClose");
const signupForm = document.getElementById("signupForm");
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupPasswordCheck = document.getElementById("signupPasswordCheck");
const signupAgree = document.getElementById("signupAgree");

// 저장된 회원 목록을 가져옵니다. (없으면 빈 배열)
function getMembers() {
  const saved = localStorage.getItem("members");

  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

// 로그인 창의 "회원가입" 글자를 누르면 회원가입 창을 엽니다.
document.getElementById("goSignup").addEventListener("click", function () {
  loginOverlay.classList.remove("show");
  signupOverlay.classList.add("show");
  signupName.focus();
});

// 회원가입 창의 "로그인" 글자를 누르면 로그인 창으로 돌아갑니다.
document.getElementById("goLogin").addEventListener("click", function () {
  signupOverlay.classList.remove("show");
  loginOverlay.classList.add("show");
  loginEmail.focus();
});

// X 버튼을 누르면 회원가입 창을 닫습니다.
signupClose.addEventListener("click", function () {
  signupOverlay.classList.remove("show");
});

// 회원가입 창 바깥쪽을 누르면 창을 닫습니다.
signupOverlay.addEventListener("click", function (event) {
  if (event.target === signupOverlay) {
    signupOverlay.classList.remove("show");
  }
});

// 회원가입 정보를 검사하고 저장합니다.
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  const passwordCheck = signupPasswordCheck.value;

  if (name === "") {
    showMessage("이름을 입력해 주세요.");
    signupName.focus();
    return;
  }

  // 이메일 형식인지 확인합니다.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showMessage("올바른 이메일 주소를 입력해 주세요.");
    signupEmail.focus();
    return;
  }

  // 비밀번호 규칙을 확인합니다. (로그인과 같은 규칙)
  const alphabetCount = (password.match(/[a-zA-Z]/g) || []).length;
  const specialPattern = /[^a-zA-Z0-9\s]/;

  if (alphabetCount < 8 || !specialPattern.test(password)) {
    showMessage("비밀번호는 영문 8자 이상과 특수문자 1개 이상이 필요합니다.");
    signupPassword.focus();
    return;
  }

  // 비밀번호와 비밀번호 확인이 같은지 확인합니다.
  if (password !== passwordCheck) {
    showMessage("비밀번호가 서로 다릅니다. 다시 확인해 주세요.");
    signupPasswordCheck.focus();
    return;
  }

  if (!signupAgree.checked) {
    showMessage("이용약관에 동의해 주세요.");
    return;
  }

  // 이미 가입된 이메일인지 확인합니다.
  const members = getMembers();
  const alreadyJoined = members.some(function (item) {
    return item.email === email;
  });

  if (alreadyJoined) {
    showMessage("이미 가입된 이메일입니다.");
    signupEmail.focus();
    return;
  }

  // 회원 정보를 저장합니다. (과제용이라 브라우저에만 저장됩니다.)
  members.push({ name: name, email: email, password: password });
  localStorage.setItem("members", JSON.stringify(members));

  signupForm.reset();
  signupOverlay.classList.remove("show");
  loginOverlay.classList.add("show");
  loginEmail.value = email;
  loginPassword.focus();
  showMessage("회원가입이 완료되었습니다. 로그인해 주세요!");
});


==================================================
[script.js 수정 ②] (선택) 가입한 회원만 로그인되게 하기
==================================================
이걸 안 넣으면 회원가입은 되지만, 로그인은 예전처럼 형식만 맞으면 누구나 통과해요.
가입한 회원만 로그인되게 하려면 script.js에서 아래 부분을 찾으세요.

  // 조건을 통과하면 이메일을 세션 스토리지에 저장합니다.
  sessionStorage.setItem("loginEmail", email);
  checkLogin();

  loginForm.reset();
  loginOverlay.classList.remove("show");
  showMessage("로그인되었습니다. 환영합니다!");
});

이 부분을 아래 내용으로 바꾸세요.

  // 회원가입한 회원인지 확인합니다.
  const members = getMembers();
  const member = members.find(function (item) {
    return item.email === email;
  });

  if (!member) {
    showMessage("가입되지 않은 이메일입니다. 회원가입을 해주세요.");
    return;
  }

  if (member.password !== password) {
    showMessage("비밀번호가 일치하지 않습니다.");
    loginPassword.focus();
    return;
  }

  // 조건을 통과하면 이메일을 세션 스토리지에 저장합니다.
  sessionStorage.setItem("loginEmail", email);
  checkLogin();

  loginForm.reset();
  loginOverlay.classList.remove("show");
  showMessage(member.name + "님, 로그인되었습니다. 환영합니다!");
});


  if (savedEmail !== null) {
    sessionStorage.removeItem("loginEmail");
    checkLogin();
    showMessage("로그아웃되었습니다.");
  } else {
    loginOverlay.classList.add("show");
    loginEmail.focus();
  }
});

// X 버튼을 누르면 로그인 창을 닫습니다.
loginClose.addEventListener("click", function () {
  loginOverlay.classList.remove("show");
});

// 로그인 창 바깥쪽을 누르면 창을 닫습니다.
loginOverlay.addEventListener("click", function (event) {
  if (event.target === loginOverlay) {
    loginOverlay.classList.remove("show");
  }
});

// 로그인 정보를 검사합니다.
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  // 이메일 형식인지 확인합니다.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showMessage("올바른 이메일 주소를 입력해 주세요.");
    loginEmail.focus();
    return;
  }

  // 영문 알파벳이 8자 이상인지 확인합니다.
  const alphabetCount = (password.match(/[a-zA-Z]/g) || []).length;

  // 특수문자가 1개 이상 포함되어 있는지 확인합니다.
  const specialPattern = /[^a-zA-Z0-9\s]/;

  if (alphabetCount < 8 || !specialPattern.test(password)) {
    showMessage("비밀번호는 영문 8자 이상과 특수문자 1개 이상이 필요합니다.");
    loginPassword.focus();
    return;
  }

  // 조건을 통과하면 이메일을 세션 스토리지에 저장합니다.
  sessionStorage.setItem("loginEmail", email);
  checkLogin();

  loginForm.reset();
  loginOverlay.classList.remove("show");
  showMessage("로그인되었습니다. 환영합니다!");
});



















// 페이지가 열릴 때 로그인 상태를 확인합니다.
checkLogin();

// 상품 카드의 하트 버튼을 누르면 색상이 바뀝니다.
const heartButtons = document.querySelectorAll(".heart-button");

heartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {
      button.textContent = "♥";
      showMessage("관심 상품에 추가했습니다.");
    } else {
      button.textContent = "♡";
      showMessage("관심 상품에서 삭제했습니다.");
    }
  });
});

// 네비게이션 메뉴 클릭 시 active 표시 변경
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});



