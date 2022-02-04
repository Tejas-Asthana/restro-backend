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

io.on("connection", (socket) => {
  // restraunt login
  socket.on("r-login", (payload) => {
    // console.log(socket.id, payload.data.c_id);
    restraunts.set(payload.data.res_id, payload.data.r_s_id);
    console.log(
      `\n\nLOGIN request from restraunt db_id: ${payload.data.res_id}.`
    );
    console.log(
      `Restraunt db_id: ${payload.data.res_id}, r_s_id: ${restraunts.get(
        payload.data.res_id
      )}`
    );
    io.to(restraunts.get(payload.data.res_id)).emit("login-successful"); //confirm
  });

  // confirm order request from customer
  socket.on("confirm_order", (payload) => {
    io.to(payload.data.c_id).emit("order_confirmed", payload);
    console.log(
      `\nORDER CONFIRMATION request from customer s_id: ${payload.data.c_id} to restraunt db_id: ${payload.data.res_id}`
    );
  });

  // restraunt -> customer :: new msg
  socket.on("new_msg_r", (payload) => {
    io.to(payload.data.c_id).emit("new_msg_r", payload);
    console.log(
      `\nNEW MSG received from restraunt db_id: ${payload.data.res_id} to customer r_s_id: ${payload.data.r_s_id}.`
    );
    console.log(`msg: ${payload.data.new_msg}`);
  });

  // restraunt logout
  socket.on("r-logout", (payload) => {
    console.log(
      `\nLOGOUT request from restraunt db_id: ${payload.data.res_id}.`
    );
    restraunts.delete(socket.data.res_id);
  });

  /////////////////////// CUSTOMER ///////////////////////

  // new order request from customer
  socket.on("new_order", (payload) => {
    console.log(
      `\nNEW ORDER request from customer s_id: ${socket.id} to restraunt db_id: ${payload.data.res_id}.`
    );
    io.to(restraunts.get(payload.data.res_id)).emit("confirm_order", payload);
  });

  // customer -> restraunt :: new msg
  socket.on("new_msg_c", (payload) => {
    io.to(restraunts.get(payload.data.res_id)).emit(
      "new_msg_c",
      socket.data.new_msg
    );
    console.log(
      `\nNEW MSG received from customer s_id: ${payload.data.c_id} to restraunt db_id: ${payload.data.res_id}.`
    );
    console.log(`msg: ${payload.data.msg}`);
  });

  socket.on("disconnecting", (e) => {
    console.log(`Customer (${socket.id}) disconnected`);
    // io.emit;
  });
});
