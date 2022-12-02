const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const adminRoute = express.Router();

adminRoute.get("/dashboard", (req, res) => {
  // console.log(req.originalUrl);
  // console.log(req.url);
  // console.log(req.path);
  // console.log(req.hostname);
  // console.log(req.ip);
  console.log(req.params.id);
  console.log(req.cookies);
  res.send("We are in admin dashboard");
});
app.use("/admin", adminRoute);
app.get("/user/:id", (req, res) => {
  // console.log(req.originalUrl);
  // console.log(req.url);
  // console.log(req.path);
  // console.log(req.ip);
  // console.log(req.hostname);
  // console.log(req.method);
  // console.log(req.params);
  // console.log(req.params.id);
  // console.log(req.query.filter);
  console.log(req.cookies);

  res.send("Hello World");
});
app.post("/user/", (req, res) => {
  console.log(req.body);
  res.send("Hello World Post");
});
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
