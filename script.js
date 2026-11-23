// FITLOG 메인 페이지 기능 (검색, 로그인, 회원가입, 장바구니, 찜하기)

// 화면 아래쪽에 안내 메시지를 보여주는 함수
function showMessage(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

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

// 로그인 창에 필요한 HTML 요소
const loginButton = document.getElementById("loginButton");
const loginOverlay = document.getElementById("loginOverlay");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

// ===== 회원가입 기능 =====
const signupOverlay = document.getElementById("signupOverlay");
const signupClose = document.getElementById("signupClose");
const signupForm = document.getElementById("signupForm");
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupPasswordCheck = document.getElementById("signupPasswordCheck");
const signupAgree = document.getElementById("signupAgree");

function getMembers() {
  const saved = localStorage.getItem("members");
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

document.getElementById("goSignup").addEventListener("click", function () {
  loginOverlay.classList.remove("show");
  signupOverlay.classList.add("show");
  signupName.focus();
});

document.getElementById("goLogin").addEventListener("click", function () {
  signupOverlay.classList.remove("show");
  loginOverlay.classList.add("show");
  loginEmail.focus();
});

signupClose.addEventListener("click", function () {
  signupOverlay.classList.remove("show");
});

signupOverlay.addEventListener("click", function (event) {
  if (event.target === signupOverlay) {
    signupOverlay.classList.remove("show");
  }
});

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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage("올바른 이메일 주소를 입력해 주세요.");
    signupEmail.focus();
    return;
  }

  const alphabetCount = (password.match(/[a-zA-Z]/g) || []).length;
  const specialPattern = /[^a-zA-Z0-9\s]/;

  if (alphabetCount < 8 || !specialPattern.test(password)) {
    showMessage("비밀번호는 영문 8자 이상과 특수문자 1개 이상이 필요합니다.");
    signupPassword.focus();
    return;
  }

  if (password !== passwordCheck) {
    showMessage("비밀번호가 서로 다릅니다. 다시 확인해 주세요.");
    signupPasswordCheck.focus();
    return;
  }

  if (!signupAgree.checked) {
    showMessage("이용약관에 동의해 주세요.");
    return;
  }

  const members = getMembers();
  const alreadyJoined = members.some(function (item) {
    return item.email === email;
  });

  if (alreadyJoined) {
    showMessage("이미 가입된 이메일입니다.");
    signupEmail.focus();
    return;
  }

  members.push({ name: name, email: email, password: password });
  localStorage.setItem("members", JSON.stringify(members));

  signupForm.reset();
  signupOverlay.classList.remove("show");
  loginOverlay.classList.add("show");
  loginEmail.value = email;
  loginPassword.focus();
  showMessage("회원가입이 완료되었습니다. 로그인해 주세요!");
});

// 로그인 상태 확인
function checkLogin() {
  const savedEmail = sessionStorage.getItem("loginEmail");
  if (savedEmail !== null) {
    loginButton.textContent = "LOGOUT";
  } else {
    loginButton.textContent = "LOGIN";
  }
}

loginButton.addEventListener("click", function () {
  const savedEmail = sessionStorage.getItem("loginEmail");

  if (savedEmail !== null) {
    sessionStorage.removeItem("loginEmail");
    checkLogin();
    showMessage("로그아웃되었습니다.");
  } else {
    loginOverlay.classList.add("show");
    loginEmail.focus();
  }
});

loginClose.addEventListener("click", function () {
  loginOverlay.classList.remove("show");
});

loginOverlay.addEventListener("click", function (event) {
  if (event.target === loginOverlay) {
    loginOverlay.classList.remove("show");
  }
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage("올바른 이메일 주소를 입력해 주세요.");
    loginEmail.focus();
    return;
  }

  const alphabetCount = (password.match(/[a-zA-Z]/g) || []).length;
  const specialPattern = /[^a-zA-Z0-9\s]/;

  if (alphabetCount < 8 || !specialPattern.test(password)) {
    showMessage("비밀번호는 영문 8자 이상과 특수문자 1개 이상이 필요합니다.");
    loginPassword.focus();
    return;
  }

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

  sessionStorage.setItem("loginEmail", email);
  checkLogin();

  loginForm.reset();
  loginOverlay.classList.remove("show");
  showMessage(member.name + "님, 로그인되었습니다. 환영합니다!");
});

checkLogin();

// ===== 장바구니 기능 (무신사 스토어 장바구니 UI/UX 반영) =====
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartContent = document.getElementById("cartContent");
const cartClearBtn = document.getElementById("cartClearBtn");

function getCart() {
  const saved = localStorage.getItem("fitlog_cart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
  localStorage.setItem("fitlog_cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalQty = cart.reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);
  cartCount.textContent = totalQty;
}

// 장바구니 화면 그리기
function renderCart() {
  const cart = getCart();
  const isLoggedIn = sessionStorage.getItem("loginEmail") !== null;

  if (cart.length === 0) {
    cartClearBtn.style.display = "none";
    cartContent.innerHTML = `
      <div class="cart-empty">
        <p>장바구니에 담은 상품이 없습니다.</p>
        ${
          isLoggedIn
            ? '<button type="button" class="cart-empty-btn" id="cartGoShopBtn">상품 보러가기</button>'
            : '<button type="button" class="cart-empty-btn" id="cartGoLoginBtn">로그인하러 가기</button>'
        }
      </div>
    `;

    const goLoginBtn = document.getElementById("cartGoLoginBtn");
    if (goLoginBtn) {
      goLoginBtn.addEventListener("click", function () {
        cartOverlay.classList.remove("show");
        loginOverlay.classList.add("show");
        loginEmail.focus();
      });
    }

    const goShopBtn = document.getElementById("cartGoShopBtn");
    if (goShopBtn) {
      goShopBtn.addEventListener("click", function () {
        cartOverlay.classList.remove("show");
        document.getElementById("best").scrollIntoView({ behavior: "smooth" });
      });
    }
    return;
  }

  cartClearBtn.style.display = "inline-block";
  let totalPrice = 0;
  let itemsHtml = '<div class="cart-list">';

  cart.forEach(function (item) {
    const itemTotal = item.price * item.qty;
    totalPrice += itemTotal;
    itemsHtml += `
      <div class="cart-item">
        <div class="cart-item-left">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <small>${item.category}</small>
            <h4>${item.name}</h4>
            <strong>${itemTotal.toLocaleString()}원</strong>
          </div>
        </div>
        <div class="cart-item-right">
          <div class="qty-control">
            <button type="button" class="qty-minus" data-id="${item.id}">-</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-plus" data-id="${item.id}">+</button>
          </div>
          <button type="button" class="cart-remove-btn" data-id="${item.id}" aria-label="삭제">×</button>
        </div>
      </div>
    `;
  });

  itemsHtml += "</div>";
  itemsHtml += `
    <div class="cart-summary">
      <div class="summary-row">
        <span>총 상품금액</span>
        <span>${totalPrice.toLocaleString()}원</span>
      </div>
      <div class="summary-row">
        <span>배송비</span>
        <span>0원 (전 상품 무료배송)</span>
      </div>
      <div class="summary-row total">
        <span>총 결제예정금액</span>
        <span>${totalPrice.toLocaleString()}원</span>
      </div>
      <button type="button" class="cart-order-btn" id="cartOrderBtn">주문하기</button>
    </div>
  `;

  cartContent.innerHTML = itemsHtml;

  // 수량 감소
  document.querySelectorAll(".qty-minus").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.dataset.id;
      const currentCart = getCart();
      const target = currentCart.find(function (i) { return i.id === id; });
      if (target) {
        if (target.qty > 1) {
          target.qty -= 1;
        } else {
          const idx = currentCart.indexOf(target);
          currentCart.splice(idx, 1);
        }
        saveCart(currentCart);
        renderCart();
      }
    });
  });

  // 수량 증가
  document.querySelectorAll(".qty-plus").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.dataset.id;
      const currentCart = getCart();
      const target = currentCart.find(function (i) { return i.id === id; });
      if (target) {
        target.qty += 1;
        saveCart(currentCart);
        renderCart();
      }
    });
  });

  // 개별 삭제
  document.querySelectorAll(".cart-remove-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.dataset.id;
      const updated = getCart().filter(function (i) { return i.id !== id; });
      saveCart(updated);
      renderCart();
      showMessage("상품을 장바구니에서 삭제했습니다.");
    });
  });

  // 주문하기 버튼
  document.getElementById("cartOrderBtn").addEventListener("click", function () {
    const loggedEmail = sessionStorage.getItem("loginEmail");
    if (!loggedEmail) {
      cartOverlay.classList.remove("show");
      loginOverlay.classList.add("show");
      loginEmail.focus();
      showMessage("주문하려면 먼저 로그인해 주세요.");
      return;
    }

    saveCart([]);
    renderCart();
    cartOverlay.classList.remove("show");
    showMessage("주문이 완료되었습니다! 감사합니다.");
  });
}

// 헤더 CART 버튼 클릭 시 장바구니 열기
cartButton.addEventListener("click", function () {
  renderCart();
  cartOverlay.classList.add("show");
});

cartClose.addEventListener("click", function () {
  cartOverlay.classList.remove("show");
});

cartOverlay.addEventListener("click", function (event) {
  if (event.target === cartOverlay) {
    cartOverlay.classList.remove("show");
  }
});

cartClearBtn.addEventListener("click", function () {
  saveCart([]);
  renderCart();
  showMessage("장바구니를 모두 비웠습니다.");
});

// 상품 카드의 "+ 장바구니 담기" 버튼 클릭 이벤트
document.querySelectorAll(".add-cart-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const card = btn.closest(".product-card");
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const category = card.dataset.category;
    const img = card.dataset.img;

    const cart = getCart();
    const existing = cart.find(function (item) {
      return item.id === id;
    });

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        category: category,
        img: img,
        qty: 1
      });
    }

    saveCart(cart);
    showMessage("'" + name + "' 상품을 장바구니에 담았습니다.");
  });
});

// 초기 로드 시 장바구니 숫자 업데이트
updateCartBadge();

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
