const express = require("express");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.get("/about", (req, res) => {
  res.render("pages/about", {
    name: "Bangladesh",
  });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
