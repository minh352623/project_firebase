import {
  insertData,
  updateData,
  selectOneData,
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

  const online_user = document.querySelector(".togle_open_close");
  const container_online = document.querySelector(".user__online");

  const listOnline = document.querySelector(".list-user");
  //console.log(infoUser);
  online_user?.addEventListener("click", function () {
    container_online.classList.toggle("hidden");
  });

  //reder user online
  async function renderUserOnline(item, status = 0) {
    let template = `
    <li class="item-user">
    <span class="img">
      <img
        src="${
          item.img
            ? item.img
            : "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=u48kjs1VcZQAX_jZqwO&tn=0VUPuZx5PzuZcB2Q&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT9tPTj-uvJvf2MUcdXcAOSphmXURt9iuKK-XVfjIYu4xQ&oe=62CA77F8"
        }"
        alt=""
      />
      ${
        status == 0
          ? '<span class="offline"></span>'
          : '<span class="onlining"></span>'
      }

      
    </span>
    <span class="info-user_online">${item.name} </span>
  </li>
    `;
    listOnline.insertAdjacentHTML("beforeend", template);
  }

  async function loadUserOnline() {
    const dataOnline = await selectAllData("loginToken");
    const dataOffline = await selectAllData("users");

    listOnline.innerHTML = "";
    let userOnline = [];
    //load online

    dataOnline.forEach((item1, key1) => {
      dataOnline.forEach((item2, key2) => {
        if (key1 != key2) {
          if (item1.userId == item2.userId) {
            dataOnline.splice(key1, 1);
          }
        }
      });
    });
    dataOnline.forEach(async (item, key) => {
      userOnline.push(item.userId);
      let dataUser = await selectOneData("users", item.userId);
      item.name = dataUser.name;
      renderUserOnline(item, 1);
    });

    //
    console.log(userOnline);
    let filterData = [];
    dataOffline.forEach((item) => {
      if (item) {
        filterData.push(item);
      }
    });
    //load ofline
    userOnline.forEach((item1, key1) => {
      filterData.forEach((item2, key) => {
        if (item2.id == item1) {
          filterData.splice(key, 1);
        }
      });
    });
    filterData.forEach(async (item, key) => {
      renderUserOnline(item, 0);
    });
    console.log(filterData);
  }
  loadUserOnline();
  //end reder
  if (infoUser) {
    //console.log("abciasd");
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

  exit?.addEventListener("click", async function () {
    const dataUsers = await selectAllData("loginToken");
    // console.log(dataUsers);
    dataUsers.forEach((item, key) => {
      // console.log(key);
      if (item.userId == infoUser.id) {
        removeData("loginToken", key);
      }
    });
    setTimeout(function () {
      window.localStorage.removeItem("login");
      window.location.href = "./index.html";
    }, 500);
    // removeData('loginToken',infoUser)
  });
  // register_order.addEventListener("click",function () {

  // })
  const containerProUser = document.querySelector(".main-product-user");
  function renderItemUser(item) {
    let template = ` 
    <div class="main-product-item">
    <span class="edit-item"><i class="fa-solid fa-pen-to-square"></i></span>
    <span class="delete-item"><i class="fa-solid fa-trash-can"></i></span>
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
  async function showItemUs() {
    const data = await selectAllData("products");
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) {
        data.splice(i, 1);
      }
    }
    if (containerProUser) {
      containerProUser.innerHTML = "";
      data.forEach((item, index) => {
        if (item.userId == infoUser.id) {
          renderItemUser(item);
        }
      });
    }
  }
  showItemUs();
  //sữa sản phẩm
  containerProUser?.addEventListener("click", async function (e) {
    if (e.target.matches(".delete-item i")) {
      const item = e.target.parentNode.parentNode;
      //console.log(item);
      const idItem = item.querySelector(".main-product-item-img").dataset.id;
      // //console.log(idItem);
      removeData("products", idItem);
      setTimeout(function () {
        showItemUs();
      }, 1000);
    }
    if (e.target.matches(".edit-item i")) {
      localStorage.removeItem("edit");
      const item = e.target.parentNode.parentNode;
      //console.log(item);
      const idItem = item.querySelector(".main-product-item-img").dataset.id;
      // //console.log(idItem);
      const data = await selectOneData("products", idItem);
      //console.log(data);
      setTimeout(function () {
        localStorage.setItem("edit", JSON.stringify(data));
        window.location.href = "./addFirebase.html";
      }, 500);
    }
  });
});
