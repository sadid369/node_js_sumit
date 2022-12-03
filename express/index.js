const express = require("express");

const app = express();
const adminRouter = express.Router();
const logger = (req, res, next) => {
  console.log(
    `${Date(Date.now()).toLocaleString()} - ${req.method} -- ${
      req.originalUrl
    } -- ${req.protocol} -- ${req.ip}`
  );
  next();
};
adminRouter.use(logger);
adminRouter.get("/b", (req, res) => {
  res.send("Dash");
});

app.use("/a", adminRouter);

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
