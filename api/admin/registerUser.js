const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// let { users } = require("../../users.js");
let { db } = require("../../firebase.js");

const Router = express.Router();

// Route /api/registerUser
// Public
// registers a user and generates a token

Router.route("/").post((req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  let newUser = {
    name: req.body.username.toString(),
    // restrauntName: req.body.restrauntName,
    email: req.body.email.toString(),
    password: req.body.password.toString(),
    id: "",
    phone: [],
    social: {
      fb: "",
      insta: "",
      twitter: "",
    },
    adress: {},
  };
  // console.log(newUser);

  db.collection("users")
    .where("email", "==", newUser.email)
    .get()
    .then((snapshot) => {
      // console.log(snapshot._size);
      if (!snapshot.empty) {
        return res.status(400).json({ msg: "Email already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            // users.push(newUser);

            db.collection("users")
              .add({
                email: newUser.email,
                personal: {
                  email: newUser.email,
                  name: newUser.name,
                  password: newUser.password,
                  phone: [],
                  social: [],
                },
                menu: {},
              })
              .then((res) => {
                newUser.id = res.id;
              });

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
                    name: newUser.name,
                  },
                });
              }
            );
          });
        });
      }
    });

  // let emailAlreadyExists = false;

  // for (let user = 0; user < users.length; user++) {
  //   if (users[user].email === newUser.email) {
  //     // console.log(users[user].email);
  //     emailAlreadyExists = true;
  //     break;
  //   }
  // }

  // if (!emailAlreadyExists) {
  //   bcrypt.genSalt(10, (err, salt) => {
  //     if (err) throw err;
  //     bcrypt.hash(newUser.password, salt, (err, hash) => {
  //       if (err) throw err;
  //       newUser.password = hash;
  //       users.push(newUser);

  //       jwt.sign(
  //         { id: newUser.id }, // put user id in token's payload
  //         config.get("jwtSecret"), // a secret key
  //         { expiresIn: 3600 }, // expires in 1 hr
  //         (err, token) => {
  //           if (err) throw err;
  //           return res.json({
  //             token,
  //             user: {
  //               id: newUser.id,
  //               email: newUser.email,
  //               username: newUser.username,
  //             },
  //           });
  //         }
  //       );
  //     });
  //   });
  // } else {
  //   console.log(users);
  //   return res.status(400).json({ msg: "Email already exists" });
  // }
});

module.exports = Router;
