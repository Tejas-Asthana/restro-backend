// const path = require("path");
const express = require("express");
var cors = require("cors");

let { db } = require("./firebase");

let registerUser = require("./api/admin/registerUser.js");
let authUser = require("./api/admin/authUser.js");
let addMenu = require("./api/admin/addMenu.js");
let getUserInfo = require("./api/admin/getUserInfo.js");
let getReviews = require("./api/admin/getReviews.js");

let authMiddleware = require("./middlewares/auth.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("/client/build"));
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use("/api/registerUser", registerUser);

app.use("/api/authUser", authUser);

app.use("/api/admin/getMenu", authMiddleware, addMenu);

app.use("/api/admin/getUserInfo", authMiddleware, getUserInfo);

app.use("/api/admin/getReviews", authMiddleware, getReviews);

app.get("/privatePage", authMiddleware, (req, res) => {
  res.status(200).send("User autherized");
});

const docId = "2nNdQjVfCpq4VIbg4pmm";
const testUser = db.collection("users").doc(docId);

app.get("/test", (req, res) => {
  let data = [];
  db.collection("users")
    .where("email", "==", "test@email")
    .get()
    .then((snapshot) => {
      data.push({
        userId: snapshot.docs[0].id,
        p: snapshot.docs[0].data().personal.password,
        userData: snapshot.docs[0].data(),
      });

      // snapshot.forEach((doc) => {
      //   data.push(doc.data());
      //   console.log(doc?.id);
      // });

      res.json(data);
    });
});

app.get("/getData", (req, res) => {
  const personal = db.collection("users").doc(docId).collection("personal");
  const menu = db.collection("users").doc(docId).collection("menu");

  let userData = [];

  const getPersonalData = new Promise((resolve, reject) => {
    let data = {};

    personal.onSnapshot((snapshot) => {
      let arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      data.personal = arr[0];

      resolve(data);
      reject("Some error...");
    });
  });

  const getMenuData = new Promise((resolve, reject) => {
    let data = {};
    let dishes = {},
      dishTitles = [],
      dishId = [];

    menu.onSnapshot((snapshot) => {
      let arr = snapshot.docs.map((doc) => {
        dishTitles.push(doc.data().title);
        dishId.push(doc.id);
        return {
          id: doc.id,
          title: doc.data().title,
        };
      });

      // for (let i = 0; i < dishId.length; i++) {
      //   dishId[i].get();
      // }

      console.log(dishId, dishTitles);
      data.menu = arr;

      resolve(data);
      reject("Some error...");
    });
  });

  getPersonalData
    .then((personalData) => {
      userData.push(personalData);
    })
    .then(() => {
      getMenuData
        .then((menuData) => {
          userData.push(menuData);
          res.json(userData);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
//   // res.json("public page");
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
