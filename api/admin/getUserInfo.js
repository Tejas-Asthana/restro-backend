const express = require("express");
const Router = express.Router();

const { db } = require("../../firebase.js");

Router.route("/:id").get((req, res) => {
  let userPersonalInfo = "not found";
  let reqId = req.params.id;

  db.collection("users")
    .doc(reqId)
    .get()
    .then((snapshot) => {
      if (!snapshot) {
        res.status(400).send("Email not found");
      }
      // console.log(snapshot.docs[0].data());
      userPersonalInfo = snapshot?.data()?.personal;
      delete userPersonalInfo["password"];
      res.status(200).json({ userPersonalInfo });
    });
});

module.exports = Router;
