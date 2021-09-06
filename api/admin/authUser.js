const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Router = express.Router();

const { db } = require("../../firebase.js");

Router.route("/").post((req, response) => {
  if (!req.body.email || !req.body.password) {
    return response.status(400).json({ msg: "Enter all fields" });
  }

  let email = req.body.email,
    password = req.body.password;

  db.collection("users")
    .where("email", "==", email)
    .get()
    .then((document) => {
      if (!document.empty) {
        let p = document.docs[0].data().personal.password;
        let userId = document.docs[0].data().id;
        // console.log(document.docs[0].data());
        bcrypt.compare(password, p).then((res) => {
          if (!res) {
            return response.status(400).json({ msg: "invalid credentials" });
          }
          jwt.sign(
            { id: userId }, // put user id in token's payload
            config.get("jwtSecret"), // a secret key
            { expiresIn: 7200 }, // expires in 2 hr
            (err, token) => {
              if (err) throw err;
              return response.json({
                token,
                user: {
                  id: userId,
                  email,
                },
              });
            }
          );
        });
      } else {
        return response.status(400).json({ msg: "invalid credentials" });
      }
    });
});

module.exports = Router;
