import {
  insertData,
  updateData,
  selectAllData,
  removeData,
} from "./controler.js";
window.addEventListener("load", async function () {
  let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;
  const navbarLog = document.querySelector(".navbar-log");
  const nameUser = document.querySelector(".name-user");
  const hello = document.querySelector(".hello");
  const exit = document.querySelector(".exit");
  const name = document.querySelector(".name");
  const nameEmail = document.querySelector(".name-email");
  const nameSdt = document.querySelector(".name-phone");
  const nameAdd = document.querySelector(".name-address");
  const modileExit = document.querySelector(".mobile-exit");
  const deleteLog = document.querySelectorAll(".delete-log");
  const mobileHello = document.querySelector(".mobile-hello");
  const register_order = document.querySelector(".register-order");
  console.log(infoUser);
  if (infoUser) {
    console.log("abciasd");
    navbarLog?.classList.add("none");
    deleteLog[0]?.classList.add("none");
    deleteLog[1]?.classList.add("none");

    hello?.classList.remove("none");
    modileExit?.classList.remove("none");
    mobileHello ? (mobileHello.textContent = "Chào! " + infoUser.name) : null;
    nameUser ? (nameUser.textContent = infoUser.name) : null;
    name ? (name.textContent = infoUser.name) : null;
    nameEmail ? (nameEmail.textContent = infoUser.email) : null;
    nameSdt ? (nameSdt.textContent = infoUser.sdt) : null;
    nameAdd ? (nameAdd.textContent = infoUser.address) : null;
  } else {
    modileExit?.classList.add("none");

    navbarLog?.classList.remove("none");
    hello?.classList.add("none");
  }

  modileExit?.addEventListener("click", function () {
    window.localStorage.removeItem("login");
  });

  exit?.addEventListener("click", function () {
    window.localStorage.removeItem("login");
  });
  // register_order.addEventListener("click",function () {

  // })
  const containerProUser = document.querySelector(".main-product-user");
  function renderItemUser(item) {
    let template = ` 
    <div class="main-product-item">
    <div class="main-product-item-img" data-id="${item.id}">
    <img src="${item.link}" alt="" />
    <div class="main-product-item-img-icon">
      <span class="icon-cart icon">
        <i class="fas fa-cart-plus"></i>
      </span>
      <span class="icon-search icon">
        <i class="fas fa-search"></i>
      </span>
      <span class="icon-heart icon">
        <i class="far fa-heart"></i>
      </span>
    </div>
</div>
  <div class="main-product-item-name">
    <span>${item.name}</span>
    <div className="auth">
    <span>Người đăng: </span>
    <span>${infoUser.name}</span>
    </div>
  </div>
  <div class="main-product-item-price">
    <span>${item.price}</span>
    <span>đ</span>
  </div>
  </div>`;
    containerProUser?.insertAdjacentHTML("beforeend", template);
  }
  const data = await selectAllData("products");
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      data.splice(i, 1);
    }
  }

  data.forEach((item, index) => {
    if (item.userId == infoUser.id) {
      renderItemUser(item);
    }
  });
});
