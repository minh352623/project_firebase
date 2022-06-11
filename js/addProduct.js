import {
  insertData,
  updateData,
  selectAllData,
  removeData,
} from "./controler.js";
let infoUser = JSON.parse(window.localStorage.getItem("login")) || false;
let edit = JSON.parse(window.localStorage.getItem("edit")) || false;

console.log(edit);
window.addEventListener("load", function () {
  const link = document.querySelector(".link_image");
  const name = document.querySelector(".name");
  const price = document.querySelector(".price");

  const fromAdd = document.querySelector(".from_add");
  const addItem = document.querySelector(".add_item");
  const updateItem = document.querySelector(".update_item");
  if (edit) {
    name.value = edit.name;
    link.value = edit.link;
    price.value = edit.price;
  }
  addItem.addEventListener("click", function (e) {
    console.log("abc");
    let data = {
      name: name.value,
      link: link.value,
      price: +price.value,
      userId: infoUser.id,
    };
    insertData("products", data);
    setTimeout(function () {
      fromAdd.reset();
    }, 1500);
  });
  updateItem.addEventListener("click", function (e) {
    let data = {
      name: name.value,
      link: link.value,
      price: +price.value,
    };
    updateData("products", edit.id, data);
    setTimeout(function () {
      fromAdd.reset();
      localStorage.removeItem("edit");
    }, 1500);
  });
});
