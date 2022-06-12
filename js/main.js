import { loadItem, formatMoney } from "./data.js";
import {
  insertData,
  updateData,
  selectAllData,
  selectOneData,
  removeData,
  showCart,
  sumMoney,
  realtimeCartsDelete,
} from "./controler.js";

window.addEventListener("load", async function () {
  const totalPrice = document.querySelector(".total-price");
  const quantityItem = document.querySelector(".quantity-item");
  const cartTopQuantity = document.querySelector(".cart-top-quantity");
  const arrayEmpty = document.querySelector(".array-empty");

  const cartCenter = document.querySelector(".cart-center");
  let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;

  const mainProductItem = document.querySelectorAll(".main-product-item");
  const product = await selectAllData("products");
  //console.log(product);

  // //console.log(mainProductItem);
  loadItem(product.reverse(), mainProductItem);

  const productContainerBtn = document.querySelector(".product-container-btn");
  const productContainerBtnB = document.querySelector(
    ".product-container-btn button"
  );

  const heightAuto = document.querySelector(".main-product");
  productContainerBtn?.addEventListener("click", function () {
    window.location.href = "./product.html";
  });

  // active cart

  const cart = document.querySelector(".cart");
  const modelCart = document.querySelector(".model-cart");
  const clear = document.querySelector(".clear i");
  const clearcontainer = document.querySelector(".clear");
  const cartContainer = document.querySelector(".cart-container");
  //console.log(clear);
  cart?.addEventListener("click", function (e) {
    modelCart.classList.add("active");
  });
  clearcontainer?.addEventListener("click", function (e) {
    modelCart.classList.remove("active");
  });
  clear?.addEventListener("click", function (e) {
    modelCart.classList.remove("active");
  });
  modelCart?.addEventListener("click", function (e) {
    modelCart.classList.remove("active");
  });
  cartContainer?.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // add cart
  //console.log(infoUser.id);
  let arrayItem = [];

  async function handleAddCart(e) {
    if (e.target.matches(".main-product-item-img img")) {
      let id = this.querySelector(".main-product-item-img").dataset.id;
      window.localStorage.setItem("detail", id);
      window.location.href = "./detail.html";
    }
    // arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || [];
    //console.log(arrayItem);
    if (e.target.matches(".icon-cart") || e.target.matches(".icon-cart i")) {
      arrayItem = (await selectAllData("carts")) || [];
      let item = {
        id: +this.querySelector(".main-product-item-img").dataset.id,
        link: this.querySelector(".main-product-item-img img").src,
        name: this.querySelector(".main-product-item-name span").textContent,
        price: +this.querySelector(
          ".main-product-item-price span:nth-child(1)"
        ).textContent.trim(),
        number: 1,
        user: infoUser.id,
        author: +this.querySelector(".main-product-item-img").dataset.author,
      };
      let index = -1;
      let number;
      let keyUp;
      if (arrayItem.length > 0) {
        arrayItem.forEach((value, key) => {
          //console.log(key);
          if (item.id == value.id) {
            if (value.user == item.user) {
              index = 2;
              keyUp = key;
              number = value.number;
            } else {
              index = -1;
            }
          }
        });
      }

      if (index == 2) {
        //console.log("acb");
        item.number = number + item.number;
        updateData("carts", keyUp, item);
      } else {
        if (index == -1 || arrayItem.length == 0) {
          //console.log("abc");
          insertData("carts", item);
        }
      }

      sumMoney(infoUser, totalPrice, quantityItem, cartTopQuantity);
    }
  }

  showCart(
    cartCenter,
    infoUser,
    arrayEmpty,
    totalPrice,
    quantityItem,
    cartTopQuantity
  );
  mainProductItem.forEach(async function (item, index) {
    item.addEventListener("click", await handleAddCart);

    item.addEventListener("click", () => {
      setTimeout(() => {
        showCart(
          cartCenter,
          infoUser,
          arrayEmpty,
          totalPrice,
          quantityItem,
          cartTopQuantity
        );
      }, 1500);
    });
  });

  cartCenter?.addEventListener("click", removeItemCart);
  function removeItemCart(e) {
    arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || []; // lấy dữ liệu từ local
    if (e.target.matches(".cart-center-info-name-clear i")) {
      let removeItem = e.target.parentNode.parentNode.parentNode.parentNode;
      this.removeChild(removeItem);
      let idItem = e.target.parentNode.dataset.id;
      removeData("carts", idItem);
      showCart(
        cartCenter,
        infoUser,
        arrayEmpty,
        totalPrice,
        quantityItem,
        cartTopQuantity
      );
    }
  }
  realtimeCartsDelete(
    cartCenter,
    infoUser,
    arrayEmpty,
    totalPrice,
    quantityItem,
    cartTopQuantity
  );
  const header = document.querySelector(".header");
  let heightHeader = header && header.offsetHeight;
  //console.log(heightHeader);
  window.addEventListener("scroll", function (e) {
    let scrollY = window.pageYOffset;
    if (scrollY > heightHeader) {
      header ? (header.style.position = "fixed") : null;
      document.body.style.paddingTop = `${heightHeader}px`;
    } else {
      header ? (header.style.position = "static") : null;

      document.body.style.paddingTop = "";
    }
  });

  sumMoney(infoUser, totalPrice, quantityItem, cartTopQuantity);

  //modile
  const menu = document.querySelector(".icon-mobile-menu i");
  const navLink = document.querySelector(".navbar-link");
  const navList = document.querySelector(".navbar-link-list");
  navList?.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  navLink?.addEventListener("click", function () {
    this.classList.remove("active");
  });
  //console.log(navLink);
  menu?.addEventListener("click", function () {
    navLink.classList.add("active");
  });
});
