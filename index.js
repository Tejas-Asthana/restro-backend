const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const http = require("http").createServer(app);

const registerUser = require("./api/admin/registerUser.js");
const authUser = require("./api/admin/authUser.js");
const getMenu = require("./api/admin/getMenu.js");
const getUserInfo = require("./api/admin/getUserInfo.js");
const getReviews = require("./api/admin/getReviews.js");

const authMiddleware = require("./middlewares/auth.js");

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/registerUser", registerUser);

app.use("/api/authUser", authUser);

app.use("/api/admin/getMenu", getMenu);

app.use("/api/admin/getUserInfo", authMiddleware, getUserInfo);

app.use("/api/admin/getReviews", authMiddleware, getReviews);

app.get("/privatePage", authMiddleware, (req, res) => {
  res.status(200).send("User autherized");
});

http.listen(port, () => {
  const host = http.address().address;
  console.log(`Listening at http://${host}:${port}`);
});

const io = require("socket.io")(http);

let restraunts = new Map();

// socket.query = {
//   from: ...,
//   id: ...,
//   msg: ...,
//
// }

let count = 0;

io.on("connection", function (socket) {
  // console.log("Client connected to the WebSocket");
  count++;
  if (socket.handshake.query.from === "restraunt") {
    restraunts.set(socket.handshake.query.id, socket.id);
    console.log(
      count,
      socket.handshake.query.id,
      ": ",
      restraunts.get(socket.handshake.query.id)
    );
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // new customer arrives
  socket.on("new_customer", (customer) => {
    console.log(customer);
  });

  socket.on("chat message", function (msg) {
    console.log("Received a chat message");
    io.emit("chat message", msg);
  });

  socket.emit("new_message", "Hi there");
});
