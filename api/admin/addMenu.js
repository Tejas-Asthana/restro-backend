const express = require("express");
const Router = express.Router();

let { menu } = require("../../users.js");

Router.route("/:id").get((req, res) => {
  let data = "not found";
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].id == req.params.id) data = menu[i];
  }
  // console.log(data);
  res.json({ data });
});

module.exports = Router;
