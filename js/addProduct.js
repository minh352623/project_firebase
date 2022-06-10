import {
  insertData,
  updateData,
  selectAllData,
  removeData,
} from "./controler.js";
let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;
console.log(infoUser);
window.addEventListener("load", function () {
  const link = document.querySelector(".link_image");
  const name = document.querySelector(".name");
  const price = document.querySelector(".price");

  const fromAdd = document.querySelector(".from_add");
  const addItem = document.querySelector(".add_item");

  addItem.addEventListener("click", function (e) {
    console.log("abc");
    let data = {
      name: name.value,
      link: link.value,
      price: +price.value,
      userId: infoUser.id,
    };
    insertData("products", data);
  });
});
