const express = require("express");
const Router = express.Router();

const { db } = require("../../firebase.js");

Router.route("/:id").get((req, res) => {
  try {
    let menu = "not found";
    if (!req.params.id) {
      res.status(400).json({ msg: "invalid request" });
    }

    // console.log(req.params);
    let reqId = req.params.id.toString();

    db.collection("users")
      // .where("email", "==", reqEmail)
      .doc(reqId)
      .get()
      .then((snapshot) => {
        if (!snapshot || !snapshot.data()) {
          res.status(400).json({ msg: "id not found" });
        } else {
          // console.log(snapshot.data());
          menu = snapshot?.data()?.menu;
          res.status(200).json({ menu });
        }
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    throw e;
  }
});

module.exports = Router;
