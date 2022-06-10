import {
  insertData,
  updateData,
  selectAllData,
  removeData,
} from "./controler.js";
window.addEventListener("load", async function () {
  let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;
  console.log(infoUser);
  let detailInfo = JSON.parse(window.localStorage.getItem("detail"));
  let containerDetail = document.querySelector(".product-container-detail");
  const data = await selectAllData("products");
  function renderDetail(item) {
    const template = `
    <div class="detail-img">
    <img src="${item.link}" data-id =${item.id} alt="" />
  </div>
  <div class="detail-info">
    <h2 class="detail-info__name">${item.name}</h2>
    <div class="detail-info__start">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
    </div>
    <div class="detail-info__content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut...
      </p>
    </div>
    <div class="detail-info__price detail">
      <span>PRICE</span>
      <span>${item.price}</span>
    </div>
    <div class="detail-info__size detail">
      <span>SIZE</span>
      <div class="info-size__item">
        <span>S</span>
        <span>M</span>
        <span>L</span>
      </div>
    </div>
    <div class="detail-info__color detail">
      <span>color</span>
      <div class="color-option">
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="detail-info__meterail detail">
      <span>MATERIAL</span>
      <span>silicon</span>
    </div>
    <div class="detail-info__quantity detail">
      <span>QUANTITY</span>
      <span>1</span>
    </div>
    <div class="detail-info__subtotal detail">
      <span>SUBTOTAL</span>
      <span>${item.price}</span>
    </div>

    <div class="detail-button">
      <button class="add-cart">
        <i class="fas fa-cart-plus"></i>
        Add to cart
      </button>
      <button class="buy-it">Buy it now</button>
      <button class="add-wish">
        <i class="fas fa-cart-plus"></i>
        Add to wishlist
      </button>
    </div>
  </div>
    
    `;
    containerDetail.insertAdjacentHTML("beforeend", template);
  }
  data.forEach((item) => {
    if (item.id == detailInfo) {
      //   console.log(item);
      renderDetail(item);
      return;
    }
  });

  //   const gitalk = new Gitalk({
  //     clientID: "ca92579ba9581edc9778",
  //     clientSecret: "a4c124fd469e6168048067bcefcdbb89a876e1d4",
  //     repo: "https://github.com/settings/applications/1925664", // The repository of store comments,
  //     owner: "https://github.com/minh352623",
  //     admin: ["https://github.com/minh352623"],
  //     id: location.href, // Ensure uniqueness and length less than 50
  //     distractionFreeMode: false, // Facebook-like distraction free mode
  //   });

  //   gitalk.render("gitalk-container");

  //comment
  const containerCm = document.querySelector(".container_comment");
  function render(comment) {
    let template = `
      <div class="item-comment">
      <div class="img">
        <img
          src="${
            comment.link
              ? comment.link
              : "https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=u48kjs1VcZQAX_jZqwO&tn=0VUPuZx5PzuZcB2Q&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT9tPTj-uvJvf2MUcdXcAOSphmXURt9iuKK-XVfjIYu4xQ&oe=62CA77F8"
          }"
          alt=""
        />
      </div>
      <div class="content">
      <div class="d-flex justify-content-between">
      
      <p style="font-weight:bold;">${comment.nameUser} </p>
      <span>${comment.createAt}</span>
      </div>
      <p style="font-size:20px;">
          ${comment.content}
        </p>
        <p></p>
      </div>
    </div>
      
      `;
    containerCm.insertAdjacentHTML("afterbegin", template);
  }
  function caretaDate() {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }
  let date = caretaDate();
  console.log(date);
  const inputCm = document.querySelector(".input_comment");
  const btnCm = document.querySelector(".add-comment");
  async function showComment() {
    let data = await selectAllData("comments");
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) {
        data.splice(i, 1);
      }
    }
    containerCm.innerHTML = "";
    data.forEach((item, key) => {
      if (item.itemId == detailInfo) {
        render(item);
      }
    });
  }
  const formCm = document.querySelector(".form_comment");
  btnCm.addEventListener("click", function () {
    let value = inputCm.value;
    if (value != "") {
      let date = caretaDate();
      let data = {
        content: value,
        userId: infoUser.id,
        nameUser: infoUser.name,
        linkImg: infoUser.img ? infoUser.img : "",
        itemId: detailInfo,
        createAt: date,
      };
      insertData("comments", data);
    }
    setTimeout(function () {
      showComment();
      formCm.reset();
    }, 1500);
  });
  showComment();
  //   console.log(dataCom);
});
