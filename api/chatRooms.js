const httpServer = require("http").createServer();

const { db } = require("../firebase.js");

const usersCollection = db.collection("users");

// PUBLIC API
// will take doc id of the restraunt as req param
// will take a snapshot of the menu in db

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// middleware
io.use((socket, next) => {
  // const username = socket.handshake.auth.username;
  const docId = socket.handshake.auth.userId;

  if (!docId) {
    return next(new Error("invalid_restraunt_request"));
  }
  socket.docId = docId;
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      socketID: id,
      username: socket.username,
    });
  }
  //   socket.emit("users", users);
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    totalConnected: users.length(),
  });
});

io.on("getMenuUpdates", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  usersCollection.doc(socket.docId).onSnapshot(
    (snapshot) => {},
    (err) => {
      throw err;
    }
  );
});
