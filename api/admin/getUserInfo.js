const express = require("express");
const Router = express.Router();

let { users } = require("../../users.js");

Router.route("/:id").get((req, res) => {
  let data = "not found";
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) data = users[i];
  }
  // console.log(data);
  res.json({ data });
});

module.exports = Router;
