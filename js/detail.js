import {
  insertData,
  updateData,
  selectAllData,
  selectOneData,
  removeData,
} from "./controler.js";
window.addEventListener("load", async function () {
  let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;
  //console.log(infoUser);
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
      //   //console.log(item);
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
  function render(comment, option = "") {
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
      <div class="option" data-id="${comment.id}">
      <p style="font-size:20px;">
          ${comment.content}
        </p>

        <div>
          ${option != "" ? option : ""}
        </div>
      </div>
     
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
    let hh = today.getHours();
    let minus = today.getMinutes();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (hh < 10) hh = "0" + hh;
    if (minus < 10) minus = "0" + minus;

    today = hh + ":" + minus + "  " + dd + "/" + mm + "/" + yyyy;
    return today;
  }
  let date = caretaDate();
  //console.log(date);
  const inputCm = document.querySelector(".input_comment");
  const btnCm = document.querySelector(".add-comment");
  async function showComment() {
    let data = await selectAllData("comments");
    //console.log(data);
    let filterData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        filterData.push(data[i]);
      }
    }
    //console.log(filterData);
    containerCm.innerHTML = "";
    filterData.forEach(async (item, key) => {
      if (item.itemId == detailInfo) {
        let dataUsers = await selectOneData("users", item.userId);
        // //console.log(dataUsers);
        item.nameUser = dataUsers.name;
        if (item.userId == infoUser.id) {
          render(
            item,
            `<span class="edit-comment"><i class="fa-solid fa-pen-to-square"></i></span>
          <span class="delete-comment"><i class="fa-solid fa-trash-can"></i></span>`
          );
        } else {
          render(item);
        }
      }
    });
  }
  const formCm = document.querySelector(".form_comment");
  btnCm.addEventListener("click", function () {
    if (!infoUser) {
      alert("Bạn phải đăng nhập trước");
    }
    let value = inputCm.value;
    if (value != "") {
      let date = caretaDate();
      let data = {
        content: value,
        userId: infoUser.id,

        itemId: detailInfo,
        createAt: date,
      };
      insertData("comments", data);
    }
    setTimeout(function () {
      console.log("show 1");
      showComment();
      formCm.reset();
    }, 1000);
  });
  showComment();
  //   //console.log(dataCom);

  //xóa comment and sửa comments
  const updateBtn = document.querySelector(".update-comment");

  const changeText = document.querySelector(".change_text");
  containerCm.addEventListener("click", async function (e) {
    if (e.target.matches(".delete-comment i")) {
      let idComment = e.target.parentNode.parentNode.parentNode.dataset.id;
      //console.log(idComment);
      removeData("comments", +idComment);
      setTimeout(function () {
        showComment();
      }, 1000);
    }
    //sửa comments
    if (e.target.matches(".edit-comment i")) {
      let idComment = e.target.parentNode.parentNode.parentNode.dataset.id;
      //console.log(idComment);
      let itemComment = await selectOneData("comments", idComment);
      //console.log(itemComment);
      inputCm.value = itemComment.content;
      changeText.textContent += ": Bạn đang sửa bình luận";

      window.location.href = "./detail.html#form_comment";
      updateBtn.style.display = "block";
      btnCm.style.display = "none";
      updateBtn.onclick = function () {
        if (inputCm.value != "") {
          let data = {
            ...itemComment,
            content: inputCm.value,
          };
          updateData("comments", idComment, data);
          setTimeout(function () {
            console.log("show 2");

            showComment();
            formCm.reset();

            updateBtn.style.display = "none";
            btnCm.style.display = "block";
          }, 500);
        } else {
          alert("Ban phải nhập bình luân mới sữa được chứ :)!");
        }
      };
    }
  });
});
