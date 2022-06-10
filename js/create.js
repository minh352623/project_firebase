// console.log(fs);
// let data = [];
// function readFile(path, callback) {}
// ("./account.json");
// fs.readFile("./account.json", "utf-8", (err, jsonString) => {
//   if (err) {
//     console.error(err);
//   } else {
//     try {
//       data = JSON.parse(jsonString);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// });
window = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
});
const fs = require("fs");
function readFileJson(pathFile) {
  return JSON.parse(fs.readFileSync(pathFile, "utf-8"));
}

function writeFileJson(pathFile, objectDataNew) {
  // const fs = require("fs");

  let data = readFileJson(pathFile);
  data.push(objectDataNew);
  // console.log(data);
  fs.writeFile(pathFile, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
  });
}
// writeFileJson("./js/account.json", { name: "minh" });
// export { readFileJson };
// export { writeFileJson };
