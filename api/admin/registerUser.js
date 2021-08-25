const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

let { users } = require("../../users.js");

const Router = express.Router();

// Route /api/registerUser
// Public
// registers a user and generates a token

Router.route("/").post((req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  let newUser = {
    id: users.length,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: [],
    social: {
      fb: "",
      insta: "",
      twitter: "",
    },
    upi: "",
  };
  // console.log(newUser);

  let emailAlreadyExists = false;

  for (let user = 0; user < users.length; user++) {
    if (users[user].email === newUser.email) {
      // console.log(users[user].email);
      emailAlreadyExists = true;
      break;
    }
  }

  if (!emailAlreadyExists) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        users.push(newUser);

        jwt.sign(
          { id: newUser.id }, // put user id in token's payload
          config.get("jwtSecret"), // a secret key
          { expiresIn: 3600 }, // expires in 1 hr
          (err, token) => {
            if (err) throw err;
            return res.json({
              token,
              user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
              },
            });
          }
        );
      });
    });
  } else {
    console.log(users);
    return res.status(400).json({ msg: "Email already exists" });
  }
});

module.exports = Router;
