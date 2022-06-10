import { selectOneData } from "./controler.js";
function renderItem(item) {
  let template = `
    <div class="main-product-item-img" data-id="${item.id}">
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
  for (let i = 0; i < arrayItem.length; i++) {
    if (!arrayItem[i]) {
      arrayItem.splice(i, 1);
    }
  }
  if (arrayItem.length > itemCart.length) {
    array = itemCart.length;
  } else {
    array = arrayItem.length;
  }
  for (let i = 0; i < array; i++) {
    let item = arrayItem[i];

    let data = [];
    if (item.userId) {
      // console.log("abc");
      data = await selectOneData("users", item.userId);
      // console.log(data);
    }
    item.user = data.name;
    itemCart[i].insertAdjacentHTML("beforeend", renderItem(item));
  }
}

function formatMoney(num) {
  return Intl.NumberFormat("vi-VN").format(num);
}

export { loadItem };

export { formatMoney };
