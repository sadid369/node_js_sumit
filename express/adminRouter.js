const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("Dash");
});
adminRouter.get("/login", (req, res) => {
  res.send("login");
});

module.exports = adminRouter;
