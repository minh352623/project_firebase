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
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
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
function rederComments(item) {
  let template = `
        <div class="item">
        <h2>${item.name}</h2>
        <p>
          ${item.content}
        </p>
      </div>
        `;
  container.insertAdjacentHTML("beforeend", template);
}

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
    console.log(data.val());
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
// create.addEventListener("click", insertData);
// create.addEventListener("click", async function (e) {
//   await insertData();
//   e.preventDefault();
//   setTimeout(() => {
//     commentfrom.reset();
//   }, 2000);
// });
export { realtimeComment };

export { insertData };
export { updateData };
export { selectAllData };
export { removeData };
export { selectOneData };
