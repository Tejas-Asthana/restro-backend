const express = require("express");
const Router = express.Router();

var ObjectId = require("mongodb").ObjectId;
let client = require("../../connect.js");

Router.route("/:id").get(async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: "invalid request" });
    }

    let reqId = req.params.id;

    const db = client.db("restraunt");

    const user = await db
      .collection("users")
      .find({ _id: ObjectId(reqId) })
      .toArray();

    if (user.length === 0) {
      return res.status(400).json({ msg: userPersonalInfo });
    }

    let menu = user[0].menu;
    return res.status(200).json({ menu });
  } catch (e) {
    throw e;
  }
});

module.exports = Router;
