const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandaler/todoHandler");
const app = express();
app.use(express.json());
//database connection with mongoose3
mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

//application route
app.use("/todo", todoHandler);
//default Error
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
