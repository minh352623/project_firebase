import { selectOneData } from "./controler.js";
function renderItem(item) {
  let template = `
    <div class="main-product-item-img" data-id="${item.id}" data-author=${item.userId}>
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
            <span>${item.user}</span>
            </div>
          </div>
          <div class="main-product-item-price">
            <span>${item.price}</span>
            <span>đ</span>
          </div>
        
          
    `;
  return template;
}

async function loadItem(arrayItem, itemCart) {
  let array = 0;
  let filterArr = [];
  for (let i = 0; i < arrayItem.length; i++) {
    if (
      !arrayItem[i] ||
      arrayItem[i] === "" ||
      typeof arrayItem[i] === "undefined"
    ) {
      arrayItem.splice(i, 1);
    }
    if (arrayItem[i]) {
      filterArr.push(arrayItem[i]);
    }
  }
  console.log(filterArr);
  if (arrayItem.length > itemCart.length) {
    array = itemCart.length;
  } else {
    array = arrayItem.length;
  }
  let data = [];

  filterArr.forEach(async function (item, key) {
    if (typeof item != "undefined") {
      if (item.userId) {
        // //console.log("abc");
        data = await selectOneData("users", item.userId);
        // //console.log(data);
        item.user = data.name;
        itemCart[key]?.insertAdjacentHTML("beforeend", renderItem(item));
      }
    }
  });
  // for (let i = 0; i < array; i++) {
  //   let item = arrayItem[i];

  //   //console.log(typeof item);

  // }
}

function formatMoney(num) {
  return Intl.NumberFormat("vi-VN").format(num);
}
function caretaDate() {
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let minus = today.getMinutes();
  let sc = today.getSeconds();
  dd = dd - 1;
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (hh < 10) hh = "0" + hh;

  if (minus < 10) minus = "0" + minus;
  if (sc < 10) sc = "0" + sc;

  today = hh + ":" + minus + ":" + sc + "  " + mm + "/" + dd + "/" + yyyy;
  return today;
}
export { loadItem };
export { formatMoney };

export { caretaDate };
