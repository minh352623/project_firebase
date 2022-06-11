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
    if (name.value && link.value && price.value) {
      let data = {
        name: name.value,
        link: link.value,
        price: +price.value,
        userId: infoUser.id,
      };
      insertData("products", data);
      setTimeout(function () {
        fromAdd.reset();
        alert("Thêm thành công");
      }, 1500);
    } else {
      alert("Thông tin bắt buộc phải nhập!");
    }
  });
  updateItem.addEventListener("click", function (e) {
    if (name.value && link.value && price.value) {
      let data = {
        name: name.value,
        link: link.value,
        price: +price.value,
      };
      updateData("products", edit.id, data);
      setTimeout(function () {
        fromAdd.reset();
        localStorage.removeItem("edit");
        alert("Cập nhật thành công");
      }, 1500);
    } else {
      alert("Thông tin bắt buộc phải nhập!");
    }
  });
});
