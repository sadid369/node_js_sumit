const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();
//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

//request pursers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine

// app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//error handling

app.listen(process.env.PORT, () => {
  console.log(`App Listening to port ${process.env.PORT} `);
});
