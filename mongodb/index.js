const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const app = express();
dotenv.config();
app.use(express.json());
//database connection with mongoose3
mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

//application route
app.use("/todo", todoHandler);
app.use("/user", userHandler);
//default Error
const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);
app.listen(3000, () => {
  console.log("app listening at port 3000");
});
