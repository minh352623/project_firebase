import { loadItem, formatMoney } from "./data.js";
import {
  insertData,
  updateData,
  selectAllData,
  selectOneData,
  removeData,
} from "./controler.js";

window.addEventListener("load", async function () {
  const mainProductItem = document.querySelectorAll(".main-product-item");
  const product = await selectAllData("products");
  //console.log(product);

  // //console.log(mainProductItem);
  loadItem(product.reverse(), mainProductItem);

  const productContainerBtn = document.querySelector(".product-container-btn");
  const productContainerBtnB = document.querySelector(
    ".product-container-btn button"
  );
  //console.log(productContainerBtnB);
  //console.log(productContainerBtn);

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
  let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;
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

      // sumMoney();
    }
  }
  function createItem(item, key) {
    let template = `
        <div class="cart-center-item "  >
        <div class="cart-center-item-img" >
          <img src="${item.link}" alt="">
        </div>
        <div class="cart-center-item-info">
          <div class="cart-center-info-name">
            <span class="cart-center-info-name-js">${item.name}</span>
            <span class="cart-center-info-name-clear " data-id=${key}><i class="fas fa-trash-alt"></i></span>
          </div>
          <div class="cart-center-info-qty">
            <span>QTY:</span>
            <span class="cart-center-info-qty-number"> ${item.number}</span>
        
          </div>
          <div class="cart-center-info-price">
            <span class="cart-center-info-prices">${item.price}</span>
            <span>đ</span>
          </div>
        </div>
      
      </div>`;
    return template;
  }

  const cartCenter = document.querySelector(".cart-center");
  const arrayEmpty = document.querySelector(".array-empty");

  async function showCart() {
    // arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || []; // lấy dữ liệu từ local
    let arrayItem = (await selectAllData("carts")) || [];
    //console.log(arrayItem);
    cartCenter ? (cartCenter.innerHTML = "") : null; // reset cart
    if (arrayItem.length > 0) {
      arrayItem.forEach((item, key) => {
        if (item.user === infoUser.id) {
          cartCenter?.insertAdjacentHTML("beforeend", createItem(item, key));
        }
      });
      arrayEmpty ? (arrayEmpty.textContent = "") : null;
    } else {
      arrayEmpty ? (arrayEmpty.textContent = "NO PRODUCTS") : null;
    }
    sumMoney();
  }

  showCart();
  mainProductItem.forEach(async function (item, index) {
    item.addEventListener("click", await handleAddCart);

    item.addEventListener("click", () => {
      setTimeout(() => {
        showCart();
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
      showCart();
    }
  }
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
  const totalPrice = document.querySelector(".total-price");
  const quantityItem = document.querySelector(".quantity-item");
  const cartTopQuantity = document.querySelector(".cart-top-quantity");
  async function sumMoney() {
    let sum = 0;
    let sumNumber = 0;
    let arrayItem = (await selectAllData("carts")) || [];

    arrayItem.forEach((item, index) => {
      if (item.user == infoUser.id) {
        sum += item.price * item.number;
        sumNumber += item.number;
      }
    });
    totalPrice ? (totalPrice.textContent = `${formatMoney(sum)} đ`) : null;
    quantityItem ? (quantityItem.textContent = `${sumNumber}`) : null;
    cartTopQuantity ? (cartTopQuantity.textContent = `${sumNumber}`) : null;
  }
  sumMoney();

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
