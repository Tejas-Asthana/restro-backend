const express = require("express");
const Router = express.Router();

const { db } = require("../../firebase.js");

Router.route("/:email").get((req, res) => {
  let userPersonalInfo = "not found";
  let reqEmail = req.params.email;

  db.collection("users")
    .where("email", "==", reqEmail)
    .get()
    .then((snapshot) => {
      if (!snapshot) {
        res.status(400).send("Email not found");
      }
      // console.log(snapshot.docs[0].data());
      userPersonalInfo = snapshot?.docs[0]?.data()?.personal;
      delete userPersonalInfo["password"];
      res.status(200).json({ userPersonalInfo });
    });
});

module.exports = Router;
