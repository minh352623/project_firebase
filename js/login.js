import {
  insertData,
  updateData,
  selectAllData,
  removeData,
} from "./controler.js";
// window.addEventListener("load", function () {

const formLogin = document.querySelector(".form-login");
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

  today = hh + " : " + minus + "  " + dd + "/" + mm + "/" + yyyy;
  return today;
}
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
      let date = caretaDate();
      console.log(val.id);
      let dataLogin = {
        userId: val.id,
        dateLogin: date,
      };
      insertData("loginToken", dataLogin);
      setTimeout(() => {
        localStorage.setItem("login", JSON.stringify({ ...val }));
        islogin = JSON.parse(window.localStorage.getItem("login")) || false;
      }, 1000);
    }
    console.log(islogin);
    setTimeout(() => {
      if (!islogin) {
        mess.textContent = "Tài khoản không tồn tại";
        mess.style.padding = "8px";
      } else {
        window.location.href = "./trangchu.html";

        mess.style.padding = "0 ";
      }
    }, 1800);
  });

  // }, 1500);
});
// });
