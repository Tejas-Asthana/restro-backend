const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

let { menu } = require("../../users.js");

let client = require("../../connect.js");

const Router = express.Router();

// Route /api/registerUser
// Public
// registers a user and generates a token

Router.route("/").post(async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Enter all fields" });
  }

  let newUser = {
    name: req.body.username.toString(),
    // restrauntName: req.body.restrauntName,
    email: req.body.email.toString(),
    password: req.body.password.toString(),
    id: null,
    phone: [],
    social: {
      fb: "",
      insta: "",
      twitter: "",
    },
    adress: {},
  };

  async function run() {
    try {
      const db = client.db("restraunt");

      console.log("Connected correctly to server");

      const user = await db
        .collection("users")
        .find({ email: newUser.email })
        .toArray();

      if (user.length !== 0) {
        return res.status(400).json({ user, msg: "user already exists" });
      }

      bcrypt.genSalt(10, async (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          const insertUser = await db.collection("users").insertOne({
            email: newUser.email,
            personal: {
              email: newUser.email,
              name: newUser.name,
              password: newUser.password,
              phone: [],
              social: [],
            },
            menu,
          });

          console.log(insertUser.insertedId);

          jwt.sign(
            { id: insertUser.insertedId }, // put user id in token's payload
            config.get("jwtSecret"), // a secret key
            { expiresIn: 3600 }, // expires in 1 hr
            (err, token) => {
              if (err) throw err;
              return res.json({
                token,
                user: {
                  id: insertUser.insertedId,
                  email: newUser.email,
                  name: newUser.name,
                },
              });
            }
          );
        });
      });
    } catch (err) {
      console.log(err.stack);
    }
  }
  run().catch(console.dir);
});

module.exports = Router;
