// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
import { formatMoney } from "./data.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2qe7npRtRk9SrlwG-sBy2St01WZ3zuFw",
  authDomain: "learn-firebse-4eb3a.firebaseapp.com",
  projectId: "learn-firebse-4eb3a",
  storageBucket: "learn-firebse-4eb3a.appspot.com",
  messagingSenderId: "1017614035160",
  appId: "1:1017614035160:web:27f354a49dca83c3c7cfad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
// const name = document.querySelector(".name");

// const content = document.querySelector(".content");
// const create = document.querySelector("#create");
// const select = document.querySelector("#select");
// const updatee = document.querySelector("#update");
// const deletee = document.querySelector("#delete");

// const deletE = document.querySelector("#delete");
// const container = document.querySelector(".container");
// const commentfrom = document.querySelector(".comment-from");
// //console.log(container);

var idComment = 1;
function insertData(table, data) {
  const dbref = ref(db);

  get(child(dbref, `${table}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let Arr = [];
        if (!Array.isArray(snapshot.val())) {
          for (let key in snapshot.val()) {
            Arr[key] = snapshot.val()[key];
          }
          Arr.forEach((val, key) => {
            // //console.log(val.id);
            if (+key > idComment) {
              //console.log(val.id);
              idComment = +key;
            }

            // data.push({ ...val });
          });
        } else {
          // //console.log(snapshot.val());
          snapshot.val().forEach((val, key) => {
            // //console.log(val.id);
            if (+key > idComment) {
              //console.log(key);
              idComment = +key;
            }

            // data.push({ ...val });
          });
        }
        // //console.log(idComment);
        idComment++;
        set(ref(db, `${table}/` + idComment), { id: idComment, ...data })
          .then(() => {
            // alert("data stored successfully");
          })
          .catch((err) => {
            alert("unsuccessfully,error " + err);
          });
        // data = [...snapshot.val()];
        // name.value = snapshot.val().name;
        // password.value = snapshot.val().pass;
      } else {
        set(ref(db, `${table}/` + 1), { id: idComment, ...data })
          .then(() => {
            // alert("data stored successfully");
          })
          .catch((err) => {
            alert("unsuccessfully,error " + err);
          });
      }
      // //console.log(data);
    })
    .catch((error) => {
      alert("Error Select " + error);
    });
}

function selectAllData(table) {
  let data = [];
  const dbref = ref(db);
  return new Promise((resolve) => {
    get(child(dbref, `${table}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (Array.isArray(snapshot.val()) != false) {
            //console.log(snapshot.val());
            //console.log("abc");
            // //console.log("abc");
            snapshot.val().forEach((val, key) => {
              data[key] = val;
            });
          } else {
            for (let key in snapshot.val()) {
              data[key] = snapshot.val()[key];
            }
          }
          resolve(data);
        } else {
          resolve([]);
        }
        // //console.log(data);
      })

      .catch((error) => {
        alert("Error12 Select abc" + error);
      });
  });
}
function selectOneData(table, idComment) {
  let data = [];
  const dbref = ref(db);
  return new Promise((resolve) => {
    get(child(dbref, `${table}/${idComment}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // //console.log("abc");
          resolve(snapshot.val());
        } else {
          alert("No data found");
        }
        // //console.log(data);
      })

      .catch((error) => {
        alert("Error Select one" + error);
      });
  });
}
function updateData(table, idComment, data) {
  update(ref(db, `${table}/${idComment}`), { ...data })
    .then(() => {
      // alert("data update stored successfully");
    })
    .catch((err) => {
      alert("unsuccessfully update,error " + err);
    });
}
function removeData(table, idComment) {
  remove(ref(db, `${table}/${idComment}`))
    .then(() => {
      // alert("data remove stored successfully");
    })
    .catch((err) => {
      alert("unsuccessfully remove,error " + err);
    });
}
function render(comment, containerCm, option = "") {
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
function realtimeComment(detailInfo, containerCm, infoUser) {
  const newMsg = ref(db, "comments/");
  onChildAdded(newMsg, async (data) => {
    console.log("upadte or delete");
    // console.log(data.val());
    // containerCm.innerHTML = "";
    if (data.val().itemId == detailInfo) {
      let dataUsers = await selectOneData("users", data.val().userId);

      let dataLast = {
        ...data.val(),
        nameUser: dataUsers.name,
      };
      if (dataLast.userId == infoUser.id) {
        render(
          dataLast,
          containerCm,
          `<span class="edit-comment"><i class="fa-solid fa-pen-to-square"></i></span>
            <span class="delete-comment"><i class="fa-solid fa-trash-can"></i></span>`
        );
      } else {
        render(dataLast, containerCm);
      }
    }
  });
  // console.log(arr);
  // resolve(arr);
}
function realtimeCommentUpdate(containerCm, infoUser) {
  const newMsg = ref(db, "comments/");
  onChildChanged(newMsg, async (data) => {
    let idChangeProduct = data.val().itemId;
    // console.log(idChangeProduct);
    let dataComment = await selectAllData("comments");
    if (dataComment.length > 0) {
      dataComment.forEach(async (comment) => {
        if (comment.itemId == idChangeProduct) {
          let dataUsers = await selectOneData("users", comment.userId);

          let dataLast = {
            ...comment,
            nameUser: dataUsers.name,
          };
          if (dataLast.userId == infoUser.id) {
            render(
              dataLast,
              containerCm,
              `<span class="edit-comment"><i class="fa-solid fa-pen-to-square"></i></span>
            <span class="delete-comment"><i class="fa-solid fa-trash-can"></i></span>`
            );
          } else {
            render(dataLast, containerCm);
          }
        }
      });
    }
  });
  // console.log(arr);
  // resolve(arr);
}
function realtimeCommentDelete(containerCm, infoUser) {
  const newMsg = ref(db, "comments/");
  onChildRemoved(newMsg, async (data) => {
    // console.log(data.val());
    let idChangeProduct = data.val().itemId;
    // console.log(idChangeProduct);
    let dataComment = await selectAllData("comments");
    if (dataComment.length > 0) {
      dataComment.forEach(async (comment) => {
        if (comment.itemId == idChangeProduct) {
          let dataUsers = await selectOneData("users", comment.userId);

          let dataLast = {
            ...comment,
            nameUser: dataUsers.name,
          };
          if (dataLast.userId == infoUser.id) {
            render(
              dataLast,
              containerCm,
              `<span class="edit-comment"><i class="fa-solid fa-pen-to-square"></i></span>
            <span class="delete-comment"><i class="fa-solid fa-trash-can"></i></span>`
            );
          } else {
            render(dataLast, containerCm);
          }
        }
      });
    }
  });
  // console.log(arr);
  // resolve(arr);
}
function realtimeCartsDelete(
  cartCenter,
  infoUser,
  arrayEmpty = "",
  totalPrice = "",
  quantityItem = "",
  cartTopQuantity = ""
) {
  const newMsg = ref(db, "carts/");
  onChildRemoved(newMsg, async (data) => {
    console.log("cart cahnge");
    showCart(
      cartCenter,
      infoUser,
      arrayEmpty,
      totalPrice,
      quantityItem,
      cartTopQuantity
    );
  });
  // console.log(arr);
  // resolve(arr);
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
async function showCart(
  cartCenter,
  infoUser,
  arrayEmpty = "",
  totalPrice = "",
  quantityItem = "",
  cartTopQuantity = ""
) {
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
  sumMoney(infoUser, totalPrice, quantityItem, cartTopQuantity);
}
async function sumMoney(
  infoUser,
  totalPrice = "",
  quantityItem = "",
  cartTopQuantity = ""
) {
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

//order
function renderOrder(container, item) {
  let template = `
  <div class="col-12 mt-3" >
  <div class="oder_item">
    <div class="row playout_order">
      <div class="col-2">
        <div class="img">
          <img
            src="${item.link}"
            alt=""
          />
        </div>
      </div>
      <div class="col-2">
        <p class="order_name" style="color:#ff871d;">${item.name}</p>
      </div>
      <div class="col-3" >
      <span>Giá: </span>
        <span class="price" >${item.price}</span>
        <span>đ</span>
        <p>${item.createAt}</p>
      </div>
      <div class="col-4">
        <span>Số lượng: </span>
        <span class="number_order">${item.number}</span>

        <p style="color:#ff871d;"> Trạng thái: ${
          item.status == 0
            ? "Đang chờ xác nhận"
            : item.status == 1
            ? "Đã xác nhận. Đang vận chuyển"
            : "Đã nhận"
        }</p>
      </div>
      <div class="col-1" data-id=${item.id} data-create="${item.createAt}">
        <span class="remove_order"><i class="fa-solid fa-trash-can"></i></span>
      </div>
    </div>
  </div>
</div>  
  `;
  container?.insertAdjacentHTML("beforeend", template);
}
function renderOrderAuth(container, item) {
  let template = `
  
  <div class="col-12 mt-3">
  <div class="oder_item">
    <div class="row playout_order">
      <div class="col-2">
        <div class="img">
          <img src="${item.link}" alt="" />
        </div>
      </div>
      <div class="col-2">
        <p class="order_name" style="color: #ff871d">
          ${item.name}
        </p>
        <p>Người đặt hàng: ${item.userName}</p>
      </div>
      <div class="col-3">
        <span>Giá: </span>
        <span class="price">${item.price}</span>
        <span>đ</span>
        <p>${item.createAt}</p>
      </div>
      <div class="col-4">
        <span>Số lượng: </span>
        <span class="number_order">${item.number}</span>

        <p style="color: #ff871d">
          Trạng thái: ${
            item.status == 0
              ? "Đang chờ xác nhận"
              : item.status == 1
              ? "Đã xác nhận. Đang vận chuyển"
              : "Đã nhận"
          }
        </p>
      </div>
      <div
        class="col-1"
        data-id="${item.id}"
        data-create="${item.createAt}"
      >
        <span class="btn btn-danger not-browser">Chưa duyệt</span>
      </div>
    </div>
  </div>
</div>

`;
  console.log("ádasdasd");
  container?.insertAdjacentHTML("beforeend", template);
}
function realtimeOrder(container, infoUser, containerAuth, counted, userCount) {
  const newMsg = ref(db, "orders/");
  onChildAdded(newMsg, async (data) => {
    let filterData = [];
    let count = 0;
    let orderData = await selectAllData("orders");
    orderData.forEach((item) => {
      if (item) {
        filterData.push(item);
      }
    });
    filterData.forEach((value) => {
      if (value) {
        if (value.items) {
          value.items.forEach((value2, key2) => {
            if (value2.author == infoUser.id) {
              count++;
            }
          });
        }
      }
    });
    //chủ shop
    // data.val().forEach((value) => {
    if (data.val()) {
      if (data.val().items) {
        data.val().items.forEach(async (value2) => {
          if (value2.author == infoUser.id) {
            let infoUser = await selectOneData("users", data.val().userId);
            let dataItem = await selectOneData("products", value2.item);
            dataItem.number = value2.number;
            dataItem.createAt = data.val().createAt;
            dataItem.status = data.val().status;
            dataItem.userName = infoUser.name;
            console.log(dataItem);
            renderOrderAuth(containerAuth, dataItem);
          }
        });
      }
    }
    counted ? (counted.textContent = count) : null;
    userCount ? (userCount.textContent = count) : null;

    // });
    //người mua
    console.log("ins order");
    // console.log(data.val());
    // containerCm.innerHTML = "";
    if (data.val().userId == infoUser.id) {
      data.val().items.forEach(async (value, key) => {
        let dataItem = await selectOneData("products", value.item);
        dataItem.number = value.number;
        dataItem.createAt = data.val().createAt;
        dataItem.status = data.val().status;
        console.log(dataItem);

        renderOrder(container, dataItem);
      });
    }
  });
  // console.log(arr);
  // resolve(arr);
}
function realtimeOrderRemove(container, infoUser, counted, userCount) {
  const newMsg = ref(db, "orders/");
  onChildRemoved(newMsg, async (data) => {
    let filterData1 = [];
    let count = 0;
    let orderData = await selectAllData("orders");
    orderData.forEach((item) => {
      if (item) {
        filterData1.push(item);
      }
    });
    filterData1.forEach((value) => {
      if (value) {
        if (value.items) {
          value.items.forEach((value2, key2) => {
            if (value2.author == infoUser.id) {
              count++;
            }
          });
        }
      }
    });
    counted ? (counted.textContent = count) : null;
    userCount ? (userCount.textContent = count) : null;
    console.log("delete order");
    // console.log(data.val());
    // containerCm.innerHTML = "";
    let filterData = [];
    let dataOrder = await selectAllData("orders");
    dataOrder.forEach((item) => {
      if (item) {
        filterData.push(item);
      }
    });
    console.log(dataOrder);
    console.log(filterData);
    container.innerHTML = "";

    filterData.forEach(async (value, key) => {
      if (value) {
        if (value.userId == infoUser.id) {
          value.items.forEach(async (value2, key) => {
            let dataItem = await selectOneData("products", value2.item);
            dataItem.number = value2.number;
            dataItem.createAt = value.createAt;
            console.log(dataItem);

            renderOrder(container, dataItem);
          });
        }
      }
    });
  });
  // console.log(arr);
  // resolve(arr);
}
function realtimeOrderUpdate(container, infoUser, counted, userCount) {
  const newMsg = ref(db, "orders/");
  onChildChanged(newMsg, async (data) => {
    let filterData1 = [];
    let count = 0;
    let orderData = await selectAllData("orders");
    orderData.forEach((item) => {
      if (item) {
        filterData1.push(item);
      }
    });
    filterData1.forEach((value) => {
      if (value) {
        if (value.items) {
          value.items.forEach((value2, key2) => {
            if (value2.author == infoUser.id) {
              count++;
            }
          });
        }
      }
    });
    counted ? (counted.textContent = count) : null;
    userCount ? (userCount.textContent = count) : null;
    console.log("update order");
    // console.log(data.val());
    // containerCm.innerHTML = "";
    let filterData = [];
    let dataOrder = await selectAllData("orders");
    dataOrder.forEach((item) => {
      if (item) {
        filterData.push(item);
      }
    });
    console.log(dataOrder);
    console.log(filterData);
    container.innerHTML = "";

    filterData.forEach(async (value, key) => {
      if (value) {
        if (value.userId == infoUser.id) {
          value.items.forEach(async (value2, key) => {
            let dataItem = await selectOneData("products", value2.item);
            dataItem.number = value2.number;
            dataItem.createAt = value.createAt;
            console.log(dataItem);

            renderOrder(container, dataItem);
          });
        }
      }
    });
  });
  // console.log(arr);
  // resolve(arr);
}
export { realtimeComment };
export { realtimeCommentUpdate };
export { realtimeCommentDelete, realtimeCartsDelete };
export { realtimeOrder };
export { realtimeOrderRemove };
export { realtimeOrderUpdate };

export { insertData };
export { updateData };
export { selectAllData };
export { removeData };
export { selectOneData };

export { showCart };
export { sumMoney };
