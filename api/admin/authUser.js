const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

let { users } = require("../../users.js");

const Router = express.Router();

Router.route("/").post((req, response) => {
  if (!req.body.email || !req.body.password) {
    return response.status(400).json({ msg: "Enter all fields" });
  }

  const currentUser = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log(users.length);
  let match = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === currentUser.email) {
      match = true;
      bcrypt.compare(currentUser.password, users[i].password).then((res) => {
        if (!res) {
          return response.status(400).json({ msg: "invalid credentials" });
        }
        jwt.sign(
          { id: users[i].id }, // put user id in token's payload
          config.get("jwtSecret"), // a secret key
          { expiresIn: 3600 }, // expires in 1 hr
          (err, token) => {
            if (err) throw err;
            return response.json({
              token,
              user: {
                id: users[i].id,
                email: users[i].email,
                username: users[i].username,
              },
            });
          }
        );
      });
    } else if (i === users.length - 1 && !match) {
      return response.status(400).json({ msg: "invalid credentials" });
    }
  }
  // console.log(users);
});

module.exports = Router;
