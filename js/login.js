import {
  insertData,
  updateData,
  selectAllData,
  removeData,
} from "./controler.js";
// window.addEventListener("load", function () {

const formLogin = document.querySelector(".form-login");

let arrayUser = [];
formLogin.addEventListener("submit", async function (e) {
  window.localStorage.removeItem("login");
  e.preventDefault();

  let valueemail = this.querySelector(".email").value;
  let valuepwd = this.querySelector(".pwd").value;
  let islogin = null;
  const mess = document.querySelector(".mess");
  const data = await selectAllData("users");
  console.log(data);
  data.forEach((val) => {
    if (
      valueemail &&
      valuepwd &&
      val.email == valueemail &&
      val.pwd == valuepwd
    ) {
      localStorage.setItem("login", JSON.stringify({ ...val }));
    }
  });

  islogin = JSON.parse(window.localStorage.getItem("login")) || false;
  console.log(islogin);

  if (!islogin) {
    mess.textContent = "Tài khoản không tồn tại";
    mess.style.padding = "8px";
  } else {
    window.location.href = "./trangchu.html";

    mess.style.padding = "0 ";
  }
  // }, 1500);
});
// });
