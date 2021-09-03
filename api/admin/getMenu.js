const express = require("express");
const Router = express.Router();

const { db } = require("../../firebase.js");

Router.route("/:email").get((req, res) => {
  // try {
  let menu = "not found";
  console.log(req.params);
  let reqEmail = req.params.email;

  db.collection("users")
    .where("email", "==", reqEmail)
    .get()
    .then((snapshot) => {
      if (!snapshot) {
        res.status(400).send("Email not found");
      }
      menu = snapshot?.docs[0]?.data()?.menu;
      res.status(200).json({ menu });
    });
  // } catch (e) {
  //   throw e;
  // }
});

module.exports = Router;
