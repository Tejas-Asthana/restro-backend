const express = require("express");
const Router = express.Router();

var ObjectId = require("mongodb").ObjectId;
let client = require("../../connect.js");

Router.route("/:id").get(async (req, res) => {
  if (!req.params.id) return res.status(400).json({ msg: "incomplete params" });

  let userPersonalInfo = "not found";
  let reqId = req.params.id;

  const db = client.db("restraunt");

  const user = await db
    .collection("users")
    .find({ _id: ObjectId(reqId) })
    .toArray();

  if (user.length === 0) {
    return res.status(400).json({ msg: userPersonalInfo });
  }

  userPersonalInfo = user[0].personal;
  delete userPersonalInfo["password"];
  return res.status(200).json({ userPersonalInfo });
});

module.exports = Router;
