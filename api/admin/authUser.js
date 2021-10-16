const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const Router = express.Router();

let client = require("../../connect.js");

Router.route("/").post(async (req, response) => {
  if (!req.body.email || !req.body.password) {
    return response.status(400).json({ msg: "Enter all fields" });
  }

  let email = req.body.email,
    password = req.body.password;

  const db = client.db("restraunt");

  const user = await db.collection("users").find({ email }).toArray();

  if (user.length !== 0) {
    return response.status(400).json({ user, msg: "user already exists" });
  }

  let p = user[0].personal.password;
  let userId = user[0]._id;

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
});

module.exports = Router;
