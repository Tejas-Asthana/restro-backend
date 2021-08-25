// const path = require("path");
const express = require("express");
var cors = require("cors");

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

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
//   // res.json("public page");
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
