const express = require("express");
const Router = express.Router();

let { customerReviews } = require("../../users.js");

Router.route("/:id").get((req, res) => {
  let data = "not found";
  for (let i = 0; i < customerReviews.length; i++) {
    if (customerReviews[i].id == req.params.id) data = customerReviews[i];
  }
  // console.log(data);
  res.json({ data });
});

module.exports = Router;
