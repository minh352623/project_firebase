// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
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
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
const db = getDatabase();
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
            alert("data stored successfully");
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
            alert("data stored successfully");
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
// create.addEventListener("click", insertData);
// create.addEventListener("click", async function (e) {
//   await insertData();
//   e.preventDefault();
//   setTimeout(() => {
//     commentfrom.reset();
//   }, 2000);
// });
export { insertData };
export { updateData };
export { selectAllData };
export { removeData };
export { selectOneData };
